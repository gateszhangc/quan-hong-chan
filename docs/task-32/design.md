# 任务32 - 设计文档

## 1. 总体方案
在首页（`SimpleClawLanding`）部署入口引入订阅门槛（paywall）：

- 服务端计算用户是否存在“有效订阅”（见 3.2）
- 前端按钮文案保持一致（`Deploy OpenClaw`），在点击时根据 `hasActiveSubscription` 决定“直接部署”或“跳转订阅”

MVP 仅做“是否有有效订阅”的判断，不做按档位的配额控制。

### 1.1 测试开关
为了方便测试部署流程，增加前端开关：
- `NEXT_PUBLIC_DEPLOY_SUBSCRIPTION_CHECK_ENABLED="false"`：跳过订阅判断，直接部署
- `NEXT_PUBLIC_DEPLOY_SUBSCRIPTION_CHECK_ENABLED="true"`：开启订阅判断

## 2. 用户流程

### 2.1 未登录（Auth 开启）
```
用户点击 CTA
  -> 打开登录弹窗
  -> 登录成功
  -> 拉取 /api/get-user-info
  -> 可点击 Deploy OpenClaw
```

### 2.2 已登录但未订阅
```
用户填写配置（model/channel/token）
  -> 点击 "Deploy OpenClaw"
  -> 跳转 /pricing?source=deploy
  -> 完成订阅支付
  -> 返回首页
  -> 点击 "Deploy OpenClaw" 发起部署
```

### 2.3 已登录且已订阅
```
用户填写配置（model/channel/token）
  -> 点击 "Deploy OpenClaw"
  -> POST /api/deploy
  -> 轮询 /api/deploy/:id
  -> running/failed
```

## 3. 订阅状态计算

### 3.1 数据来源
使用现有 `easyclaw.orders` 表（Next 端 Drizzle / 模型层）。

### 3.2 “有效订阅”判定
满足任意一条订单记录即认为“有效订阅”：

- `status = paid`
- `interval IN ('month', 'year')`
- `expired_at IS NOT NULL AND expired_at > NOW()`
- 归属当前用户：`user_uuid = :userUuid`

示例 SQL（仅用于说明）：
```sql
select 1
from easyclaw.orders
where user_uuid = $1
  and status = 'paid'
  and interval in ('month', 'year')
  and expired_at is not null
  and expired_at > now()
limit 1;
```

边界说明：
- `one-time` 不算订阅，因此不参与判定。
- 允许多条订阅订单并存（例如续费生成新订单）；只要有任意有效即可。

## 4. API 设计（MVP）

### 4.1 扩展 `/api/get-user-info`
`AppContextProvider` 已在登录后调用 `/api/get-user-info`，因此 MVP 推荐直接在返回体中增加字段：

```ts
type GetUserInfoResponse = {
  // 现有字段：用户信息、credits、isAdmin...
  hasActiveSubscription: boolean;
};
```

返回字段只提供布尔值，避免暴露订单明细。

### 4.2 Deploy 幂等（同 Token 不重复创建）
当用户重复点击 Deploy，或网络重试导致重复请求时，如果存在同一用户、同一 Telegram Bot Token 的“活跃部署”（`status ∈ {provisioning, running}`），后端应直接返回已有部署：

```json
{
  "deployment_id": "xxxx",
  "status": "running",
  "reused": true
}
```

这样可以避免重复创建容器，并规避 Telegram bot 多实例同时拉取更新造成的冲突。

## 5. 前端交互设计

### 5.1 CTA 状态机
```
authEnabled && !user            => SIGN_IN
authEnabled && user             => DEPLOY
!authEnabled (本地开发)         => DEPLOY (默认放行)
```

其中：
- `sub` 表示 `hasActiveSubscription === true`

点击 `DEPLOY` 时的分支：
- `sub === true`：继续执行部署流程（POST /api/deploy）
- `sub === false`：跳转到 `/pricing?source=deploy`

### 5.2 跳转到 Pricing（locale-aware）
项目启用了 `localePrefix = "always"`，因此跳转必须是 locale-aware。

推荐实现方式：
- 在 client component 中使用 `useRouter`（`@/i18n/navigation`）：
  - `router.push("/pricing?source=deploy")`

## 6. 埋点/来源（可选）
在跳转链接上携带 `source=deploy`，用于后续分析订阅来源。

## 7. 非目标（本任务不做）
- 不做支付成功后“自动继续部署”（MVP 为手动返回再次点击）
- 不做按订阅档位控制最大部署数
- 不做服务端强制拦截 `/api/deploy` 的防绕过策略（后续建议补）

# 任务32 - 需求文档

## 背景
当前 `Deploy OpenClaw` 会在后端创建真实部署（容器、账号池资源等），每次部署都会产生明确成本。为了让付费转化更自然，并避免免费用户大量占用资源，需要在用户“部署前”引入订阅门槛。

## 目标
- 已登录用户在部署 OpenClaw 前必须先完成订阅
- 未订阅用户点击部署入口时被引导到 Pricing 页面完成订阅
- 订阅判断基于现有订单数据（`orders` 表），不引入新的计费系统

## 范围（MVP）
- 仅实现首页（`SimpleClawLanding`）部署入口的订阅门槛
- 仅判断“是否存在有效订阅”，不区分不同订阅档位的配额差异
- 支付成功后用户手动返回首页再次点击 Deploy（不做自动继续部署）

## 功能需求

### FR1: 部署入口（点击时校验订阅）
在 `SimpleClawLanding` 底部主按钮区域：

1. 未登录（Auth 开启且 `user` 为空）
- 文案：`Sign in to deploy`
- 点击：打开登录弹窗（保持现有逻辑）

2. 已登录（不区分是否订阅，按钮统一显示）
- 文案：`Deploy OpenClaw`
- 点击：
  - 若用户 **有有效订阅**：执行现有部署逻辑（`POST /api/deploy`）
  - 若用户 **无有效订阅**：跳转到 `/pricing?source=deploy` 完成订阅（需要 locale-aware 路由）

### FR2: “有效订阅”定义
对当前用户（`user_uuid`）满足以下条件即认为有有效订阅：

- `orders.status = paid`
- `orders.interval ∈ {month, year}`
- `orders.expired_at > now()`

说明：
- `one-time` 支付不算订阅
- 只要存在任意一条满足条件的订单即可（不区分订阅档位）

### FR3: 前端可读取订阅状态
前端在点击 `Deploy OpenClaw` 时需要能拿到 `hasActiveSubscription`（boolean），用于决定“直接部署”或“跳转定价页订阅”。

MVP 推荐方案：由 `/api/get-user-info` 返回该字段；为避免订阅状态过期，点击时可按需刷新一次 `/api/get-user-info` 再判断。

### FR4: 部署幂等（避免重复部署失败）
同一用户在以下场景再次点击 `Deploy OpenClaw` 时，不应创建新的部署导致失败：

- 已存在 `status ∈ {provisioning, running}` 的部署，并且 Telegram Bot Token 相同

期望行为：
- 返回已存在的 `deployment_id` 和 `status`（前端视为成功）
- 避免同一个 Telegram bot token 被多个实例同时拉取更新导致冲突

## 非功能需求

### NFR1: 性能
订阅判断应为一次轻量 DB 查询，建议为后续加索引：
- `(user_uuid, status, interval, expired_at)`

### NFR2: 安全
前端不暴露订单明细，仅暴露布尔值（是否有有效订阅）。

### NFR3: 兼容性（本地开发）
当 `NEXT_PUBLIC_AUTH_DISABLED=true`（Auth 关闭）时，为了本地开发可以默认允许部署（可通过配置开关控制）。

### NFR4: 订阅校验开关（用于测试）
增加环境变量开关以便在测试阶段跳过订阅判断：
- `NEXT_PUBLIC_DEPLOY_SUBSCRIPTION_CHECK_ENABLED="false"`：不进行订阅判断，点击 Deploy 直接部署
- `NEXT_PUBLIC_DEPLOY_SUBSCRIPTION_CHECK_ENABLED="true"`：开启订阅判断（默认）

## 验收标准
- AC1 已登录用户主按钮显示 `Deploy OpenClaw`
- AC2 已登录但未订阅时，点击 `Deploy OpenClaw` 会跳转到 Pricing 页面
- AC3 已订阅用户点击 `Deploy OpenClaw` 可正常触发部署
- AC4 “有效订阅”判定逻辑符合 FR2
- AC5 同一 Telegram Bot Token 重复点击 Deploy 不会产生新的失败部署（幂等返回已有 deployment_id）

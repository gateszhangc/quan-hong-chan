# 任务32 - 执行任务文档

## 任务概览

| 属性 | 值 |
|------|-----|
| 任务ID | task-32 |
| 任务名称 | 部署前订阅（点击 Deploy 跳转订阅） |
| 优先级 | P0 |
| 关联需求 | [requirements.md](./requirements.md) |
| 设计方案 | [design.md](./design.md) |

---

## 子任务列表

### 子任务 1: 实现“是否有有效订阅”的查询函数
**文件**: `src/models/order.ts`

**工作内容**:
- [ ] 新增 `hasActiveSubscriptionByUserUuid(user_uuid: string): Promise<boolean>`
- [ ] 判定规则见 [requirements.md](./requirements.md) FR2

**实现要点**:
- 仅查询 `status=paid AND interval in (month,year) AND expired_at > now`
- `expired_at` 为空视为无效
- 任意一条满足即可返回 `true`

---

### 子任务 2: 在 `/api/get-user-info` 返回订阅状态
**文件**: `src/app/api/get-user-info/route.ts`

**工作内容**:
- [ ] 在现有 user info 返回体中增加 `hasActiveSubscription`
- [ ] 仅返回 boolean，不返回订单明细

---

### 子任务 3: 更新 User 类型定义（可选但推荐）
**文件**: `src/types/user.d.ts`

**工作内容**:
- [ ] 在 `User` 上新增可选字段：`hasActiveSubscription?: boolean`

---

### 子任务 4: 首页 Deploy 点击时订阅校验
**文件**: `src/components/landing/simpleclaw-landing.tsx`

**工作内容**:
- [ ] 保持已登录状态 CTA 文案为 `Deploy OpenClaw`
- [ ] 在点击 `Deploy OpenClaw` 时校验订阅：
  - 有有效订阅：继续执行现有部署逻辑
  - 无有效订阅：跳转 Pricing（`/pricing?source=deploy`）
- [ ] 增加订阅校验开关：
  - `NEXT_PUBLIC_DEPLOY_SUBSCRIPTION_CHECK_ENABLED="false"` 时跳过订阅判断，直接部署
- [ ] Pricing 跳转必须使用 locale-aware 路由：
  - `useRouter` from `@/i18n/navigation`
  - `router.push("/pricing?source=deploy")`

**注意**:
- 在订阅状态未加载完成时（例如 user 先由 session 注入，后续才 fetch user info），建议在点击时主动刷新一次 `/api/get-user-info` 再做判断，避免误跳转或误放行。

---

### 子任务 5: Deploy 幂等（同 Telegram Token 不重复创建）
**文件**: `backend/src/services/deploy.ts`, `backend/src/routes/deploy.ts`

**工作内容**:
- [ ] 在创建部署前，查询该用户是否已有 `status ∈ {provisioning, running}` 的部署
- [ ] 解密并对比 telegram token，相同则直接返回已有 `deployment_id`（`reused=true`）

**目的**:
- 避免重复点击/重试导致创建多个实例，从而触发 Telegram bot 冲突或资源浪费

---

### 子任务 6: 浏览器测试（必须）
**步骤**:
1. `npm run dev`
2. 访问首页 `/{locale}`（例如 `/en`）
3. 验证三种场景：

**场景 A：未登录**
- [ ] CTA 为 `Sign in to deploy`
- [ ] 点击后打开登录弹窗

**场景 B：已登录但无有效订阅**
- [ ] CTA 为 `Deploy OpenClaw`
- [ ] 点击跳转到 `/{locale}/pricing?source=deploy`（不应触发 `POST /api/deploy`）

**场景 C：已登录且有有效订阅**
- [ ] CTA 为 `Deploy OpenClaw`
- [ ] 点击后正常发起 `POST /api/deploy`

**场景 D：重复点击 Deploy（同一 Telegram Token）**
- [ ] 第二次点击不会创建新的失败部署
- [ ] 返回已有 deployment_id（或快速进入 running）

---

## 风险与应对

| 风险 | 影响 | 应对 |
|------|------|------|
| 仅前端 gate 可被绕过 | 用户可直接请求部署接口 | 后续补服务端拦截（见 design.md 非目标） |
| expired_at/时区差异 | 订阅态误判 | 用 DB `NOW()` 比较，统一时区 |
| 订阅状态加载存在短暂空窗 | 误跳转到 pricing 或误放行 | 点击时刷新 `/api/get-user-info` 并以最新结果为准 |

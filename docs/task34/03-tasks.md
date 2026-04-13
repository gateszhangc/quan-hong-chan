# Task 34 - 开发任务清单

## 任务总览
- **目标**: 实现账号池 Starter/Pro 分层
- **方案**: 方案A - 最小化改动
- **预计工作量**: 1-2 小时

---

## 任务列表

### Task 1: 数据库变更
**文件**: `sql/init.sql`
**优先级**: P0
**预计时间**: 10分钟

**内容**:
- [ ] 添加 `tier` 字段到 `account_pool` 表
- [ ] 添加索引 `idx_account_pool_tier`
- [ ] 添加索引 `idx_account_pool_available`

---

### Task 2: 核心服务层修改
**文件**: `src/services/account-pool.ts`
**优先级**: P0
**预计时间**: 20分钟

**内容**:
- [ ] `Account` 接口添加 `tier` 字段
- [ ] 修改 `getOrAssignAccount` 函数，增加 `tier` 参数
- [ ] 修改查询 SQL，增加 `tier = $tier` 条件
- [ ] 修改 `ImportAccountInput` 接口，添加 `tier`
- [ ] 修改 `importAccount` 函数，支持导入 tier
- [ ] 修改 `listAccounts` 查询，返回 `tier` 字段
- [ ] 修改统计查询，按 tier 分组

---

### Task 3: 管理接口修改
**文件**: `src/routes/admin-accounts.ts`
**优先级**: P0
**预计时间**: 15分钟

**内容**:
- [ ] `importSchema` 添加 `tier` 字段验证
- [ ] `GET /api/admin/accounts` 支持 `?tier=` 查询参数
- [ ] 确保导入和批量导入传递 tier 参数

---

### Task 4: 部署流程修改
**文件**: `src/routes/deploy.ts`, `src/services/deploy.ts`, `src/services/docker.ts`
**优先级**: P0
**预计时间**: 20分钟

**内容**:
- [ ] `deploy.ts`: 从请求头读取 `x-subscription-tier`，传递给 service
- [ ] `deploy.ts`: `createDeployment` 存储 tier 到 deployments 表（可选）
- [ ] `deploy.ts`: `runDeployment` 传递 tier 参数
- [ ] `docker.ts`: `createOpenClawContainer` 接收 tier 参数
- [ ] `docker.ts`: 调用 `getOrAssignAccount(userId, tier)`

---

### Task 5: 前端修改
**文件**: 
- `src/app/[locale]/(admin)/admin/accounts/page.tsx`
- `src/app/[locale]/(admin)/admin/accounts/add/page.tsx`
**优先级**: P0
**预计时间**: 25分钟

**内容**:
- [ ] `page.tsx`: Account 接口添加 tier 字段
- [ ] `page.tsx`: 账号列表显示 tier 标签（可使用 InlineTag 或新建 TierBadge）
- [ ] `page.tsx`: 统计按 tier 分组显示（Starter 总数/已绑定/可用，Pro 总数/已绑定/可用）
- [ ] `add/page.tsx`: AccountImportInput 添加 tier 字段
- [ ] `add/page.tsx`: 表单添加 Tier 选择下拉框（Select 组件）
- [ ] `add/page.tsx`: 批量导入 JSON 示例包含 tier 字段

---

### Task 6: 测试验证
**优先级**: P1
**预计时间**: 15分钟

**内容**:
- [ ] 前端：导入 Starter 账号成功
- [ ] 前端：导入 Pro 账号成功
- [ ] 前端：账号列表正确显示 tier 标签
- [ ] 后端：Starter 用户部署获取 Starter 账号
- [ ] 后端：Pro 用户部署获取 Pro 账号
- [ ] 后端：账号池耗尽返回正确错误

---

## 快速检查清单

```bash
# 1. 更新数据库
npm run db:init

# 2. 导入测试账号
curl -X POST http://localhost:5000/api/admin/accounts/import \
  -H "Content-Type: application/json" \
  -d '{"accountId":"test-starter","apiKey":"sk-test","provider":"openai","tier":"starter"}'

curl -X POST http://localhost:5000/api/admin/accounts/import \
  -H "Content-Type: application/json" \
  -d '{"accountId":"test-pro","apiKey":"sk-pro","provider":"openai","tier":"pro"}'

# 3. 查看账号列表
curl http://localhost:5000/api/admin/accounts

# 4. 测试部署（Starter）
curl -X POST http://localhost:5000/api/deploy \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer test" \
  -d '{"telegram_token":"test-token"}'

# 5. 测试部署（Pro）
curl -X POST http://localhost:5000/api/deploy \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer test" \
  -H "X-Subscription-Tier: pro" \
  -d '{"telegram_token":"test-token-2"}'
```

---

## 备注

- 保持最小化改动，不添加不必要的抽象
- 所有默认值均为 `starter`，确保向后兼容
- 错误信息需要区分 `NO_AVAILABLE_STARTER_ACCOUNT` 和 `NO_AVAILABLE_PRO_ACCOUNT`

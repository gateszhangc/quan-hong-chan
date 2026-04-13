# Task 34 - 账号池分层设计方案

## 架构设计（方案A - 简化版）

### 数据库变更

```sql
-- 1. 账号表添加 tier 字段
ALTER TABLE account_pool ADD COLUMN IF NOT EXISTS tier TEXT NOT NULL DEFAULT 'starter';

-- 2. 索引优化
CREATE INDEX IF NOT EXISTS idx_account_pool_tier ON account_pool(tier);
CREATE INDEX IF NOT EXISTS idx_account_pool_available ON account_pool(is_bound, is_active, tier);
```

### 数据模型

```typescript
interface Account {
  id: string;
  accountId: string;
  apiKey: string;
  provider: string;
  model?: string;
  thingLevel?: string;
  tier: 'starter' | 'pro';  // 新增
}
```

### 核心逻辑修改

#### 1. 账号分配 (account-pool.ts)

```typescript
// 修改签名，增加 tier 参数
export async function getOrAssignAccount(
  userId: string,
  tier: 'starter' | 'pro' = 'starter'
): Promise<Account> {
  // 1. 检查是否已绑定同 tier 账号
  // 2. 从对应 tier 的未绑定账号中分配
  // SQL: WHERE is_bound = false AND is_active = true AND tier = $tier
}
```

#### 2. 账号导入 (admin-accounts.ts)

```typescript
const importSchema = z.object({
  // ... 现有字段
  tier: z.enum(['starter', 'pro']).default('starter'),
});
```

#### 3. 部署流程 (docker.ts)

```typescript
// 从请求头获取 tier
const tier = (req.headers['x-subscription-tier'] as 'starter' | 'pro') || 'starter';

// 调用 getOrAssignAccount(userId, tier)
```

### API 变更

#### 导入账号
```http
POST /api/admin/accounts/import
Content-Type: application/json

{
  "accountId": "xxx",
  "apiKey": "sk-xxx",
  "provider": "openai",
  "tier": "pro"  // 可选，默认 starter
}
```

#### 获取账号列表
```http
GET /api/admin/accounts?tier=pro  // 可选筛选
```

#### 部署 Bot
```http
POST /api/deploy
Content-Type: application/json
X-Subscription-Tier: pro  // 可选，默认 starter

{
  "telegram_token": "xxx"
}
```

### 错误处理

| 错误码 | 场景 |
|--------|------|
| `NO_AVAILABLE_STARTER_ACCOUNT` | Starter 池无可用账号 |
| `NO_AVAILABLE_PRO_ACCOUNT` | Pro 池无可用账号 |

## 前端修改

### 1. 账号列表页 (`src/app/[locale]/(admin)/admin/accounts/page.tsx`)

```typescript
interface Account {
  // ... 现有字段
  tier: 'starter' | 'pro';  // 新增
}

interface Stats {
  // ... 现有字段
  starter: { total: number; bound: number; available: number };
  pro: { total: number; bound: number; available: number };
}
```

- 账号卡片显示 tier 标签（Starter/Pro）
- 统计卡片增加 Starter/Pro 分组显示
- 可选：添加 tier 筛选标签

### 2. 添加账号页 (`src/app/[locale]/(admin)/admin/accounts/add/page.tsx`)

```typescript
type AccountImportInput = {
  // ... 现有字段
  tier: 'starter' | 'pro';  // 新增，默认 starter
};
```

- 表单增加 Tier 选择下拉框（Starter/Pro）
- 批量导入 JSON 示例包含 tier 字段

### 3. 可选：创建 TierBadge 组件

```typescript
// src/components/admin/tier-badge.tsx
export function TierBadge({ tier }: { tier: 'starter' | 'pro' }) {
  return (
    <span className={cn(
      "inline-flex items-center rounded-full px-2 py-0.5 text-xs",
      tier === 'pro' 
        ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" 
        : "bg-slate-500/10 text-slate-500 border border-slate-500/20"
    )}>
      {tier === 'pro' ? 'Pro' : 'Starter'}
    </span>
  );
}
```

## 文件变更清单

### 后端
| 文件 | 变更类型 | 说明 |
|------|----------|------|
| `backend/sql/init.sql` | 修改 | 添加 tier 字段和索引 |
| `backend/src/services/account-pool.ts` | 修改 | 支持 tier 参数 |
| `backend/src/routes/admin-accounts.ts` | 修改 | 导入支持 tier，列表支持筛选 |
| `backend/src/services/docker.ts` | 修改 | 读取 tier 并传递 |
| `backend/src/services/deploy.ts` | 修改 | 传递 tier 参数 |
| `backend/src/routes/deploy.ts` | 修改 | 读取请求头 tier |

### 前端
| 文件 | 变更类型 | 说明 |
|------|----------|------|
| `src/app/[locale]/(admin)/admin/accounts/page.tsx` | 修改 | 显示 tier 信息，统计分组 |
| `src/app/[locale]/(admin)/admin/accounts/add/page.tsx` | 修改 | 表单添加 tier 选择 |
| `src/components/admin/tier-badge.tsx` | 新增 | Tier 标签组件（可选） |

## 向后兼容

- 现有账号无 tier 字段，默认视为 `starter`
- 请求无 `X-Subscription-Tier` 头，默认视为 `starter`
- 导入无 tier 参数，默认 `starter`

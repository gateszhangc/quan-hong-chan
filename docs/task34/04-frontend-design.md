# Task 34 - 前端设计文档

## 1. 账号列表页 (`/admin/accounts`)

### 1.1 布局设计

```
┌─────────────────────────────────────────────────────────────┐
│  Account Pool                          [+ Add Account]      │
│  Manage API Key accounts for deployment.                    │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │ Starter  │ │ Starter  │ │ Pro      │ │ Inactive │       │
│  │ Total: 5 │ │ Bound: 2 │ │ Total: 3 │ │ 0        │       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
│  ┌──────────┐ ┌──────────┐                                   │
│  │ Pro      │ │ Pro      │                                   │
│  │ Bound: 1 │ │ Available│                                   │
│  └──────────┘ └──────────┘                                   │
├─────────────────────────────────────────────────────────────┤
│  Accounts                                          8 total  │
├─────────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────────┐ │
│  │ user-001                    [Starter] [openai] [bound]│ │
│  │ (user@example.com)                                    │ │
│  │ Model: gpt-4o    User: 8abc...    Imported: Jan 15    │ │
│  │                                           [Unbind]    │ │
│  ├───────────────────────────────────────────────────────┤ │
│  │ user-002                    [Pro] [openai] [available]│ │
│  │                                                       │ │
│  │ Model: gpt-5-2    Imported: Jan 14      [Delete]      │ │
│  └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 统计卡片设计

**布局**: 6 个卡片，2 行 x 3 列（或根据屏幕自适应）

| 卡片 | 颜色主题 | 内容 |
|------|----------|------|
| Starter Total | Slate | 灰色系 |
| Starter Bound | Blue | 蓝色系 |
| Starter Available | Green | 绿色系 |
| Pro Total | Amber | 琥珀/金色系 |
| Pro Bound | Blue | 蓝色系 |
| Pro Available | Green | 绿色系 |

### 1.3 Tier 标签设计

```
┌─────────────────┐  ┌─────────────────┐
│  [● Starter]    │  │  [★ Pro]        │
│  背景: slate-100 │  │  背景: amber-50 │
│  文字: slate-600 │  │  文字: amber-600│
│  边框: slate-200 │  │  边框: amber-200│
└─────────────────┘  └─────────────────┘
```

### 1.4 交互逻辑

```typescript
// 1. 数据获取
const fetchData = async (tier?: 'starter' | 'pro' | 'all') => {
  const url = tier && tier !== 'all' 
    ? `/api/admin/accounts?tier=${tier}` 
    : '/api/admin/accounts';
  const res = await fetch(url);
  // ...
};

// 2. 统计分组计算
const stats = {
  starter: { total: 5, bound: 2, available: 3 },
  pro: { total: 3, bound: 1, available: 2 },
};

// 3. 点击统计卡片筛选（可选功能）
const handleStatCardClick = (tier: 'starter' | 'pro', type: 'all' | 'bound' | 'available') => {
  setFilterTier(tier);
  // 高亮对应卡片
};
```

---

## 2. 添加账号页 (`/admin/accounts/add`)

### 2.1 单账号导入表单布局

```
┌─────────────────────────────────────────────────────────────┐
│  ← Back to Account Pool                                     │
├─────────────────────────────────────────────────────────────┤
│  Add Account                                                │
│  Import one account or batch import multiple API Keys.      │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────┐ ┌──────────────────┐                 │
│  │ Account ID  *    │ │ Email            │                 │
│  │ [user-001      ] │ │ [user@ex.com   ] │                 │
│  └──────────────────┘ └──────────────────┘                 │
│  ┌──────────────────┐ ┌──────────────────┐                 │
│  │ API Key  *       │ │ Provider  *      │                 │
│  │ [sk-...        ] │ │ [OpenAI    ▼]    │                 │
│  └──────────────────┘ └──────────────────┘                 │
│  ┌──────────────────┐ ┌──────────────────┐                 │
│  │ Model            │ │ Thing Level      │                 │
│  │ [gpt-4o        ] │ │ [premium       ] │                 │
│  └──────────────────┘ └──────────────────┘                 │
│  ┌──────────────────┐                                      │
│  │ Tier  *          │                                      │
│  │ [Starter ▼]      │  ← 默认选中 Starter                  │
│  └──────────────────┘                                      │
│                                                            │
│                                    [Cancel] [Import Account]│
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Tier 选择器设计

```
下拉框展开状态:
┌──────────────────┐
│ Tier  *          │
│ ┌──────────────┐ │
│ │ ● Starter    │ │  ← 默认选中
│ │ ★ Pro        │ │
│ └──────────────┘ │
└──────────────────┘

选项样式:
- Starter: 左侧灰色圆点 ● + "Starter" 文字
- Pro: 左侧金色星星 ★ + "Pro" 文字 + "(付费)" 提示（可选）
```

### 2.3 批量导入 JSON 示例

```json
[
  {
    "accountId": "test-starter-001",
    "email": "test@example.com",
    "apiKey": "sk-or-v1-...",
    "provider": "openrouter",
    "model": "openrouter/anthropic/claude-sonnet-4.5",
    "thingLevel": "premium",
    "tier": "starter"
  },
  {
    "accountId": "test-pro-001",
    "email": "pro@example.com",
    "apiKey": "sk-or-v1-...",
    "provider": "openrouter",
    "model": "openrouter/anthropic/claude-opus-4.5",
    "thingLevel": "premium",
    "tier": "pro"
  }
]
```

### 2.4 交互逻辑

```typescript
// 1. 表单状态
type FormState = {
  accountId: string;
  email: string;
  apiKey: string;
  provider: 'openai' | 'openrouter' | 'anthropic' | 'google';
  model: string;
  thingLevel: string;
  tier: 'starter' | 'pro';  // 默认 'starter'
};

// 2. 提交处理
const handleSubmit = async () => {
  const payload = {
    ...form,
    tier: form.tier || 'starter',  // 确保有默认值
  };
  
  const res = await fetch('/api/admin/accounts/import', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  // ...
};

// 3. 表单验证
const validate = () => {
  if (!form.accountId.trim()) return 'Account ID is required';
  if (!form.apiKey.trim()) return 'API Key is required';
  if (!form.tier) return 'Tier is required';
  return null;
};
```

---

## 3. 组件设计

### 3.1 TierBadge 组件

```typescript
// src/components/admin/tier-badge.tsx
'use client';

import { cn } from '@/lib/utils';

interface TierBadgeProps {
  tier: 'starter' | 'pro';
  className?: string;
}

export function TierBadge({ tier, className }: TierBadgeProps) {
  const isPro = tier === 'pro';
  
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium',
        isPro
          ? 'border-amber-500/30 bg-amber-500/10 text-amber-600'
          : 'border-slate-500/30 bg-slate-500/10 text-slate-600',
        className
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', isPro ? 'bg-amber-500' : 'bg-slate-500')} />
      {isPro ? 'Pro' : 'Starter'}
    </span>
  );
}
```

### 3.2 使用示例

```tsx
// 在账号列表卡片中
<div className="flex items-center gap-2">
  <h3>{account.accountId}</h3>
  <TierBadge tier={account.tier} />
  <ProviderBadge provider={account.provider} />
  <StatusBadge isBound={account.isBound} isActive={account.isActive} />
</div>
```

---

## 4. 视觉规范

### 4.1 颜色定义

| 元素 | Starter | Pro |
|------|---------|-----|
| 标签背景 | bg-slate-100 | bg-amber-50 |
| 标签文字 | text-slate-600 | text-amber-600 |
| 标签边框 | border-slate-200 | border-amber-200 |
| 指示点 | bg-slate-500 | bg-amber-500 |
| 统计卡片 | 灰色系渐变 | 琥珀色系渐变 |

### 4.2 响应式设计

**桌面端 (>1024px)**:
- 统计卡片：6 列或 3 列
- 账号列表：完整信息展示

**平板端 (768px-1024px)**:
- 统计卡片：3 列
- 账号列表：紧凑布局

**移动端 (<768px)**:
- 统计卡片：2 列或横向滚动
- 账号列表：垂直堆叠，隐藏部分信息

---

## 5. 状态管理

```typescript
// 筛选状态
interface FilterState {
  tier: 'all' | 'starter' | 'pro';
  status: 'all' | 'bound' | 'available';
}

// URL 同步（可选）
// /admin/accounts?tier=pro&status=available
```

---

## 6. 错误处理

| 场景 | 处理方式 |
|------|----------|
| 导入失败 | Toast 提示错误信息 |
| 网络超时 | 显示重试按钮 |
| 参数验证失败 | 表单字段红色高亮 |
| 后端 502 | 显示"后端服务不可用"提示 |

# EasyClaw 账号池手动导入功能 - 任务文档

## 任务清单

### 阶段 1: 数据库与后端 (优先级: P0)

| 序号 | 任务 | 文件路径 | 预计工时 | 依赖 |
|------|------|----------|----------|------|
| 1.1 | 创建 account_pool 表迁移 | `src/db/migrations/0002_add_account_pool.sql` | 30min | - |
| 1.2 | 更新 Drizzle schema | `src/db/schema.ts` | 20min | 1.1 |
| 1.3 | 实现账号导入接口 | `backend/src/routes/admin-accounts.ts` - `POST /import` | 1.5h | 1.2 |
| 1.4 | 实现账号列表接口 | `backend/src/routes/admin-accounts.ts` - `GET /` | 30min | 1.2 |
| 1.5 | 实现账号删除接口 | `backend/src/routes/admin-accounts.ts` - `DELETE /:id` | 30min | 1.2 |
| 1.6 | 添加管理员权限中间件 | `backend/src/middleware/admin.ts` | 30min | - |
| 1.7 | 实现账号解绑接口 | `backend/src/routes/admin-accounts.ts` - `POST /unbind` | 1h | 1.2 |
| 1.8 | 添加解绑审计日志 | `backend/src/services/account-pool.ts` | 30min | 1.7 |
| 1.9 | 注册路由 | `backend/src/index.ts` | 10min | 1.3-1.8 |
| 1.10 | 运行迁移并测试 | - | 30min | 1.1-1.9 |

**阶段 1 小计: 约 5 小时**

---

### 阶段 2: 前端组件 (优先级: P0)

| 序号 | 任务 | 文件路径 | 预计工时 | 依赖 |
|------|------|----------|----------|------|
| 2.1 | 创建 StatusBadge 组件 | `components/admin/status-badge.tsx` | 20min | - |
| 2.2 | 创建 StatsCard 组件 | `components/admin/stats-card.tsx` | 20min | - |
| 2.3 | 创建 CommandBox 组件（带复制） | `components/admin/command-box.tsx` | 30min | - |
| 2.4 | 创建 StepIndicator 组件 | `components/admin/step-indicator.tsx` | 30min | - |
| 2.5 | 创建 JsonPasteArea 组件 | `components/admin/json-paste-area.tsx` | 40min | - |
| 2.6 | 创建 AccountListItem 组件 | `components/admin/account-list-item.tsx` | 30min | 2.1 |
| 2.7 | 创建 UnbindButton 组件 | `components/admin/unbind-button.tsx` | 40min | - |
| 2.8 | 创建账号列表页 | `app/admin/accounts/page.tsx` | 1h | 2.2, 2.6, 2.7 |
| 2.9 | 创建添加账号向导页 | `app/admin/accounts/add/page.tsx` | 1.5h | 2.3-2.5 |
| 2.10 | 联调测试 | - | 30min | 2.7-2.9 |

**阶段 2 小计: 约 5.5 小时**

---

### 阶段 3: 集成与优化 (优先级: P1)

| 序号 | 任务 | 文件路径 | 预计工时 | 依赖 |
|------|------|----------|----------|------|
| 3.1 | 添加 Token 有效性验证（可选） | `backend/src/routes/admin-accounts.ts` | 30min | 1.3 |
| 3.2 | 添加导入成功/失败消息提示 | `app/admin/accounts/add/page.tsx` | 20min | 2.8 |
| 3.3 | 添加空状态展示 | `app/admin/accounts/page.tsx` | 20min | 2.7 |
| 3.4 | 移动端适配优化 | 各前端文件 | 30min | 2.7-2.9 |
| 3.5 | 添加加载状态 skeleton | 各前端文件 | 30min | 2.7-2.9 |
| 3.6 | 解绑功能浏览器测试 | - | 30min | 1.7, 2.7 |

**阶段 3 小计: 约 2.5 小时**

---

## 总工时估算

| 阶段 | 工时 | 说明 |
|------|------|------|
| 阶段 1: 数据库与后端 | 6h | 核心 API + 解绑功能 |
| 阶段 2: 前端组件 | 6h | 页面与组件开发 |
| 阶段 3: 集成与优化 | 3h | 体验优化 + 测试 |
| **总计** | **15h** | 约 2 个工作日 |

---

## 详细任务说明

### 任务 1.1: 创建数据库迁移

```sql
-- src/db/migrations/0002_add_account_pool.sql
CREATE TABLE IF NOT EXISTS account_pool (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    access_token_encrypted TEXT NOT NULL,
    refresh_token_encrypted TEXT NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    account_id VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255),
    is_bound BOOLEAN NOT NULL DEFAULT FALSE,
    bound_user_id VARCHAR(255),
    bound_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    failure_count INTEGER NOT NULL DEFAULT 0,
    last_used_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_account_pool_status ON account_pool(is_bound, is_active);
CREATE INDEX idx_account_pool_bound_user ON account_pool(bound_user_id) WHERE is_bound = TRUE;

-- 部署表添加 account_id 外键
ALTER TABLE deployments ADD COLUMN IF NOT EXISTS account_id UUID REFERENCES account_pool(id);
```

### 任务 1.3: 账号导入接口

```typescript
// backend/src/routes/admin-accounts.ts
import { Router } from 'express';
import { query } from '../db/index.js';
import { encryptSecret } from '../utils/crypto.js';

const router = Router();

router.post('/import', async (req, res) => {
  try {
    const { authJson } = req.body;
    
    // 1. 解析 JSON
    let parsed;
    try {
      parsed = JSON.parse(authJson);
    } catch {
      return res.status(400).json({ error: 'JSON 格式无效' });
    }
    
    // 2. 提取 profile
    const profile = extractProfile(parsed);
    if (!profile) {
      return res.status(400).json({ error: '无法识别的 JSON 格式' });
    }
    
    // 3. 检查重复
    const existing = await query(
      'SELECT id FROM account_pool WHERE account_id = $1',
      [profile.accountId]
    );
    if (existing.rows.length > 0) {
      return res.status(409).json({ 
        error: `账号 ${profile.accountId} 已存在` 
      });
    }
    
    // 4. 加密存储
    await query(
      `INSERT INTO account_pool (access_token_encrypted, refresh_token_encrypted, 
        expires_at, account_id, is_bound, is_active)
       VALUES ($1, $2, $3, $4, false, true)`,
      [
        encryptSecret(profile.accessToken),
        encryptSecret(profile.refreshToken),
        new Date(profile.expiresAt),
        profile.accountId
      ]
    );
    
    res.json({ success: true, accountId: profile.accountId });
    
  } catch (error) {
    console.error('导入失败:', error);
    res.status(500).json({ error: '服务器错误' });
  }
});

function extractProfile(json: any) {
  // 格式 1: OpenClaw auth-profiles.json
  if (json.version === 1 && json.profiles) {
    const keys = Object.keys(json.profiles);
    if (keys.length === 0) return null;
    const profile = json.profiles[keys[0]];
    return {
      accessToken: profile.accessToken,
      refreshToken: profile.refreshToken,
      expiresAt: profile.expiresAt,
      accountId: profile.accountId || keys[0]
    };
  }
  // ... 其他格式
  return null;
}

export default router;
```

### 任务 2.2: StatsCard 组件

```typescript
// components/admin/stats-card.tsx
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: number;
  color: 'blue' | 'green' | 'red' | 'gray';
}

const colorMap = {
  blue: 'text-blue-600',
  green: 'text-green-600',
  red: 'text-red-600',
  gray: 'text-gray-600'
};

export function StatsCard({ title, value, color }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg border p-6 shadow-sm">
      <div className={cn("text-3xl font-bold", colorMap[color])}>
        {value}
      </div>
      <div className="text-sm text-gray-500 mt-1">{title}</div>
    </div>
  );
}
```

### 任务 2.8: 添加账号向导页 (简化框架)

```typescript
// app/admin/accounts/add/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StepIndicator } from '@/components/admin/step-indicator';
import { CommandBox } from '@/components/admin/command-box';
import { JsonPasteArea } from '@/components/admin/json-paste-area';

const steps = [
  { id: 1, title: '安装 OpenClaw' },
  { id: 2, title: '登录授权' },
  { id: 3, title: '获取 Token' },
  { id: 4, title: '粘贴导入' }
];

export default function AddAccountPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [jsonInput, setJsonInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleImport = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/accounts/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authJson: jsonInput })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        alert('导入成功！');
        router.push('/admin/accounts');
      } else {
        alert(data.error || '导入失败');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8">添加 ChatGPT 账号</h1>
      
      <StepIndicator steps={steps} currentStep={currentStep} />
      
      <div className="mt-8">
        {currentStep === 1 && (
          <StepInstall onNext={() => setCurrentStep(2)} />
        )}
        {currentStep === 2 && (
          <StepAuth 
            onBack={() => setCurrentStep(1)}
            onNext={() => setCurrentStep(3)} 
          />
        )}
        {currentStep === 3 && (
          <StepCopy 
            onBack={() => setCurrentStep(2)}
            onNext={() => setCurrentStep(4)} 
          />
        )}
        {currentStep === 4 && (
          <StepImport 
            jsonInput={jsonInput}
            onChange={setJsonInput}
            onBack={() => setCurrentStep(3)}
            onSubmit={handleImport}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}
```

---

## 测试清单

### 单元测试

| 测试项 | 输入 | 预期结果 |
|--------|------|----------|
| 解析 auth-profiles.json | 完整 JSON | 正确提取 accountId, tokens |
| 解析 credentials.json | Codex 格式 | 正确提取并计算 expiresAt |
| 解析无效 JSON | 随机文本 | 返回格式错误 |
| 重复账号检测 | 已存在的 accountId | 返回 409 错误 |
| 加密存储 | 明文 token | 数据库中存储密文 |

### 集成测试

| 测试项 | 步骤 | 预期结果 |
|--------|------|----------|
| 完整导入流程 | 执行 4 步向导 | 账号成功导入并显示在列表 |
| 删除未绑定账号 | 点击删除按钮 | 账号从列表消失 |
| 禁止删除已绑定 | 尝试删除已绑定账号 | 显示错误提示，删除失败 |
| 权限控制 | 非管理员访问 /admin | 返回 403 或重定向 |

### E2E 测试

| 测试项 | 步骤 | 预期结果 |
|--------|------|----------|
| 管理员导入真实账号 | 使用真实 auth-profiles.json | 导入成功，Token 可用 |
| 列表统计正确 | 导入不同状态账号 | 统计卡片数字正确 |
| 解绑功能正常 | 解绑已绑定账号 | 弹窗确认 → 部署停止 → 状态变为可用 |
| 解绑后重新分配 | 解绑后新用户部署 | 新用户成功分配到该账号 |

---

## 风险与备注

| 风险 | 影响 | 缓解措施 |
|------|------|----------|
| 管理员操作不当 | 中 | 提供详细指引和示例 |
| Token 格式变更 | 低 | 支持多种格式解析，方便扩展 |
| 大列表性能 | 低 | 初期账号少，后期可加分页 |

---

## 交付物清单

- [ ] 数据库迁移文件
- [ ] 后端 API 接口
- [ ] 前端管理页面
- [ ] 更新后的设计文档
- [ ] 测试用例

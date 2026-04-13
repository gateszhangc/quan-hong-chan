# EasyClaw 账号池手动导入功能 - 设计文档

## 1. 系统架构

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              管理员浏览器                                    │
│  ┌─────────────────────────────┐  ┌─────────────────────────────────────┐  │
│  │   /admin/accounts           │  │   /admin/accounts/add               │  │
│  │   (账号列表页)               │  │   (四步导入向导)                     │  │
│  │                             │  │                                     │  │
│  │  ┌────┐┌────┐┌────┐┌────┐  │  │  Step 1: 安装命令                   │  │
│  │  │统计 ││统计 ││统计 ││统计 │  │  Step 2: 授权指引                   │  │
│  │  └────┘└────┘└────┘└────┘  │  │  Step 3: 复制命令                   │  │
│  │                             │  │  Step 4: 粘贴 JSON + 导入           │  │
│  │  ┌───────────────────────┐  │  │                                     │  │
│  │  │   账号列表              │  │  │  ┌─────────────────────────────┐  │  │
│  │  │   ┌─────────────────┐  │  │  │  │    JSON 粘贴文本框           │  │  │
│  │  │   │ 账号项          │  │  │  │  │    [解析结果显示]            │  │  │
│  │  │   │ 账号项          │  │  │  │  │    [验证并导入按钮]          │  │  │
│  │  │   └─────────────────┘  │  │  │  └─────────────────────────────┘  │  │
│  │  └───────────────────────┘  │  └─────────────────────────────────────┘  │
│  └─────────────────────────────┘                                           │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼ HTTP API
┌─────────────────────────────────────────────────────────────────────────────┐
│                               后端服务层                                     │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                        AdminAccountService                            │  │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────┐  │  │
│  │  │ importAccount() │  │ listAccounts()  │  │ deleteAccount()     │  │  │
│  │  │ - 解析 JSON     │  │ - 查询列表      │  │ - 检查绑定状态      │  │  │
│  │  │ - 验证 Token    │  │ - 统计数量      │  │ - 执行删除          │  │  │
│  │  │ - 加密存储      │  │                 │  │                     │  │  │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────────┘  │  │
│  │  ┌────────────────────────────────────────────────────────────────┐ │  │
│  │  │ unbindAccount()                                                │ │  │
│  │  │ - 停止用户部署                                                 │ │  │
│  │  │ - 解绑账号（is_bound=false）                                    │ │  │
│  │  │ - 记录审计日志                                                  │ │  │
│  │  └────────────────────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼ SQL
┌─────────────────────────────────────────────────────────────────────────────┐
│                                数据层                                        │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                         account_pool 表                               │  │
│  │  ┌─────────────────┬─────────────────┬─────────────────────────────┐ │  │
│  │  │ id (uuid, PK)   │ access_token_   │ refresh_token_encrypted     │ │  │
│  │  │ account_id      │   _encrypted    │ expires_at                  │ │  │
│  │  │ is_bound        │ bound_user_id   │ is_active                   │ │  │
│  │  │ last_used_at    │ created_at      │ updated_at                  │ │  │
│  │  └─────────────────┴─────────────────┴─────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. 数据库设计

### 2.1 account_pool 表

```sql
CREATE TABLE account_pool (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    -- OAuth Token（加密存储）
    access_token_encrypted TEXT NOT NULL,
    refresh_token_encrypted TEXT NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    
    -- 账号标识
    account_id VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255), -- 管理员备注用
    
    -- 绑定状态
    is_bound BOOLEAN NOT NULL DEFAULT FALSE,
    bound_user_id VARCHAR(255), -- 绑定的用户 UUID
    bound_at TIMESTAMP WITH TIME ZONE,
    
    -- 状态管理
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    failure_count INTEGER NOT NULL DEFAULT 0,
    last_used_at TIMESTAMP WITH TIME ZONE,
    
    -- 时间戳
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_account_pool_status ON account_pool(is_bound, is_active);
CREATE INDEX idx_account_pool_bound_user ON account_pool(bound_user_id) WHERE is_bound = TRUE;

-- 解绑审计日志表
CREATE TABLE account_unbind_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID NOT NULL REFERENCES account_pool(id),
    previous_user_id VARCHAR(255) NOT NULL,
    reason TEXT,
    stopped_deployments INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_unbind_logs_account ON account_unbind_logs(account_id);
CREATE INDEX idx_unbind_logs_created ON account_unbind_logs(created_at);
```

### 2.2 Drizzle Schema

```typescript
// src/db/schema.ts 新增

export const accountPool = easyclawSchema.table("account_pool", {
  id: uuid("id").primaryKey().defaultRandom(),
  
  // OAuth Tokens (加密)
  accessTokenEncrypted: text("access_token_encrypted").notNull(),
  refreshTokenEncrypted: text("refresh_token_encrypted").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  
  // 账号标识
  accountId: varchar("account_id", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }),
  
  // 绑定状态
  isBound: boolean("is_bound").notNull().default(false),
  boundUserId: varchar("bound_user_id", { length: 255 }),
  boundAt: timestamp("bound_at", { withTimezone: true }),
  
  // 状态
  isActive: boolean("is_active").notNull().default(true),
  failureCount: integer("failure_count").notNull().default(0),
  lastUsedAt: timestamp("last_used_at", { withTimezone: true }),
  
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});
```

---

## 3. API 接口设计

### 3.1 导入账号

```typescript
POST /api/admin/accounts/import
Content-Type: application/json

Request:
{
  "authJson": "string // 完整的 auth-profiles.json 内容"
}

Response Success (200):
{
  "success": true,
  "accountId": "user@example.com",
  "message": "账号导入成功"
}

Response Error (400):
{
  "error": "JSON 格式无效"
}

Response Error (409):
{
  "error": "账号 user@example.com 已存在"
}

Response Error (500):
{
  "error": "服务器错误"
}
```

### 3.2 获取账号列表

```typescript
GET /api/admin/accounts

Response Success (200):
{
  "accounts": [
    {
      "id": "uuid",
      "accountId": "user@example.com",
      "email": "备注",
      "isBound": true,
      "boundUserId": "user-uuid",
      "isActive": true,
      "lastUsedAt": "2025-02-06T14:32:00Z",
      "createdAt": "2025-01-15T10:00:00Z"
    }
  ]
}
```

### 3.3 删除账号

```typescript
DELETE /api/admin/accounts/:id

Response Success (200):
{
  "success": true
}

Response Error (400):
{
  "error": "该账号已被用户绑定，无法删除"
}

Response Error (404):
{
  "error": "账号不存在"
}
```

### 3.4 解绑账号

```typescript
POST /api/admin/accounts/:id/unbind
Content-Type: application/json

Request:
{
  "stopDeployment": true,    // 是否停止相关部署，默认 true
  "reason": "用户主动要求停止使用"  // 解绑原因（可选，用于审计）
}

Response Success (200):
{
  "success": true,
  "data": {
    "accountId": "uuid",
    "previousUserId": "user-uuid",
    "stoppedDeployments": 2,      // 停止的部署数量
    "accountStatus": "available"  // 当前账号状态
  }
}

Response Error (400):
{
  "error": "该账号未绑定用户，无需解绑"
}

Response Error (404):
{
  "error": "账号不存在"
}
```

---

## 4. 前端页面设计

### 4.1 账号列表页 (`/admin/accounts`)

#### 布局结构

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Header: "账号池管理" + "+ 添加 ChatGPT 账号" 按钮 (右侧)                       │
├─────────────────────────────────────────────────────────────────────────────┤
│ Stats Row: 4 个统计卡片横向排列                                              │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│ │   总账号      │ │   已绑定      │ │    可用      │ │   已失效      │        │
│ │     128      │ │     96       │ │     28       │ │      4       │        │
│ │              │ │   [blue]     │ │   [green]    │ │    [red]     │        │
│ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘        │
├─────────────────────────────────────────────────────────────────────────────┤
│ List Header: "📋 账号列表" (左侧) + 搜索框 (右侧，可选)                        │
├─────────────────────────────────────────────────────────────────────────────┤
│ Account List:                                                               │
│ ┌─────────────────────────────────────────────────────────────────────┐    │
│ │ ┌─ 状态圆点                                                            │   │
│ │ │ account_id (主文本)                                     [解绑][🗑️] │   │
│ │ │ 状态标签 │ 绑定用户: xxx │ 部署状态: 🟢运行中 │ 最后使用: xxx   │   │
│ └─────────────────────────────────────────────────────────────────────┘    │
│ ... (更多账号项)                                                             │
│                                                                             │
│ 解绑确认弹窗:                                                                │
│ ┌─────────────────────────────────────────────────────────────────────┐    │
│ │ ⚠️ 确认解绑账号                                                      │    │
│ │                                                                     │    │
│ │ 账号: user@example.com                                              │    │
│ │ 绑定用户: a1b2c3d4...                                               │    │
│ │ 部署状态: 🟢 运行中                                                  │    │
│ │                                                                     │    │
│ │ ⚠️ 解绑后将：                                                        │    │
│ │ • 停止该用户的所有部署                                              │    │
│ │ • 账号回到"可用"状态                                                │    │
│ │ • 保留历史记录用于审计                                              │    │
│ │                                                                     │    │
│ │ [  取消  ]              [  确认解绑  ]                               │    │
│ └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 组件 Props

```typescript
interface AccountListItemProps {
  id: string;
  accountId: string;
  email?: string;
  isBound: boolean;
  boundUserId?: string;
  isActive: boolean;
  lastUsedAt?: string;
  createdAt: string;
  onDelete?: (id: string) => void;
}

interface StatsCardProps {
  title: string;
  value: number;
  color: 'blue' | 'green' | 'red' | 'gray';
}
```

### 4.2 添加账号页 (`/admin/accounts/add`)

#### 四步向导布局

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Header: "← 返回列表" (左侧) + "添加 ChatGPT 账号" (居中)                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ Step Indicator (顶部步骤条):                                                 │
│    [1 安装] ── [2 授权] ── [3 复制] ── [4 导入]                              │
│     ◉───────○───────○───────○                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│ Content Area:                                                                │
│                                                                              │
│ ┌─────────────────────────────────────────────────────────────────────┐    │
│ │ Step 1: 安装 OpenClaw                                               │    │
│ │ ═══════════════════════                                           │    │
│ │                                                                    │    │
│ │ 在本地终端执行以下命令安装 OpenClaw CLI：                             │    │
│ │                                                                    │    │
│ │ ┌───────────────────────────────────────────────────────────────┐ │    │
│ │ │ $ npx openclaw@latest --version                              │ │    │
│ │ │                                                    [📋 复制]  │ │    │
│ │ └───────────────────────────────────────────────────────────────┘ │    │
│ │                                                                    │    │
│ │              [  取消  ]          [  下一步  ]                      │    │
│ └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Step 4 详细布局（粘贴区域）

```
┌─────────────────────────────────────────────────────────────────────┐
│ Step 4: 粘贴并导入                                                   │
│ ═══════════════════════                                            │
│                                                                      │
│ 将复制的 JSON 内容粘贴到下方：                                        │
│                                                                      │
│ ┌───────────────────────────────────────────────────────────────┐  │
│ │ {                                                            │  │
│ │   "version": 1,                                              │  │
│ │   "profiles": { ... }                                        │  │
│ │ }                                                            │  │
│ │                                                              │  │
│ │                                                     [📋][🗑️]  │  │
│ └───────────────────────────────────────────────────────────────┘  │
│                                                                      │
│ 解析结果预览（自动显示）：                                            │
│ ┌───────────────────────────────────────────────────────────────┐  │
│ │  ✅ 已识别账号: user@example.com                               │  │
│ │  📅 Token 过期: 2025-02-07 10:00:00                           │  │
│ │  🔐 已加密，安全存储                                           │  │
│ └───────────────────────────────────────────────────────────────┘  │
│                                                                      │
│ [ 上一步 ]              [ 验证并导入 ]                               │
└─────────────────────────────────────────────────────────────────────┘
```

#### 状态提示

```
成功状态:
┌─────────────────────────────────────────────────────────────────────┐
│  ✅ 账号导入成功                                                     │
│                                                                     │
│  账号 ID: user@example.com                                           │
│  状态: 🟢 可用（未绑定）                                              │
│                                                                     │
│  3秒后自动跳转回列表...                    [ 立即跳转 ]               │
└─────────────────────────────────────────────────────────────────────┘

错误状态:
┌─────────────────────────────────────────────────────────────────────┐
│  ❌ 导入失败                                                         │
│                                                                     │
│  原因: JSON 格式无效，请确保复制了完整的 auth-profiles.json 内容      │
│                                                                     │
│  [ 查看正确示例 ]                    [ 重试 ]                        │
└─────────────────────────────────────────────────────────────────────┘

重复提示:
┌─────────────────────────────────────────────────────────────────────┐
│  ⚠️ 账号已存在                                                       │
│                                                                     │
│  账号 user@example.com 已存在于账号池中                                │
│  导入时间: 2025-01-15 14:32:00                                       │
│                                                                     │
│  如需更新 Token，请先删除旧账号              [ 查看现有账号 ]          │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 5. 业务逻辑设计

### 5.1 导入流程时序图

```
┌──────────┐     ┌─────────────┐     ┌─────────────────┐     ┌──────────┐
│ 管理员   │     │ 前端        │     │ 后端            │     │ 数据库   │
└────┬─────┘     └──────┬──────┘     └────────┬────────┘     └────┬─────┘
     │                  │                     │                   │
     │ 1. 粘贴 JSON     │                     │                   │
     │─────────────────▶│                     │                   │
     │                  │                     │                   │
     │                  │ 2. POST /import     │                   │
     │                  │────────────────────▶│                   │
     │                  │                     │                   │
     │                  │                     │ 3. 解析 JSON      │
     │                  │                     │    提取 profile   │
     │                  │                     │                   │
     │                  │                     │ 4. 检查重复       │
     │                  │                     │──────────────────▶│
     │                  │                     │◀──────────────────│
     │                  │                     │                   │
     │                  │                     │ 5. 验证 Token     │
     │                  │                     │    (可选)         │
     │                  │                     │                   │
     │                  │                     │ 6. 加密存储       │
     │                  │                     │──────────────────▶│
     │                  │                     │◀──────────────────│
     │                  │                     │                   │
     │                  │ 7. 返回成功         │                   │
     │                  │◀────────────────────│                   │
     │                  │                     │                   │
     │ 8. 显示成功消息  │                     │                   │
     │◀─────────────────│                     │                   │
     │                  │                     │                   │
```

### 5.2 解绑流程时序图

```
┌─────────┐    ┌──────────┐    ┌─────────────┐    ┌──────────┐    ┌─────────┐
│ 管理员  │    │ 前端页面 │    │ 后端API     │    │ Docker   │    │ 数据库  │
└────┬────┘    └────┬─────┘    └──────┬──────┘    └────┬─────┘    └────┬────┘
     │              │                 │                │               │
     │ 点击"解绑"   │                 │                │               │
     │─────────────▶│                 │                │               │
     │              │                 │                │               │
     │ 显示确认弹窗 │                 │                │               │
     │◀─────────────│                 │                │               │
     │              │                 │                │               │
     │ 确认解绑     │                 │                │               │
     │─────────────▶│                 │                │               │
     │              │ POST /unbind    │                │               │
     │              │────────────────▶│                │               │
     │              │                 │                │               │
     │              │                 │ 1. 查询账号    │                │
     │              │                 │    和部署信息  │                │
     │              │                 │───────────────────────────────▶│
     │              │                 │◀───────────────────────────────│
     │              │                 │                │               │
     │              │                 │ 2. 停止容器    │                │
     │              │                 │────────────────▶│               │
     │              │                 │◀────────────────│               │
     │              │                 │                │               │
     │              │                 │ 3. 更新部署状态 │                │
     │              │                 │ 4. 解绑账号    │                │
     │              │                 │───────────────────────────────▶│
     │              │                 │◀───────────────────────────────│
     │              │                 │                │               │
     │              │◀────────────────│                │               │
     │              │ 返回成功        │                │               │
     │ 显示成功提示 │                 │                │               │
     │◀─────────────│                 │                │               │
```

### 5.3 JSON 解析逻辑

```typescript
function extractProfile(json: any): ProfileData | null {
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
  
  // 格式 2: Codex CLI credentials.json
  if (json.access_token && json.refresh_token) {
    return {
      accessToken: json.access_token,
      refreshToken: json.refresh_token,
      expiresAt: new Date(Date.now() + json.expires_in * 1000).toISOString(),
      accountId: json.account?.id || 'unknown'
    };
  }
  
  // 格式 3: 直接是 profile 对象
  if (json.accessToken && json.refreshToken) {
    return {
      accessToken: json.accessToken,
      refreshToken: json.refreshToken,
      expiresAt: json.expiresAt,
      accountId: json.accountId || json.sub || 'unknown'
    };
  }
  
  return null;
}
```

---

## 6. 安全设计

### 6.1 权限控制

```typescript
// 管理员权限检查中间件
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const user = req.session.user;
  
  if (!user || !user.isAdmin) {
    return res.status(403).json({ error: '需要管理员权限' });
  }
  
  next();
}

// 路由应用
app.use('/api/admin/accounts', requireAdmin, adminAccountsRouter);
```

### 6.2 数据加密

```typescript
// 使用现有的 encryptSecret 工具
import { encryptSecret } from '../utils/crypto.js';

// 存储时加密
const encryptedAccess = encryptSecret(profile.accessToken);
const encryptedRefresh = encryptSecret(profile.refreshToken);

// 数据库只存储加密后的内容
await query(
  `INSERT INTO account_pool (access_token_encrypted, refresh_token_encrypted, ...)`
);
```

---

## 7. 组件清单

| 组件名 | 路径 | 说明 |
|--------|------|------|
| AccountListPage | `app/admin/accounts/page.tsx` | 账号列表页 |
| AddAccountPage | `app/admin/accounts/add/page.tsx` | 添加账号向导页 |
| AccountListItem | `components/admin/account-list-item.tsx` | 账号列表项 |
| StatsCard | `components/admin/stats-card.tsx` | 统计卡片 |
| StepIndicator | `components/admin/step-indicator.tsx` | 步骤指示器 |
| JsonPasteArea | `components/admin/json-paste-area.tsx` | JSON 粘贴区域 |
| CommandBox | `components/admin/command-box.tsx` | 命令展示框（带复制） |
| StatusBadge | `components/admin/status-badge.tsx` | 状态标签 |
| UnbindButton | `components/admin/unbind-button.tsx` | 解绑按钮（带确认弹窗） |

---

## 8. 样式规范

### 8.1 Tailwind 类名规范

```typescript
// 统计卡片
const statsCardClass = "bg-white rounded-lg border p-6 shadow-sm";

// 账号列表项
const listItemClass = "flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors";

// 命令框
const commandBoxClass = "bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm flex justify-between items-center";

// 步骤指示器
const stepActiveClass = "text-blue-600 font-medium";
const stepInactiveClass = "text-gray-400";
const stepConnectorClass = "flex-1 h-px bg-gray-200 mx-4";
```

### 8.2 响应式断点

| 断点 | 布局调整 |
|------|----------|
| Desktop (>1024px) | 4 个统计卡片横向排列 |
| Tablet (768-1024px) | 2x2 网格排列统计卡片 |
| Mobile (<768px) | 单列排列，命令框可横向滚动 |

---

## 9. 首页风格一致性

管理后台页面需要与 EasyClaw 首页保持一致的视觉风格：

### 9.1 设计规范

| 元素 | 规范 | 说明 |
|------|------|------|
| **配色** | 深色主题 | 参考首页 `#0A0A0F` 背景色 |
| **字体** | Inter / system-ui | 与首页保持一致 |
| **圆角** | `rounded-xl` (12px) | 卡片和按钮统一圆角 |
| **阴影** | `shadow-lg` | 悬浮效果参考首页卡片 |
| **间距** | `gap-6` / `p-6` | 宽松舒适的间距 |

### 9.2 组件复用

优先使用首页已有的组件：
- `Button` - 按钮样式
- `Card` - 卡片容器
- `Dialog` - 弹窗组件
- `Badge` - 状态标签
- 图标库 (Lucide React)

### 9.3 账号列表项样式

```typescript
// 与首页卡片风格一致
const accountItemClass = cn(
  "bg-zinc-900/50 border border-zinc-800 rounded-xl p-4",
  "hover:bg-zinc-800/50 transition-colors",
  "flex items-center justify-between"
);

// 状态标签
const statusBadgeClass = {
  bound: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  available: "bg-green-500/10 text-green-400 border-green-500/20",
  inactive: "bg-red-500/10 text-red-400 border-red-500/20"
};

// 解绑按钮 - 使用首页次要按钮样式
const unbindButtonClass = cn(
  "px-3 py-1.5 text-sm rounded-lg",
  "bg-zinc-800 text-zinc-300 hover:bg-zinc-700",
  "border border-zinc-700 transition-colors"
);
```

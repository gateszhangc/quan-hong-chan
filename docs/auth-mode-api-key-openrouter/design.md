# 设计文档：OpenClaw 认证改造（API Key + 多 Provider 账号池）

## 1. 设计概览

将后端认证链路从 OAuth 改为 API Key 模式：

- 移除 `openai-codex` OAuth 依赖。
- 账号池改为存储 API Key（加密）。
- 账号池新增字段：`provider`, `model`, `thing_level`。
- 部署时从账号池获取 API Key 并注入对应环境变量。
- 支持多 provider：openai, openrouter, anthropic, google。

## 2. 核心决策

### 2.1 账号池存储结构

```typescript
interface Account {
  id: string;
  accountId: string;
  apiKey: string;        // 加密存储
  provider: string;      // openai | openrouter | anthropic | google
  model?: string;        // 可选，如 gpt-4o
  thingLevel?: string;   // 可选，thing 级别
}
```

### 2.2 部署流程

```
用户请求 /api/deploy
      ↓
getOrAssignAccount(userId)
      ↓
读取账号: { apiKey, provider, model }
      ↓
创建容器
  - 注入: {PROVIDER}_API_KEY
  - 配置模型: model || 默认值
      ↓
启动成功
```

## 3. 代码改动点

### 3.1 SQL 表结构 (`sql/init.sql`)

新增/修改 `account_pool` 表：

```sql
create table if not exists account_pool (
  id uuid primary key default gen_random_uuid(),
  account_id text unique not null,
  email text,
  api_key_encrypted text not null,  -- 替换原来的 token 字段
  provider text not null default 'openai',
  model text,
  thing_level text,
  is_bound boolean default false,
  bound_user_id text,
  bound_at timestamptz,
  is_active boolean default true,
  last_used_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

### 3.2 `src/services/account-pool.ts`

#### A. 移除 OAuth 相关代码

- 删除 `refreshAccountToken` 函数（不再需要刷新 token）。
- 删除 `getValidToken/getValidAccount` 函数（API Key 永不过期）。
- 删除 OAuth token 刷新逻辑。

#### B. 修改 Account 接口

```typescript
export interface Account {
  id: string;
  accountId: string;
  apiKey: string;
  provider: string;
  model?: string;
  thingLevel?: string;
}
```

#### C. 修改导入接口

```typescript
export interface ImportAccountInput {
  accountId: string;
  email?: string;
  apiKey: string;
  provider: string;
  model?: string;
  thingLevel?: string;
}

export async function importAccount(input: ImportAccountInput): Promise<...>
```

### 3.3 `src/services/docker.ts`

#### A. 修改容器环境变量注入

```typescript
// 根据 provider 获取环境变量名
function getApiKeyEnvVar(provider: string): string {
  const mapping: Record<string, string> = {
    "openai": "OPENAI_API_KEY",
    "openrouter": "OPENROUTER_API_KEY",
    "anthropic": "ANTHROPIC_API_KEY",
    "google": "GOOGLE_API_KEY",
  };
  return mapping[provider.toLowerCase()] || `${provider.toUpperCase()}_API_KEY`;
}

// 注入环境变量
const env: string[] = [
  `TELEGRAM_BOT_TOKEN=${telegramToken}`,
  `TELEGRAM_TOKEN=${telegramToken}`,
  `OPENCLAW_MODEL=${openclawModel}`,
  // ... 其他变量
];

// 添加 API Key
if (account?.apiKey) {
  const apiKeyEnvVar = getApiKeyEnvVar(account.provider);
  env.push(`${apiKeyEnvVar}=${account.apiKey}`);
}
```

#### B. 移除 OAuth auth-profiles.json 写入

删除 `configureOpenClaw` 中写入 `auth-profiles.json` 的逻辑。

#### C. 修改模型映射

```typescript
const modelMap: Record<string, string> = {
  // OpenAI
  "gpt-5-2": "openai/gpt-5.2",
  "gpt-5.2": "openai/gpt-5.2",
  "gpt-4o": "openai/gpt-4o",
  // OpenRouter
  "openrouter/gpt-4o": "openrouter/openai/gpt-4o",
  // Anthropic
  "claude-opus-4-5": "anthropic/claude-3-opus",
  "claude-3-opus": "anthropic/claude-3-opus",
  // Google
  "gemini-3-flash": "google/gemini-1.5-flash",
};
```

### 3.4 `src/routes/admin-accounts.ts`

#### A. 移除 OAuth auth.json 解析

删除 `extractProfile` 函数及相关 JWT 解析逻辑。

#### B. 新增 API Key 导入接口

```typescript
const importSchema = z.object({
  accountId: z.string().min(1),
  email: z.string().email().optional(),
  apiKey: z.string().min(1),
  provider: z.string().min(1).default('openai'),
  model: z.string().optional(),
  thingLevel: z.string().optional(),
});

// 单条导入
router.post('/import', ...)

// 批量导入
router.post('/import-batch', ...)
```

#### C. 列表接口返回新字段

```typescript
res.json({
  accounts: accounts.map(a => ({
    id: a.id,
    accountId: a.accountId,
    email: a.email,
    provider: a.provider,      // 新增
    model: a.model,            // 新增
    thingLevel: a.thingLevel,  // 新增
    isBound: a.isBound,
    // ...
  })),
  stats: { ... }
});
```

## 4. 运行时流程（改造后）

1. 用户调用 `/api/deploy` 发起部署。
2. 后端调用 `getOrAssignAccount(userId)` 获取绑定账号。
3. 从账号读取：`provider`, `apiKey`, `model`。
4. 校验参数：
   - 账号是否存在
   - apiKey 是否非空
   - model 是否合法
5. 创建容器：
   - 注入 `{PROVIDER}_API_KEY`
   - 配置 OpenClaw 模型
6. 启动 gateway，等待就绪。
7. 返回部署成功。

## 5. 测试设计

### 5.1 手工验证矩阵

| 场景 | provider | 预期结果 |
|------|----------|----------|
| OpenAI API Key | openai | 成功，注入 OPENAI_API_KEY |
| OpenRouter API Key | openrouter | 成功，注入 OPENROUTER_API_KEY |
| Anthropic API Key | anthropic | 成功，注入 ANTHROPIC_API_KEY |
| 账号池无账号 | - | 失败，NO_AVAILABLE_ACCOUNT |
| API Key 为空 | openai | 失败，密钥缺失 |

### 5.2 管理端验证

- 导入单条账号（含 provider/model/thingLevel）。
- 批量导入账号。
- 列表展示新字段。
- 解绑/删除账号。

### 5.3 回归验证

- `/api/deploy` 接口请求结构不变。
- 日志不输出密钥明文。
- 多 provider 切换正常。

## 6. 迁移说明

### 6.1 数据迁移

原有 OAuth 账号数据不再使用，需要：
1. 清空 `account_pool` 表（或保留做历史记录）。
2. 重新导入 API Key 类型账号。

### 6.2 配置迁移

- 删除 `OPENAI_API_KEY` 全局配置（改为从账号池读取）。
- 可选：保留 `OPENCLAW_MODEL` 作为全局默认值。

## 7. 前端改造设计

### 7.1 组件风格要求

所有新增/修改的组件必须与首页 (`SimpleClawLanding`) 风格保持一致：

#### 视觉风格规范

| 元素 | 规范 |
|------|------|
| 圆角 | `rounded-3xl` (大卡片), `rounded-2xl` (小卡片/输入框), `rounded-xl` (按钮) |
| 背景 | `bg-card/85`, `bg-card/90` 配合 `backdrop-blur-sm` |
| 边框 | `border-border/70` |
| 阴影 | `shadow-[0_28px_80px_-58px_rgba(0,0,0,1)]` (大卡片), `shadow-[0_24px_70px_-55px_rgba(0,0,0,1)]` (小卡片) |
| 渐变按钮 | `bg-gradient-to-r from-muted via-muted/90 to-muted` |
| 按钮悬浮 | `hover:-translate-y-0.5 hover:border-primary/40` |

#### 改造页面

1. **`/admin/accounts` (账号列表页)**
   - 保持 DashboardLayout 布局
   - Stats Cards 使用首页风格：圆角、毛玻璃、阴影
   - 账号列表项使用 `rounded-2xl` 卡片样式
   - 新增展示字段：provider badge, model tag, thingLevel tag

2. **`/admin/accounts/add` (新增账号页)**
   - 完全重写，移除 OAuth 4步向导流程
   - 改为简洁的表单页面，风格参考首页
   - 表单字段：
     - Account ID (输入框)
     - Email (可选输入框)
     - API Key (密码输入框)
     - Provider (下拉选择: openai/openrouter/anthropic/google)
     - Model (可选输入框，带预设选项)
     - Thing Level (可选输入框)
   - 支持批量导入（JSON 格式或 CSV）

### 7.2 新增组件

#### ProviderBadge
显示 provider 的彩色标签：
```typescript
const providerColors: Record<string, string> = {
  openai: "bg-green-500/10 text-green-400 border-green-500/20",
  openrouter: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  anthropic: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  google: "bg-red-500/10 text-red-400 border-red-500/20",
};
```

#### ModelTag
显示 model 的小型标签，使用 `rounded-full bg-muted px-2 py-0.5 text-xs`

#### AccountImportForm
新的账号导入表单，风格与首页一致：
- 圆角卡片容器 (`rounded-3xl`, `bg-card/90`, `backdrop-blur-sm`)
- 渐变按钮 (`primaryButtonClassName`)
- 输入框使用 `rounded-2xl border-border/70 bg-background/45`

### 7.3 接口类型更新

```typescript
// Account 接口新增字段
interface Account {
  id: string;
  accountId: string;
  email?: string;
  provider: string;      // 新增
  model?: string;        // 新增
  thingLevel?: string;   // 新增
  isBound: boolean;
  boundUserId?: string;
  isActive: boolean;
  lastUsedAt?: string;
  createdAt: string;
}

// 导入请求体
interface ImportAccountRequest {
  accountId: string;
  email?: string;
  apiKey: string;
  provider: string;
  model?: string;
  thingLevel?: string;
}

// 批量导入请求体
interface ImportBatchRequest {
  accounts: ImportAccountRequest[];
}
```

## 8. 浏览器测试计划

### 8.1 测试环境准备

#### 配置环境变量

后端 `.env`：
```bash
# 关闭登录校验（便于测试）
AUTH_DISABLED=true

# 其他必要配置
PORT=5000
ENCRYPTION_KEY=your-encryption-key
DATABASE_URL=your-database-url
DOCKER_HOST=unix:///Users/a1-6/.colima/default/docker.sock
```

#### 启动服务

```bash
# 1. 确保 Docker 运行（Colima 或 Docker Desktop）
colima status
# 如未运行：colima start

# 2. 初始化数据库
# 执行 sql/init.sql 中的新表结构

# 3. 启动后端服务
cd /Users/a1-6/Desktop/code/easyclaw/backend
npm run dev

# 4. 启动前端服务
cd /Users/a1-6/Desktop/code/easyclaw
npm run dev

# 5. 访问 http://localhost:3000 开始测试
```

### 8.2 测试用例

#### 测试 1: 账号列表页 (`/admin/accounts`)

| 步骤 | 操作 | 预期结果 |
|------|------|----------|
| 1 | 访问 `/admin/accounts` | 页面加载，显示 Stats Cards (Total/Bound/Available/Inactive) |
| 2 | 检查样式 | Stats Cards 使用圆角+毛玻璃+阴影风格，与首页一致 |
| 3 | 检查列表 | 账号列表展示 provider badge, model tag, thingLevel tag |
| 4 | 点击 Delete | 弹出 Dialog 确认框，样式与整体一致 |
| 5 | 点击 Unbind | 解绑按钮工作正常，刷新后状态更新 |

#### 测试 2: 新增账号页 (`/admin/accounts/add`)

| 步骤 | 操作 | 预期结果 |
|------|------|----------|
| 1 | 访问 `/admin/accounts/add` | 页面加载，显示简洁表单（非4步向导） |
| 2 | 检查样式 | 表单容器使用 `rounded-3xl`, `bg-card/90`, `backdrop-blur-sm` |
| 3 | 填写表单 | 所有字段可正常输入 |
| 4 | 选择 Provider | 下拉选择 openai/openrouter/anthropic/google |
| 5 | 提交表单 | 账号导入成功，跳转到列表页 |
| 6 | 验证列表 | 新账号显示正确的 provider 和 model |

#### 测试 3: 批量导入

| 步骤 | 操作 | 预期结果 |
|------|------|----------|
| 1 | 准备 JSON 批量数据 | 格式: `[{accountId, apiKey, provider, model, thingLevel}]` |
| 2 | 上传/粘贴批量数据 | 系统解析并批量导入 |
| 3 | 检查结果 | 成功和失败的账号分别提示 |

#### 测试 4: 部署流程（端到端）- OpenRouter 完整测试

**测试数据：**
```
OpenRouter API Key: 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
Provider: openrouter
Model: openrouter/anthropic/claude-sonnet-4-5
Telegram Bot Token: 8286251697:AAFwOKZACn71n-GoywrW9F4XvcHsYXihlIk
```

| 步骤 | 操作 | 预期结果 |
|------|------|----------|
| 1 | 访问 `/admin/accounts/add` | 表单页面加载 |
| 2 | 填写账号信息并提交 | 账号导入成功 |
| 3 | 访问首页 `/` | 首页加载 |
| 4 | 选择模型：GPT | 模型选择正常 |
| 5 | 选择渠道：Telegram | 渠道选择正常 |
| 6 | 输入 Telegram Bot Token | Token 输入正常 |
| 7 | 点击部署 | 部署开始，状态显示 provisioning |
| 8 | 等待部署完成 | 状态变为 running |
| 9 | 检查账号池 | 该账号状态变为 Bound |
| 10 | 向 Telegram Bot 发送消息 | Bot 正常回复 |
| 11 | 检查容器环境变量 | 注入 `OPENROUTER_API_KEY` |
| 12 | 检查模型配置 | 使用 `openrouter/anthropic/claude-sonnet-4-5` |

### 8.3 浏览器兼容性测试

| 浏览器 | 版本 | 测试重点 |
|--------|------|----------|
| Chrome | 最新 | 全部功能 |
| Safari | 最新 | 毛玻璃效果、阴影 |
| Firefox | 最新 | 表单提交、样式 |

### 8.4 移动端测试

| 设备 | 测试重点 |
|------|----------|
| iPhone Safari | 响应式布局、表单输入 |
| Android Chrome | 响应式布局、按钮点击 |

### 8.5 性能检查

- 账号列表加载 < 1s（100条数据）
- 表单提交响应 < 500ms
- 无内存泄漏（长时间运行）

## 9. 后续扩展点（未来）

- 支持同一用户绑定多账号（轮询/负载均衡）。
- 支持账号优先级/权重配置。
- 支持动态账号路由（根据模型选择账号）。
- 支持账号使用量统计和配额管理。

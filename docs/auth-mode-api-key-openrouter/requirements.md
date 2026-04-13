# 需求文档：OpenClaw 认证改造（API Key + 多 Provider 账号池）

## 1. 背景

当前系统依赖 `openai-codex` OAuth（账号池、token 刷新、auth profile 注入）。  
本次要求是：
1. 彻底移除 OAuth 路径
2. 改为 API Key 认证模式
3. 账号池继续参与部署认证，但存储方式改为 API Key
4. 账号维度增加 provider/model/thing_level 字段

## 2. 目标

- 后端运行时改为 `api-key` 认证链路，支持多 provider（openai/openrouter/anthropic/google）。
- 删除对 OAuth、Codex auth profile 的运行时依赖。
- 账号池继续参与部署流程，从账号池获取 provider + api_key + model。
- 保持现有 `/api/deploy` 调用方式不变（请求结构不改）。

## 3. 非目标

- 本期不做多账号路由策略（一个用户绑定一个账号）。
- 本期不做多语言支持。

## 4. 功能需求

### 4.1 账号池数据模型

账号池表 `account_pool` 字段：

| 字段 | 类型 | 说明 |
|------|------|------|
| id | uuid | 主键 |
| account_id | text | 账号标识（唯一） |
| email | text | 邮箱（可选） |
| api_key_encrypted | text | API Key（加密存储） |
| provider | text | 提供商: openai/openrouter/anthropic/google |
| model | text | 默认模型（如 gpt-4o, claude-3-opus） |
| thing_level | text | Thing 级别/组织标识（可选） |
| is_bound | boolean | 是否已绑定用户 |
| bound_user_id | text | 绑定用户 ID |
| is_active | boolean | 是否有效 |

### 4.2 管理接口

账号导入接口（替换原有 OAuth auth.json 导入）：

```json
POST /api/admin/accounts/import
{
  "accountId": "user-001",
  "email": "user@example.com",
  "apiKey": "sk-...",
  "provider": "openai",
  "model": "gpt-4o",
  "thingLevel": "premium"
}
```

支持批量导入：

```json
POST /api/admin/accounts/import-batch
{
  "accounts": [
    { "accountId": "...", "apiKey": "...", "provider": "openai" },
    { "accountId": "...", "apiKey": "...", "provider": "openrouter" }
  ]
}
```

### 4.3 运行时行为

部署流程：
1. 根据 userId 从账号池获取绑定的账号
2. 读取账号的 `provider` + `api_key` + `model`
3. 创建容器时注入对应的环境变量：
   - `OPENAI_API_KEY` (provider=openai)
   - `OPENROUTER_API_KEY` (provider=openrouter)
   - `ANTHROPIC_API_KEY` (provider=anthropic)
   - `GOOGLE_API_KEY` (provider=google)
4. 配置 OpenClaw 使用对应的 model

### 4.4 模型映射

OpenClaw 模型名称映射（向后兼容）：

| 传入 model | 映射后 |
|-----------|--------|
| gpt-5-2 | openai/gpt-5.2 |
| gpt-5.2 | openai/gpt-5.2 |
| gpt-4o | openai/gpt-4o |
| claude-opus-4-5 | anthropic/claude-3-opus |
| gemini-3-flash | google/gemini-1.5-flash |

### 4.5 前端需求

### 4.5.1 组件风格

所有组件必须与首页 (`SimpleClawLanding`) 风格保持一致：

| 元素 | 规范 |
|------|------|
| 圆角 | 大卡片 `rounded-3xl`，小卡片 `rounded-2xl`，按钮 `rounded-xl` |
| 背景 | `bg-card/85` 或 `bg-card/90`，配合 `backdrop-blur-sm` |
| 边框 | `border-border/70` |
| 阴影 | `shadow-[0_28px_80px_-58px_rgba(0,0,0,1)]` |
| 渐变按钮 | `bg-gradient-to-r from-muted via-muted/90 to-muted` |
| 悬浮效果 | `hover:-translate-y-0.5 hover:border-primary/40` |

### 4.5.2 账号列表页 (`/admin/accounts`)

- 保持 DashboardLayout 布局
- Stats Cards 使用首页风格（圆角、毛玻璃、阴影）
- 新增展示字段：
  - Provider Badge（彩色标签：openai绿/openrouter蓝/anthropic橙/google红）
  - Model Tag（小号标签）
  - Thing Level Tag（如有）

### 4.5.3 新增账号页 (`/admin/accounts/add`)

- 移除 OAuth 4步向导流程
- 改为简洁的表单页面，风格与首页一致
- 表单字段：
  - Account ID（必填）
  - Email（可选）
  - API Key（必填，密码输入框）
  - Provider（下拉选择：openai/openrouter/anthropic/google）
  - Model（可选，带预设选项）
  - Thing Level（可选）
- 支持批量导入（JSON 格式）

### 4.5.4 浏览器测试要求

- Chrome 最新版：全部功能正常
- Safari 最新版：毛玻璃效果、阴影正常
- Firefox 最新版：表单提交、样式正常
- 移动端（iPhone Safari / Android Chrome）：响应式布局正常

## 4.6 校验与报错

- 账号池无可用账号时部署失败，错误："NO_AVAILABLE_ACCOUNT"
- 模型名称非法时部署失败
- 日志不得输出 API Key 明文

## 5. 非功能需求

- 安全：API Key 必须加密存储（AES-256-GCM）。
- 简化：去除 OAuth 分支，代码路径单一可维护。
- 可观测：日志应明确输出当前 provider 与模型（脱敏）。

## 6. 验收标准

### 后端

- [ ] 代码中不再存在 OAuth 主流程（`openai-codex` 认证路径）。
- [ ] 账号池支持导入 API Key 类型账号。
- [ ] 部署时从账号池获取 API Key 并注入容器。
- [ ] 支持多 provider（openai/openrouter/anthropic/google）。
- [ ] 管理端账号池接口可用，展示 provider/model/thing_level。
- [ ] 日志不泄露 API Key。

### 前端

- [ ] 组件风格与首页保持一致（圆角、毛玻璃、阴影）。
- [ ] 账号列表页展示 provider badge 和 model tag。
- [ ] 新增账号页改为简洁表单，移除 OAuth 向导。
- [ ] 表单包含所有必需字段（accountId, apiKey, provider, model, thingLevel）。
- [ ] 支持批量导入功能。
- [ ] 所有页面通过浏览器测试（Chrome/Safari/Firefox）。
- [ ] 移动端响应式布局正常。

### 端到端测试

使用 OpenRouter 测试 Key 完成完整流程：

**测试数据：**
- OpenRouter API Key: `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`
- Provider: `openrouter`
- Model: `openrouter/anthropic/claude-sonnet-4-5`
- Telegram Bot Token: `8286251697:AAFwOKZACn71n-GoywrW9F4XvcHsYXihlIk`

**测试流程：**
1. [ ] 在 `/admin/accounts` 添加 OpenRouter 账号
2. [ ] 在首页选择模型（GPT）和渠道（Telegram）
3. [ ] 点击部署，从账号池使用该账号部署 OpenClaw
4. [ ] 向 Telegram Bot 发送消息，验证正常回复

## 7. 风险与约束

- 现有 OAuth 用户数据需要迁移或重新导入 API Key。
- 需要更新账号导入 UI，支持填写 provider/model/thing_level。

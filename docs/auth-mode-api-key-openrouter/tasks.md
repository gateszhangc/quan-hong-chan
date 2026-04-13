# 任务文档：API Key + 多 Provider 账号池改造

## 里程碑

- M1: 文档评审完成
- M2: 代码改造完成（API Key 账号池 + 多 Provider）
- M3: 测试验证与上线

## 任务清单

### P0 - 数据模型与 SQL

- [ ] 更新 `sql/init.sql`，修改 `account_pool` 表结构
  - [ ] 删除 OAuth token 相关字段（access_token_encrypted, refresh_token_encrypted, expires_at）
  - [ ] 新增字段：api_key_encrypted, provider, model, thing_level
- [ ] 编写数据迁移脚本（如需保留历史数据）

### P1 - 账号池服务 (`src/services/account-pool.ts`)

- [ ] 修改 `Account` 接口
  - [ ] 移除：accessToken, refreshToken, expiresAt
  - [ ] 新增：apiKey, provider, model, thingLevel
- [ ] 移除 OAuth 相关函数
  - [ ] 删除 `refreshAccountToken`
  - [ ] 删除 `getValidToken`
  - [ ] 删除 `getValidAccount`
- [ ] 修改 `getOrAssignAccount`
  - [ ] 返回新 Account 结构
- [ ] 修改 `importAccount`
  - [ ] 改为接收 `ImportAccountInput`（apiKey, provider, model, thingLevel）
- [ ] 修改 `listAccounts`
  - [ ] 返回 provider, model, thingLevel 字段

### P2 - Docker 服务 (`src/services/docker.ts`)

- [ ] 移除 OAuth auth-profiles.json 写入逻辑
- [ ] 添加 `getApiKeyEnvVar` 函数（provider -> 环境变量名映射）
- [ ] 修改 `createOpenClawContainer`
  - [ ] 从账号池获取 provider + apiKey + model
  - [ ] 注入对应环境变量（OPENAI_API_KEY / OPENROUTER_API_KEY 等）
  - [ ] 扩展模型映射表（支持多 provider）
- [ ] 修改 `configureOpenClaw`
  - [ ] 移除 auth-profiles.json 配置
  - [ ] 保留模型和 Telegram 配置

### P3 - 管理接口 (`src/routes/admin-accounts.ts`)

- [ ] 删除 `extractProfile` 函数及相关 JWT 解析代码
- [ ] 删除 auth.json 导入逻辑
- [ ] 新增 `importSchema` 验证（zod）
- [ ] 修改导入接口
  - [ ] POST `/import` - 单条 API Key 导入
  - [ ] POST `/import-batch` - 批量导入
- [ ] 修改列表接口返回字段
  - [ ] 新增 provider, model, thingLevel

### P4 - 类型定义与工具函数

- [ ] 检查并更新所有类型定义
- [ ] 确保 `encryptSecret/decryptSecret` 正常工作（复用现有加密）

### P5 - 配置与部署

- [ ] 更新 `.env` 示例
  - [ ] 移除 `OPENAI_API_KEY` 全局配置
  - [ ] 保留 `ENCRYPTION_KEY`
- [ ] 更新 `docker-compose.yml`（如有变化）

### P6 - 前端改造

#### 账号列表页 (`/admin/accounts`)

- [ ] 更新 Account 类型定义（新增 provider, model, thingLevel）
- [ ] 改造 Stats Cards 组件
  - [ ] 使用 `rounded-xl`, `bg-card`, `border-border/70` 风格
  - [ ] 添加毛玻璃效果 `backdrop-blur-sm`
  - [ ] 添加阴影 `shadow-[0_28px_80px_-58px_rgba(0,0,0,1)]`
- [ ] 新增 ProviderBadge 组件
  - [ ] openai: 绿色主题
  - [ ] openrouter: 蓝色主题
  - [ ] anthropic: 橙色主题
  - [ ] google: 红色主题
- [ ] 新增 ModelTag 组件（小标签样式）
- [ ] 更新账号列表项展示
  - [ ] 显示 provider badge
  - [ ] 显示 model tag
  - [ ] 显示 thingLevel tag（如有）

#### 新增账号页 (`/admin/accounts/add`)

- [ ] 重写页面，移除 OAuth 4步向导
- [ ] 创建简洁表单，风格与首页一致
  - [ ] 容器：`rounded-3xl`, `bg-card/90`, `backdrop-blur-sm`
  - [ ] 阴影：`shadow-[0_28px_80px_-58px_rgba(0,0,0,1)]`
- [ ] 表单字段
  - [ ] Account ID (输入框, rounded-2xl)
  - [ ] Email (可选, rounded-2xl)
  - [ ] API Key (密码输入框, rounded-2xl)
  - [ ] Provider (下拉选择: openai/openrouter/anthropic/google)
  - [ ] Model (可选输入框, 带预设选项)
  - [ ] Thing Level (可选输入框)
- [ ] 渐变按钮风格 `bg-gradient-to-r from-muted via-muted/90 to-muted`
- [ ] 批量导入功能（JSON 格式）

### P7 - 端到端测试（浏览器测试）

#### 测试数据

**OpenRouter 测试 API Key：**
```
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
```

**Telegram 测试 Bot Token：**
```
8286251697:AAFwOKZACn71n-GoywrW9F4XvcHsYXihlIk
```

**测试 Bot 信息：**
- Bot Username: `@testbot`（请根据实际情况替换）
- 可通过 https://t.me/BotFather 创建自己的测试 bot

#### 测试环境配置

关闭登录校验（便于测试）：
```bash
# backend/.env
AUTH_DISABLED=true
```

启动服务：
```bash
# 1. 启动后端
cd backend
npm run dev

# 2. 启动前端
cd ..
npm run dev

# 3. 确保 Docker 可用（Colima 或 Docker Desktop）
colima status  # 或检查 Docker Desktop
```

#### 完整测试流程

##### Step 1: 添加 OpenRouter 账号到账号池

1. 访问 `http://localhost:3000/admin/accounts`
2. 点击 "Add Account" 按钮
3. 填写表单：
   - Account ID: `test-openrouter-001`
   - Email: `test@example.com`（可选）
   - API Key: `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`
   - Provider: `openrouter`
   - Model: `openrouter/anthropic/claude-sonnet-4-5`（或留空使用默认）
   - Thing Level: 留空（可选）
4. 点击提交
5. **验证**：账号列表显示新账号，provider badge 显示为蓝色（openrouter）

##### Step 2: 首页部署流程

1. 访问首页 `http://localhost:3000`
2. 选择模型：GPT（如 gpt-4o）
3. 选择渠道：Telegram
4. 输入 Telegram Bot Token（可使用测试 bot）
5. 点击部署
6. **验证**：
   - 后端从账号池分配 OpenRouter 账号
   - Docker 容器成功创建
   - 环境变量注入 `OPENROUTER_API_KEY`
   - 部署状态变为 "running"

##### Step 3: Telegram Bot 测试

1. 打开 Telegram，找到测试 bot
2. 发送消息：
   - 简单消息："Hello"
   - 复杂消息："What can you do?"
3. **验证**：
   - Bot 正常回复
   - 回复内容符合预期
   - 无错误提示

##### Step 4: 验证账号池绑定

1. 返回 `http://localhost:3000/admin/accounts`
2. **验证**：
   - 该账号状态变为 "Bound"
   - 显示绑定的用户 ID
   - Last Used 时间更新

#### 功能测试检查项

##### 账号管理

- [ ] 账号列表页加载正常，显示 Stats Cards
- [ ] 样式与首页一致（圆角、毛玻璃、阴影）
- [ ] 列表显示 provider badge（openrouter 为蓝色）
- [ ] 列表显示 model tag
- [ ] 新增账号表单提交成功
- [ ] 解绑/删除账号正常

##### 部署流程

- [ ] 首页模型选择正常
- [ ] 首页渠道选择正常
- [ ] 部署按钮触发后端调用
- [ ] 后端正确从账号池获取账号
- [ ] Docker 容器成功创建
- [ ] 环境变量正确注入（OPENROUTER_API_KEY）
- [ ] OpenClaw 容器启动成功
- [ ] Telegram Bot 可正常交互

#### 兼容性测试

| 浏览器 | 测试项 | 结果 |
|--------|--------|------|
| Chrome | 完整流程 | ⬜ |
| Safari | 毛玻璃效果、表单提交 | ⬜ |
| Firefox | 样式、功能 | ⬜ |

#### 问题排查

如果测试失败，检查：

1. **账号池无可用账号**
   - 检查 `account_pool` 表是否有数据
   - 检查账号 `is_active` 是否为 true
   - 检查账号是否已被绑定

2. **部署失败**
   - 检查后端日志：`docker logs <container>`
   - 检查环境变量是否正确注入
   - 检查模型名称是否合法

3. **Bot 无响应**
   - 检查 Telegram Bot Token 是否正确
   - 检查容器日志：`docker logs openclaw-<id>`
   - 检查 OpenClaw gateway 是否正常启动

## 验收标准

- [ ] 代码中无 OAuth 主路径（`openai-codex` 部署链路已删除）。
- [ ] 账号池支持导入 API Key 类型账号（含 provider/model/thingLevel）。
- [ ] 部署时从账号池获取 API Key 并注入对应环境变量。
- [ ] 支持多 provider：openai / openrouter / anthropic / google。
- [ ] 管理端账号池接口可用，展示 provider/model/thing_level。
- [ ] 日志不泄露 API Key。

## 回滚方案

- 保留代码修改前的 git commit。
- 数据库表结构变更可逆（如需回滚，需重新添加 OAuth 字段）。
- 建议先在测试环境验证后再部署生产。

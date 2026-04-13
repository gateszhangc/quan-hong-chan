# EasyClaw 项目长期记忆

## 后端日志系统 (任务41)

### 已完成
- [x] 引入 Pino 结构化日志库
- [x] 创建 logger 工具模块 (`backend/src/utils/logger.ts`)
- [x] 替换所有 `console.log` 为结构化日志
- [x] 添加请求日志中间件
- [x] 部署到生产环境 (47.253.91.60)

### 日志结构
```typescript
// 基础日志
logger.info({ port }, "Backend started");

// 部署上下文日志
const log = deployLogger(deploymentId);
log.info({ userId, model, tier }, "Starting OpenClaw deployment");

// 错误日志
log.error({ error, stack }, "Deployment failed");
```

### 日志字段
- `level`: 日志级别 (info/warn/error/debug)
- `time`: 时间戳
- `deploymentId`: 部署ID (部署相关日志)
- `component`: 组件标识 (deploy/docker)
- `requestId`: 请求追踪ID
- `error`: 错误信息
- `stack`: 错误堆栈

### 查看日志命令
```bash
# 实时查看
ssh root@47.253.91.60 "docker logs -f \$(docker ps -q --filter name=easyclaw-backend)"

# 查看部署相关
ssh root@47.253.91.60 "docker logs ... | grep deploy"
```

### 部署超时配置
```typescript
// backend/src/services/docker.ts
READY_WAIT_MS = 120_000           // 2分钟
OPENCLAW_CLI_TIMEOUT_MS = 120_000 // 2分钟
```

## 数据库表结构

### account_pool 表
```sql
- id: uuid primary key
- account_id: text unique
- api_key_encrypted: text
- provider: text default 'openai'
- model: text
- thing_level: text
- tier: text not null default 'starter'  -- starter/pro
- is_bound: boolean default false
- bound_user_id: text
- is_active: boolean default true
```

### deployments 表
```sql
- id: uuid primary key
- user_id: text not null
- status: text (provisioning/running/failed)
- telegram_token_encrypted: text
- error_message: text
- created_at/updated_at: timestamptz
```

## 部署流程

```
POST /api/deploy
├── createDeployment()         # 创建部署记录 (provisioning)
├── setImmediate(runDeployment) # 异步执行
│   ├── getOrAssignAccount()   # 分配账号
│   ├── ensureImage()          # 检查/拉取镜像
│   ├── createContainer()      # 创建容器
│   ├── configureOpenClaw()    # 配置 OpenClaw
│   └── waitForOpenClawReady() # 等待就绪 (最长2分钟)
└── return deployment_id
```

## 前端轮询

```typescript
// src/components/landing/simpleclaw-landing.tsx
const MAX_POLLING_TIME = 2 * 60 * 1000; // 2分钟超时
const POLLING_INTERVAL = 2000;          // 每2秒轮询
```

## 关键环境变量

```bash
# 后端
PORT=5000
DATABASE_URL=postgresql://...
ENCRYPTION_KEY=...
OPENCLAW_IMAGE=fourplayers/openclaw:2026.2.9
OPENCLAW_READY_WAIT_MS=120000

# 前端
NEXT_PUBLIC_API_URL=http://47.253.91.60:5000
```

## 常用命令

```bash
# 重新部署后端
cd backend && bash scripts/deploy-backend-47.253.91.60.sh

# 初始化数据库
cd backend && npx tsx scripts/init-db.ts

# 构建后端
cd backend && npm run build
```

## 交付规则（新增长期记忆）

- 开发完成后，必须先执行测试再交付结果。
- 至少执行与改动直接相关的构建/测试命令，并记录结果（成功/失败）。
- 需要发布到远程时，发布后必须补做健康检查与最小可用性验证。

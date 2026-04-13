# Backend 部署设计文档

## 1. 部署架构

```
┌─────────────────────────────────────────────────────────┐
│  用户浏览器                                              │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTPS/HTTP
                       ▼
┌─────────────────────────────────────────────────────────┐
│  服务器 47.253.91.60                                     │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Docker Container: easyclaw-backend             │   │
│  │  ┌─────────────────────────────────────────┐   │   │
│  │  │  Node.js App (Port 5000)               │   │   │
│  │  │  - Express API                         │   │   │
│  │  │  - /api/deploy                         │   │   │
│  │  │  - /health                             │   │   │
│  │  └─────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────┘   │
│                         │                               │
│                         │ Docker Socket                 │
│                         ▼                               │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Host Docker Daemon                             │   │
│  │  - 创建 OpenClaw 容器                            │   │
│  │  - 管理部署生命周期                              │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                       │
                       │ PostgreSQL
                       ▼
┌─────────────────────────────────────────────────────────┐
│  Supabase Database                                       │
│  - deployments 表                                        │
│  - account_pool 表                                       │
└─────────────────────────────────────────────────────────┘
```

## 2. 部署流程

```
┌─────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  开始   │───▶│  环境准备   │───▶│  代码上传   │───▶│  构建启动   │
└─────────┘    └─────────────┘    └─────────────┘    └──────┬──────┘
                                                            │
┌─────────┐    ┌─────────────┐    ┌─────────────┐          │
│  完成   │◀───│  验收确认   │◀───│  健康检查   │◀─────────┘
└─────────┘    └─────────────┘    └─────────────┘
```

## 3. 详细步骤设计

### Step 1: 服务器环境准备

```bash
# 安装 Docker（如果未安装）
curl -fsSL https://get.docker.com | sh
systemctl enable docker
systemctl start docker

# 验证
docker --version
docker-compose --version
```

### Step 2: 代码上传

```bash
# 本地打包（排除依赖和构建产物）
tar czf backend.tar.gz \
  --exclude=node_modules \
  --exclude=dist \
  --exclude=.DS_Store \
  .

# SCP 上传到服务器
scp backend.tar.gz root@47.253.91.60:/opt/easyclaw-backend/

# 服务器解压
ssh root@47.253.91.60 "cd /opt/easyclaw-backend && tar xzf backend.tar.gz"
```

### Step 3: 环境配置

创建 `.env` 文件：

```env
PORT=5000
ENCRYPTION_KEY=f16fa862f2b766c9ffe863caf4cd7db7c3c09bedfa6b5ece99704a9e93378975
DATABASE_URL=postgresql://postgres.cwvfcwpbdmolwjwhrzkw:IT4QqJEN1Me1aoAd@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres
DOCKER_HOST=unix:///var/run/docker.sock
AUTH_DISABLED=false
```

### Step 4: 构建与启动

```bash
# 停止旧服务
docker-compose down 2>/dev/null || true

# 构建并启动
docker-compose up -d --build

# 等待启动
sleep 5
```

### Step 5: 健康检查

```bash
# 本地验证
curl http://47.253.91.60:5000/health

# 预期响应
{"status":"ok"}
```

## 4. Dockerfile 说明

```dockerfile
# 多阶段构建
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
EXPOSE 5000
CMD ["node", "dist/index.js"]
```

## 5. Docker Compose 配置

```yaml
services:
  api:
    build: .
    ports:
      - "5000:5000"
    environment:
      PORT: "5000"
    env_file:
      - .env
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    restart: unless-stopped
```

## 6. 运维命令

```bash
# 查看日志
ssh root@47.253.91.60 "cd /opt/easyclaw-backend && docker-compose logs -f"

# 重启服务
ssh root@47.253.91.60 "cd /opt/easyclaw-backend && docker-compose restart"

# 停止服务
ssh root@47.253.91.60 "cd /opt/easyclaw-backend && docker-compose down"

# 更新部署（重新构建）
ssh root@47.253.91.60 "cd /opt/easyclaw-backend && docker-compose up -d --build"
```

## 7. 故障排查

| 问题 | 排查命令 |
|------|---------|
| 服务未启动 | `docker-compose ps` |
| 查看日志 | `docker-compose logs` |
| 端口占用 | `netstat -tlnp \| grep 5000` |
| 容器状态 | `docker ps -a` |

## 8. 前端集成测试

### 8.1 架构图

```
┌─────────────────┐         ┌──────────────────────────────┐
│  本地前端        │         │  服务器 47.253.91.60         │
│  localhost:3000 │ ──────▶ │  Backend API :5000          │
│                 │  HTTP   │  - /api/deploy              │
│                 │         │  - /health                  │
└─────────────────┘         └──────────────────────────────┘
                                     │
                                     │ Docker Socket
                                     ▼
                            ┌─────────────────┐
                            │ OpenClaw 容器    │
                            │ Telegram Bot    │
                            └─────────────────┘
```

### 8.2 前端配置

**文件**: `.env.development`

```env
NEXT_PUBLIC_API_URL=http://47.253.91.60:5000
```

**启动命令**:

```bash
NEXT_PUBLIC_API_URL=http://47.253.91.60:5000 npm run dev
```

### 8.3 测试流程

1. 本地前端访问 `http://localhost:3000`
2. 用户选择模型和渠道
3. 前端调用 `http://47.253.91.60:5000/api/deploy`
4. Backend 创建 OpenClaw 容器
5. Telegram Bot 开始运行
6. 用户测试 Bot 功能

### 8.4 验证命令

```bash
# 1. 验证 Backend 健康
curl http://47.253.91.60:5000/health

# 2. 启动本地前端
NEXT_PUBLIC_API_URL=http://47.253.91.60:5000 npm run dev

# 3. 查看服务器容器
ssh root@47.253.91.60 "docker ps"

# 4. 查看 OpenClaw 日志
ssh root@47.253.91.60 "docker logs <container-id>"
```

## 9. 回滚方案

```bash
# 停止当前服务
docker-compose down

# 恢复到之前版本（如果有备份）
# 或重新部署
```

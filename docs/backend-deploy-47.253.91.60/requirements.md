# Backend 部署需求文档

## 1. 项目背景

将 EasyClaw backend 服务部署到生产服务器 `47.253.91.60`，提供 API 服务支持前端部署功能。

## 2. 服务器信息

| 项目 | 值 |
|------|-----|
| 服务器 IP | 47.253.91.60 |
| 登录用户 | root |
| 部署目录 | /opt/easyclaw-backend |
| 服务端口 | 5000 |

## 3. 环境配置

使用与本地开发环境完全相同的配置：

```env
PORT=5000
ENCRYPTION_KEY=f16fa862f2b766c9ffe863caf4cd7db7c3c09bedfa6b5ece99704a9e93378975
DATABASE_URL=postgresql://postgres.cwvfcwpbdmolwjwhrzkw:IT4QqJEN1Me1aoAd@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres
DOCKER_HOST=unix:///var/run/docker.sock
AUTH_DISABLED=false
```

## 4. 功能需求

### FR-001: Docker 环境
- 服务器必须安装 Docker 和 Docker Compose
- Docker 服务开机自启

### FR-002: 代码部署
- 将本地 backend 代码上传到服务器
- 排除 node_modules 和 dist 目录（服务器端重新构建）

### FR-003: 容器构建
- 使用 Dockerfile 多阶段构建
- 生产环境运行 `node dist/index.js`

### FR-004: 服务启动
- 使用 docker-compose 管理服务
- 容器重启策略: unless-stopped
- 映射 Docker socket 用于创建 OpenClaw 容器

### FR-005: 健康检查
- 部署后验证 /health 端点返回 200
- 响应内容: `{"status":"ok"}`

## 5. 非功能需求

### NFR-001: 可用性
- 服务 7x24 小时运行
- 容器异常退出后自动重启

### NFR-002: 安全性
- 环境变量文件权限设置为 600
- 不暴露敏感信息到日志

### NFR-003: 可维护性
- 提供查看日志的命令
- 支持快速重启和更新

## 6. 验收标准

### Backend 部署
- [ ] 服务器 Docker 环境安装完成
- [ ] 代码成功上传到 /opt/easyclaw-backend
- [ ] 容器成功构建并启动
- [ ] curl http://47.253.91.60:5000/health 返回 {"status":"ok"}
- [ ] docker-compose ps 显示服务状态为 Up

### 前端集成
- [ ] 本地前端配置 `NEXT_PUBLIC_API_URL=http://47.253.91.60:5000`
- [ ] 前端能成功调用远程 Backend API
- [ ] 部署流程能正常完成（选择模型→选择渠道→部署）
- [ ] OpenClaw 容器在服务器上成功创建
- [ ] Telegram Bot 能正常接收和回复消息

## 7. 相关文件

- 本地代码: `/Users/a1-6/Desktop/code/easyclaw/backend/`
- Dockerfile: `/Users/a1-6/Desktop/code/easyclaw/backend/Dockerfile`
- Compose: `/Users/a1-6/Desktop/code/easyclaw/backend/docker-compose.yml`

# Backend 部署任务文档

## 任务清单

### Phase 1: 环境准备

- [ ] **Task 1.1**: 连接服务器
  ```bash
  ssh root@47.253.91.60
  ```
  - **负责人**: DevOps
  - **截止时间**: 2026-02-09

- [ ] **Task 1.2**: 安装 Docker
  ```bash
  curl -fsSL https://get.docker.com | sh
  systemctl enable docker
  systemctl start docker
  ```
  - **负责人**: DevOps
  - **截止时间**: 2026-02-09

- [ ] **Task 1.3**: 验证 Docker 安装
  ```bash
  docker --version
  docker-compose --version
  ```
  - **负责人**: DevOps
  - **截止时间**: 2026-02-09

### Phase 2: 代码部署

- [ ] **Task 2.1**: 创建部署目录
  ```bash
  ssh root@47.253.91.60 "mkdir -p /opt/easyclaw-backend"
  ```
  - **负责人**: DevOps
  - **截止时间**: 2026-02-09

- [ ] **Task 2.2**: 本地打包代码
  ```bash
  cd /Users/a1-6/Desktop/code/easyclaw/backend
  tar czf /tmp/backend.tar.gz \
    --exclude=node_modules \
    --exclude=dist \
    --exclude=.DS_Store \
    .
  ```
  - **负责人**: DevOps
  - **截止时间**: 2026-02-09

- [ ] **Task 2.3**: 上传代码到服务器
  ```bash
  scp /tmp/backend.tar.gz root@47.253.91.60:/opt/easyclaw-backend/
  ```
  - **负责人**: DevOps
  - **截止时间**: 2026-02-09

- [ ] **Task 2.4**: 服务器端解压
  ```bash
  ssh root@47.253.91.60 "cd /opt/easyclaw-backend && tar xzf backend.tar.gz && rm backend.tar.gz"
  ```
  - **负责人**: DevOps
  - **截止时间**: 2026-02-09

### Phase 3: 配置与启动

- [ ] **Task 3.1**: 创建 .env 文件
  ```bash
  ssh root@47.253.91.60 "cat > /opt/easyclaw-backend/.env << 'EOF'
  PORT=5000
  ENCRYPTION_KEY=f16fa862f2b766c9ffe863caf4cd7db7c3c09bedfa6b5ece99704a9e93378975
  DATABASE_URL=postgresql://postgres.cwvfcwpbdmolwjwhrzkw:IT4QqJEN1Me1aoAd@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres
  DOCKER_HOST=unix:///var/run/docker.sock
  AUTH_DISABLED=false
  EOF"
  ```
  - **负责人**: DevOps
  - **截止时间**: 2026-02-09

- [ ] **Task 3.2**: 设置文件权限
  ```bash
  ssh root@47.253.91.60 "chmod 600 /opt/easyclaw-backend/.env"
  ```
  - **负责人**: DevOps
  - **截止时间**: 2026-02-09

- [ ] **Task 3.3**: 停止旧服务（如存在）
  ```bash
  ssh root@47.253.91.60 "cd /opt/easyclaw-backend && docker-compose down 2>/dev/null || true"
  ```
  - **负责人**: DevOps
  - **截止时间**: 2026-02-09

- [ ] **Task 3.4**: 构建并启动服务
  ```bash
  ssh root@47.253.91.60 "cd /opt/easyclaw-backend && docker-compose up -d --build"
  ```
  - **负责人**: DevOps
  - **截止时间**: 2026-02-09

- [ ] **Task 3.5**: 等待服务启动
  ```bash
  sleep 5
  ```
  - **负责人**: DevOps
  - **截止时间**: 2026-02-09

### Phase 4: 验证测试

- [ ] **Task 4.1**: 健康检查
  ```bash
  curl http://47.253.91.60:5000/health
  # 预期: {"status":"ok"}
  ```
  - **负责人**: DevOps
  - **截止时间**: 2026-02-09

- [ ] **Task 4.2**: 检查容器状态
  ```bash
  ssh root@47.253.91.60 "cd /opt/easyclaw-backend && docker-compose ps"
  ```
  - **负责人**: DevOps
  - **截止时间**: 2026-02-09

- [ ] **Task 4.3**: 查看启动日志
  ```bash
  ssh root@47.253.91.60 "cd /opt/easyclaw-backend && docker-compose logs --tail=50"
  ```
  - **负责人**: DevOps
  - **截止时间**: 2026-02-09

### Phase 5: 前端集成配置

- [ ] **Task 5.1**: 配置前端环境变量
  - 修改 `.env.development`
  - 设置 `NEXT_PUBLIC_API_URL=http://47.253.91.60:5000`
  - **负责人**: 前端开发
  - **截止时间**: 2026-02-09

- [ ] **Task 5.2**: 启动本地前端
  ```bash
  cd /Users/a1-6/Desktop/code/easyclaw
  NEXT_PUBLIC_API_URL=http://47.253.91.60:5000 npm run dev
  ```
  - **负责人**: 前端开发
  - **截止时间**: 2026-02-09

- [ ] **Task 5.3**: 验证前端能访问 Backend
  - 打开浏览器访问 `http://localhost:3000`
  - 检查网络面板，确认 API 请求发送到 `47.253.91.60:5000`
  - **负责人**: 前端开发
  - **截止时间**: 2026-02-09

### Phase 6: 端到端测试

- [ ] **Task 6.1**: 测试部署流程
  - 选择 GPT-5.2 模型
  - 选择 Telegram 渠道
  - 输入测试 Bot Token
  - 点击部署按钮
  - **负责人**: QA
  - **截止时间**: 2026-02-09

- [ ] **Task 6.2**: 验证 OpenClaw 容器创建
  ```bash
  ssh root@47.253.91.60 "docker ps | grep openclaw"
  ```
  - **负责人**: DevOps
  - **截止时间**: 2026-02-09

- [ ] **Task 6.3**: 测试 Telegram Bot
  - 向 Bot 发送消息
  - 验证能收到 AI 回复
  - **负责人**: QA
  - **截止时间**: 2026-02-09

### Phase 7: 交付

- [ ] **Task 7.1**: 更新部署文档
  - 记录实际部署时间
  - 记录遇到的问题和解决方案
  - **负责人**: DevOps
  - **截止时间**: 2026-02-09

- [ ] **Task 7.2**: 提交代码
  - 提交前端配置修改
  - **负责人**: 前端开发
  - **截止时间**: 2026-02-09

## 一键部署脚本

```bash
#!/bin/bash
# deploy-backend.sh

SERVER="root@47.253.91.60"
LOCAL_BACKEND="/Users/a1-6/Desktop/code/easyclaw/backend"
REMOTE_DIR="/opt/easyclaw-backend"

echo "=== 开始部署 Backend ==="

# 1. 安装 Docker
echo "[1/6] 检查 Docker 环境..."
ssh $SERVER 'if ! command -v docker &> /dev/null; then curl -fsSL https://get.docker.com | sh && systemctl enable docker && systemctl start docker; fi && docker --version'

# 2. 创建目录
echo "[2/6] 创建部署目录..."
ssh $SERVER "mkdir -p $REMOTE_DIR"

# 3. 打包上传
echo "[3/6] 打包并上传代码..."
cd $LOCAL_BACKEND
tar czf /tmp/backend.tar.gz --exclude=node_modules --exclude=dist --exclude=.DS_Store .
scp /tmp/backend.tar.gz $SERVER:$REMOTE_DIR/

# 4. 解压并配置
echo "[4/6] 解压并配置环境..."
ssh $SERVER "cd $REMOTE_DIR && tar xzf backend.tar.gz && rm backend.tar.gz"

# 5. 创建 .env 文件
ssh $SERVER "cat > $REMOTE_DIR/.env << 'EOF'
PORT=5000
ENCRYPTION_KEY=f16fa862f2b766c9ffe863caf4cd7db7c3c09bedfa6b5ece99704a9e93378975
DATABASE_URL=postgresql://postgres.cwvfcwpbdmolwjwhrzkw:IT4QqJEN1Me1aoAd@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres
DOCKER_HOST=unix:///var/run/docker.sock
AUTH_DISABLED=false
EOF
chmod 600 $REMOTE_DIR/.env"

# 6. 构建启动
echo "[5/6] 构建并启动服务..."
ssh $SERVER "cd $REMOTE_DIR && docker-compose down 2>/dev/null || true && docker-compose up -d --build"

# 7. 验证
echo "[6/6] 验证部署..."
sleep 5
curl -s http://47.253.91.60:5000/health && echo "" || echo "健康检查失败"

echo "=== 部署完成 ==="
```

## 相关链接

- 需求文档: `./requirements.md`
- 设计文档: `./design.md`
- 后端代码: `/Users/a1-6/Desktop/code/easyclaw/backend/`

# 任务17 端到端测试方案

## 测试目标
验证从获取 Codex Token 到成功部署 OpenClaw 的完整流程。

## 测试步骤

### 1. 获取 Codex Token
从本地机器获取 `~/.codex/auth.json` 文件内容

### 2. 导入账号
- 访问 Admin 账号导入页面
- 粘贴 auth.json 内容
- 点击导入
- 验证账号成功导入账号池

### 3. 首页部署流程
- 访问首页
- 选择 GPT-5.2 模型
- 选择 Telegram 通道
- 输入 Telegram Bot Token
- 点击 Deploy 按钮
- 等待部署完成

### 4. 验证部署
- 检查部署状态
- 验证容器运行正常
- 测试 Telegram Bot 可以正常发送消息

## 当前状态

### 已完成的修改
1. ✅ 支持 Codex CLI `~/.codex/auth.json` 格式
2. ✅ 临时禁用登录逻辑（`NEXT_PUBLIC_AUTH_GOOGLE_ENABLED=false`）
3. ✅ Admin 账号导入向导页面

### 待验证
1. 后端 API `/api/admin/accounts/import` 是否正常工作
2. 部署 API `/api/deploy` 是否正常工作
3. Docker 容器是否能正确启动 OpenClaw
4. Telegram Bot 是否能正常连接和发送消息

## 测试命令

```bash
# 1. 获取本地 token
cat ~/.codex/auth.json

# 2. 启动开发服务器
npm run dev

# 3. 访问导入页面
open http://localhost:3000/admin/accounts/add

# 4. 访问首页进行部署
open http://localhost:3000
```

## 注意事项

1. 当前已禁用登录逻辑，方便测试
2. 需要确保后端服务（数据库等）正常运行
3. 需要确保 Docker 服务可用（用于部署 OpenClaw）

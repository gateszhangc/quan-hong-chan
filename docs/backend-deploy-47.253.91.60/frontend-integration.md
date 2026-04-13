# 前端集成测试文档

## 1. 概述

Backend 部署完成后，需要配置本地前端连接远程 Backend 进行端到端测试。

## 2. 环境配置

### 2.1 远程 Backend 地址

```
API Base URL: http://47.253.91.60:5000
```

### 2.2 本地前端配置

#### 方案 A: 修改环境变量文件

**文件**: `/Users/a1-6/Desktop/code/easyclaw/.env.development`

```env
# 本地开发环境使用远程 Backend
NEXT_PUBLIC_API_URL=http://47.253.91.60:5000
```

或者修改现有配置：

```env
# 如果使用自定义 backend URL 变量
BACKEND_URL=http://47.253.91.60:5000
```

#### 方案 B: 运行时配置

在启动命令中指定：

```bash
NEXT_PUBLIC_API_URL=http://47.253.91.60:5000 npm run dev
```

## 3. API 端点验证

### 3.1 健康检查

```bash
# 直接测试 Backend
curl http://47.253.91.60:5000/health

# 预期响应
{"status":"ok"}
```

### 3.2 部署接口测试

```bash
# 测试部署接口（需要登录）
curl -X POST http://47.253.91.60:5000/api/deploy \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{
    "telegram_token": "your-bot-token",
    "model": "gpt-5-2"
  }'
```

## 4. 前端代码修改（如需要）

### 4.1 API 客户端配置

检查前端 API 调用是否使用环境变量：

```typescript
// src/lib/api.ts 或类似文件
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const deploy = async (data: DeployData) => {
  const response = await fetch(`${API_BASE}/api/deploy`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};
```

### 4.2 CORS 配置

确保 Backend 允许前端域名访问：

如果前端运行在 `http://localhost:3000`，Backend 需要配置 CORS：

```typescript
// backend/src/index.ts
import cors from 'cors';

app.use(cors({
  origin: ['http://localhost:3000', 'https://www.easyclaw.pro'],
  credentials: true,
}));
```

## 5. 测试步骤

### Step 1: 启动本地前端

```bash
cd /Users/a1-6/Desktop/code/easyclaw

# 使用远程 Backend
NEXT_PUBLIC_API_URL=http://47.253.91.60:5000 npm run dev
```

### Step 2: 访问前端页面

```
http://localhost:3000
```

### Step 3: 测试部署流程

1. 选择模型（GPT-5.2）
2. 选择渠道（Telegram）
3. 输入 Bot Token
4. 点击部署按钮
5. 观察部署状态

### Step 4: 验证部署结果

```bash
# 在服务器上查看运行的容器
ssh root@47.253.91.60 "docker ps"

# 查看 OpenClaw 容器日志
ssh root@47.253.91.60 "docker logs openclaw-<deployment-id>"
```

## 6. 常见问题

### 问题 1: CORS 错误

**现象**: 前端控制台显示 CORS policy error

**解决**: 确保 Backend 的 CORS 配置包含前端域名

### 问题 2: 连接超时

**现象**: API 请求超时

**解决**: 
- 检查服务器防火墙是否开放 5000 端口
- 检查 Backend 服务是否正常运行

```bash
# 服务器端开放端口
ssh root@47.253.91.60 "ufw allow 5000/tcp && ufw reload"
```

### 问题 3: 认证失败

**现象**: 401 Unauthorized

**解决**: 确保前端正确传递认证信息，Backend 的 AUTH_DISABLED 配置正确

## 7. 回滚到本地 Backend

如需切换回本地 Backend 测试：

```bash
# 修改环境变量
# .env.development
NEXT_PUBLIC_API_URL=http://localhost:5000

# 重启前端
npm run dev
```

## 8. 生产环境配置

生产环境前端应该配置为：

```env
# .env.production
NEXT_PUBLIC_API_URL=https://api.easyclaw.pro
```

或者使用相对路径（同域名部署）：

```env
NEXT_PUBLIC_API_URL=/api
```

## 9. 测试检查清单

- [ ] 本地前端能正常访问
- [ ] 前端能成功调用远程 Backend 健康检查接口
- [ ] 用户登录功能正常
- [ ] 部署接口调用成功
- [ ] OpenClaw 容器在服务器上成功创建
- [ ] Telegram Bot 能正常接收和回复消息

## 10. 相关命令汇总

```bash
# 测试 Backend 是否可访问
curl http://47.253.91.60:5000/health

# 启动本地前端（连接远程 Backend）
NEXT_PUBLIC_API_URL=http://47.253.91.60:5000 npm run dev

# 查看服务器容器状态
ssh root@47.253.91.60 "docker ps"

# 查看 Backend 日志
ssh root@47.253.91.60 "cd /opt/easyclaw-backend && docker-compose logs -f"
```

# OpenClaw MVP 模型/Provider 对齐任务文档

## 1. 实施任务

### T1 账号池 provider 过滤

- 文件：`backend/src/services/account-pool.ts`
- 任务：
  - [x] 修改 `getOrAssignAccount` 签名：新增 `requiredProvider?: string`
  - [x] 在“查已绑定账号”SQL增加 provider 条件
  - [x] 在“分配新账号”SQL增加 provider 条件
  - [x] 统一 provider 比较为小写
- 验收：
  - [ ] 传 `requiredProvider=openrouter` 时，只返回 openrouter 账号

### T2 模型别名映射调整

- 文件：`backend/src/services/docker.ts`
- 任务：
  - [x] 将 `claude-opus-4-6` 映射到 `openrouter/anthropic/claude-opus-4.6`
  - [x] 将 `gemini-3-pro` 映射到 `openrouter/google/gemini-3-pro-preview`
  - [x] 保留现有兼容映射，不破坏历史输入
- 验收：
  - [ ] 输入上述两个模型 ID 时，最终模型均为 `openrouter/...`

### T3 模型/provider 一致性硬校验

- 文件：`backend/src/services/docker.ts`
- 任务：
  - [x] 在 `openclawModel` 解析后增加一致性校验逻辑
  - [x] provider 不匹配时抛 `MODEL_PROVIDER_MISMATCH`
  - [x] 错误日志包含 `provider`、`model`、`userId/deploymentId`
- 验收：
  - [ ] 构造不匹配场景时，部署直接失败且报错清晰

### T4 readiness 改为 channels status 探测

- 文件：`backend/src/services/docker.ts`
- 任务：
  - [x] 在 `waitForOpenClawReady` 循环中执行 `openclaw channels status --json`
  - [x] 解析 Telegram 状态并替代日志关键字判定
  - [x] 仅当 `running=true` 且 `lastError=null` 持续稳定窗口后返回 ready
- 验收：
  - [ ] Telegram 未启动时，不会误判 ready
  - [ ] Telegram 正常时，可在超时前通过 ready

### T5 默认镜像升级

- 文件：`backend/src/services/docker.ts`
- 任务：
  - [x] 默认镜像改为 `fourplayers/openclaw:2026.2.9`
  - [x] 保留 `OPENCLAW_IMAGE` 覆盖
- 验收：
  - [ ] 未设置环境变量时拉取 `2026.2.9`

## 2. 测试任务

### T6 单元/集成验证（最小）

- [ ] Case A：模型 `claude-opus-4-6` + openrouter 账号池，部署成功
- [ ] Case B：模型 `gemini-3-pro` + openrouter 账号池，部署成功
- [ ] Case C：模型 `claude-opus-4-6` + 非 openrouter 账号，触发 `MODEL_PROVIDER_MISMATCH`
- [ ] Case D：Telegram 通道失败时，不进入 `running`

## 3. 发布任务

### T7 发布与回滚

- [x] 后端构建并发布新版本
- [ ] 灰度验证 1~2 个真实部署
- [ ] 观察日志中 provider/model/telegram status
- [ ] 如异常，回滚至上一 backend 镜像

## 4. 完成定义（DoD）

- [ ] 代码合入并通过基础测试
- [ ] `requirements.md` / `design.md` / `tasks.md` 三文档齐全
- [ ] 线上验证：Claude Opus 4.6 与 Gemini 3 Pro 均可部署并在 Telegram 回复

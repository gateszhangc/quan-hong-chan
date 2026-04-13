# OpenClaw MVP 模型/Provider 对齐需求文档

## 1. 背景

当前部署链路里，用户在首页选择模型（例如 Claude Opus 4.6、Gemini 3 Pro）后，后端分配账号时只按 tier 选取，不按模型所需 provider 选取。  
这会导致容器里注入的模型与 API Key provider 不一致，进而出现“容器已启动但机器人不回复”的问题。

## 2. 目标

- 当用户选择 `Claude Opus 4.6` 或 `Gemini 3 Pro` 时，部署出来的 bot 可以稳定回复。
- 部署失败时要快速、明确地失败，不允许“假成功”。

## 3. 范围

### 3.1 本次 MVP 包含

- FR-001：账号池分配按模型所需 provider 精确匹配。
- FR-002：模型别名映射明确落到 OpenRouter 路由（Claude Opus 4.6 / Gemini 3 Pro）。
- FR-003：增加模型与 provider 一致性硬校验。
- FR-004：部署就绪判断从“日志关键字”改为“渠道状态探测”。
- FR-005：默认 OpenClaw 镜像版本升级到稳定版本（2026.2.9）。

### 3.2 本次 MVP 不包含

- N/A-001：Telegram token 前置格式校验与 `getMe` 校验。
- N/A-002：模型 fallback 自动降级策略。
- N/A-003：前端 Telegram token 输入格式校验。
- N/A-004：Telegram 群消息策略调整（`groupPolicy`）。

## 4. 功能需求

### FR-001 账号池按 provider 分配

- `getOrAssignAccount` 需支持 `requiredProvider` 过滤条件。
- 当模型要求 `openrouter` 时，必须返回 `provider=openrouter` 的账号。
- 若无可用账号，直接返回明确错误，不得继续创建容器。

### FR-002 模型别名映射到 OpenRouter

- `claude-opus-4-6` 解析为 `openrouter/anthropic/claude-opus-4.6`。
- `gemini-3-pro` 解析为 `openrouter/google/gemini-3-pro-preview`。
- 保留现有兼容别名，但上述两个入口必须稳定映射到 OpenRouter。

### FR-003 模型/provider 一致性校验

- 解析出最终模型后，执行一致性校验：
  - 若模型前缀为 `openrouter/`，账号 provider 必须为 `openrouter`。
  - 若不一致，返回 `MODEL_PROVIDER_MISMATCH`（或等价明确错误）。
- 失败即中止部署，禁止进入“running”态。

### FR-004 就绪探测改造

- `waitForOpenClawReady` 必须调用 `openclaw channels status --json` 做健康判定。
- Telegram 通过条件：
  - `telegram.running === true`
  - `telegram.lastError === null`
- 连续满足稳定窗口后才允许部署状态切换为 `running`。

### FR-005 默认镜像版本升级

- 默认镜像从 `fourplayers/openclaw:2026.2.2-3` 升级为 `fourplayers/openclaw:2026.2.9`。
- 仍保留 `OPENCLAW_IMAGE` 环境变量覆盖能力。

## 5. 验收标准

- AC-001：选择 `claude-opus-4-6` 时，分配账号 provider 必须是 `openrouter`。
- AC-002：选择 `gemini-3-pro` 时，分配账号 provider 必须是 `openrouter`。
- AC-003：构造 provider 与模型不一致场景时，部署应明确失败，不应进入 `running`。
- AC-004：Telegram 未真正启动时，部署状态保持 `provisioning/failed`，不能误判 `running`。
- AC-005：不配置 `OPENCLAW_IMAGE` 时，实际拉取镜像标签为 `2026.2.9`。

## 6. 影响文件

- `backend/src/services/account-pool.ts`
- `backend/src/services/docker.ts`


# OpenClaw MVP 模型/Provider 对齐设计文档

## 1. 设计目标

在不引入额外复杂度的前提下，解决以下 MVP 问题：

- 选 `Claude Opus 4.6 / Gemini 3 Pro` 时，部署账号 provider 可能不匹配。
- 机器人状态可能“看起来启动”但 Telegram 并未真正可用。
- 旧默认镜像导致模型/插件兼容风险。

## 2. 设计范围

- 修改 `backend/src/services/account-pool.ts`
- 修改 `backend/src/services/docker.ts`
- 不改前端页面交互、不加 fallback、不改群策略

## 3. 关键设计

### 3.1 账号池分配增加 provider 过滤

#### 现状

- `getOrAssignAccount(userId, tier)` 只按 tier 选账号。

#### 方案

- 签名改为：
  - `getOrAssignAccount(userId, tier, requiredProvider?)`
- SQL 在“查已绑定账号”和“分配新账号”两处都增加 provider 条件（当 `requiredProvider` 存在时）。

#### 结果

- 当模型需要 `openrouter` 时，只会拿到 `provider=openrouter` 的账号。

### 3.2 模型别名映射统一到 OpenRouter

#### 现状

- `claude-opus-4-6`、`gemini-3-pro` 可能被解析到直连 provider。

#### 方案

- 在 `modelAliasMap` 中固定：
  - `claude-opus-4-6` -> `openrouter/anthropic/claude-opus-4.6`
  - `gemini-3-pro` -> `openrouter/google/gemini-3-pro-preview`

#### 结果

- 用户侧模型选择语义与账号池 OpenRouter 账号一致。

### 3.3 模型/provider 一致性硬校验

#### 方案

- 在得到 `openclawModel` 和 `provider` 后执行校验：
  - 若 `openclawModel` 以 `openrouter/` 开头且 `provider !== "openrouter"`，抛出 `MODEL_PROVIDER_MISMATCH`。
- 直接失败，不继续创建容器。

#### 结果

- 避免“部署中后期才暴露错误”。

### 3.4 就绪检测从日志匹配改为状态探测

#### 现状

- `waitForOpenClawReady` 主要通过日志关键字判断 `telegramReady`。

#### 方案

- 在等待循环里执行容器命令：
  - `openclaw channels status --json`
- 解析 JSON 并判定：
  - `channels.telegram.running === true`
  - `channels.telegram.lastError === null`
- 保留稳定窗口机制（连续满足若干毫秒才 Ready）。

#### 结果

- 降低误判“ready”概率，保证 Telegram 可回消息再置 `running`。

### 3.5 默认镜像版本升级

#### 方案

- 将默认值从 `fourplayers/openclaw:2026.2.2-3` 升至 `fourplayers/openclaw:2026.2.9`。
- 保留 `OPENCLAW_IMAGE` 覆盖行为。

#### 结果

- 默认部署路径更稳定，兼容当前模型配置。

## 4. 调用链变化

1. 接收用户选模型 `model`。
2. 先推导 `requiredProvider`（基于模型别名归一化后结果）。
3. `getOrAssignAccount(..., requiredProvider)` 分配账号。
4. 解析最终 `openclawModel`。
5. 执行模型/provider 一致性校验。
6. 启动容器并配置模型。
7. 用 `channels status` 判定 ready。

## 5. 失败语义

- 无匹配 provider 账号：`NO_AVAILABLE_*_ACCOUNT`（复用现有错误语义）。
- 模型/provider 不一致：`MODEL_PROVIDER_MISMATCH`。
- Telegram 未就绪：保持 `provisioning` 直到超时，最终 `failed` 并给出明确错误。

## 6. 兼容性与风险

- 兼容性：不影响现有 OpenAI/Anthropic/Google 直连模型路径。
- 风险：
  - 旧数据中 provider 值不规范（大小写/空值）会影响过滤。
  - `channels status` 返回格式变化可能影响解析。
- 缓解：
  - provider 统一小写比较。
  - JSON 解析失败时回退明确错误并保留日志。


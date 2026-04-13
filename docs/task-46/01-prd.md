# 任务46：模型选择与实际部署模型对齐

## 1. 需求背景

当前 EasyClaw 首页显示三个模型供用户选择：
- Claude Opus 4.6
- GPT-5.2
- Gemini 3 Pro

但用户选择后，实际部署到 OpenClaw 的模型与显示名称不匹配：
- 用户选择 "Claude Opus 4.6" → 实际使用 `claude-opus-4-5`
- 用户选择 "Gemini 3 Pro" → 实际使用 `gemini-3-flash`

## 2. 需求目标

确保用户选择的模型名称与实际部署到 OpenClaw 的模型完全一致。

## 3. 功能需求

### 3.1 模型映射对齐

| 前端显示名称 | 前端 ID | OpenClaw 模型 |
|-------------|---------|---------------|
| Claude Opus 4.6 | `claude-opus-4-6` | `anthropic/claude-opus-4-6` |
| GPT-5.2 | `gpt-5-2` | `openai/gpt-5.2` |
| Gemini 3 Pro | `gemini-3-pro` | `google/gemini-3-pro` |

### 3.2 OpenRouter 支持

当用户使用 OpenRouter provider 时，模型应正确转换为 OpenRouter 格式：
- `anthropic/claude-opus-4-6` → `openrouter/anthropic/claude-opus-4-6`
- `google/gemini-3-pro` → `openrouter/google/gemini-3-pro`

## 4. 非功能需求

- 向后兼容：保留旧的模型 ID 映射，确保现有部署不受影响
- 性能：模型解析过程应保持高效，不增加部署延迟

## 5. 验收标准

- [ ] 用户选择 "Claude Opus 4.6" 后，OpenClaw 实际使用 `claude-opus-4-6` 模型
- [ ] 用户选择 "Gemini 3 Pro" 后，OpenClaw 实际使用 `gemini-3-pro` 模型
- [ ] GPT-5.2 保持不变
- [ ] OpenRouter 场景下模型格式正确

# 任务46：模型选择对齐设计文档

## 1. 架构概述

```
┌─────────────────┐     选择模型      ┌─────────────────┐
│   前端 (Next.js) │ ───────────────▶ │   后端 (Node.js) │
│                 │   model id       │                 │
│  MODELS 配置    │                  │  modelAliasMap  │
└─────────────────┘                  └────────┬────────┘
                                              │
                                              │ 解析模型
                                              ▼
                                       ┌─────────────────┐
                                       │   OpenClaw      │
                                       │   Container     │
                                       └─────────────────┘
```

## 2. 模型解析流程

### 2.1 标准流程

```
用户选择 "Claude Opus 4.6"
    ↓
前端发送: { model: "claude-opus-4-6" }
    ↓
后端 modelAliasMap 解析:
    "claude-opus-4-6" → "anthropic/claude-opus-4-6"
    ↓
OpenClaw 配置: agents.defaults.model.primary = "anthropic/claude-opus-4-6"
```

### 2.2 OpenRouter 流程

```
用户选择 "Claude Opus 4.6"
    ↓
后端 modelAliasMap:
    "claude-opus-4-6" → "anthropic/claude-opus-4-6"
    ↓
convertModelForProvider(provider="openrouter"):
    "anthropic/claude-opus-4-6" → "openrouter/anthropic/claude-opus-4-6"
    ↓
OpenClaw 配置: agents.defaults.model.primary = "openrouter/anthropic/claude-opus-4-6"
```

## 3. 关键代码变更

### 3.1 前端 MODELS 配置

**文件**: `src/components/landing/simpleclaw-landing.tsx`

```typescript
const MODELS = [
  {
    id: "claude-opus-4-6",        // 更新: 从 4-5 改为 4-6
    name: "Claude Opus 4.6",
    subtitle: "Available",
    icon: "...",
    available: true,
  },
  {
    id: "gpt-5-2",
    name: "GPT-5.2",
    subtitle: "Available",
    icon: "...",
    available: true,
  },
  {
    id: "gemini-3-pro",           // 更新: 从 3-flash 改为 3-pro
    name: "Gemini 3 Pro",
    subtitle: "Available",
    icon: "...",
    available: true,
  },
];
```

### 3.2 后端模型映射

**文件**: `backend/src/services/docker.ts`

```typescript
const modelAliasMap: Record<string, string> = {
  // Anthropic
  "claude-opus-4-6": "anthropic/claude-opus-4-6",     // 新增
  "claude-opus-4-5": "anthropic/claude-opus-4-5",     // 保留兼容
  
  // Google
  "gemini-3-pro": "google/gemini-3-pro",              // 新增
  "gemini-3-flash": "google/gemini-3-flash-preview",  // 保留兼容
  
  // OpenRouter
  "openrouter/anthropic/claude-opus-4-6": "openrouter/anthropic/claude-opus-4-6",  // 新增
  "openrouter/google/gemini-3-pro": "openrouter/google/gemini-3-pro",              // 新增
};
```

## 4. 模型 ID 映射表

| 前端选择 | 前端 ID | 标准 Provider | OpenRouter Provider |
|---------|---------|---------------|---------------------|
| Claude Opus 4.6 | `claude-opus-4-6` | `anthropic/claude-opus-4-6` | `openrouter/anthropic/claude-opus-4-6` |
| GPT-5.2 | `gpt-5-2` | `openai/gpt-5.2` | `openrouter/openai/gpt-5.2` |
| Gemini 3 Pro | `gemini-3-pro` | `google/gemini-3-pro` | `openrouter/google/gemini-3-pro` |

## 5. 兼容性考虑

### 5.1 向后兼容

保留旧的模型 ID 映射，确保：
- 已保存的部署配置继续工作
- 通过 API 直接调用旧 model ID 仍然有效

### 5.2 降级策略

如果新模型不可用，OpenClaw 应使用其默认模型配置。

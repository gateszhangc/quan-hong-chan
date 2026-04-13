# 任务46：实施任务清单

## 任务列表

### 1. 前端修改 ✅

**文件**: `src/components/landing/simpleclaw-landing.tsx`

- [x] 修改 MODELS 数组
  - `claude-opus-4-5` → `claude-opus-4-6`
  - `gemini-3-flash` → `gemini-3-pro`

### 2. 后端修改 ✅

**文件**: `backend/src/services/docker.ts`

- [x] 更新 modelAliasMap
  - 添加 `"claude-opus-4-6": "anthropic/claude-opus-4-6"`
  - 添加 `"gemini-3-pro": "google/gemini-3-pro"`
  - 添加 OpenRouter 格式映射
  - 保留旧 ID 兼容

### 3. 构建验证

- [ ] 前端构建通过
- [ ] 后端构建通过
- [ ] 类型检查通过

### 4. 测试验证

- [ ] 部署 Claude Opus 4.6，验证 OpenClaw 使用正确模型
- [ ] 部署 Gemini 3 Pro，验证 OpenClaw 使用正确模型
- [ ] 验证 GPT-5.2 不受影响
- [ ] 验证 OpenRouter 场景模型格式正确

### 5. 文档

- [x] 创建需求文档 (PRD)
- [x] 创建设计文档
- [x] 创建任务文档

## 实施步骤

```bash
# 1. 修改前端
vim src/components/landing/simpleclaw-landing.tsx

# 2. 修改后端
vim backend/src/services/docker.ts

# 3. 构建验证
npm run build
cd backend && npm run build

# 4. 提交代码
git add -A
git commit -m "feat: align model selection with actual OpenClaw models

- Update frontend MODELS: claude-opus-4-5 -> claude-opus-4-6, gemini-3-flash -> gemini-3-pro
- Update backend modelAliasMap with new model mappings
- Add OpenRouter format support for new models
- Maintain backward compatibility"
```

## 变更摘要

| 文件 | 变更类型 | 变更内容 |
|------|---------|---------|
| `src/components/landing/simpleclaw-landing.tsx` | 修改 | 更新 MODELS id |
| `backend/src/services/docker.ts` | 修改 | 更新 modelAliasMap |
| `docs/task-46/01-prd.md` | 新增 | 需求文档 |
| `docs/task-46/02-design.md` | 新增 | 设计文档 |
| `docs/task-46/03-tasks.md` | 新增 | 任务文档 |

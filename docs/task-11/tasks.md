# Task 11: Connect Telegram Dialog - 任务拆分

## 任务列表

### Task 11.1: 修改 Telegram 选择交互
**文件**: `src/components/landing/simpleclaw-landing.tsx`

**工作内容**:
- [ ] 在 CHANNELS 点击处理中，判断是否为 telegram
- [ ] 如果是 telegram，打开 Connect Telegram Dialog
- [ ] 保持原有的选中状态更新逻辑

**代码位置**: 约第 268 行附近

---

### Task 11.2: 创建 ConnectTelegramDialog 组件
**文件**: `src/components/landing/simpleclaw-landing.tsx` (内部组件)

**工作内容**:
- [ ] 新增 `isTelegramDialogOpen` state
- [ ] 新增 `dialogToken` state
- [ ] 创建 Dialog 组件结构
- [ ] 实现左侧 5 步指南内容
- [ ] 实现 Token 输入框
- [ ] 实现 Save & Connect 按钮
- [ ] 添加右侧手机截图占位区

**样式要求**:
- 使用 `max-w-5xl` 宽度
- 使用 `rounded-3xl` 圆角
- 使用 `bg-[#0a0a0a]/95` 背景

---

### Task 11.3: 实现 Token 保存逻辑
**文件**: `src/components/landing/simpleclaw-landing.tsx`

**工作内容**:
- [ ] 创建 `handleSaveToken` handler
- [ ] 验证 Token 非空
- [ ] 将 dialogToken 同步到主表单的 token state
- [ ] 关闭弹框
- [ ] 可选: 显示成功提示

---

### Task 11.4: 添加响应式支持
**文件**: `src/components/landing/simpleclaw-landing.tsx`

**工作内容**:
- [ ] 桌面端: 左右分栏 `grid-cols-2`
- [ ] 移动端: 单列布局，隐藏右侧图片
- [ ] 确保弹框在不同屏幕尺寸下正常显示

---

### Task 11.5: 样式细节优化
**文件**: `src/components/landing/simpleclaw-landing.tsx`

**工作内容**:
- [ ] 添加 Telegram 图标到 DialogTitle
- [ ] @BotFather 添加链接样式
- [ ] `/newbot` 使用等宽字体高亮
- [ ] 步骤编号样式优化
- [ ] 输入框和按钮样式与现有表单一致

---

### Task 11.6: 测试验证
**测试内容**:
- [ ] 点击 Telegram 卡片弹框正常打开
- [ ] 弹框内各元素显示正确
- [ ] Token 输入和保存功能正常
- [ ] Token 正确同步到主表单
- [ ] 响应式布局正常
- [ ] 关闭弹框功能正常

---

## 文件变更汇总

| 文件 | 变更类型 | 说明 |
|-----|---------|------|
| `src/components/landing/simpleclaw-landing.tsx` | 修改 | 新增 Dialog 组件和相关逻辑 |

---

## 预估工作量
- Task 11.1: 0.5h
- Task 11.2: 1.5h
- Task 11.3: 0.5h
- Task 11.4: 0.5h
- Task 11.5: 0.5h
- Task 11.6: 0.5h

**总计**: 约 4 小时

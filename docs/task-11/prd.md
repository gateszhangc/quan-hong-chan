# Task 11: Connect Telegram Dialog - 产品需求文档 (PRD)

## 1. 需求概述

### 1.1 背景
在 SimpleClaw 落地页中，用户需要选择消息发送渠道（Telegram/Discord/WhatsApp）。当用户选择 Telegram 时，需要引导用户完成 Bot Token 的获取和配置。

### 1.2 目标
- 当用户点击选择 Telegram 时，弹出引导弹框
- 提供清晰的步骤指导用户获取 Telegram Bot Token
- 在弹框内完成 Token 的输入和保存
- 保持与现有页面风格一致

### 1.3 参考
- 设计参考: ![Connect Telegram Dialog](../../../tasks/image-9.png)
- 页面风格: https://shipany.ai/ (深色主题、圆角卡片)

---

## 2. 功能需求

### 2.1 触发条件
- 用户在 "Which channel do you want to use for sending messages?" 区域
- 点击 Telegram 卡片时触发弹框

### 2.2 弹框内容

#### 左侧区域 - 操作指南
1. **标题**: Connect Telegram (带 Telegram 图标)
2. **步骤说明**: How to get your bot token?
   - Step 1: Open Telegram and go to @BotFather
   - Step 2: Start a chat and type `/newbot`
   - Step 3: Follow the prompts to name your bot and choose a username
   - Step 4: BotFather will send you a message with your bot token
   - Step 5: Paste the token in the field below and click Save & Connect
3. **输入框**: Enter bot token
4. **按钮**: Save & Connect

#### 右侧区域 - 图示说明
- 展示 Telegram 手机界面截图（BotFather 对话界面）
- 展示 `/newbot` 命令的使用过程

### 2.3 交互行为
- @BotFather 文本应为可点击链接
- `/newbot` 使用等宽字体高亮显示
- 输入框支持粘贴长文本 Token
- 点击 Save & Connect 后:
  - 验证 Token 非空
  - 关闭弹框
  - 将 Token 同步到主表单
  - 主表单显示已连接状态

---

## 3. 非功能需求

### 3.1 样式要求
- 使用现有设计系统组件 (Dialog, Input, Button)
- 圆角: `rounded-3xl`
- 背景: `bg-card/95` + 半透明边框
- 阴影: `shadow-sm`
- 深色主题配色

### 3.2 响应式
- 桌面端: 左右分栏布局 (grid-cols-2)
- 移动端: 垂直堆叠布局 (单列)

### 3.3 性能
- 弹框使用懒加载
- 图片使用 lazy loading

---

## 4. 验收标准

- [ ] 点击 Telegram 卡片正确弹出 Dialog
- [ ] 弹框内包含完整的 5 步指南
- [ ] @BotFather 链接可点击
- [ ] Token 输入框正常工作
- [ ] Save & Connect 按钮正常工作
- [ ] Token 正确同步到主表单
- [ ] 样式与现有页面保持一致
- [ ] 响应式布局正常

# Task 10.6 - Product Requirements Document

## 需求概述

在导航栏右侧添加 Sign In 按钮，并修改 SimpleClawLanding 页面中的 Sign In 按钮逻辑，使其根据用户登录状态显示不同的文本和功能。

## 需求详情

### 1. 导航栏 Sign In 按钮

**位置**: Header 组件右侧（Desktop 和 Mobile 视图）

**功能**:
- 用户未登录时显示 "Sign In" 按钮
- 用户已登录时显示用户信息（使用现有的 User 组件）
- 点击 "Sign In" 按钮打开登录弹框

### 2. SimpleClawLanding 页面按钮修改

**当前状态**:
- 页面显示 "Sign In" 按钮用于登录
- Deploy 按钮在用户登录后才显示

**目标状态**:
- **未登录状态**: 显示 "Sign in to deploy" 按钮，点击后弹出登录框
- **已登录状态**: 显示 "Deploy" 按钮，点击后进行部署

## 用户流程

### 未登录用户流程
1. 用户访问首页
2. 在导航栏右侧看到 "Sign In" 按钮
3. 在 SimpleClawLanding 页面看到 "Sign in to deploy" 按钮
4. 点击任意 Sign In 按钮 → 弹出登录框 → 登录成功
5. 页面更新：
   - 导航栏显示用户信息
   - SimpleClawLanding 显示 "Deploy" 按钮

### 已登录用户流程
1. 用户访问首页
2. 导航栏显示用户信息
3. SimpleClawLanding 显示 "Deploy" 按钮
4. 点击 Deploy 按钮直接进行部署

## 开发工具

### Skill: frontend-design
- **用途**: 开发 Sign In 和 Deploy 按钮组件
- **重点关注**:
  - 按钮的视觉层次和交互反馈
  - 悬停/点击状态的过渡动画
  - 登录状态变化时的样式切换
  - 保持与现有设计系统的一致性

## 技术约束

- 使用现有的登录系统（next-auth + Google OAuth）
- 复用现有的 SignModal 弹框组件
- 保持现有的 AppContext 状态管理
- 保持响应式设计（Desktop 和 Mobile）

## 测试要求

### 浏览器测试
开发完成后必须执行以下浏览器测试：

1. **功能测试**
   - 导航栏 Sign In 按钮点击弹出登录框
   - SimpleClawLanding "Sign in to deploy" 按钮点击弹出登录框
   - 登录后按钮变为 "Deploy" 并可触发部署

2. **样式测试**
   - "Sign in to deploy" 按钮使用蓝色主按钮样式
   - "Deploy" 按钮使用灰色渐变样式
   - 按钮悬停效果正常

3. **响应式测试**
   - Desktop 视图 (>1024px)
   - Tablet 视图 (768px-1024px)
   - Mobile 视图 (<768px)

## 依赖项

- `src/components/blocks/header/index.tsx` - Header 组件
- `src/components/landing/simpleclaw-landing.tsx` - Landing 页面
- `src/components/sign/toggle.tsx` - SignToggle 组件
- `src/contexts/app.tsx` - AppContext 状态管理
- `src/components/sign/modal.tsx` - SignModal 登录弹框

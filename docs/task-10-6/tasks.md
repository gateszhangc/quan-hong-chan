# Task 10.6 - Tasks Breakdown

## 前置要求

### Skill 使用
- **frontend-design**: 使用此 skill 开发按钮组件，确保设计质量
  - 路径: `~/.claude/skills/skills-hub/frontend-design`
  - 重点关注：按钮样式、过渡动画、视觉层次

### 浏览器测试准备
- 启动开发服务器: `npm run dev`
- 测试地址: `http://localhost:3000`
- 准备 Google 账号用于登录测试

---

## 任务清单

### Task 1: Header 组件修改
**文件**: `src/components/blocks/header/index.tsx`

**子任务**:
1. [ ] 在 Desktop 视图（第 308-365 行区域）添加 SignToggle 组件
   - 导入 SignToggle 组件（如果未导入）
   - 在 `header.show_sign` 条件渲染之前添加 `<SignToggle />`
   
2. [ ] 在 Mobile 视图（第 520-548 行区域）添加 SignToggle 组件
   - 在 SheetContent 底部的按钮区域添加 `<SignToggle />`

**验收标准**:
- Desktop 视图导航栏右侧显示 Sign In 按钮或用户信息
- Mobile 视图汉堡菜单底部显示 Sign In 按钮或用户信息
- 点击 Sign In 按钮正确弹出登录框

---

### Task 2: SimpleClawLanding 组件重构
**文件**: `src/components/landing/simpleclaw-landing.tsx`

**子任务**:
1. [ ] 从 AppContext 解构 setShowSignModal
   ```typescript
   const { user, setShowSignModal } = useAppContext();
   ```

2. [ ] 创建 handleMainAction 函数
   ```typescript
   const handleMainAction = () => {
     if (!isSignedIn) {
       setShowSignModal(true);
     } else {
       handleDeploy();
     }
   };
   ```

3. [ ] 修改按钮渲染逻辑（第 344-411 行区域）
   - 移除单独的 SignToggle 展示区域
   - 合并 Sign In 和 Deploy 按钮为一个动态按钮
   - 按钮文本根据 isSignedIn 状态变化：
     - 未登录: "Sign in to deploy"
     - 已登录: "Deploy"
   - 按钮样式根据状态变化
   - 已登录时显示部署状态消息
   - 未登录时显示提示文本

4. [ ] 调整 canDeploy 逻辑
   - 未登录时不检查 canDeploy
   - 已登录时保持现有逻辑

**验收标准**:
- 未登录时显示 "Sign in to deploy" 按钮（蓝色主按钮样式）
- 点击 "Sign in to deploy" 弹出登录框
- 已登录时显示 "Deploy" 按钮（灰色渐变样式）
- 点击 "Deploy" 正确触发部署流程
- 部署状态消息正确显示

---

### Task 3: 测试验证

**子任务**:
1. [ ] 未登录状态测试
   - 清除浏览器登录状态
   - 验证导航栏显示 "Sign In" 按钮
   - 验证 SimpleClawLanding 显示 "Sign in to deploy" 按钮
   - 点击按钮弹出登录框

2. [ ] 登录流程测试
   - 点击 Sign In 按钮
   - 完成 Google OAuth 登录
   - 验证导航栏显示用户信息
   - 验证 SimpleClawLanding 显示 "Deploy" 按钮

3. [ ] 部署功能测试
   - 选择 Model 和 Channel
   - 输入 Token
   - 点击 Deploy 按钮
   - 验证部署流程正常执行

4. [ ] 响应式测试
   - Desktop 视图 (>1024px)
   - Mobile 视图 (<1024px)
   - 验证两个视图下功能正常

---

### Task 4: 浏览器测试（开发完成后执行）

**前置条件**:
- [ ] 开发服务器已启动 (`npm run dev`)
- [ ] 代码已保存并编译通过

**测试步骤**:

1. [ ] **导航栏 Sign In 按钮测试**
   ```bash
   # 打开浏览器访问
   open http://localhost:3000
   ```
   - [ ] Desktop 视图：右上角显示 "Sign In" 按钮
   - [ ] 点击按钮弹出登录框
   - [ ] Mobile 视图 (<1024px)：汉堡菜单展开后底部显示 "Sign In"

2. [ ] **SimpleClawLanding 按钮测试**
   - [ ] 页面显示 "Sign in to deploy" 按钮（蓝色主按钮样式）
   - [ ] 点击按钮弹出登录框
   - [ ] 按钮悬停效果正常

3. [ ] **登录流程测试**
   - [ ] 完成 Google OAuth 登录
   - [ ] 登录成功后导航栏显示用户信息
   - [ ] SimpleClawLanding 按钮变为 "Deploy"（灰色渐变样式）

4. [ ] **部署功能测试**
   - [ ] 选择 Model（如 Claude Opus 4.5）
   - [ ] 选择 Channel（如 Telegram）
   - [ ] 输入 Token
   - [ ] 点击 Deploy 按钮触发部署
   - [ ] 验证部署状态显示正常

5. [ ] **响应式测试**
   - [ ] 使用 Chrome DevTools 切换设备视图
   - [ ] 测试 iPhone 14 Pro Max (430px)
   - [ ] 测试 iPad Pro (1024px)
   - [ ] 测试 Desktop (1440px)

**验收标准**:
- 所有按钮样式符合设计要求
- 登录/部署流程无报错
- 响应式布局在各设备上正常显示

---

## 依赖关系

```
Task 1 (Header 修改)
    ↓
Task 2 (Landing 修改)
    ↓
Task 3 (测试验证)
```

## 风险点

1. **AppContext 依赖**: 确保 setShowSignModal 在 AppContext 中正确暴露
2. **样式冲突**: 新旧按钮样式可能冲突，需要仔细检查
3. **状态同步**: 登录状态变化后 UI 需要正确更新

## 回滚方案

如果需要回滚，恢复以下文件的修改：
- `src/components/blocks/header/index.tsx`
- `src/components/landing/simpleclaw-landing.tsx`

# Task 10.6 - Design Document

## Skill 使用指南

### frontend-design Skill

在开发按钮组件时，使用 `frontend-design` skill 确保高质量的前端设计：

**设计原则**:
- **按钮层次**: "Sign in to deploy" 作为主导航按钮，使用更突出的样式
- **过渡动画**: 添加微妙的悬停效果和状态切换动画
- **视觉反馈**: 登录状态变化时提供清晰的视觉指示

**样式参考**:
```
Sign in to deploy (未登录):
- 背景: bg-primary (品牌主色)
- 文字: text-primary-foreground
- Hover: hover:bg-primary/90 + scale(1.02)
- 过渡: transition-all duration-200

Deploy (已登录):
- 背景: 渐变 from-muted via-muted/90 to-muted
- 文字: text-foreground
- Hover: 亮度提升 + shadow-lg
- 过渡: transition-all duration-300
```

---

## 组件设计

### 1. Header 组件修改

**文件**: `src/components/blocks/header/index.tsx`

#### Desktop 视图修改
位置: 第 308-365 行之间

在现有的按钮区域（`header.buttons` 循环之后，`header.show_sign` 之前）添加 SignToggle 组件：

```
<div className="shrink-0 flex gap-2 items-center">
  {typeof credits === "number" && <CreditBadge ... />}
  {header.show_locale && <LocaleToggle />}
  {header.buttons?.map((item, i) => <Button ... />)}
  
  <!-- 新增：导航栏 Sign In 按钮 -->
  <SignToggle />
</div>
```

#### Mobile 视图修改
位置: 第 520-548 行之间

在 SheetContent 的底部区域添加 SignToggle：

```
<div className="mt-4 border-t pt-4">
  <div className="mt-2 flex flex-col gap-3">
    {header.buttons?.map((item, i) => <Button ... />)}
    <SignToggle />  <!-- 新增 -->
  </div>
</div>
```

### 2. SimpleClawLanding 组件修改

**文件**: `src/components/landing/simpleclaw-landing.tsx`

#### 新增状态和方法

```typescript
// 从 AppContext 获取 setShowSignModal
const { user, setShowSignModal } = useAppContext();

// 处理按钮点击
const handleMainAction = () => {
  if (!isSignedIn) {
    // 未登录：打开登录弹框
    setShowSignModal(true);
  } else {
    // 已登录：触发部署
    handleDeploy();
  }
};
```

#### 按钮区域修改

**当前代码位置**: 第 344-411 行

**修改方案**:

1. **移除**单独的 SignToggle 组件展示（第 347-359 行）
2. **替换** Deploy 按钮区域为动态按钮：

```tsx
<div className="border-t border-border/60 pt-8">
  <div className="flex flex-col gap-6">
    <!-- 主操作按钮 -->
    <Button
      onClick={handleMainAction}
      disabled={isSignedIn && !canDeploy}  <!-- 登录后才检查部署条件 -->
      className={cn(
        "w-full md:w-auto min-w-[200px] h-12 px-8 rounded-xl font-semibold text-sm",
        "transition-all duration-300",
        isSignedIn 
          ? "bg-gradient-to-r from-muted via-muted/90 to-muted ..."  <!-- Deploy 样式 -->
          : "bg-primary text-primary-foreground hover:bg-primary/90"  <!-- Sign in 样式 -->
      )}
    >
      {status === "checking" ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Deploying...</span>
        </>
      ) : isSignedIn ? (
        <>
          <Zap className="h-4 w-4 fill-current" />
          <span>Deploy</span>
        </>
      ) : (
        <>
          <Zap className="h-4 w-4 fill-current" />
          <span>Sign in to deploy</span>
        </>
      )}
    </Button>

    <!-- 状态消息 -->
    {isSignedIn && status === "running" && (
      <p className="text-sm text-green-500 font-medium">
        ✓ Deployment successful!
      </p>
    )}
    {isSignedIn && status === "failed" && error && (
      <p className="text-sm text-red-500">✗ {error}</p>
    )}

    <!-- 提示文本（仅在已登录时显示） -->
    {isSignedIn && (
      <p className="text-sm text-muted-foreground">
        <span className="text-foreground font-medium">
          Connect telegram to continue.
        </span>
        {" "}You can also other channels to same account in the future.
      </p>
    )}
    
    <!-- 未登录提示 -->
    {!isSignedIn && (
      <p className="text-sm text-muted-foreground">
        Sign in to deploy your AI assistant and connect your channels.
      </p>
    )}
  </div>
</div>
```

## 样式规范

### Sign in to deploy 按钮样式
- 背景: `bg-primary`
- 文字: `text-primary-foreground`
- Hover: `hover:bg-primary/90`
- 圆角: `rounded-xl`
- 高度: `h-12`
- 内边距: `px-8`

### Deploy 按钮样式（保持现有）
- 背景: `bg-gradient-to-r from-muted via-muted/90 to-muted`
- 文字: `text-foreground`
- 边框: `border border-border/50`
- 阴影: `shadow-[0_2px_8px_-2px_rgba(0,0,0,0.2)]`

## 交互流程

```
用户点击 "Sign in to deploy"
    ↓
调用 handleMainAction()
    ↓
检查 isSignedIn
    ↓
    ├── 未登录 → setShowSignModal(true) → 显示登录弹框
    │              ↓
    │           登录成功 → 页面刷新 → 显示 "Deploy" 按钮
    │
    └── 已登录 → handleDeploy() → 开始部署流程
```

## 浏览器测试清单

开发完成后，启动开发服务器并执行以下测试：

```bash
# 启动开发服务器
npm run dev

# 打开浏览器测试
open http://localhost:3000
```

### 测试项目

| 测试项 | 操作 | 预期结果 |
|--------|------|----------|
| 导航栏 Sign In | 点击按钮 | 弹出登录弹框 |
| Landing Sign In | 点击 "Sign in to deploy" | 弹出登录弹框 |
| 登录后导航栏 | 完成 OAuth | 显示用户头像 |
| 登录后 Landing | 页面刷新 | 显示 "Deploy" 按钮 |
| Deploy 功能 | 点击 Deploy | 触发部署流程 |
| 悬停效果 | 鼠标悬停按钮 | 样式变化 + 过渡动画 |

### 响应式测试

| 设备 | 宽度 | 检查项 |
|------|------|--------|
| iPhone 14 | 390px | 汉堡菜单、全宽按钮 |
| iPad | 768px | 侧边栏布局 |
| Desktop | 1440px | 导航栏按钮位置 |

---

## 响应式适配

### Desktop (>1024px)
- 导航栏 Sign In 按钮显示在右上角
- SimpleClawLanding 按钮左对齐

### Mobile (<1024px)
- 导航栏 Sign In 按钮在 Sheet 菜单底部
- SimpleClawLanding 按钮全宽显示

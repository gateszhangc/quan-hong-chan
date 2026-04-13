# Task 11: Connect Telegram Dialog - 设计文档

## 0. 设计工具

### frontend-design Skill
本组件设计将使用 **frontend-design** skill 来创建具有独特视觉风格的前端界面。

**使用场景**: 
- 构建 Connect Telegram Dialog 弹框组件
- 设计具有 shipany.ai 风格的深色主题界面
- 实现精致的动画和交互效果

**设计原则**:
- **Typography**: 选择独特且有特色的字体，避免使用 Inter、Arial 等通用字体
- **Color & Theme**: 采用深色主题，使用 CSS 变量保持一致性，主色调配合锐利强调色
- **Motion**: 使用动画增强微交互效果，如弹框入场动画、hover 状态变化
- **Spatial Composition**: 采用左右分栏布局，营造层次感和空间感
- **Backgrounds & Visual Details**: 使用渐变、半透明效果创造氛围和深度

**注意事项**:
- 避免通用的 AI 生成美学（如紫色渐变白色背景）
- 避免可预测的布局和组件模式
- 追求具有上下文特色的独特设计

## 1. 组件架构

```
simpleclaw-landing.tsx
├── state: isTelegramDialogOpen
├── handlers: handleTelegramSelect, handleSaveToken
└── ConnectTelegramDialog (新增组件)
    ├── Dialog (from @/components/ui/dialog)
    ├── DialogContent
    │   ├── DialogHeader
    │   │   └── DialogTitle (Connect Telegram + 图标)
    │   ├── left column (指南内容)
    │   │   ├── Step list (5 steps)
    │   │   ├── Token input
    │   │   └── Save button
    │   └── right column (图示)
    │       └── Phone screenshot
```

## 2. UI 设计

### 2.1 弹框尺寸
- 最大宽度: `max-w-5xl` (约 1024px)
- 内边距: `p-8`
- 圆角: `rounded-3xl`

### 2.2 布局结构
```
┌─────────────────────────────────────────────────────────────┐
│  ✈️ Connect Telegram                                    [×]  │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────┬─────────────────────────┐  │
│  │  How to get your bot token? │                         │  │
│  │                             │    [Phone Screenshot]   │  │
│  │  1. Open Telegram...        │                         │  │
│  │  2. Type /newbot            │                         │  │
│  │  ...                        │                         │  │
│  │                             │                         │  │
│  │  Enter bot token            │                         │  │
│  │  ┌─────────────────────┐    │                         │  │
│  │  │                     │    │                         │  │
│  │  └─────────────────────┘    │                         │  │
│  │  ┌─────────────────────┐    │                         │  │
│  │  │   Save & Connect    │    │                         │  │
│  │  └─────────────────────┘    │                         │  │
│  └─────────────────────────────┴─────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### 2.3 样式规范

#### 颜色
- 背景: `bg-[#0a0a0a]/95` (深色半透明)
- 边框: `border-border/70`
- 文字主色: `text-foreground`
- 文字次色: `text-muted-foreground`
- 链接色: `text-primary` + hover underline

#### 字体
- 标题: `text-xl font-semibold`
- 步骤标题: `text-base font-semibold`
- 步骤内容: `text-sm text-muted-foreground`
- 代码/命令: `font-mono bg-muted px-1.5 py-0.5 rounded`

#### 间距
- 弹框内边距: `p-8`
- 步骤间距: `space-y-4`
- 输入框间距: `mt-6`

## 3. 交互设计

### 3.1 状态流转
```
[初始状态]
    ↓ 点击 Telegram 卡片
[弹框打开]
    ↓ 输入 Token
[可保存状态]
    ↓ 点击 Save & Connect
[验证 Token]
    ↓ Token 有效
[弹框关闭, Token 同步到主表单]
```

### 3.2 错误处理
- Token 为空时: 输入框边框变红，显示提示 "Please enter a bot token"

## 4. 技术实现

### 4.1 依赖组件
```typescript
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
```

### 4.2 新增 State
```typescript
const [isTelegramDialogOpen, setIsTelegramDialogOpen] = useState(false);
const [dialogToken, setDialogToken] = useState("");
```

### 4.3 关键 Handler
```typescript
const handleTelegramSelect = () => {
  setSelectedChannel("telegram");
  setIsTelegramDialogOpen(true);
};

const handleSaveToken = () => {
  if (!dialogToken.trim()) return;
  setToken(dialogToken);
  setIsTelegramDialogOpen(false);
};
```

## 5. 响应式断点

| 断点 | 布局 | 说明 |
|-----|------|------|
| < 768px (mobile) | 单列 | 右侧图片隐藏或下移 |
| ≥ 768px (desktop) | 双列 | 左右分栏，比例 1:1 |

## 6. 测试验证

**修改完成后，使用浏览器测试以下内容：**

### 6.1 功能测试
- [ ] 点击 Telegram 卡片，弹框正常打开
- [ ] 弹框内包含完整的 5 步指南
- [ ] @BotFather 链接可点击跳转
- [ ] `/newbot` 命令显示为等宽字体
- [ ] Token 输入框可正常输入和粘贴
- [ ] 输入 Token 后点击 Save & Connect，Token 同步到主表单
- [ ] 关闭弹框功能正常（点击 X 或点击遮罩层）

### 6.2 样式测试
- [ ] 弹框样式与 shipany.ai 风格一致（深色主题、圆角）
- [ ] 弹框标题显示 Telegram 图标
- [ ] 左侧步骤列表样式正确
- [ ] 右侧手机截图正常显示
- [ ] 输入框和按钮样式与现有设计系统一致

### 6.3 响应式测试
- [ ] 桌面端（≥768px）：左右分栏布局正常
- [ ] 移动端（<768px）：单列布局正常，图片处理合理

### 6.4 测试环境
```bash
# 启动开发服务器
npm run dev

# 访问页面
open http://localhost:3000
```

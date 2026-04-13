# Task 12: Deploy OpenClaw 按钮 - 设计文档

## 0. 设计工具

### frontend-design Skill
本组件设计将使用 **frontend-design** skill 来创建具有独特视觉风格的前端界面。

**使用场景**: 
- 构建 Deploy OpenClaw 按钮组件
- 设计与登录区域协调的深色主题按钮
- 实现精致的按钮交互和状态动画

**设计原则**:
- **Typography**: 清晰可读的字体，按钮文字加粗，选择有特色的字体避免通用字体
- **Color & Theme**: 深色按钮与页面主题协调，使用 CSS 变量保持一致性
- **Motion**: 按钮点击反馈、loading 动画、hover 状态过渡
- **Spatial Composition**: 与登录信息紧密排列，合理的间距和对齐
- **Backgrounds & Visual Details**: 微妙的阴影和边框效果，避免通用 AI 美学

**注意事项**:
- 避免通用的 AI 生成美学（如过度使用的渐变）
- 按钮设计要有明确的视觉层次
- 加载状态和禁用状态要有清晰的视觉反馈

---

## 1. 组件位置

```
登录信息卡片
├── 用户头像 + 用户名
└── 邮箱
    
部署按钮区域 (新增)
├── Deploy OpenClaw 按钮
├── 提示文字: Connect telegram to continue...
```

---

## 2. UI 设计

### 2.1 按钮样式

```
┌─────────────────────────────┐
│   ⚡  Deploy OpenClaw        │
└─────────────────────────────┘
```

- **背景**: `bg-muted` 或 `bg-secondary`
- **文字**: `text-foreground`，font-semibold
- **图标**: 闪电图标 (Zap from lucide-react)
- **圆角**: `rounded-xl` 或 `rounded-2xl`
- **高度**: `h-12` 或 `h-14`
- **宽度**: 全宽或自适应
- **边框**: 可选 `border border-border/50`

### 2.2 状态样式

| 状态             | 样式                          |
| ---------------- | ----------------------------- |
| 默认             | bg-muted hover:bg-muted/80    |
| 禁用(条件不满足) | opacity-50 cursor-not-allowed |
| 加载中           | loading spinner + disabled    |
| 成功             | 可切换为绿色或保持原样        |

### 2.3 提示文字样式

**主提示**:
- 颜色: `text-muted-foreground`
- 大小: `text-sm`
- "Connect telegram to continue." 部分可高亮

---

## 3. 交互设计

### 3.1 状态流转

```
[初始状态]
    ↓ 用户点击 Deploy OpenClaw
[验证前置条件]
    ↓ 条件满足
[调用 API /api/deploy]
    ↓ 请求成功
[轮询部署状态]
    ↓ 部署完成
[显示成功状态]
```

### 3.2 前置条件检查

部署前检查以下项：
1. ✅ 用户已登录
2. ✅ 已选择 Model (selectedModel !== "")
3. ✅ 已选择 Channel (selectedChannel !== "")
4. ✅ 已输入 Token (token !== "")

**不满足时提示**:
- 未选择 Model: "Please select a model to continue"
- 未选择 Channel: "Please select a channel to continue"
- 未输入 Token: "Please enter your bot token"

---

## 4. 技术实现

### 4.1 依赖
```typescript
import { Zap, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
```

### 4.2 状态管理
```typescript
// 复用已有的状态
const { user } = useAppContext();
const [selectedModel, setSelectedModel] = useState("");
const [selectedChannel, setSelectedChannel] = useState("");
const [token, setToken] = useState("");
const [status, setStatus] = useState<DeployStatus>("idle");
```

### 4.3 按钮组件
```typescript
<Button
  onClick={handleDeploy}
  disabled={!canDeploy || status === "checking"}
  className="w-full h-12 rounded-xl bg-muted hover:bg-muted/80 text-foreground font-semibold"
>
  {status === "checking" ? (
    <>
      <Loader2 className="h-4 w-4 animate-spin mr-2" />
      Deploying...
    </>
  ) : (
    <>
      <Zap className="h-4 w-4 mr-2" />
      Deploy OpenClaw
    </>
  )}
</Button>
```

---

## 5. 响应式设计

| 断点    | 按钮宽度       | 说明               |
| ------- | -------------- | ------------------ |
| < 768px | w-full         | 移动端全宽         |
| ≥ 768px | w-full 或 auto | 桌面端根据布局调整 |

---

## 6. 测试验证

**修改完成后，使用浏览器测试以下内容：**

### 6.1 功能测试
- [ ] 按钮显示在登录信息下方
- [ ] 按钮样式与设计图一致
- [ ] 未满足条件时按钮禁用或有提示
- [ ] 点击按钮调用 /api/deploy 接口
- [ ] 部署中显示 loading 状态
- [ ] 部署成功/失败有相应反馈

### 6.2 样式测试
- [ ] 闪电图标显示正确
- [ ] 按钮颜色与主题协调
- [ ] 提示文字样式正确
- [ ] 服务器剩余数量显示

### 6.3 测试环境
```bash
npm run dev
open http://localhost:3000
```

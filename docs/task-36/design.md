# 任务36 - 设计文档

## 整体架构

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│  ┌─────────────────────┐  ┌─────────────────────────────┐  │
│  │  Landing Page       │  │  Pricing Page               │  │
│  │  - Deploy Button    │  │  - Plan Cards               │  │
│  │  - Spots Indicator  │  │  - Spots Indicator          │  │
│  │  - Waitlist Form    │  │  - Waitlist Form            │  │
│  └─────────────────────┘  └─────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                         API Layer                            │
│  ┌──────────────────┐  ┌────────────────────────────────┐  │
│  │ GET /api/subscription/limit-status                   │  │
│  │ - Query active subscribers count                     │  │
│  │ - Return remaining spots                             │  │
│  └──────────────────┘  └────────────────────────────────┘  │
│  ┌──────────────────┐  ┌────────────────────────────────┐  │
│  │ POST /api/waitlist                                   │  │
│  │ - Validate email                                     │  │
│  │ - Save to waitlist table                             │  │
│  └──────────────────┘  └────────────────────────────────┘  │
│  ┌──────────────────┐  ┌────────────────────────────────┐  │
│  │ POST /api/checkout                                   │  │
│  │ - Check limit before creating order                  │  │
│  │ - Return error if full                               │  │
│  └──────────────────┘  └────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Database Layer                          │
│  ┌──────────────────┐  ┌────────────────────────────────┐  │
│  │ orders table     │  │ waitlist table (new)           │  │
│  │ - user_uuid      │  │ - id                           │  │
│  │ - status         │  │ - email                        │  │
│  │ - interval       │  │ - created_at                   │  │
│  │ - expired_at     │  │ - notified_at                  │  │
│  └──────────────────┘  │ - status                       │  │
│                        └────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 组件设计

### 1. 首页 Deploy 区域设计

#### 有名额时
```
┌──────────────────────────────────────────────┐
│                                              │
│   [Deploy OpenClaw Button]                   │
│                                              │
│   🔥 Only 2 spots left                       │
│                                              │
└──────────────────────────────────────────────┘
```

#### 满员时
```
┌──────────────────────────────────────────────┐
│                                              │
│   [Deploy OpenClaw Button - Disabled]        │
│                                              │
│   We're at capacity!                         │
│   Add your email to get early access         │
│   when spots become available.               │
│                                              │
│   ┌─────────────────────┐ ┌──────────┐      │
│   │ Enter your email    │ │ Notify Me│      │
│   └─────────────────────┘ └──────────┘      │
│                                              │
└──────────────────────────────────────────────┘
```

### 2. Pricing 页面设计

#### 有名额时
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                      Pricing 定价                            │
│                                                             │
│   Choose a plan based on how many OpenClaw deployments...   │
│                                                             │
│        ┌─────────────────────────────────────┐              │
│        │    🔥 Only 2 spots left             │              │
│        └─────────────────────────────────────┘              │
│                                                             │
│   ┌──────────────┐ ┌──────────────┐ ┌──────────────┐       │
│   │   Monthly    │ │   Annually   │ │  Save 50%    │       │
│   └──────────────┘ └──────────────┘ └──────────────┘       │
│                                                             │
│   ┌─────────────────────┐  ┌─────────────────────┐         │
│   │    Pro 专业版       │  │  Premium 优质的      │         │
│   │    $10 /mo          │  │    $20 /mo          │         │
│   │                     │  │                     │         │
│   │   [Subscribe Now]   │  │   [Subscribe Now]   │         │
│   └─────────────────────┘  └─────────────────────┘         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### 满员时
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                      Pricing 定价                            │
│                                                             │
│   Choose a plan based on how many OpenClaw deployments...   │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                                                     │   │
│   │   We're at capacity!                                │   │
│   │   Add your email to get early access                │   │
│   │   when spots become available.                      │   │
│   │                                                     │   │
│   │   ┌────────────────────────┐  ┌───────────────┐    │   │
│   │   │  Enter your email      │  │   Notify Me   │    │   │
│   │   └────────────────────────┘  └───────────────┘    │   │
│   │                                                     │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│   ┌──────────────┐ ┌──────────────┐ ┌──────────────┐       │
│   │   Monthly    │ │   Annually   │ │  Save 50%    │       │
│   └──────────────┘ └──────────────┘ └──────────────┘       │
│                                                             │
│   ┌─────────────────────┐  ┌─────────────────────┐         │
│   │    Pro 专业版       │  │  Premium 优质的      │         │
│   │    $10 /mo          │  │    $20 /mo          │         │
│   │                     │  │                     │         │
│   │  [Notify Me When    │  │  [Notify Me When    │         │
│   │   Available]        │  │   Available]        │         │
│   └─────────────────────┘  └─────────────────────┘         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 样式规范（与首页保持一致）

### 颜色

| 用途 | 值 | Tailwind 类 |
|------|-----|-------------|
| 页面背景 | 深蓝黑色 | `bg-[#0a0a0a]` |
| 卡片背景 | 半透明深色 | `bg-card/95` |
| 边框 | 淡边框色 | `border-border/70` |
| 主文字 | 白色 | `text-foreground` |
| 次要文字 | 灰色 | `text-muted-foreground` |
| 强调色（火焰） | 琥珀色 | `text-amber-500` |
| 按钮渐变 | 灰色渐变 | `from-muted via-muted/90 to-muted` |
| 圆角 | 大圆角 | `rounded-3xl`, `rounded-xl` |

### 组件样式

#### 名额提示框
```tsx
// 有名额
<div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3">
  <p className="text-sm font-medium text-amber-500">
    🔥 Only {remaining} spots left
  </p>
</div>

// 满员
<div className="rounded-xl border border-border/70 bg-card/95 px-6 py-5">
  <p className="text-sm text-muted-foreground">
    We're at capacity! Add your email to get early access when spots become available.
  </p>
  <div className="mt-3 flex gap-2">
    <Input className="flex-1" placeholder="Enter your email" />
    <Button>Notify Me</Button>
  </div>
</div>
```

#### 输入框样式
```tsx
<input className="
  h-11 
  rounded-md 
  border border-border 
  bg-background 
  px-4 
  text-sm 
  outline-none 
  focus:ring-2 
  focus:ring-primary/40 
  text-foreground 
  placeholder:text-muted-foreground
" />
```

#### 按钮样式
```tsx
<button className="
  h-11 
  px-6 
  rounded-md 
  bg-primary 
  text-primary-foreground 
  font-semibold 
  hover:bg-primary/90 
  disabled:opacity-50
" />
```

## 数据结构

### 前端状态
```typescript
interface SubscriptionLimitState {
  total: number;      // 4
  used: number;       // 当前已订阅数
  remaining: number;  // 剩余名额
  isFull: boolean;    // 是否已满
  isLoading: boolean; // 加载状态
}

interface WaitlistFormState {
  email: string;
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}
```

### API 响应
```typescript
// GET /api/subscription/limit-status
interface LimitStatusResponse {
  code: number;
  data: {
    total: number;
    used: number;
    remaining: number;
    isFull: boolean;
  };
}

// POST /api/waitlist
interface WaitlistResponse {
  code: number;
  data: { success: boolean };
  message?: string;
}
```

## 交互流程

### 用户访问首页
```
1. 页面加载
2. 调用 GET /api/subscription/limit-status
3. 根据 remaining 显示对应 UI
   - remaining > 0: 显示 "🔥 Only X spots left"
   - remaining = 0: 显示等待列表表单
```

### 用户提交等待列表
```
1. 用户输入邮箱
2. 点击 Notify Me
3. 调用 POST /api/waitlist
4. 显示成功提示
5. 清空输入框
```

### 用户尝试订阅（满员时）
```
1. 用户点击 Subscribe Now
2. 调用 POST /api/checkout
3. 后端检查限制，返回 403
   { code: -1, error_code: "SUBSCRIPTION_FULL", message: "..." }
4. 前端显示错误提示，引导到等待列表
```

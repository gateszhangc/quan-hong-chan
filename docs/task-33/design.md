# Task 33: 首页图片与文字匹配 - 设计文档

## 1. 设计方案概述

### 1.1 设计原则
- **一致性**：所有配图风格统一，符合 EasyClaw 品牌调性
- **相关性**：图片内容与文字描述高度匹配
- **简洁性**：避免过度复杂，突出核心信息

### 1.2 视觉风格
- **风格**：Modern SaaS / Tech Dashboard
- **色调**：深色背景 (#0a0a0a, #1a1a2e) + 品牌强调色
- **元素**：圆角卡片、微妙阴影、渐变高光

### 1.3 修改范围
- ✅ Hero 区域：保持现状，无需修改
- 🔄 Use Cases：3张配图需替换
- 🔄 Usage Steps：3张配图需替换

## 2. Hero 区域设计

### 2.1 状态
- ✅ **保持现状，无需修改**
- 当前设计简洁有效，标题和副标题已清晰传达产品价值

## 3. Use Cases 区域设计

### 3.1 Daily Briefings

**设计概念**：
- 早晨的仪表盘，消息汇聚成简报
- 日历 + 消息流 + 数据可视化

**Prompt (AI生图)****：
```
Morning briefing dashboard interface,
message summaries flowing into a clean dashboard,
showing charts, notifications, and daily highlights,
dark theme with soft orange/gold accents,
minimalist SaaS design style,
abstract representation of information aggregation,
isometric 3D illustration, tech aesthetic
```

**替代方案 - 使用 Lucide 图标组合**：
```tsx
<div className="relative">
  <Sun className="w-16 h-16 text-amber-400" />
  <MessageCircle className="w-8 h-8 absolute -right-2 -bottom-2" />
  <BarChart3 className="w-8 h-8 absolute -left-2 -bottom-2" />
</div>
```

### 3.2 Customer Support Assistant

**设计概念**：
- AI 机器人在聊天界面中自动回复
- 对话气泡 + AI 标识

**Prompt (AI生图)**：
```
AI customer support chat interface,
chat bubbles with robot/AI assistant avatar,
customer messages on left, AI replies on right,
smart suggestions and quick replies visible,
dark mode UI design, blue accent colors,
modern messaging app aesthetic,
isometric 3D illustration, clean and friendly
```

**替代方案 - 使用 Lucide 图标组合**：
```tsx
<div className="relative">
  <Bot className="w-16 h-16 text-primary" />
  <MessageSquare className="w-8 h-8 absolute -right-2 top-0" />
  <Headphones className="w-8 h-8 absolute -left-2 bottom-0" />
</div>
```

### 3.3 Team Ops Automation

**设计概念**：
- 自动化流程图
- 任务触发 → 执行 → 通知

**Prompt (AI生图)**：
```
Team operations automation workflow,
connected nodes showing task automation flow,
tasks triggering actions and notifications,
dark theme with purple/blue gradient accents,
flowchart style with modern UI elements,
geometric shapes, arrows showing automation,
isometric 3D illustration, tech startup style
```

**替代方案 - 使用 Lucide 图标组合**：
```tsx
<div className="relative">
  <Workflow className="w-16 h-16 text-purple-400" />
  <Zap className="w-8 h-8 absolute -right-2 -top-2" />
  <Bell className="w-8 h-8 absolute -right-2 -bottom-2" />
</div>
```

## 4. Usage Steps 区域设计

### 4.1 Step 1: Choose a Model

**设计概念**：
- 三个 AI 模型卡片并排
- Claude (紫色)、GPT (绿色)、Gemini (蓝色)

**Prompt (AI生图)**：
```
AI model selection interface,
three cards showing Claude (purple), GPT (green), Gemini (blue),
checkmark on selected model,
dark UI background, glowing borders on selection,
modern SaaS design, clean and minimal,
isometric 3D style, tech aesthetic, 4K quality
```

### 4.2 Step 2: Connect a Channel

**设计概念**：
- 中心点连接多个渠道图标
- Telegram、Discord、WhatsApp

**Prompt (AI生图)**：
```
Channel connection hub interface,
central node connecting to Telegram, Discord, WhatsApp icons,
glowing connection lines, active status indicators,
dark theme with brand colors for each platform,
modern SaaS dashboard style,
isometric 3D illustration, clean tech design
```

### 4.3 Step 3: Deploy and Start

**设计概念**：
- 部署成功动画/状态
- 绿色勾号 + 启动的容器/服务

**Prompt (AI生图)**：
```
Deployment success status screen,
green checkmark, launching containers/servers,
status indicators showing "Running",
dark background with green success accents,
modern DevOps dashboard aesthetic,
isometric 3D style, celebration of successful deploy
```

## 5. 文件命名规范

```
/public/images/easyclaw/
├── use-case-1-briefings.(png|webp)  # Daily Briefings (800x600)
├── use-case-2-support.(png|webp)    # Customer Support (800x600)
├── use-case-3-automation.(png|webp) # Team Automation (800x600)
├── step-1-models.(png|webp)         # Step 1 (600x400)
├── step-2-channels.(png|webp)       # Step 2 (600x400)
└── step-3-deploy.(png|webp)         # Step 3 (600x400)
```

## 6. 配置更新

### 6.1 en.json 更新

```json
{
  "use_cases": {
    "items": [
      {
        "image": {
          "src": "/images/easyclaw/use-case-1-briefings.png",
          "alt": "Daily briefings automation workflow"
        }
      },
      {
        "image": {
          "src": "/images/easyclaw/use-case-2-support.png",
          "alt": "AI customer support assistant"
        }
      },
      {
        "image": {
          "src": "/images/easyclaw/use-case-3-automation.png",
          "alt": "Team operations automation"
        }
      }
    ]
  },
  "usage": {
    "items": [
      {
        "image": {
          "src": "/images/easyclaw/step-1-models.png",
          "alt": "Choose AI model - Claude, GPT, or Gemini"
        }
      },
      {
        "image": {
          "src": "/images/easyclaw/step-2-channels.png",
          "alt": "Connect messaging channels"
        }
      },
      {
        "image": {
          "src": "/images/easyclaw/step-3-deploy.png",
          "alt": "Deploy and start your assistant"
        }
      }
    ]
  }
}
```

## 7. 备选方案：代码实现动态效果

如果不想使用图片，可以用代码实现动态视觉效果：

### 7.1 Use Cases 图标组合
使用 Lucide 图标 + CSS 动画组合成视觉元素，无需外部图片。

### 7.2 Steps 步骤指示器
使用 Stepper 组件 + 图标，纯代码实现。

## 8. 参考资源

- **unDraw**: https://undraw.co/ (开源插图)
- **Heroicons**: https://heroicons.com/ (SVG 图标)
- **Lucide**: https://lucide.dev/ (React 图标库)
- **Replicate**: https://replicate.com/bytedance/seedream-4 (AI 生图)

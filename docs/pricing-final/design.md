# EasyClaw 定价方案设计文档

## 定价架构

```
定价页面结构
├── 月付/年付切换开关（默认显示年付）
├── Starter 卡片（左侧）
├── Pro 卡片（右侧，推荐）
└── 功能对比表（详细对比）
```

## 详细定价设计

### 月付价格

```
┌─────────────────────┐  ┌─────────────────────┐
│      Starter        │  │        Pro ⭐        │
│       $7/月         │  │       $19/月         │
├─────────────────────┤  ├─────────────────────┤
│                     │  │                     │
│  ✓ 基础使用量        │  │  ✓ 5倍使用量         │
│  ✓ 多平台访问        │  │  ✓ 工作流自动化       │
│  ✓ 对话记忆          │  │  ✓ 团队协作(3人)      │
│  ✓ 项目组织          │  │  ✓ 优先响应           │
│  ✓ 代码与内容        │  │  ✓ Webhook通知        │
│  ✓ 智能体模式        │  │  ✓ 优先支持           │
│  ✓ 邮件支持          │  │  ✓ 实验性功能         │
│                     │  │                     │
│   [开始使用]         │  │    [升级到Pro]       │
│                     │  │   最受欢迎 ⭐         │
└─────────────────────┘  └─────────────────────┘
```

### 年付价格

```
┌─────────────────────────────┐  ┌─────────────────────────────┐
│          Starter            │  │            Pro ⭐            │
│          $5/月              │  │           $15/月             │
│      ($60 预付/年)          │  │       ($180 预付/年)         │
│        省 29%               │  │         省 21%               │
├─────────────────────────────┤  ├─────────────────────────────┤
│                             │  │                             │
│  所有 Starter 功能...        │  │    所有 Pro 功能...          │
│                             │  │                             │
│      [开始使用]              │  │      [升级到Pro]            │
│                             │  │     最受欢迎 ⭐              │
└─────────────────────────────┘  └─────────────────────────────┘
```

## 功能详细说明

### Starter 功能详解

| 功能 | 说明 |
|------|------|
| **基础使用量** | 满足个人日常AI助手需求，约2-3K次调用/月 |
| **多平台访问** | Web、iOS、Android、桌面端全平台支持 |
| **对话记忆** | 跨会话记住上下文，持续跟进复杂任务 |
| **项目组织** | 无限项目空间，整理对话和文档 |
| **代码与内容** | 生成代码、创作内容、可视化数据 |
| **智能体模式** | 规划行程、管理任务、自动化日常流程 |
| **邮件支持** | 48小时内响应技术支持 |

### Pro 功能详解

| 功能 | 说明 | 与Starter对比 |
|------|------|---------------|
| **5倍使用量** | 约10-15K次调用/月，处理大型项目 | Starter的5倍 |
| **工作流自动化** | 端到端自动化流程，减少人工干预 | ❌ Starter无 |
| **团队协作** | 最多3名团队成员共享访问权限 | ❌ Starter无 |
| **优先响应** | 高峰时段优先处理，更快响应速度 | ❌ Starter无 |
| **Webhook通知** | 实时获取部署状态更新 | ❌ Starter无 |
| **优先支持** | 12小时内专属技术支持响应 | Starter 48h |
| **实验性功能** | 抢先体验最新AI能力 | ❌ Starter无 |

## 定价心理学设计

### 1. 价格锚点
```
展示: Pro $19 → Starter $7
效果: 让用户觉得 $7 很便宜
```

### 2. 年付激励
```
文案: "年付省 29%" / "年付省 21%"
而非: "年付打 8 折"

效果: 强调具体节省金额，利用损失厌恶心理
```

### 3. 推荐档位
```
Pro 卡片标记: "最受欢迎 ⭐"
位置: 右侧（视觉重心）
效果: 引导用户选择 Pro
```

## 中英文文案对照

### 定价卡片标题

| 英文 | 中文 |
|------|------|
| Starter | 入门版 |
| Pro | 专业版 |
| Most Popular | 最受欢迎 |
| Save 29% | 省 29% |
| Billed annually | 按年付费 |

### 定价卡片按钮

| 英文 | 中文 |
|------|------|
| Get Started | 开始使用 |
| Upgrade to Pro | 升级到专业版 |

### 功能列表

| 英文 | 中文 |
|------|------|
| Basic usage | 基础使用量 |
| 5x more usage | 5倍使用量 |
| Cross-platform access | 多平台访问 |
| Conversation memory | 对话记忆 |
| Unlimited projects | 无限项目 |
| Code & content creation | 代码与内容创作 |
| Agent mode | 智能体模式 |
| Email support | 邮件支持 |
| Workflow automation | 工作流自动化 |
| Team collaboration (3) | 团队协作(3人) |
| Priority response | 优先响应 |
| Webhook notifications | Webhook通知 |
| Priority support | 优先支持 |
| Early access features | 实验性功能 |

## JSON 配置结构

```json
{
  "pricing": {
    "title": "Simple pricing",
    "description": "Choose the plan that fits your needs",
    "billing_toggle": {
      "monthly": "Monthly",
      "yearly": "Yearly"
    },
    "plans": [
      {
        "id": "starter",
        "name": "Starter",
        "monthly_price": "$7",
        "yearly_price": "$5",
        "yearly_billing": "$60 billed annually",
        "yearly_discount": "Save 29%",
        "features": [
          "Basic usage",
          "Cross-platform access",
          "Conversation memory",
          "Unlimited projects",
          "Code & content creation",
          "Agent mode",
          "Email support"
        ],
        "cta": "Get Started"
      },
      {
        "id": "pro",
        "name": "Pro",
        "badge": "Most Popular",
        "monthly_price": "$19",
        "yearly_price": "$15",
        "yearly_billing": "$180 billed annually",
        "yearly_discount": "Save 21%",
        "features": [
          "5x more usage",
          "Workflow automation",
          "Team collaboration (3)",
          "Priority response",
          "Webhook notifications",
          "Priority support",
          "Early access features"
        ],
        "cta": "Upgrade to Pro"
      }
    ]
  }
}
```

## 视觉设计建议

### 卡片样式
- **Starter**：白色背景，简洁边框
- **Pro**：轻微阴影或边框高亮，突出推荐感

### 价格显示
- **月付**：大号字体显示 $7 / $19
- **年付**：大号字体显示 $5 / $15，下方小字显示 "$60/$180 billed annually"
- **折扣标签**：绿色或品牌色标签显示 "Save 29%" / "Save 21%"

### 切换开关
- 位置：两个卡片上方居中
- 默认：年付（更高折扣吸引用户）
- 状态：选中时有视觉反馈

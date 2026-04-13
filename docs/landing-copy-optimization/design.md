# EasyClaw 首页文案优化设计文档

## 整体架构

```
首页结构（自上而下）
├── Header（保持现状）
├── Hero（不修改 ✅）
├── Branding（保持现状）
├── Usage（优化步骤描述）
├── Feature（融入 Before/After + 零维护承诺）
├── Use Cases（保持现状）
├── Stats（保持现状）
├── FAQ（移除免费试用文案）
├── CTA（微调）
└── Footer（保持现状）
```

---

## 模块详细设计

### 1. Hero 模块（不修改）

**状态**：✅ 已完成，无需修改

**当前文案**（`simpleclaw-landing.tsx` 中硬编码）：
- 主标题："Deploy OpenClaw in under 1 minute"
- 副标题："EasyClaw handles infrastructure so you can launch OpenClaw without servers or DevOps."

**说明**：
- Hero 文案已在组件中正确实现
- 不需要修改 `en.json` 或 `zh.json` 中的配置
- 保持现有布局和文案不变

---

### 2. Usage 模块（3步流程优化）

#### 设计目标
- 展示简单的部署流程
- 突出模型灵活性和多渠道管理卖点

#### 步骤 1：选模型（英文）

**标题**：Choose a model

**描述**：
```
Claude, GPT, Gemini — pick the best model for each task.
Creative work with Claude, analysis with GPT. Switch anytime.
```

**卖点强调**：
- 模型切换灵活性
- 不同场景选择最优模型

#### 步骤 2：连渠道（英文）

**标题**：Connect a channel

**描述**：
```
Telegram, Discord, WhatsApp — one dashboard for all channels.
Manage all conversations from one place, no more switching apps.
```

**卖点强调**：
- 多渠道统一管理
- 单一控制台操作

#### 步骤 3：部署（英文）

**标题**：Deploy and start

**描述**：
```
Your AI assistant is online in 60 seconds.
Send your first message and start automating.
```

---

#### 步骤 1：选模型（中文）

**标题**：选择模型

**描述**：
```
Claude、GPT、Gemini 任你挑选。
创意任务用 Claude，分析任务用 GPT，随时切换最适模型。
```

#### 步骤 2：连渠道（中文）

**标题**：连接渠道

**描述**：
```
Telegram、Discord、WhatsApp 全支持。
一个后台统一管理所有渠道对话，无需来回切换。
```

#### 步骤 3：部署（中文）

**标题**：部署启动

**描述**：
```
60 秒后你的 AI 助手已在线。
发送第一条消息，开始自动化工作。
```

---

### 3. Feature 模块（核心优化）

#### 设计目标
- 融入 Before/After 对比价值
- 强调零维护承诺
- 展示产品核心优势

#### 英文文案设计

**模块标题**：
```
title: "Why teams choose EasyClaw"
description: "Production-ready deployment without DevOps overhead. Zero maintenance, maximum focus."
```

**Feature Items**（6个）：

```json
[
  {
    "title": "Deploy in 60 seconds",
    "description": "From zero to running in under a minute. No Docker, no Linux commands, no server setup.",
    "icon": "RiRocketLine"
  },
  {
    "title": "Zero maintenance",
    "description": "We handle updates, monitoring, and recovery. You just focus on using your AI assistant.",
    "icon": "RiShieldCheckLine"
  },
  {
    "title": "Model flexibility",
    "description": "Switch between Claude, GPT, and Gemini anytime. Use the best model for each task.",
    "icon": "RiSparkling2Line"
  },
  {
    "title": "Unified channels",
    "description": "Manage Telegram, Discord, and WhatsApp from one dashboard. No more switching apps.",
    "icon": "RiChatSmile3Line"
  },
  {
    "title": "Always up to date",
    "description": "Automatic OpenClaw updates. Always use the latest features without lifting a finger.",
    "icon": "RiRefreshLine"
  },
  {
    "title": "Scale with confidence",
    "description": "Start solo, then grow usage across teams and use cases. From 1 to 100 deployments.",
    "icon": "RiTeamLine"
  }
]
```

#### Before/After 对比融入设计

**方案**：在 Feature 模块上方添加对比段落（JSON 配置）

```json
"comparison": {
  "disabled": false,
  "title": "Say goodbye to the hassle",
  "description": "See what changes when you switch to EasyClaw",
  "before_label": "Traditional Setup",
  "after_label": "EasyClaw",
  "items": [
    {
      "before": "Rent servers, configure environments",
      "after": "One-click deployment, no servers needed"
    },
    {
      "before": "Wake up to fix 3 AM alerts",
      "after": "24/7 automatic operation"
    },
    {
      "before": "Manually update OpenClaw versions",
      "after": "Automatic updates to latest version"
    },
    {
      "before": "Learn Docker, Linux commands",
      "after": "Zero technical skills required"
    },
    {
      "before": "30+ minutes per deployment",
      "after": "Deploy in under 60 seconds"
    }
  ],
  "footer": "Time saved: ~29 minutes per deployment"
}
```

**说明**：
- 在 `en.json` 中添加 `comparison` 对象
- 在 `src/app/[locale]/(default)/page.tsx` 中渲染 Comparison 组件
- 位置：放在 Usage 和 Feature 之间

#### 中文文案设计

**模块标题**：
```
title: "为什么选择 EasyClaw"
description: "生产级部署，无需 DevOps。零维护，全专注。"
```

**Feature Items**（6个）：

```json
[
  {
    "title": "60 秒部署",
    "description": "从零到运行不到一分钟。无需 Docker，无需 Linux 命令，无需服务器配置。",
    "icon": "RiRocketLine"
  },
  {
    "title": "零维护",
    "description": "我们处理更新、监控、恢复。你只需专注使用 AI 助手。",
    "icon": "RiShieldCheckLine"
  },
  {
    "title": "模型灵活",
    "description": "Claude、GPT、Gemini 随时切换。不同任务使用最适模型。",
    "icon": "RiSparkling2Line"
  },
  {
    "title": "渠道统一",
    "description": "一个后台管理 Telegram、Discord、WhatsApp。无需切换应用。",
    "icon": "RiChatSmile3Line"
  },
  {
    "title": "自动更新",
    "description": "OpenClaw 自动更新，始终使用最新功能，无需手动操作。",
    "icon": "RiRefreshLine"
  },
  {
    "title": "安心扩展",
    "description": "从个人使用扩展到团队协作。从 1 个部署到 100 个部署。",
    "icon": "RiTeamLine"
  }
]
```

**对比段落**（中文）：

```json
"comparison": {
  "title": "告别这些烦恼",
  "description": "看看使用 EasyClaw 后有什么改变",
  "before_label": "传统方式",
  "after_label": "EasyClaw",
  "items": [
    {
      "before": "租用服务器、配置环境",
      "after": "一键部署，无需服务器"
    },
    {
      "before": "半夜被报警吵醒处理故障",
      "after": "7×24 小时自动运行"
    },
    {
      "before": "手动更新 OpenClaw 版本",
      "after": "自动更新到最新版本"
    },
    {
      "before": "学习 Docker、Linux 命令",
      "after": "完全零技术门槛"
    },
    {
      "before": "部署一次耗时 30+ 分钟",
      "after": "60 秒内完成部署"
    }
  ],
  "footer": "每次部署节省约 29 分钟"
}
```

---

### 4. FAQ 模块

#### Q1: 第一个问题修改（英文）

**修改前**：
```json
{
  "title": "Is EasyClaw free to try?",
  "description": "Yes. You can start with a free trial and upgrade when you need higher limits."
}
```

**修改后**：
```json
{
  "title": "How much does EasyClaw cost?",
  "description": "Plans start at $10/month. You can cancel anytime from your account."
}
```

#### Q1: 第一个问题修改（中文）

**修改前**：
```json
{
  "title": "EasyClaw 可以免费试用吗？",
  "description": "是的，你可以从免费试用开始，需要更高限额时再升级。"
}
```

**修改后**：
```json
{
  "title": "EasyClaw 如何收费？",
  "description": "套餐从 $10/月起。你可以随时在账户中取消。"
}
```

#### 其他 FAQ 保持现状

- Do I need to manage servers? / 需要我管理服务器吗？
- Which models are supported? / 支持哪些模型？
- Can I deploy to multiple channels? / 可以部署到多个渠道吗？
- How do I monitor deployment status? / 如何监控部署状态？
- How can I get support? / 如何获得支持？

---

### 5. CTA 模块

#### 英文文案

**修改前**：
```json
{
  "title": "Ready to launch OpenClaw?",
  "description": "Deploy your first assistant in under a minute."
}
```

**修改后**：
```json
{
  "title": "Ready to launch OpenClaw?",
  "description": "Deploy your first assistant in under a minute. No servers, no maintenance, no learning curve.",
  "note": "Cancel anytime. No long-term contract."
}
```

#### 中文文案

**修改前**：
```json
{
  "title": "准备好启动 OpenClaw 了吗？",
  "description": "在一分钟内部署你的第一个助手。"
}
```

**修改后**：
```json
{
  "title": "准备好启动 OpenClaw 了吗？",
  "description": "在一分钟内部署你的第一个助手。无需服务器，无需维护，无需学习。",
  "note": "随时取消，无需长期合约"
}
```

---

## 多语言文案对照表

### Usage 模块

| 步骤 | 英文 | 中文 |
|------|------|------|
| 1 标题 | Choose a model | 选择模型 |
| 1 描述 | Claude, GPT, Gemini — pick the best model for each task. Creative work with Claude, analysis with GPT. Switch anytime. | Claude、GPT、Gemini 任你挑选。创意任务用 Claude，分析任务用 GPT，随时切换最适模型。 |
| 2 标题 | Connect a channel | 连接渠道 |
| 2 描述 | Telegram, Discord, WhatsApp — one dashboard for all channels. Manage all conversations from one place, no more switching apps. | Telegram、Discord、WhatsApp 全支持。一个后台统一管理所有渠道对话，无需来回切换。 |
| 3 标题 | Deploy and start | 部署启动 |
| 3 描述 | Your AI assistant is online in 60 seconds. Send your first message and start automating. | 60 秒后你的 AI 助手已在线。发送第一条消息，开始自动化工作。 |

### Feature 模块

| 英文 | 中文 |
|------|------|
| Deploy in 60 seconds | 60 秒部署 |
| Zero maintenance | 零维护 |
| Model flexibility | 模型灵活 |
| Unified channels | 渠道统一 |
| Always up to date | 自动更新 |
| Scale with confidence | 安心扩展 |

### FAQ 模块

| 英文 | 中文 |
|------|------|
| How much does EasyClaw cost? | EasyClaw 如何收费？ |
| Plans start at $10/month. You can cancel anytime from your account. | 套餐从 $10/月起。你可以随时在账户中取消。 |

### CTA 模块

| 英文 | 中文 |
|------|------|
| No servers, no maintenance, no learning curve. | 无需服务器，无需维护，无需学习。 |
| Cancel anytime. No long-term contract. | 随时取消，无需长期合约 |

---

## 技术实现备注

### JSON 结构示例

```json
{
  "usage": {
    "title": "3 Steps to Deploy OpenClaw",
    "description": "Pick your model, connect a channel, and launch.",
    "items": [
      {
        "title": "Choose a model",
        "description": "Claude, GPT, Gemini — pick the best model for each task. Creative work with Claude, analysis with GPT. Switch anytime."
      },
      {
        "title": "Connect a channel",
        "description": "Telegram, Discord, WhatsApp — one dashboard for all channels. Manage all conversations from one place, no more switching apps."
      },
      {
        "title": "Deploy and start",
        "description": "Your AI assistant is online in 60 seconds. Send your first message and start automating."
      }
    ]
  },
  "feature": {
    "title": "Why teams choose EasyClaw",
    "description": "Production-ready deployment without DevOps overhead. Zero maintenance, maximum focus.",
    "items": [...]
  },
  "comparison": {
    "title": "Say goodbye to the hassle",
    "items": [...]
  }
}
```

### 注意事项
- 所有修改在 `en.json` 和 `zh.json` 中同步进行
- 保持 JSON 格式正确，注意引号和逗号
- 各语言页面文案独立，不混搭

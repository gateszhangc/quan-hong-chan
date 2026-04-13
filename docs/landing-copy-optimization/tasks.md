# EasyClaw 首页文案优化任务文档

## 任务清单

### 任务 1：优化 Usage 模块步骤描述（P1 - 高优先级）

**状态**：⏳ 待开始  
**负责人**：待分配  
**预计工时**：30 分钟（中英文）

**详细步骤**：

#### 1.1 修改英文文案 `src/i18n/pages/landing/en.json`

找到 `usage` 对象（约第 214-246 行），修改 `items` 数组：

**步骤 1 - 选模型**：
```json
{
  "title": "Choose a model",
  "description": "Claude, GPT, Gemini — pick the best model for each task. Creative work with Claude, analysis with GPT. Switch anytime.",
  "image": { "src": "/images/rubber-hose/step-1.png" }
}
```

**步骤 2 - 连渠道**：
```json
{
  "title": "Connect a channel",
  "description": "Telegram, Discord, WhatsApp — one dashboard for all channels. Manage all conversations from one place, no more switching apps.",
  "image": { "src": "/images/rubber-hose/step-2.png" }
}
```

**步骤 3 - 部署**：
```json
{
  "title": "Deploy and start",
  "description": "Your AI assistant is online in 60 seconds. Send your first message and start automating.",
  "image": { "src": "/images/rubber-hose/step-3.png" }
}
```

#### 1.2 修改中文文案 `src/i18n/pages/landing/zh.json`

同步修改中文版本：

**步骤 1**：
```json
{
  "title": "选择模型",
  "description": "Claude、GPT、Gemini 任你挑选。创意任务用 Claude，分析任务用 GPT，随时切换最适模型。"
}
```

**步骤 2**：
```json
{
  "title": "连接渠道",
  "description": "Telegram、Discord、WhatsApp 全支持。一个后台统一管理所有渠道对话，无需来回切换。"
}
```

**步骤 3**：
```json
{
  "title": "部署启动",
  "description": "60 秒后你的 AI 助手已在线。发送第一条消息，开始自动化工作。"
}
```

**验收标准**：
- [ ] 英文 Usage 模块 3 个步骤描述已更新
- [ ] 中文 Usage 模块 3 个步骤描述已同步更新
- [ ] 步骤 1 强调模型切换灵活性
- [ ] 步骤 2 强调多渠道统一管理
- [ ] 步骤 3 强调 60 秒快速上线

---

### 任务 2：优化 Feature 模块（P1 - 高优先级）

**状态**：⏳ 待开始  
**负责人**：待分配  
**预计工时**：1 小时（中英文 + 新增 comparison）

**详细步骤**：

#### 2.1 修改英文 Feature `src/i18n/pages/landing/en.json`

找到 `feature` 对象（约第 291-327 行）：

**修改标题和描述**：
```json
"feature": {
  "disabled": false,
  "name": "feature",
  "title": "Why teams choose EasyClaw",
  "description": "Production-ready deployment without DevOps overhead. Zero maintenance, maximum focus.",
  ...
}
```

**修改 items 数组**（6 个 feature）：

```json
"items": [
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

#### 2.2 添加 Comparison 区块（英文）

在 `feature` 对象前添加 `comparison` 对象：

```json
"comparison": {
  "disabled": false,
  "name": "comparison",
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

#### 2.3 修改中文 Feature `src/i18n/pages/landing/zh.json`

同步修改中文版本：

**标题和描述**：
```json
"title": "为什么选择 EasyClaw",
"description": "生产级部署，无需 DevOps。零维护，全专注。"
```

**6 个 feature items**：

```json
"items": [
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

#### 2.4 添加 Comparison 区块（中文）

```json
"comparison": {
  "disabled": false,
  "name": "comparison",
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

**验收标准**：
- [ ] Feature 模块标题和描述已更新（中英文）
- [ ] 6 个 feature items 已更新（中英文）
- [ ] Comparison 区块已添加（中英文）
- [ ] 新增 feature "Always up to date" / "自动更新" 强调零维护
- [ ] 所有图标正确配置

---

### 任务 3：添加 Comparison 组件渲染（P1 - 高优先级）

**状态**：⏳ 待开始  
**负责人**：待分配  
**预计工时**：1 小时

**详细步骤**：

#### 3.1 检查/创建 Comparison 组件

检查是否存在 `src/components/blocks/comparison/` 组件：

```bash
ls -la src/components/blocks/comparison/
```

如果不存在，需要创建组件。

#### 3.2 在 page.tsx 中添加 Comparison 渲染

打开 `src/app/[locale]/(default)/page.tsx`，在 Usage 和 Feature 之间添加 Comparison：

```tsx
// 在 imports 中添加
const Comparison = dynamic(() => import("@/components/blocks/comparison"));

// 在 return 中添加渲染
{
  comparison && (
    <Comparison section={comparison} />
  )
}
```

#### 3.3 在 page.tsx 中读取 comparison 数据

```tsx
const comparison = isEnabled(page.comparison)
  ? normalizeDisabled(page.comparison)
  : null;
```

**验收标准**：
- [ ] Comparison 组件正确渲染
- [ ] 显示在 Usage 和 Feature 之间
- [ ] Before/After 对比表格正确显示
- [ ] 中英文都正常显示

---

### 任务 4：修改 FAQ 模块（P1 - 高优先级）

**状态**：⏳ 待开始  
**负责人**：待分配  
**预计工时**：20 分钟（中英文）

**详细步骤**：

#### 4.1 修改英文 FAQ `src/i18n/pages/landing/en.json`

找到 `faq` 对象，修改第一个问题：

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

#### 4.2 修改中文 FAQ `src/i18n/pages/landing/zh.json`

同步修改中文版本：

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

**验收标准**：
- [ ] FAQ 第一个问题不再提及"免费试用"（中英文）
- [ ] 新文案强调低价起点 $10/月

---

### 任务 5：微调 CTA 模块（P2 - 中优先级）

**状态**：⏳ 待开始  
**负责人**：待分配  
**预计工时**：15 分钟（中英文）

**详细步骤**：

#### 5.1 修改英文 CTA `src/i18n/pages/landing/en.json`

找到 `cta` 对象（约第 496-508 行）：

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
  "description": "Deploy your first assistant in under a minute. No servers, no maintenance, no learning curve."
}
```

#### 5.2 修改中文 CTA `src/i18n/pages/landing/zh.json`

同步修改中文版本：

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
  "description": "在一分钟内部署你的第一个助手。无需服务器，无需维护，无需学习。"
}
```

**验收标准**：
- [ ] CTA 描述强调无服务器、无维护（中英文）
- [ ] 移除"免费"相关表述

---

### 任务 6：测试验证（P0 - 最高优先级）

**状态**：⏳ 待开始  
**负责人**：待分配  
**预计工时**：30 分钟

**测试步骤**：

#### 6.1 启动开发服务器

```bash
cd /Users/a1-6/Desktop/code/easyclaw
npm run dev
```

#### 6.2 英文页面检查

访问 `http://localhost:3000`

检查以下模块：
- [ ] Usage 模块 3 个步骤描述正确（英文）
- [ ] Comparison 区块显示正确（英文）
- [ ] Feature 模块 6 个 feature 显示正确（英文）
- [ ] FAQ 第一个问题无"free trial"
- [ ] CTA 模块文案正确（英文）
- [ ] Hero 模块保持不变

#### 6.3 中文页面检查

访问 `http://localhost:3000/zh`（或切换语言）

检查以下模块：
- [ ] Usage 模块 3 个步骤描述正确（中文）
- [ ] Comparison 区块显示正确（中文）
- [ ] Feature 模块 6 个 feature 显示正确（中文）
- [ ] FAQ 第一个问题无"免费"
- [ ] CTA 模块文案正确（中文）

#### 6.4 移动端检查

- [ ] 所有模块在移动端显示正常
- [ ] 文字不会溢出或换行异常
- [ ] 对比表格在移动端可读

**验收标准**：
- [ ] 所有修改内容正确显示（中英文）
- [ ] 无错别字或格式错误
- [ ] 各语言页面文案与语言一致
- [ ] 移动端显示正常

---

## 依赖关系

```
任务 1 (Usage) ─────┬──→ 任务 6 (测试)
任务 2 (Feature) ───┤
任务 3 (Comparison)─┤
任务 4 (FAQ) ───────┤
任务 5 (CTA) ───────┘
```

## 时间安排

| 阶段 | 任务 | 预计时间 | 累计时间 |
|------|------|----------|----------|
| 第 1 阶段 | 任务 1-5（文案修改） | 3 小时 | 3 小时 |
| 第 2 阶段 | 任务 6（测试） | 0.5 小时 | 3.5 小时 |

## 风险与注意事项

1. **Hero 模块**
   - 确认不修改 Hero 模块
   - `simpleclaw-landing.tsx` 中的文案保持不变

2. **Comparison 组件**
   - 可能需要创建新组件
   - 确保组件能正确读取 JSON 配置

3. **JSON 格式**
   - 修改时注意 JSON 格式正确性
   - 引号、逗号、括号要匹配

4. **多语言同步**
   - 英文修改后必须同步修改中文
   - 保持语义一致

5. **图标可用性**
   - `RiRefreshLine` 可能需要确认是否存在
   - 如果不存在，可用 `RiLoopLine` 或 `RiRestartLine` 替代

## 相关链接

- 需求文档：`docs/landing-copy-optimization/requirements.md`
- 设计文档：`docs/landing-copy-optimization/design.md`
- 英文文案：`src/i18n/pages/landing/en.json`
- 中文文案：`src/i18n/pages/landing/zh.json`
- 首页组件：`src/app/[locale]/(default)/page.tsx`

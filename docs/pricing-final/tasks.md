# EasyClaw 定价方案任务文档

## 任务清单

### 任务 1：更新英文定价配置

**状态**：⏳ 待开始  
**文件**：`src/i18n/pages/landing/en.json`  
**预计工时**：30 分钟

**详细步骤**：

1. 打开 `src/i18n/pages/landing/en.json`
2. 找到 `pricing` 对象（约第 611-734 行）
3. 替换为新的两档定价结构

**修改内容**：

```json
"pricing": {
  "name": "pricing",
  "label": "Pricing",
  "title": "Simple pricing",
  "description": "Choose the plan that fits your needs. Cancel anytime.",
  "groups": [
    {
      "name": "monthly",
      "title": "Monthly",
      "is_featured": false
    },
    {
      "name": "yearly",
      "title": "Yearly",
      "is_featured": true,
      "label": "Save up to 29%"
    }
  ],
  "items": [
    {
      "title": "Starter",
      "description": "For everyday productivity",
      "label": "",
      "features_title": "Core features",
      "features": [
        "Basic usage",
        "Cross-platform access",
        "Conversation memory",
        "Unlimited projects",
        "Code & content creation",
        "Agent mode",
        "Email support"
      ],
      "interval": "month",
      "amount": 700,
      "currency": "USD",
      "price": "$7",
      "original_price": "",
      "unit": "/mo",
      "is_featured": false,
      "tip": "",
      "button": {
        "title": "Get Started",
        "url": "/#pricing",
        "icon": "RiFlashlightFill"
      },
      "product_id": "starter-monthly",
      "product_name": "EasyClaw Starter Monthly",
      "credits": 2000,
      "valid_months": 1,
      "group": "monthly"
    },
    {
      "title": "Pro",
      "description": "For professionals and teams",
      "label": "Most Popular",
      "features_title": "Everything in Starter, plus",
      "features": [
        "5x more usage",
        "Workflow automation",
        "Team collaboration (3 members)",
        "Priority response",
        "Webhook notifications",
        "Priority support",
        "Early access features"
      ],
      "interval": "month",
      "amount": 1900,
      "currency": "USD",
      "price": "$19",
      "original_price": "",
      "unit": "/mo",
      "is_featured": true,
      "tip": "",
      "button": {
        "title": "Upgrade to Pro",
        "url": "/#pricing",
        "icon": "RiFlashlightFill"
      },
      "product_id": "pro-monthly",
      "product_name": "EasyClaw Pro Monthly",
      "credits": 10000,
      "valid_months": 1,
      "group": "monthly"
    },
    {
      "title": "Starter",
      "description": "For everyday productivity",
      "label": "",
      "features_title": "Core features",
      "features": [
        "Basic usage",
        "Cross-platform access",
        "Conversation memory",
        "Unlimited projects",
        "Code & content creation",
        "Agent mode",
        "Email support"
      ],
      "interval": "year",
      "amount": 6000,
      "currency": "USD",
      "price": "$5",
      "original_price": "$7 /mo",
      "unit": "/mo",
      "is_featured": false,
      "tip": "$60 billed annually",
      "button": {
        "title": "Get Started",
        "url": "/#pricing",
        "icon": "RiFlashlightFill"
      },
      "product_id": "starter-yearly",
      "product_name": "EasyClaw Starter Yearly",
      "credits": 24000,
      "valid_months": 12,
      "group": "yearly"
    },
    {
      "title": "Pro",
      "description": "For professionals and teams",
      "label": "Most Popular",
      "features_title": "Everything in Starter, plus",
      "features": [
        "5x more usage",
        "Workflow automation",
        "Team collaboration (3 members)",
        "Priority response",
        "Webhook notifications",
        "Priority support",
        "Early access features"
      ],
      "interval": "year",
      "amount": 18000,
      "currency": "USD",
      "price": "$15",
      "original_price": "$19 /mo",
      "unit": "/mo",
      "is_featured": true,
      "tip": "$180 billed annually",
      "button": {
        "title": "Upgrade to Pro",
        "url": "/#pricing",
        "icon": "RiFlashlightFill"
      },
      "product_id": "pro-yearly",
      "product_name": "EasyClaw Pro Yearly",
      "credits": 120000,
      "valid_months": 12,
      "group": "yearly"
    }
  ],
  "disabled": false
}
```

**验收标准**：
- [ ] Starter 月付 $7，年付 $5（显示省29%）
- [ ] Pro 月付 $19，年付 $15（显示省21%）
- [ ] 功能列表更新为新的描述
- [ ] 年付显示 "$60/$180 billed annually"

---

### 任务 2：更新中文定价配置

**状态**：⏳ 待开始  
**文件**：`src/i18n/pages/landing/zh.json`  
**预计工时**：30 分钟

**修改内容**：

```json
"pricing": {
  "name": "pricing",
  "label": "定价",
  "title": "简单定价",
  "description": "选择适合你的方案，随时取消",
  "groups": [
    {
      "name": "monthly",
      "title": "月付",
      "is_featured": false
    },
    {
      "name": "yearly",
      "title": "年付",
      "is_featured": true,
      "label": "最高省 29%"
    }
  ],
  "items": [
    {
      "title": "入门版",
      "description": "适合日常生产力",
      "label": "",
      "features_title": "核心功能",
      "features": [
        "基础使用量",
        "多平台访问",
        "对话记忆",
        "无限项目",
        "代码与内容创作",
        "智能体模式",
        "邮件支持"
      ],
      "interval": "month",
      "amount": 700,
      "currency": "USD",
      "price": "$7",
      "original_price": "",
      "unit": "/月",
      "is_featured": false,
      "tip": "",
      "button": {
        "title": "开始使用",
        "url": "/#pricing",
        "icon": "RiFlashlightFill"
      },
      "product_id": "starter-monthly",
      "product_name": "EasyClaw 入门版月付",
      "credits": 2000,
      "valid_months": 1,
      "group": "monthly"
    },
    {
      "title": "专业版",
      "description": "适合专业人士和团队",
      "label": "最受欢迎",
      "features_title": "入门版全部功能，外加",
      "features": [
        "5倍使用量",
        "工作流自动化",
        "团队协作(3人)",
        "优先响应",
        "Webhook通知",
        "优先支持",
        "实验性功能"
      ],
      "interval": "month",
      "amount": 1900,
      "currency": "USD",
      "price": "$19",
      "original_price": "",
      "unit": "/月",
      "is_featured": true,
      "tip": "",
      "button": {
        "title": "升级到专业版",
        "url": "/#pricing",
        "icon": "RiFlashlightFill"
      },
      "product_id": "pro-monthly",
      "product_name": "EasyClaw 专业版月付",
      "credits": 10000,
      "valid_months": 1,
      "group": "monthly"
    },
    {
      "title": "入门版",
      "description": "适合日常生产力",
      "label": "",
      "features_title": "核心功能",
      "features": [
        "基础使用量",
        "多平台访问",
        "对话记忆",
        "无限项目",
        "代码与内容创作",
        "智能体模式",
        "邮件支持"
      ],
      "interval": "year",
      "amount": 6000,
      "currency": "USD",
      "price": "$5",
      "original_price": "$7 /月",
      "unit": "/月",
      "is_featured": false,
      "tip": "$60 按年预付",
      "button": {
        "title": "开始使用",
        "url": "/#pricing",
        "icon": "RiFlashlightFill"
      },
      "product_id": "starter-yearly",
      "product_name": "EasyClaw 入门版年付",
      "credits": 24000,
      "valid_months": 12,
      "group": "yearly"
    },
    {
      "title": "专业版",
      "description": "适合专业人士和团队",
      "label": "最受欢迎",
      "features_title": "入门版全部功能，外加",
      "features": [
        "5倍使用量",
        "工作流自动化",
        "团队协作(3人)",
        "优先响应",
        "Webhook通知",
        "优先支持",
        "实验性功能"
      ],
      "interval": "year",
      "amount": 18000,
      "currency": "USD",
      "price": "$15",
      "original_price": "$19 /月",
      "unit": "/月",
      "is_featured": true,
      "tip": "$180 按年预付",
      "button": {
        "title": "升级到专业版",
        "url": "/#pricing",
        "icon": "RiFlashlightFill"
      },
      "product_id": "pro-yearly",
      "product_name": "EasyClaw 专业版年付",
      "credits": 120000,
      "valid_months": 12,
      "group": "yearly"
    }
  ],
  "disabled": false
}
```

**验收标准**：
- [ ] 中文定价文案正确显示
- [ ] 月付/年付切换正常
- [ ] 折扣标签显示正确

---

### 任务 3：测试验证

**状态**：⏳ 待开始  
**预计工时**：15 分钟

**测试步骤**：

1. 启动开发服务器：`npm run dev`
2. 访问 Pricing 页面
3. 检查以下内容：
   - [ ] 两档定价显示正确（Starter $7/$5, Pro $19/$15）
   - [ ] 月付/年付切换正常
   - [ ] 年付折扣标签显示（省29%/21%）
   - [ ] 功能列表正确显示
   - [ ] 中英文切换正常
   - [ ] 移动端显示正常

---

## 相关文档

- 需求文档：`docs/pricing-final/requirements.md`
- 设计文档：`docs/pricing-final/design.md`
- 任务文档：`docs/pricing-final/tasks.md`

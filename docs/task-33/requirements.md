# Task 33: 首页图片与文字匹配 - 需求文档

## 1. 背景

当前 EasyClaw 首页存在图片与文字内容不匹配的问题，影响了用户体验和品牌形象。

## 2. 问题分析

### 2.1 Hero 区域
- **当前状态**：✅ 保持现状，无需修改（已有合适的标题和副标题）

### 2.2 Use Cases 区域 - 图片主题完全不符

| 用例标题 | 描述 | 当前图片 | 问题 |
|---------|------|---------|------|
| Daily Briefings | 将消息转化为团队晨报 | caricature 风格漫画头像 | ❌ 与"简报"完全无关 |
| Customer Support Assistant | 客服问答自动化 | caricature 风格漫画头像 | ❌ 与"客服"完全无关 |
| Team Ops Automation | 团队运营自动化 | caricature 风格漫画头像 | ❌ 与"自动化"完全无关 |

### 2.3 Usage (3 Steps) 区域 - 图片主题不符

| 步骤 | 标题 | 当前图片 | 问题 |
|-----|------|---------|------|
| Step 1 | Choose a model（选择AI模型） | 手机选择头像 caricature | ❌ 与"选择模型"无关 |
| Step 2 | Connect a channel（连接渠道） | rubber-hose 风格 caricature | ❌ 与"连接渠道"无关 |
| Step 3 | Deploy and start（部署启动） | rubber-hose 风格 caricature | ❌ 与"部署"无关 |

## 3. 功能需求

### 3.1 Hero 区域 (FR-001)
- **状态**: ✅ 无需修改，保持现状

### 3.2 Use Cases 配图 (FR-002)

#### Use Case 1: Daily Briefings
- **需求**：体现"消息汇总成晨报"的场景
- **视觉元素**：消息流、仪表盘、图表、简报
- **风格**：与整体网站风格一致

#### Use Case 2: Customer Support Assistant
- **需求**：体现"AI 客服自动回复"的场景
- **视觉元素**：聊天界面、AI 机器人、客户对话
- **风格**：与整体网站风格一致

#### Use Case 3: Team Ops Automation
- **需求**：体现"团队运营自动化"的场景
- **视觉元素**：自动化流程、任务管理、通知推送
- **风格**：与整体网站风格一致

### 3.3 Usage Steps 配图 (FR-003)

#### Step 1: Choose a Model
- **需求**：体现"选择 AI 模型"的步骤
- **视觉元素**：Claude、GPT、Gemini 模型选择界面或图标
- **风格**：简洁明了，引导性强

#### Step 2: Connect a Channel
- **需求**：体现"连接通讯渠道"的步骤
- **视觉元素**：Telegram、Discord、WhatsApp 图标连接示意
- **风格**：简洁明了，引导性强

#### Step 3: Deploy and Start
- **需求**：体现"部署完成并启动"的步骤
- **视觉元素**：部署成功状态、容器启动、勾号完成
- **风格**：简洁明了，引导性强

## 4. 非功能需求

### 4.1 性能要求 (NFR-001)
- 所有图片需经过压缩优化，单张大小不超过 500KB
- 支持 WebP 格式，提供 PNG 回退

### 4.2 可访问性 (NFR-002)
- 所有图片必须有 alt 属性
- 支持屏幕阅读器

### 4.3 响应式 (NFR-003)
- 图片需适配桌面端和移动端
- 移动端可使用裁剪或简化版本

## 5. 验收标准

- [x] Hero 区域保持现状，无需修改
- [x] Use Cases 三张配图分别对应简报、客服、自动化主题
- [x] Usage Steps 三张配图分别对应模型选择、渠道连接、部署启动
- [x] 所有图片加载时间 < 1秒
- [x] 所有图片有正确的 alt 属性
- [ ] 移动端显示正常

## 6. 相关文件

- 配置文件：`/src/i18n/pages/landing/en.json`
- 配置文件：`/src/i18n/pages/landing/zh.json`
- 图片目录：`/public/images/`
- 页面组件：`/src/app/[locale]/(default)/page.tsx`

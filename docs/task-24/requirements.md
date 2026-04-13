# 任务24 - 需求文档：首页配置驱动化改造

## 背景

当前 EasyClaw 首页使用自定义的 `SimpleClawLanding` 组件，所有内容和布局都硬编码在代码中。这种模式存在以下问题：

1. **内容难以维护**：修改文案需要修改代码
2. **多语言支持困难**：新增语言需要复制大量代码
3. **营销内容缺失**：缺少 Use Cases、Benefit Showcase 等营销模块
4. **与其他页面不一致**：其他页面使用配置驱动，首页却使用硬编码

## 目标

将首页从自定义组件模式改造为 **JSON 配置驱动模式**，与 caricature-maker-art 项目保持一致，实现：

1. 内容通过 JSON 配置管理
2. 支持 35+ 语言的国际化
3. 复用现有的区块组件系统
4. 保留核心的 OpenClaw 部署功能

## 功能需求

### FR1: 页面结构配置化
- 首页所有区块（Use Cases、Features、Pricing、FAQ 等）通过 JSON 配置
- 支持通过 `disabled` 字段控制区块显示/隐藏
- 支持区块顺序调整（通过数组顺序）

### FR2: 核心功能保留（SimpleClawLanding）
- **保持现有 SimpleClawLanding 组件不变**（包含 Hero + 部署功能）
- 保留标题 "Deploy OpenClaw in under 1 minute"
- 保留模型选择（Claude/GPT/Gemini）
- 保留渠道选择（Telegram/Discord/WhatsApp）
- 保留 Token 输入和部署按钮
- 保留部署状态监控和 Telegram 弹窗
- **不在配置中管理 hero 内容**

### FR3: 新增营销区块（位于 SimpleClawLanding 下方）
在 SimpleClawLanding 下方添加 caricature-maker-art 中存在的以下模块（与 caricature-maker-art 配置保持一致）：

| 模块             | 说明                                                | 默认状态 | 优先级 |
| ---------------- | --------------------------------------------------- | -------- | ------ |
| Use Cases        | 3个使用场景卡片（Avatar/Gift/Marketing）            | 启用     | P0     |
| Branding         | 技术栈展示（Next.js/React/Tailwind 等）             | 启用     | P1     |
| Usage            | 3步使用流程                                         | 启用     | P1     |
| Introduce        | 功能介绍（How to Make）                             | 禁用     | P2     |
| Benefit          | 好处说明（Why Use）                                 | 禁用     | P2     |
| Benefit Showcase | Before/After 对比展示                               | 禁用     | P2     |
| Feature          | 6个特性卡片网格                                     | 启用     | P1     |
| Stats            | 3个数据统计                                         | 启用     | P2     |
| Testimonial      | 用户评价                                            | 禁用     | P3     |
| FAQ              | 常见问题折叠面板                                    | 启用     | P1     |
| CTA              | 行动召唤                                            | 启用     | P1     |

> **注意**：所有模块通过 `disabled` 字段控制开闭，与 caricature-maker-art 保持一致。

### FR4: 多语言支持
- 支持现有 35+ 语言
- 每种语言独立的 JSON 配置文件
- 缺失翻译自动回退到英文

### FR5: SEO 优化
- Metadata 可保持硬编码（因为 hero 不由配置驱动）
- 支持 JSON-LD 结构化数据（可选）
- 支持 Canonical URL

## 非功能需求

### NFR1: 性能
- 非首屏组件使用 `dynamic()` 懒加载
- 图片使用 Next.js Image 组件优化
- 首屏加载时间 < 3s

### NFR2: 兼容性
- 桌面端：完整显示所有区块
- 移动端：部分区块隐藏（`hidden md:block`）
- 支持 Chrome、Firefox、Safari、Edge 最新两个版本

### NFR3: 可维护性
- 组件与配置分离
- 配置变更无需重新部署（CDN 缓存策略）
- 代码符合现有 ESLint 规范

## 验收标准

### 功能验收

| 编号 | 验收项    | 验收标准                          |
| ---- | --------- | --------------------------------- |
| AC1  | 配置驱动  | 修改 `en.json` 后页面内容自动更新 |
| AC2  | 部署功能  | 模型/渠道选择、部署按钮功能正常   |
| AC3  | Use Cases | 显示3个使用场景卡片，布局正确     |
| AC4  | Branding  | 显示5个技术栈图标，横向排列       |
| AC5  | Features  | 显示6个特性卡片，响应式网格布局   |
| AC6  | Pricing   | 显示月付/年付切换，价格卡片正确   |
| AC7  | FAQ       | 折叠面板可正常展开/收起           |
| AC8  | 多语言    | 切换语言后所有文案更新            |
| AC9  | 移动端    | 部分区块隐藏，布局自适应          |
| AC10 | 懒加载    | 非首屏组件使用 dynamic import     |

### 性能验收

| 编号 | 验收项       | 验收标准                          |
| ---- | ------------ | --------------------------------- |
| AC11 | 首屏时间     | Lighthouse Performance Score ≥ 90 |
| AC12 | 可交互时间   | TTI < 3.5s                        |
| AC13 | 累积布局偏移 | CLS < 0.1                         |

## 参考项目

- **caricature-maker-art**: 配置驱动模式的参考实现
- **现有区块组件**: `src/components/blocks/` 下的组件复用

## 风险与应对

| 风险         | 可能性 | 影响 | 应对措施                       |
| ------------ | ------ | ---- | ------------------------------ |
| 部署功能异常 | 低     | 高   | 充分测试部署流程，保留回滚方案 |
| 样式冲突     | 中     | 中   | 使用 CSS 隔离，逐步迁移        |
| 配置缺失     | 低     | 低   | 添加默认值和 fallback 逻辑     |
| 性能下降     | 低     | 中   | 使用懒加载和代码分割优化       |

## 备注

- 保持现有 URL 结构不变
- 保持现有 API 调用方式不变
- 优先实现 P0/P1 需求，P2/P3 可后续迭代

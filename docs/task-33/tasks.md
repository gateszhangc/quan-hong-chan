# Task 33: 首页图片与文字匹配 - 任务文档

## 任务清单

### Phase 1: 准备阶段

- [x] **Task 1.1**: 确认图片生成方案
  - 选项 A: 使用 Replicate API 自动生成图片
  - 选项 B: 使用 Midjourney/DALL-E 手动生成
  - 选项 C: 使用代码生成（SVG -> PNG/WebP），无需外部版权素材
  - 选项 D: 使用 unDraw 等开源插图
  - **负责人**: 产品经理/设计
  - **截止时间**: 2026-02-09

- [x] **Task 1.2**: 创建图片资源目录
  ```bash
  mkdir -p /public/images/easyclaw
  ```
  - **负责人**: 开发
  - **截止时间**: 2026-02-09

### Phase 2: 图片生成/收集

- [x] **Task 2.0**: Hero 区域
  - **状态**: ✅ 跳过，保持现状

- [x] **Task 2.1**: Use Case 1 - Daily Briefings
  - **尺寸**: 800x600px (4:3)
  - **格式**: PNG + WebP
  - **文件名**: `use-case-1-briefings.(png|webp)`
  - **负责人**: 设计/AI生成
  - **截止时间**: 2026-02-10

- [x] **Task 2.2**: Use Case 2 - Customer Support
  - **尺寸**: 800x600px (4:3)
  - **格式**: PNG + WebP
  - **文件名**: `use-case-2-support.(png|webp)`
  - **负责人**: 设计/AI生成
  - **截止时间**: 2026-02-10

- [x] **Task 2.3**: Use Case 3 - Team Automation
  - **尺寸**: 800x600px (4:3)
  - **格式**: PNG + WebP
  - **文件名**: `use-case-3-automation.(png|webp)`
  - **负责人**: 设计/AI生成
  - **截止时间**: 2026-02-10

- [x] **Task 2.4**: Step 1 - Choose Model
  - **尺寸**: 600x400px (3:2)
  - **格式**: PNG + WebP
  - **文件名**: `step-1-models.(png|webp)`
  - **负责人**: 设计/AI生成
  - **截止时间**: 2026-02-10

- [x] **Task 2.5**: Step 2 - Connect Channel
  - **尺寸**: 600x400px (3:2)
  - **格式**: PNG + WebP
  - **文件名**: `step-2-channels.(png|webp)`
  - **负责人**: 设计/AI生成
  - **截止时间**: 2026-02-10

- [x] **Task 2.6**: Step 3 - Deploy
  - **尺寸**: 600x400px (3:2)
  - **格式**: PNG + WebP
  - **文件名**: `step-3-deploy.(png|webp)`
  - **负责人**: 设计/AI生成
  - **截止时间**: 2026-02-10

- [x] **Task 2.7**: 图片压缩优化
  - 目标：单张 < 500KB
  - 工具：TinyPNG / Squoosh
  - **负责人**: 开发
  - **截止时间**: 2026-02-11

### Phase 3: 配置更新

- [x] **Task 3.1**: 更新 en.json
  - 文件: `/src/i18n/pages/landing/en.json`
  - 更新 use_cases.items[0-2].image
  - 更新 usage.items[0-2].image
  - **负责人**: 开发
  - **截止时间**: 2026-02-11

- [x] **Task 3.2**: 更新 zh.json
  - 文件: `/src/i18n/pages/landing/zh.json`
  - 同步更新中文配置
  - **负责人**: 开发
  - **截止时间**: 2026-02-11

- [x] **Task 3.3**: 更新其他语言配置
  - 检查其他语言文件：当前仅 `en.json` / `zh.json` 使用 OpenClaw 的 use_cases / usage 文案
  - 其他语言（如 `ja.json` / `vi.json` 等）为不同产品文案，保持原配图以避免新错配
  - **负责人**: 开发
  - **截止时间**: 2026-02-12

### Phase 4: 代码实现（如需要）

- [x] **Task 4.1**: Use Cases 组件验证
  - 检查图片显示是否正常
  - 验证 alt 属性
  - **负责人**: 开发
  - **截止时间**: 2026-02-12

- [x] **Task 4.2**: Usage Steps 组件验证
  - 检查图片显示是否正常
  - 验证 alt 属性
  - **负责人**: 开发
  - **截止时间**: 2026-02-12

### Phase 5: 测试验证

- [ ] **Task 5.1**: 桌面端测试
  - 测试环境: Chrome, Firefox, Safari
  - 分辨率: 1920x1080, 1440x900
  - **负责人**: QA
  - **截止时间**: 2026-02-13

- [ ] **Task 5.2**: 移动端测试
  - 测试设备: iPhone 14 Pro, Android
  - 检查图片自适应
  - **负责人**: QA
  - **截止时间**: 2026-02-13

- [ ] **Task 5.3**: 性能测试
  - 图片加载时间 < 1s
  - Lighthouse 性能评分 > 90
  - **负责人**: QA
  - **截止时间**: 2026-02-13

- [ ] **Task 5.4**: 可访问性测试
  - 验证所有 alt 属性
  - 屏幕阅读器测试
  - **负责人**: QA
  - **截止时间**: 2026-02-13

### Phase 6: 部署上线

- [ ] **Task 6.1**: 代码审查
  - **负责人**: Tech Lead
  - **截止时间**: 2026-02-14

- [ ] **Task 6.2**: 部署到 Staging
  - **负责人**: DevOps
  - **截止时间**: 2026-02-14

- [ ] **Task 6.3**: 最终验收
  - **负责人**: 产品经理
  - **截止时间**: 2026-02-14

- [ ] **Task 6.4**: 部署到 Production
  - **负责人**: DevOps
  - **截止时间**: 2026-02-15

## 快速启动方案（如时间紧张）

如果无法立即生成新图片，可采用以下临时方案：

### 临时方案 A: 禁用不匹配区块
```json
// en.json
{
  "use_cases": { "disabled": true },
  "usage": { "disabled": true }
}
```

### 临时方案 B: 使用 Lucide 图标
替换图片为图标组合，无需等待图片生成。

### 临时方案 C: 使用渐变占位
使用 CSS 渐变 + 图标作为临时视觉元素。

## 相关链接

- 需求文档: `./requirements.md`
- 设计文档: `./design.md`
- Figma 设计稿: [待添加]
- 图片资源: `/public/images/easyclaw/`

## 备注

- ✅ Hero 区域保持现状，无需修改
- 所有图片需符合品牌调性
- 建议优先使用 WebP 格式，提供 PNG 回退
- 如有版权问题，需及时替换

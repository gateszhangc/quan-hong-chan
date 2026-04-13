# 任务24 - 执行任务文档：首页配置驱动化改造

## 任务概览

| 属性 | 值 |
|------|-----|
| 任务ID | task-24 |
| 任务名称 | 首页配置驱动化改造 |
| 方案选择 | 方案一：改造为配置驱动模式 |
| 优先级 | P1 |
| 预计工时 | 4-6 小时 |
| 风险等级 | 中 |

---

## 子任务清单

### 子任务 1: 准备环境

**状态**: ⬜ 待开始
**预计耗时**: 30 分钟
**负责人**: 待定

#### 工作内容
1. 备份当前 `page.tsx` 和 `simpleclaw-landing.tsx`
2. 确认所有区块组件可用
3. 检查 i18n 配置完整性

#### 检查清单
- [ ] 备份 `src/app/[locale]/(default)/page.tsx`
- [ ] 备份 `src/components/landing/simpleclaw-landing.tsx`
- [ ] 确认 `src/components/blocks/` 下组件完整
- [ ] 确认 `src/services/page.ts` 可用

---

### 子任务 2: 修改首页入口页面

**状态**: ⬜ 待开始
**预计耗时**: 1 小时
**负责人**: 待定
**文件**: `src/app/[locale]/(default)/page.tsx`

#### 工作内容
1. 添加动态导入语句
2. 添加 `generateMetadata` 函数（使用硬编码或简化逻辑，因为 hero 不由配置驱动）
3. 修改默认导出组件
4. 添加区块渲染逻辑（位于 SimpleClawLanding 下方）

#### 代码变更
```typescript
// 新增：动态导入
import dynamic from "next/dynamic";
const UseCases = dynamic(() => import("@/components/blocks/use-cases"));
const Branding = dynamic(() => import("@/components/blocks/branding"));
// ... 其他区块

// 新增：Metadata 生成（简化版，因为 hero 不由配置驱动）
export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title: "EasyClaw - Deploy OpenClaw in under 1 minute",
    description: "EasyClaw handles infrastructure so you can launch OpenClaw without servers or DevOps.",
  };
}

// 修改：默认导出
export default async function LandingPage({ params }) {
  const { locale } = await params;
  const page = await getLandingPage(locale); // 获取营销区块配置
  
  return (
    <>
      {/* SimpleClawLanding 包含 hero + 核心部署功能 */}
      <SimpleClawLanding />
      
      {/* 配置驱动的营销区块 */}
      {page.use_cases && <UseCases section={page.use_cases} />}
      {page.branding && <Branding section={page.branding} />}
      {/* ... */}
    </>
  );
}
```

#### 检查清单
- [ ] 所有动态导入正确
- [ ] `generateMetadata` 正常工作
- [ ] 各区块按顺序渲染
- [ ] 移动端隐藏逻辑正确（`hidden md:block`）

---

### 子任务 3: 扩展英文配置

**状态**: ⬜ 待开始
**预计耗时**: 1 小时
**负责人**: 待定
**文件**: `src/i18n/pages/landing/en.json`

#### 工作内容
与 caricature-maker-art 保持一致，配置以下模块：

**启用模块（disabled: false）**：
1. `use_cases.disabled` = `false`
2. `branding.disabled` = `"false"`
3. `usage.disabled` = `false` （Feature3 组件）
4. `feature.disabled` = `false`
5. `stats.disabled` = `"false"`
6. `faq.disabled` = `false`
7. `cta.disabled` = `false`

**禁用模块（默认不显示，可通过配置启用）**：
8. `introduce.disabled` = `"true"` （Feature1 组件）
9. `benefit.disabled` = `"true"` （Feature2 组件）
10. `benefit_showcase.disabled` = `true`
11. `testimonial.disabled` = `true`

11. 添加/更新各区块内容文案

#### 关键变更（与 caricature-maker-art 一致）
```json
{
  "use_cases": {
    "disabled": false,
    "title": "Deploy OpenClaw for any workflow",
    "items": [...]
  },
  "branding": {
    "disabled": "false",
    "title": "Powered by Advanced Technology"
  },
  "usage": {
    "name": "usage",
    "title": "3 Steps to Your Caricature",
    "items": [...]
  },
  "introduce": {
    "disabled": "true",
    "name": "introduce",
    "title": "How to Make a Caricature"
  },
  "benefit": {
    "disabled": "true",
    "name": "benefit",
    "title": "Why Use OpenClaw?"
  },
  "benefit_showcase": {
    "disabled": true,
    "name": "benefit_showcase",
    "title": "Amazing Transformations"
  },
  "feature": {
    "disabled": false,
    "name": "feature",
    "title": "Why People Choose Us"
  },
  "stats": {
    "disabled": "false",
    "name": "stats",
    "title": "Quality, Price, Simplicity"
  },
  "testimonial": {
    "disabled": true,
    "name": "testimonial",
    "title": "What Users Are Saying"
  },
  "faq": {
    "disabled": false,
    "name": "faq",
    "title": "Common Questions"
  },
  "cta": {
    "disabled": false,
    "name": "cta",
    "title": "Ready to Make Yours?"
  }
}
```

#### 检查清单
- [ ] 启用模块：`use_cases`, `branding`, `usage`, `feature`, `stats`, `faq`, `cta`
- [ ] 禁用模块：`introduce`, `benefit`, `benefit_showcase`, `testimonial`
- [ ] 与 caricature-maker-art 的 `disabled` 状态一致
- [ ] JSON 语法正确（无 trailing comma）
- [ ] 所有图片路径正确
- [ ] 所有图标名称存在

---

### 子任务 4: 扩展中文配置

**状态**: ⬜ 待开始
**预计耗时**: 30 分钟
**负责人**: 待定
**文件**: `src/i18n/pages/landing/zh.json`

#### 工作内容
1. 同步英文配置的修改
2. 将文案翻译为中文

#### 检查清单
- [ ] 结构与英文版一致
- [ ] 所有文案已中文化
- [ ] 链接和图标保持一致

---

### 子任务 5: 简化 SimpleClawLanding

**状态**: ⬜ 待开始
**预计耗时**: 1 小时
**负责人**: 待定
**文件**: `src/components/landing/simpleclaw-landing.tsx`

#### 工作内容
1. 移除重复的区块代码（Use Cases、Comparison 等）
2. 保留核心部署功能
3. 调整样式确保与新区块衔接

#### 需要移除/迁移的内容
- [ ] `USE_CASES` 数组 → 迁移到 JSON（位于 SimpleClawLanding 下方的区块）
- [ ] `TRADITIONAL_STEPS` / `SIMPLECLAW_STEPS` → 迁移到 JSON（如需要）
- [ ] Comparison 区块 → 保留在 SimpleClawLanding 内或迁移
- [ ] Use Cases Tag 区块 → 保留在 SimpleClawLanding 内或迁移

#### 注意事项
- ⚠️ **Hero 部分保持现状**：SimpleClawLanding 的标题、描述、模型/渠道选择、部署按钮全部保留
- ⚠️ **仅在其下方添加新区块**：UseCases、Branding、Features 等

#### 需要保留的内容（全部保留）
- [ ] Hero 标题和描述
- [ ] MODELS 配置（模型选择）
- [ ] CHANNELS 配置（渠道选择）
- [ ] Token 输入和部署按钮
- [ ] 部署状态管理
- [ ] Telegram 弹窗逻辑
- [ ] Comparison 对比区块（可选保留或迁移）

---

### 子任务 6: 本地开发测试

**状态**: ⬜ 待开始
**预计耗时**: 1 小时
**负责人**: 待定

#### 测试用例

##### TC1: 页面加载
**步骤**:
1. 启动开发服务器: `npm run dev`
2. 访问首页: `http://localhost:3000`

**预期结果**:
- [ ] 页面正常加载无报错
- [ ] 控制台无红色错误
- [ ] 网络请求正常

##### TC2: 核心功能（SimpleClawLanding）
**步骤**:
1. 查看 Hero 标题和描述（应保持不变）
2. 选择模型（Claude/GPT/Gemini）
3. 选择渠道（Telegram/Discord/WhatsApp）
4. 输入 Token
5. 点击部署

**预期结果**:
- [ ] Hero 标题显示 "Deploy OpenClaw in under 1 minute"
- [ ] 模型选择正常
- [ ] 渠道选择正常
- [ ] 部署按钮可点击
- [ ] 部署状态正确显示

##### TC3: 新增区块（位于 SimpleClawLanding 下方）
**步骤**:
1. 向下滚动页面
2. 查看 SimpleClawLanding 下方的各区块

**预期结果**:
- [ ] Use Cases 显示在部署区域下方
- [ ] Branding 显示正确
- [ ] Features 显示正确
- [ ] Pricing 显示正确
- [ ] FAQ 显示正确
- [ ] 各区块之间有过渡/间距

##### TC4: 响应式
**步骤**:
1. 使用浏览器 DevTools 切换设备
2. 测试桌面端（1920px）
3. 测试平板端（768px）
4. 测试移动端（375px）

**预期结果**:
- [ ] 桌面端所有区块显示
- [ ] 移动端部分区块隐藏
- [ ] 布局无错乱
- [ ] 文字无截断

##### TC5: 多语言
**步骤**:
1. 访问 `/`（英文）
2. 访问 `/zh`（中文）

**预期结果**:
- [ ] 英文页面文案正确
- [ ] 中文页面文案正确
- [ ] 切换语言无刷新错误

##### TC6: SEO
**步骤**:
1. 查看页面源码
2. 检查 `<title>` 和 `<meta>`
3. 检查 JSON-LD

**预期结果**:
- [ ] title 正确
- [ ] description 正确
- [ ] JSON-LD 存在

---

### 子任务 7: 构建测试

**状态**: ⬜ 待开始
**预计耗时**: 30 分钟
**负责人**: 待定

#### 工作内容
1. 执行生产构建: `npm run build`
2. 检查构建日志
3. 预览构建结果: `npm start`

#### 检查清单
- [ ] 构建无错误
- [ ] 构建无警告（或记录已知警告）
- [ ] 路由生成正确
- [ ] 静态资源正确

---

### 子任务 8: Footer 修复

**状态**: ⬜ 待开始
**预计耗时**: 30 分钟
**负责人**: 待定
**依赖**: 子任务 2

#### 问题说明
当前首页使用 SimpleClawLanding 内部的简单 footer，而非 caricature-maker-art 的完整配置驱动 Footer 组件。

#### 修改内容

**修改 8.1: layout.tsx 添加 Footer 组件**

**文件**: `src/app/[locale]/(default)/layout.tsx`

```typescript
// 新增导入
import Footer from "@/components/blocks/footer";
import { getLandingPage } from "@/services/page";

export default async function DefaultLayout({...}) {
  const { locale } = await params;
  const page = await getLandingPage(locale);  // 新增

  return (
    <LandingTheme ...>
      <BlogPrefetch locale={locale} />
      <main className="overflow-x-hidden">{children}</main>
      {page.footer && <Footer footer={page.footer} />}  // 新增
    </LandingTheme>
  );
}
```

**修改 8.2: SimpleClawLanding 移除内部 footer**

**文件**: `src/components/landing/simpleclaw-landing.tsx`

```diff
      </main>

-     <footer className="border-t border-border/60 py-10">
-       <div className="container flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
-         <span>© 2026 EasyClaw. All rights reserved.</span>
-         <a href="mailto:support@easyclaw.pro">Contact Support</a>
-       </div>
-     </footer>
-
      {/* Connect Telegram Dialog */}
```

#### 检查清单
- [ ] layout.tsx 正确导入 Footer 组件
- [ ] layout.tsx 调用 getLandingPage 获取配置
- [ ] SimpleClawLanding 内部 footer 已删除
- [ ] 页面底部显示完整的配置驱动 Footer
- [ ] Footer 样式与首页风格一致
- [ ] 导航链接、邮件链接、法律条款链接正常

---

### 子任务 9: 浏览器测试

**状态**: ⬜ 待开始
**预计耗时**: 30 分钟
**负责人**: 待定
**依赖**: 子任务 6, 子任务 8

#### 测试内容

**9.1 营销区块测试**
- [ ] Use Cases 显示在 SimpleClawLanding 下方
- [ ] Branding 技术栈图标正确显示
- [ ] Features 6个特性卡片网格布局
- [ ] Pricing 月付/年付切换正常
- [ ] FAQ 折叠面板可展开/收起
- [ ] CTA 行动召唤区块显示

**9.2 Footer 测试**
- [ ] Footer 位于页面最底部
- [ ] Logo 和描述正确显示
- [ ] About 导航列（Features/Pricing/Blog/FAQ）
- [ ] 邮件支持链接可点击
- [ ] 免责声明文本显示
- [ ] 版权信息正确
- [ ] 法律条款链接（Privacy/Terms/Refund）

**9.3 响应式测试**
- [ ] 桌面端（1920px）: 所有区块显示
- [ ] 平板端（768px）: 布局自适应
- [ ] 移动端（375px）: 部分区块隐藏，Footer 正常显示

**9.4 多语言测试**
- [ ] `/en` 英文页面所有文案正确
- [ ] `/zh` 中文页面所有文案正确
- [ ] Footer 语言切换正确

#### 测试工具
使用浏览器 DevTools:
1. Elements 面板检查 DOM 结构
2. Network 面板确认资源加载
3. Lighthouse 检查性能和可访问性
4. Device Toolbar 测试响应式

---

### 子任务 10: 代码审查与提交

**状态**: ⬜ 待开始
**预计耗时**: 30 分钟
**负责人**: 待定

#### 审查清单
- [ ] 代码符合项目规范
- [ ] 无 console.log 调试代码
- [ ] 无未使用的导入
- [ ] TypeScript 类型正确
- [ ] 异步函数有错误处理

#### 提交信息
```
feat(homepage): migrate to config-driven architecture

- Refactor page.tsx to use JSON config-driven block rendering
- Add dynamic imports for non-critical sections
- Enable marketing blocks: UseCases, Branding, Features, etc.
- Update i18n configs (en, zh) with new section content
- Simplify SimpleClawLanding to focus on core deployment
- Fix footer to use config-driven Footer component
- Add generateMetadata for SEO
- Support responsive layout with hidden md:block

BREAKING CHANGE: Homepage now depends on landing/*.json configs
```

---

## 依赖关系

```
┌─────────────────────────────────────────────────────────────┐
│                      依赖关系图                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   子任务 1: 准备环境                                          │
│        │                                                    │
│        ▼                                                    │
│   子任务 2: 修改 page.tsx ───────────────────┐              │
│        │                                      │              │
│        ▼                                      │              │
│   子任务 3: 扩展 en.json                      │              │
│        │                                      │              │
│        ▼                                      ▼              │
│   子任务 4: 扩展 zh.json ◀───────────── 子任务 5: 简化组件    │
│        │                                      │              │
│        └────────────────┬─────────────────────┘              │
│                         │                                   │
│                         ▼                                   │
│                  子任务 6: 本地测试                          │
│                         │                                   │
│                         ▼                                   │
│                  子任务 7: 构建测试                          │
│                         │                                   │
│                         ▼                                   │
│                  子任务 8: Footer 修复                       │
│                         │                                   │
│                         ▼                                   │
│                  子任务 9: 浏览器测试                         │
│                         │                                   │
│                         ▼                                   │
│                  子任务 10: 代码提交                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 风险与应对

| 风险 | 可能性 | 影响 | 应对措施 |
|------|--------|------|----------|
| 部署功能异常 | 低 | 高 | 充分测试部署流程；保留原有组件备份 |
| JSON 语法错误 | 中 | 中 | 使用 IDE 自动格式化；JSON 校验工具 |
| 样式冲突 | 中 | 中 | CSS 隔离；逐步迁移；视觉回归测试 |
| 性能下降 | 低 | 中 | 懒加载优化；代码分割；性能监控 |
| 多语言遗漏 | 中 | 低 | 检查清单；回退机制；翻译工具 |

---

## 回滚方案

如遇严重问题，执行以下回滚步骤：

1. 恢复备份的 `page.tsx`
2. 恢复备份的 `simpleclaw-landing.tsx`
3. 回滚 `en.json` 和 `zh.json` 的修改
4. 重新部署

```bash
# 回滚命令示例
git checkout -- src/app/\[locale\]/\(default\)/page.tsx
git checkout -- src/components/landing/simpleclaw-landing.tsx
git checkout -- src/i18n/pages/landing/en.json
```

---

## 参考资源

### 文档
- [需求文档](./requirements.md)
- [设计文档](./design.md)

### 参考代码
- `caricature-maker-art/src/app/[locale]/(default)/page.tsx`
- `caricature-maker-art/src/i18n/pages/landing/en.json`
- 现有 `src/components/blocks/*` 组件

### 相关文件
```
src/
├── app/[locale]/(default)/page.tsx              # 主要修改
├── components/landing/simpleclaw-landing.tsx    # 简化修改
├── i18n/pages/landing/en.json                   # 扩展配置
├── i18n/pages/landing/zh.json                   # 扩展配置
├── services/page.ts                             # 复用（无需修改）
└── types/pages/landing.ts                       # 可能需要扩展
```

---

## 备注

- 本任务为架构级改造，影响首页展示
- 建议非高峰期执行
- 完成后需通知团队成员新的配置管理方式
- 后续内容更新优先修改 JSON 配置而非代码

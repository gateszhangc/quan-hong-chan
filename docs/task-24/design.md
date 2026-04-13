# 任务24 - 设计文档：首页配置驱动化改造

## 1. 整体架构设计

### 1.1 架构图

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              首页架构（改造后）                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                     src/app/[locale]/(default)/page.tsx              │   │
│   │  ┌─────────────────────────────────────────────────────────────────┐│   │
│   │  │  1. getLandingPage(locale) - 获取 JSON 配置                      ││   │
│   │  │  2. 渲染 SimpleClawLanding（保留核心部署功能）                    ││   │
│   │  │  3. 按顺序渲染各区块组件                                         ││   │
│   │  └─────────────────────────────────────────────────────────────────┘│   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│         ┌──────────────────────────┼──────────────────────────┐             │
│         │                          │                          │             │
│         ▼                          ▼                          ▼             │
│   ┌───────────┐            ┌─────────────┐            ┌───────────────┐    │
│   │ JSON 配置  │            │  核心功能    │            │   区块组件     │    │
│   │ 数据源     │◀──────────▶│ SimpleClaw  │            │  (动态导入)    │    │
│   │            │            │  Landing    │            │               │    │
│   │ en.json    │            │             │            │ • UseCases    │    │
│   │ zh.json    │            │ • 模型选择   │            │ • Branding    │    │
│   │ ...        │            │ • 渠道选择   │            │ • Feature     │    │
│   └───────────┘            │ • 部署逻辑   │            │ • Showcase    │    │
│                            │             │            │ • Pricing     │    │
│                            └─────────────┘            │ • FAQ         │    │
│                                                       │ • ...         │    │
│                                                       └───────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 页面区块顺序

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. Header (导航栏) - 配置驱动                                               │
│    ├── Logo + 品牌名                                                         │
│    ├── 导航链接 (Features/Pricing/Blog/FAQ)                                 │
│    └── 右侧按钮 (Sign in)                                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. Hero + 核心部署区 (SimpleClawLanding) - 保持现有实现                      │
│    ├── 标题 + 描述                                                           │
│    ├── 模型选择卡片 (Claude/GPT/Gemini)                                      │
│    ├── 渠道选择卡片 (Telegram/Discord/WhatsApp)                             │
│    ├── Token 输入 + 部署按钮                                                   │
│    └── 部署状态显示                                                           │
│    ⚠️ 注意：保持现有 SimpleClawLanding，不替换为 caricature-maker-art 的 hero
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. Use Cases (新增)                                                         │
│    ├── Stand-Out Avatar                                                     │
│    ├── Gift-Ready Art                                                       │
│    └── Marketing Visuals                                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ 4. Branding (启用)                                                          │
│    └── Next.js / React / TailwindCSS / Shadcn/UI / Vercel                   │
├─────────────────────────────────────────────────────────────────────────────┤
│ 5. Usage (启用)                                                             │
│    └── 3步使用流程                                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│ 6. Introduce (禁用)                                                         │
│    └── How to Make a Caricature                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ 7. Benefit (禁用)                                                           │
│    └── Why Use OpenClaw?                                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ 8. Benefit Showcase (禁用)                                                  │
│    └── Before/After 对比展示                                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│ 9. Feature (启用)                                                           │
│    └── 6个特性卡片网格                                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│ 10. Stats (启用)                                                            │
│    └── 3个数据统计                                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│ 11. Testimonial (禁用)                                                      │
│    └── 用户评价                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│ 12. FAQ (启用)                                                              │
│    └── 折叠问答面板                                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ 13. CTA (启用)                                                              │
│     └── Ready to Make Yours?                                                │
├─────────────────────────────────────────────────────────────────────────────┤
│ 11. Footer (配置驱动)                                                        │
│     ├── Logo + 描述                                                          │
│     ├── 导航链接                                                            │
│     └── 法律条款                                                            │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 2. 数据结构设计

### 2.1 页面配置结构

```typescript
// src/types/pages/landing.ts

export interface LandingPage {
  template: string;
  theme: "light" | "dark";
  header: Header;
  // hero 由 SimpleClawLanding 硬编码实现，不使用配置
  // hero: Hero;
  
  // 营销区块（与 caricature-maker-art 保持一致）
  use_cases?: Section;
  branding?: Section;
  usage?: Section;           // 3步使用流程
  introduce?: Section;       // 功能介绍（默认禁用）
  benefit?: Section;         // 好处说明（默认禁用）
  benefit_showcase?: Section; // Before/After（默认禁用）
  feature?: Section;
  stats?: Section;
  testimonial?: Section;     // 用户评价（默认禁用）
  pricing?: Pricing;
  faq?: Section;
  cta?: Section;
  footer: Footer;
}

export interface Section {
  name?: string;
  disabled?: boolean | string;
  title?: string;
  description?: string;
  items?: SectionItem[];
}

export interface SectionItem {
  title?: string;
  description?: string;
  icon?: string;
  image?: Image;
  buttons?: Button[];
  // ... 其他属性
}
```

### 2.2 JSON 配置示例

```json
{
  "template": "shipany-template-one",
  "theme": "light",
  "header": {
    "brand": {
      "title": "EasyClaw",
      "logo": { "src": "/imgs/logos/logo.svg", "alt": "EasyClaw" }
    },
    "nav": {
      "items": [
        { "title": "Features", "url": "/#feature", "icon": "RiSparkling2Line" },
        { "title": "Pricing", "url": "/pricing", "icon": "RiMoneyDollarCircleLine" },
        { "title": "Blog", "url": "/posts", "icon": "RiArticleLine" }
      ]
    }
  },
  
  "hero": {
    "_note": "SimpleClawLanding 组件硬编码了 hero 内容，不使用此配置"
  },
  
  "use_cases": {
    "disabled": false,
    "name": "use-cases",
    "title": "Deploy OpenClaw for any workflow",
    "description": "One assistant, many use cases...",
    "items": [
      {
        "title": "Daily Briefings",
        "description": "Get automated summaries...",
        "image": { "src": "/images/use-case-1.png" },
        "buttons": [{ "title": "Learn more →", "url": "/#deploy" }]
      }
    ]
  },
  
  "branding": {
    "disabled": false,
    "title": "Powered by Advanced Technology",
    "items": [
      { "title": "Next.js", "image": { "src": "..." } },
      { "title": "React", "image": { "src": "..." } }
    ]
  },
  
  "feature": {
    "disabled": false,
    "name": "feature",
    "title": "Why Choose EasyClaw",
    "items": [
      {
        "title": "Deploy in Seconds",
        "description": "No server setup required",
        "icon": "RiRocketLine"
      }
    ]
  },
  
  "pricing": {
    "disabled": false,
    "title": "Simple Pricing",
    "groups": [{ "name": "monthly", "title": "Monthly" }],
    "items": [...]
  },
  
  "faq": {
    "disabled": false,
    "name": "faq",
    "title": "Common Questions",
    "items": [
      { "title": "Is EasyClaw free?", "description": "..." }
    ]
  }
}
```

## 3. 组件设计

### 3.1 页面入口组件

```typescript
// src/app/[locale]/(default)/page.tsx

import dynamic from "next/dynamic";
import { getLandingPage } from "@/services/page";

// 核心部署组件（同步加载，首屏必需）
import SimpleClawLanding from "@/components/landing/simpleclaw-landing";

// 营销区块（懒加载，非首屏）
const UseCases = dynamic(() => import("@/components/blocks/use-cases"));
const Branding = dynamic(() => import("@/components/blocks/branding"));
const Feature3 = dynamic(() => import("@/components/blocks/feature3"));
const BenefitShowcase = dynamic(() => import("@/components/blocks/benefit-showcase"));
const Feature = dynamic(() => import("@/components/blocks/feature"));
const Showcase = dynamic(() => import("@/components/blocks/showcase"));
const Stats = dynamic(() => import("@/components/blocks/stats"));
const Pricing = dynamic(() => import("@/components/blocks/pricing"));
const FAQ = dynamic(() => import("@/components/blocks/faq"));
const CTA = dynamic(() => import("@/components/blocks/cta"));

export async function generateMetadata({ params }) {
  const { locale } = await params;
  
  // Hero 由 SimpleClawLanding 硬编码，metadata 也硬编码或简化
  return {
    title: "EasyClaw - Deploy OpenClaw in under 1 minute",
    description: "EasyClaw handles infrastructure so you can launch OpenClaw without servers or DevOps.",
    // ... SEO 配置
  };
}

export default async function LandingPage({ params }) {
  const { locale } = await params;
  const page = await getLandingPage(locale);
  
  // 辅助函数：检查区块是否启用
  const isEnabled = (section?: { disabled?: boolean | string }) => {
    if (!section) return false;
    return section.disabled !== true && section.disabled !== "true";
  };

  return (
    <>
      {/* Hero + 核心部署功能（SimpleClawLanding 硬编码） */}
      <SimpleClawLanding />
      
      {/* 营销区块（配置驱动，位于 SimpleClawLanding 下方，与 caricature-maker-art 一致） */}
      {isEnabled(page.use_cases) && (
        <div className="hidden md:block">
          <UseCases section={page.use_cases!} />
        </div>
      )}
      
      {isEnabled(page.branding) && (
        <Branding section={page.branding!} />
      )}
      
      {isEnabled(page.usage) && (
        <div className="hidden md:block">
          <Feature3 section={page.usage!} />
        </div>
      )}
      
      {isEnabled(page.introduce) && (
        <div className="hidden md:block">
          <Feature1 section={page.introduce!} />
        </div>
      )}
      
      {isEnabled(page.benefit) && (
        <div className="hidden md:block">
          <Feature2 section={page.benefit!} />
        </div>
      )}
      
      {isEnabled(page.benefit_showcase) && (
        <div className="hidden md:block">
          <BenefitShowcase section={page.benefit_showcase!} />
        </div>
      )}
      
      {isEnabled(page.feature) && (
        <div className="hidden md:block">
          <Feature section={page.feature!} />
        </div>
      )}
      
      {isEnabled(page.stats) && (
        <Stats section={page.stats!} />
      )}
      
      {isEnabled(page.testimonial) && (
        <Testimonial section={page.testimonial!} />
      )}
      
      {isEnabled(page.pricing) && (
        <Pricing pricing={page.pricing!} />
      )}
      
      {isEnabled(page.faq) && (
        <FAQ section={page.faq!} />
      )}
      
      {isEnabled(page.cta) && (
        <CTA section={page.cta!} />
      )}
    </>
  );
}
```

### 3.2 布局组件改造

```typescript
// src/app/[locale]/(default)/layout.tsx（已有，无需修改）

import Header from "@/components/blocks/header";
import Footer from "@/components/blocks/footer";
import { getLandingPage } from "@/services/page";

export default async function DefaultLayout({ children, params }) {
  const { locale } = await params;
  const page = await getLandingPage(locale);

  return (
    <LandingTheme>
      {page.header && <Header header={page.header} />}
      <main>{children}</main>
      {page.footer && <Footer footer={page.footer} />}
    </LandingTheme>
  );
}
```

## 4. 响应式设计

### 4.1 断点策略

```
┌─────────────────────────────────────────────────────────────┐
│                      响应式断点                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   桌面端 (lg: 1024px+)                                       │
│   ├─ 所有区块完整显示                                        │
│   ├─ 网格布局: 3列 (Features/Pricing)                        │
│   └─ 导航: 水平展开                                          │
│                                                             │
│   平板端 (md: 768px - 1023px)                                │
│   ├─ 部分区块隐藏                                            │
│   ├─ 网格布局: 2列                                           │
│   └─ 导航: 简化显示                                          │
│                                                             │
│   移动端 (< 768px)                                           │
│   ├─ 营销区块大部分隐藏 (hidden md:block)                    │
│   ├─ 网格布局: 1列                                           │
│   └─ 导航: 汉堡菜单                                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 隐藏策略

```typescript
// 移动端隐藏非核心区块
<div className="hidden md:block">
  <UseCases ... />
  <Branding ... />
  <BenefitShowcase ... />
  <Feature ... />
</div>

// 始终显示的区块
<SimpleClawLanding />  // 核心功能
<Pricing ... />         // 转化关键
<FAQ ... />             // 用户支持
```

## 5. 性能优化设计

### 5.1 加载策略

```
┌─────────────────────────────────────────────────────────────┐
│                      加载优先级                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   立即加载 (Critical)                                        │
│   ├── SimpleClawLanding (核心功能)                          │
│   └── Header/Footer (布局框架)                              │
│                                                             │
│   懒加载 (Lazy)                                              │
│   ├── UseCases                                              │
│   ├── Branding                                              │
│   ├── Feature3                                              │
│   ├── BenefitShowcase                                       │
│   ├── Feature                                               │
│   ├── Showcase                                              │
│   ├── Stats                                                 │
│   ├── Pricing                                               │
│   ├── FAQ                                                   │
│   └── CTA                                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 代码分割

```typescript
// 使用动态导入实现代码分割
const UseCases = dynamic(
  () => import("@/components/blocks/use-cases"),
  { 
    loading: () => <Skeleton className="h-96" />,
    ssr: false  // 客户端渲染，减少服务端负担
  }
);
```

## 6. 数据结构迁移

### 6.1 从硬编码到配置

**改造前（硬编码）:**
```typescript
// SimpleClawLanding.tsx
const USE_CASES = [
  "Summarize daily briefs",
  "Schedule follow-ups",
  // ... 硬编码数组
];
```

**改造后（配置驱动）:**
```json
// en.json
{
  "use_cases": {
    "title": "What can OpenClaw automate for you?",
    "items": [
      { "title": "Summarize daily briefs", ... },
      { "title": "Schedule follow-ups", ... }
    ]
  }
}
```

### 6.2 保留的核心数据

SimpleClawLanding 中保留的数据：
- MODELS（模型配置）
- CHANNELS（渠道配置）
- 部署逻辑（状态管理、API 调用）

迁移到配置的数据：
- USE_CASES → use_cases
- TRADITIONAL_STEPS / SIMPLECLAW_STEPS → usage
- 所有 UI 文案

## 7. 错误处理

### 7.1 配置缺失处理

```typescript
// 安全的配置访问
const title = page.use_cases?.title ?? "Default Title";
const items = page.use_cases?.items ?? [];

// 条件渲染
{page.use_cases && page.use_cases.items && page.use_cases.items.length > 0 && (
  <UseCases section={page.use_cases} />
)}
```

### 7.2 回退机制

```typescript
// i18n 回退
export async function getLandingPage(locale: string) {
  try {
    return await import(`@/i18n/pages/landing/${locale}.json`);
  } catch {
    // 回退到英文
    return await import(`@/i18n/pages/landing/en.json`);
  }
}
```

## 8. 文件结构

```
src/
├── app/[locale]/(default)/
│   ├── page.tsx              # 改造后的首页入口
│   └── layout.tsx            # 布局（无需修改）
├── components/
│   ├── blocks/               # 区块组件（已有）
│   │   ├── use-cases/
│   │   ├── branding/
│   │   ├── feature/
│   │   └── ...
│   └── landing/
│       └── simpleclaw-landing.tsx  # 简化后保留核心功能
├── i18n/pages/landing/
│   ├── en.json               # 扩展配置
│   ├── zh.json
│   └── ...
└── types/pages/
    └── landing.ts            # 类型定义（可能需要扩展）
```


## 9. Footer 修复设计

### 9.1 现状问题分析

当前 EasyClaw 首页使用 **SimpleClawLanding 内部的简单 footer**，而非 caricature-maker-art 的 **完整配置驱动 Footer 组件**。

**对比差异**:

| 项目 | 当前 EasyClaw | caricature-maker-art |
|------|--------------|---------------------|
| **位置** | SimpleClawLanding 内部（硬编码） | layout.tsx 中（配置驱动） |
| **组件** | 简单的 `<footer>` 标签 | `Footer` 区块组件 |
| **内容** | 仅版权 + 联系链接 | Logo/描述/导航/社交/免责声明/法律条款 |
| **配置化** | ❌ 不支持 | ✅ 支持 |

**当前代码 (SimpleClawLanding)**:
```tsx
<footer className="border-t border-border/60 py-10">
  <div className="container flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
    <span>© 2026 EasyClaw. All rights reserved.</span>
    <a href="mailto:support@easyclaw.pro">Contact Support</a>
  </div>
</footer>
```

**目标代码 (配置驱动 Footer)**:
```tsx
// 复用已有的 Footer 组件
import Footer from "@/components/blocks/footer";
<Footer footer={page.footer} />
```

### 9.2 修复原则

1. **复用已有组件**: 使用 `src/components/blocks/footer`（已存在且与 caricature-maker-art 一致）
2. **风格保持一致**: Footer 使用 `landing-footer` 样式类，与当前首页风格统一
3. **配置驱动**: 从 `en.json` / `zh.json` 读取 footer 配置
4. **移除重复**: 删除 SimpleClawLanding 内部的简单 footer

### 9.3 修改方案

#### 修改 1: layout.tsx 添加 Footer

**文件**: `src/app/[locale]/(default)/layout.tsx`

```typescript
import Footer from "@/components/blocks/footer";  // 新增导入
import { getLandingPage } from "@/services/page";  // 新增导入

export default async function DefaultLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = await getLandingPage(locale);  // 获取配置

  return (
    <LandingTheme className={`${landingSans.variable} ${landingSerif.variable}`}>
      <BlogPrefetch locale={locale} />
      <main className="overflow-x-hidden">{children}</main>
      {page.footer && <Footer footer={page.footer} />}  // 新增 Footer
    </LandingTheme>
  );
}
```

#### 修改 2: SimpleClawLanding 移除内部 footer

**文件**: `src/components/landing/simpleclaw-landing.tsx`

删除以下代码（约第 495-505 行）:

```diff
      </main>

-     <footer className="border-t border-border/60 py-10">
-       <div className="container flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
-         <span>© 2026 EasyClaw. All rights reserved.</span>
-         <a
-           className="hover:text-foreground transition"
-           href="mailto:support@easyclaw.pro"
-         >
-           Contact Support
-         </a>
-       </div>
-     </footer>
-
      {/* Connect Telegram Dialog */}
```

### 9.4 Footer 配置验证

**文件**: `src/i18n/pages/landing/en.json`

确认 footer 配置完整（已存在）:

```json
{
  "footer": {
    "name": "footer",
    "brand": {
      "title": "EasyClaw",
      "description": "The easiest way to deploy OpenClaw AI assistant.",
      "logo": {
        "src": "/imgs/logos/logo.svg",
        "alt": "EasyClaw"
      },
      "url": "/"
    },
    "copyright": "© 2026 • OpenClaw. All rights reserved.",
    "nav": {
      "items": [
        {
          "title": "About",
          "children": [
            { "title": "Features", "url": "/#feature", "target": "_self" },
            { "title": "Pricing", "url": "/pricing", "target": "_self" },
            { "title": "Blog", "url": "/posts", "target": "_self" },
            { "title": "FAQ", "url": "/#faq", "target": "_self" }
          ]
        }
      ]
    },
    "social": {
      "items": [
        {
          "title": "Email Support",
          "icon": "RiMailLine",
          "url": "mailto:support@easyclaw.pro",
          "target": "_self"
        }
      ]
    },
    "disclaimer": "EasyClaw is an independent product and is not affiliated with any third-party model providers or trademark owners.",
    "agreement": {
      "items": [
        { "title": "Privacy Policy", "url": "/privacy-policy" },
        { "title": "Terms of Service", "url": "/terms-of-service" },
        { "title": "Refund Policy", "url": "/refund-policy" }
      ]
    }
  }
}
```

### 9.5 Footer 样式说明

Footer 组件已使用与首页一致的样式类：

```css
.landing-footer {
  /* 与 SimpleClawLanding 风格一致 */
  py-8 md:py-16          /* 上下内边距 */
  max-w-7xl mx-auto      /* 最大宽度居中 */
  px-8                   /* 水平内边距 */
}
```

当前 `.env.development` 和 `.env.production` 中已设置：
```bash
NEXT_PUBLIC_SHOW_POWERED_BY="false"
```

因此不会显示 "build with ShipAny" 链接。

### 9.6 预期效果

**修改前**:
```
┌─────────────────────────────────────────────────────────┐
│  © 2026 EasyClaw. All rights reserved.  Contact Support │
└─────────────────────────────────────────────────────────┘
```

**修改后** (与 caricature-maker.art 一致):
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  🦀 EasyClaw                About                               │
│  The easiest way to         ├── Features                        │
│  deploy OpenClaw...         ├── Pricing                         │
│                             ├── Blog                            │
│  [📧]                       └── FAQ                             │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  support: support@easyclaw.pro                                  │
│  EasyClaw is an independent product... (disclaimer)             │
├─────────────────────────────────────────────────────────────────┤
│  © 2026 • OpenClaw. All rights reserved.    Privacy  Terms      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 9.7 浏览器测试要点

修改完成后，使用浏览器验证：

1. **布局检查**:
   - [ ] Footer 位于页面最底部
   - [ ] Logo 和标题正确显示
   - [ ] 导航链接（Features/Pricing/Blog/FAQ）可点击
   - [ ] 邮件链接正确

2. **样式检查**:
   - [ ] 与首页风格一致（字体/颜色/间距）
   - [ ] 响应式布局正常（桌面/平板/移动端）
   - [ ] 无 "build with ShipAny" 链接（因已配置为 false）

3. **功能检查**:
   - [ ] 导航链接跳转正确
   - [ ] 邮件链接可点击
   - [ ] 法律条款链接（Privacy/Terms/Refund）正确

4. **多语言检查**:
   - [ ] 英文页面显示英文 Footer
   - [ ] 中文页面显示中文 Footer

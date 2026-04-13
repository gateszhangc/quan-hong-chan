# 任务23 - 执行任务文档

## 任务概览

| 属性 | 值 |
|------|-----|
| 任务ID | task-23 |
| 任务名称 | 首页导航栏添加 Blog 和 Pricing 按钮 |
| 优先级 | P1 |
| 预计工时 | 2小时 |
| 关联需求 | [requirements.md](./requirements.md) |
| 设计方案 | [design.md](./design.md) |

---

## 子任务列表

### 子任务 1: 修改英文版配置
**文件**: `src/i18n/pages/landing/en.json`

**修改内容**:
在 `header` 对象中添加 `buttons` 数组：

```json
{
  "header": {
    "brand": { ... },
    "nav": { ... },
    "buttons": [
      {
        "title": "Blog",
        "url": "/posts",
        "variant": "outline",
        "icon": "RiArticleLine"
      },
      {
        "title": "Pricing",
        "url": "/pricing",
        "variant": "default",
        "icon": "RiMoneyDollarCircleLine"
      }
    ],
    "show_sign": true,
    "show_locale": true,
    "show_theme": true
  }
}
```

**验收标准**:
- [ ] JSON 格式正确，无语法错误
- [ ] `buttons` 数组包含两个按钮对象
- [ ] Blog 按钮 variant 为 "outline"
- [ ] Pricing 按钮 variant 为 "default"

---

### 子任务 2: 修改中文版配置
**文件**: `src/i18n/pages/landing/zh.json`

**修改内容**:
与英文版相同结构，文案改为中文：

```json
{
  "header": {
    "buttons": [
      {
        "title": "博客",
        "url": "/posts",
        "variant": "outline",
        "icon": "RiArticleLine"
      },
      {
        "title": "价格",
        "url": "/pricing",
        "variant": "default",
        "icon": "RiMoneyDollarCircleLine"
      }
    ]
  }
}
```

**验收标准**:
- [ ] 中文文案正确
- [ ] 其他语言文件同步更新（如有需要）

---

### 子任务 3: 同步其他语言配置
**文件**: 
- `src/i18n/pages/landing/zh-cn.json`
- `src/i18n/pages/landing/zh-tw.json`
- `src/i18n/pages/landing/ja.json`
- `src/i18n/pages/landing/ko.json`
- ... (其他支持的语言)

**修改内容**:
根据各语言的对应翻译添加 `buttons` 配置。

**优先级**: P2（可先实现英文版）

---

### 子任务 4: 本地开发测试
**步骤**:
1. 启动开发服务器: `npm run dev`
2. 访问首页: `http://localhost:3000`
3. 验证桌面端：
   - [ ] 导航栏右侧显示 Blog 和 Pricing 按钮
   - [ ] Blog 按钮样式为 outline
   - [ ] Pricing 按钮样式为 default（主色）
   - [ ] 点击 Blog 跳转到 `/posts`
   - [ ] 点击 Pricing 跳转到 `/pricing`
4. 验证移动端：
   - [ ] 点击汉堡菜单展开
   - [ ] 底部显示 Blog 和 Pricing 按钮
   - [ ] 按钮可正常点击跳转
5. 验证埋点：
   - [ ] 点击 Pricing 按钮时触发 `pricing_viewed` 事件

---

### 子任务 5: 代码审查与提交
**检查清单**:
- [ ] 代码符合项目编码规范
- [ ] 无 console.log 调试代码
- [ ] 无未使用的导入
- [ ] JSON 文件格式化正确

**提交信息**:
```
feat(header): add Blog and Pricing buttons to landing page navigation

- Add buttons array to landing page header config
- Blog button with outline variant linking to /posts
- Pricing button with default variant linking to /pricing
- Include icons and support responsive layouts
- Update i18n files: en, zh, zh-cn, zh-tw
```

---

## 依赖关系

```
┌─────────────────────────────────────────┐
│           依赖关系图                     │
├─────────────────────────────────────────┤
│                                         │
│   子任务 1: 英文配置                      │
│        │                                │
│        ▼                                │
│   子任务 2: 中文配置                      │
│        │                                │
│        ▼                                │
│   子任务 4: 本地测试                      │
│        │                                │
│        ▼                                │
│   子任务 5: 代码提交                      │
│                                         │
│   （子任务 3 可并行执行）                  │
│                                         │
└─────────────────────────────────────────┘
```

---

## 风险与应对

| 风险 | 可能性 | 影响 | 应对措施 |
|------|--------|------|----------|
| JSON 语法错误 | 低 | 中 | 使用 IDE 自动格式化，提交前验证 |
| 图标不存在 | 低 | 低 | 确认 `RiArticleLine` 和 `RiMoneyDollarCircleLine` 在图标库中 |
| 样式冲突 | 低 | 低 | 使用现有 Button 组件，不自定义样式 |
| 多语言遗漏 | 中 | 低 | 创建检查清单，逐一确认 |

---

## 相关文件

### 配置文件
- `src/i18n/pages/landing/en.json`
- `src/i18n/pages/landing/zh.json`
- `src/i18n/pages/landing/zh-cn.json`
- `src/i18n/pages/landing/zh-tw.json`

### 组件文件（已存在，无需修改）
- `src/components/blocks/header/index.tsx`
- `src/types/blocks/header.d.ts`
- `src/types/blocks/base.d.ts`

### 路由文件（已存在）
- `src/app/[locale]/posts/` - Blog 页面
- `src/app/[locale]/pricing/page.tsx` - Pricing 页面

---

## 测试用例

### TC1: 桌面端按钮显示
**前置条件**: 浏览器窗口宽度 >= 1024px
**步骤**:
1. 访问首页 `/`
**预期结果**:
- 导航栏右侧显示 Blog 和 Pricing 按钮
- Blog 按钮为边框样式
- Pricing 按钮为主色实心样式

### TC2: Blog 按钮跳转
**步骤**:
1. 点击 Blog 按钮
**预期结果**:
- 页面跳转到 `/posts`
- Blog 列表正确显示

### TC3: Pricing 按钮跳转与埋点
**步骤**:
1. 打开浏览器开发者工具，切换到 Network 标签
2. 点击 Pricing 按钮
**预期结果**:
- 页面跳转到 `/pricing`
- Network 中发送 `pricing_viewed` 事件请求

### TC4: 移动端按钮显示
**前置条件**: 浏览器窗口宽度 < 768px
**步骤**:
1. 访问首页 `/`
2. 点击右上角汉堡菜单
**预期结果**:
- 菜单底部显示 Blog 和 Pricing 按钮
- 按钮样式与桌面端一致

### TC5: 多语言切换
**步骤**:
1. 访问首页 `/`
2. 点击语言切换按钮，选择中文
**预期结果**:
- 按钮文案变为 "博客" 和 "价格"
- 功能正常

---

## 备注

1. 本任务仅涉及配置文件修改，无需修改组件代码
2. Header 组件已支持 `buttons` 数组渲染，无需额外开发
3. 埋点追踪逻辑已集成在 Header 组件中
4. 如需调整按钮顺序，修改 JSON 中数组元素的顺序即可

# 任务36 - 开发任务清单

## 任务概览

实现订阅名额限制功能，最大支持4个用户订阅，满员时显示等待列表。

---

## 任务列表

### 阶段1：基础配置

- [x] 1.1 创建常量配置文件
  - 文件: `src/lib/constants.ts`
  - 内容: `export const SUBSCRIPTION_LIMIT = 4;`

- [x] 1.2 更新数据库 Schema
  - 文件: `src/db/schema.ts`
  - 添加 `waitlist` 表定义

- [x] 1.3 创建数据库迁移文件
  - 文件: `src/db/migrations/0003_add_waitlist_table.sql`
  - 创建 waitlist 表

### 阶段2：后端 API 开发

- [x] 2.1 创建名额状态查询 API
  - 文件: `src/app/api/subscription/limit-status/route.ts`
  - 功能: 
    - 查询当前活跃订阅用户数
    - 计算剩余名额
    - 返回 total/used/remaining/isFull

- [x] 2.2 创建等待列表 API
  - 文件: `src/app/api/waitlist/route.ts`
  - 功能:
    - 接收邮箱地址
    - 验证邮箱格式
    - 保存到 waitlist 表
    - 防重复提交

- [x] 2.3 修改订单创建 API
  - 文件: `src/app/api/checkout/route.ts`
  - 功能:
    - 订阅类型订单检查名额限制
    - 满员时返回 SUBSCRIPTION_FULL 错误

### 阶段3：前端组件开发

- [x] 3.1 创建订阅限制 Hook
  - 文件: `src/hooks/useSubscriptionLimit.ts`
  - 功能:
    - 获取名额状态
    - 管理加载状态
    - 定时刷新

- [x] 3.2 创建等待列表表单组件
  - 文件: `src/components/waitlist/form.tsx`
  - 功能:
    - 邮箱输入框
    - 提交按钮
    - 成功/错误提示

- [x] 3.3 创建名额显示组件
  - 文件: `src/components/subscription/spots-indicator.tsx`
  - 功能:
    - 有名额时显示 "🔥 Only X spots left"
    - 满员时显示等待列表入口

- [x] 3.4 修改首页 Deploy 区域
  - 文件: `src/components/landing/simpleclaw-landing.tsx`
  - 修改:
    - Deploy 按钮下方添加名额显示
    - 满员时禁用 Deploy 按钮
    - 显示等待列表表单

- [x] 3.5 修改 Pricing 页面
  - 文件: `src/components/blocks/pricing/index.tsx`
  - 修改:
    - Monthly/Annually 切换按钮上方添加名额显示
    - 满员时修改 Subscribe 按钮为 Notify Me

### 阶段4：测试

- [x] 4.1 编写 Playwright 测试
  - 文件: `e2e/subscription-limit.spec.ts`
  - 测试场景:
    - 首页显示剩余名额
    - Pricing 页面显示剩余名额
    - 满员时显示等待列表表单
    - 等待列表表单提交成功

- [x] 4.2 运行测试并修复问题

---

## 文件变更清单

### 新建文件
```
src/lib/constants.ts
src/app/api/subscription/limit-status/route.ts
src/app/api/waitlist/route.ts
src/hooks/useSubscriptionLimit.ts
src/components/waitlist/form.tsx
src/components/subscription/spots-indicator.tsx
src/db/migrations/0003_add_waitlist_table.sql
e2e/subscription-limit.spec.ts
```

### 修改文件
```
src/db/schema.ts
src/app/api/checkout/route.ts
src/components/landing/simpleclaw-landing.tsx
src/components/blocks/pricing/index.tsx
```

---

## 开发顺序建议

1. **先完成后端**
   - 常量配置
   - 数据库迁移
   - 两个 API

2. **再完成前端基础**
   - Hook
   - 等待列表表单组件

3. **最后集成到页面**
   - 首页
   - Pricing 页面

4. **测试验证**
   - Playwright 测试

---

## 验收标准

- [x] 首页 Deploy 按钮下方显示 "🔥 Only X spots left"
- [x] Pricing 页面显示名额状态
- [x] 满员时显示等待列表表单
- [x] 等待列表表单可以成功提交邮箱
- [x] 满员时无法创建订阅订单
- [x] 所有组件风格与首页一致
- [x] Playwright 测试通过

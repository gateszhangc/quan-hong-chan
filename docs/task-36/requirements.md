# 任务36 - 订阅限制功能需求文档

## 背景

目前平台暂时只支持 **4个用户** 订阅。当达到限制时，需要给用户友好的提示，并提供等待列表功能。

## 需求概述

实现订阅名额限制功能，包括：
1. 实时显示剩余订阅名额
2. 名额满时显示等待列表入口
3. 阻止超过限制的订阅购买
4. 收集等待用户的邮箱

## 详细需求

### 功能需求

#### 1. 名额显示
- **位置1**: 首页 Deploy 按钮下方
- **位置2**: Pricing 页面 Monthly/Annually 切换按钮上方
- **显示内容**: 
  - 有名额时: "🔥 Only X spots left"
  - 满员时: "We're at capacity! Add your email to get early access when spots become available."

#### 2. 等待列表
- 当名额已满时，显示邮箱输入框
- 用户提交邮箱后保存到等待列表
- 提示用户已加入等待列表

#### 3. 购买限制
- 创建订单时检查当前订阅人数
- 达到限制时返回错误: "We're at capacity! Add your email to get early access when spots become available."
- 错误码: `SUBSCRIPTION_FULL`

### 非功能需求

- 名额检查需要实时准确
- 等待列表提交需要防重复
- 组件风格与首页保持一致（深色主题、圆角、渐变）

## 限制条件

- 最大订阅数: 4
- 只限制订阅类型订单 (month/year)
- 一次性购买不受影响

## 接口需求

### API 1: 获取名额状态
```
GET /api/subscription/limit-status
Response:
{
  "code": 0,
  "data": {
    "total": 4,
    "used": 2,
    "remaining": 2,
    "isFull": false
  }
}
```

### API 2: 加入等待列表
```
POST /api/waitlist
Body: { "email": "user@example.com" }
Response:
{
  "code": 0,
  "data": { "success": true }
}
```

## 数据库需求

新建 `waitlist` 表:
```sql
- id: UUID PRIMARY KEY
- email: VARCHAR(255) NOT NULL
- created_at: TIMESTAMP
- notified_at: TIMESTAMP (可空)
- status: VARCHAR(50) DEFAULT 'pending' (pending/notified/converted)
```

## 文案规范

| 场景 | 英文文案 | 中文文案 |
|------|----------|----------|
| 有名额 | 🔥 Only X spots left | 🔥 仅剩 X 个名额 |
| 满员 | We're at capacity! Add your email to get early access when spots become available. | 名额已满！留下邮箱，有名额时第一时间通知您 |
| 输入框占位符 | Enter your email | 请输入邮箱 |
| 按钮 | Notify Me | 通知我 |
| 成功提示 | You've been added to the waitlist! | 已加入等待列表！ |

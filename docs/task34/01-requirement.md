# Task 34 - 账号池分层 (Starter/Pro) 需求文档

## 背景
当前账号池只有一个统一池，所有用户共享相同的 API Key。需要支持两种订阅级别：
- **Starter**：基础用户，使用 Starter 类型的 API Key
- **Pro**：付费用户，使用 Pro 类型的 API Key

## 需求概述
根据用户订阅级别，从对应类型的账号池中分配 API Key。

## 功能需求

### FR1: 账号导入支持指定级别
- 导入账号时可选择 `tier`: `starter` 或 `pro`
- 不指定时默认为 `starter`

### FR2: 按级别分配账号
- Starter 用户从 Starter 池获取账号
- Pro 用户从 Pro 池获取账号

### FR3: 用户订阅信息
- 从请求头 `x-subscription-tier` 获取用户订阅级别
- 值为 `starter` 或 `pro`，默认为 `starter`

### FR4: 账号列表筛选
- 支持按 `tier` 筛选查看账号

## 非功能需求
- 向后兼容：现有无 `tier` 的账号视为 `starter`
- 最小改动：保持现有架构，仅增加必要字段

## 验收标准
- [ ] Starter 用户成功获取 Starter 账号
- [ ] Pro 用户成功获取 Pro 账号
- [ ] 账号池耗尽时返回明确错误
- [ ] 现有功能不受影响

# Task 12: Deploy OpenClaw 按钮 - 任务拆分

## 任务列表

### Task 12.1: 修改登录区域布局
**文件**: `src/components/landing/simpleclaw-landing.tsx`

**工作内容**:
- [ ] 在登录信息下方添加部署按钮区域
- [ ] 调整布局结构，使按钮与登录信息在同一卡片内

**代码位置**: 登录模块渲染区域

---

### Task 12.2: 实现 Deploy 按钮组件 (使用 frontend-design skill)
**文件**: `src/components/landing/simpleclaw-landing.tsx`

**工作内容**:
- [ ] 使用 frontend-design skill 设计按钮样式
- [ ] 创建 Deploy OpenClaw 按钮
- [ ] 添加闪电图标 (Zap from lucide-react)
- [ ] 实现按钮状态样式（默认/禁用/加载）
- [ ] 添加点击事件处理
- [ ] 实现 hover 效果和过渡动画

**样式要求**:
- 使用 Zap 图标
- 深色背景 (bg-muted / bg-secondary)
- 圆角设计 (rounded-xl / rounded-2xl)
- 精致的阴影和边框效果
- 状态变化动画流畅

---

### Task 12.3: 实现前置条件检查
**文件**: `src/components/landing/simpleclaw-landing.tsx`

**工作内容**:
- [ ] 创建 `canDeploy` 计算属性
- [ ] 检查用户登录状态
- [ ] 检查 Model 选择状态
- [ ] 检查 Channel 选择状态
- [ ] 检查 Token 输入状态

---

### Task 12.4: 集成部署 API
**文件**: `src/components/landing/simpleclaw-landing.tsx`

**工作内容**:
- [ ] 复用或修改现有 `handleDeploy` 函数
- [ ] 确保 API 调用参数正确
- [ ] 处理部署状态轮询
- [ ] 错误处理和用户提示

---

### Task 12.5: 添加提示信息
**文件**: `src/components/landing/simpleclaw-landing.tsx`

**工作内容**:
- [ ] 添加 "Connect telegram to continue..." 提示

---

### Task 12.6: 浏览器测试 (开发完成后必须测试)
**测试环境准备**:
```bash
# 启动开发服务器
npm run dev

# 访问页面
open http://localhost:3000
```

**功能测试**:
- [ ] 按钮显示在登录信息下方
- [ ] 按钮样式与设计图一致
- [ ] 闪电图标显示正确
- [ ] 按钮 hover 效果正常
- [ ] 未满足条件时按钮禁用或有提示
- [ ] 点击按钮调用 /api/deploy 接口
- [ ] 部署中显示 loading 状态
- [ ] 部署成功/失败有相应反馈

**样式测试**:
- [ ] 按钮颜色与主题协调
- [ ] 提示文字样式正确
- [ ] 服务器剩余数量显示正常
- [ ] 响应式布局正常

**交互测试**:
- [ ] 按钮点击反馈明显
- [ ] 加载动画流畅
- [ ] 状态切换无闪烁

---

## 文件变更汇总

| 文件                                            | 变更类型 | 说明                   |
| ----------------------------------------------- | -------- | ---------------------- |
| `src/components/landing/simpleclaw-landing.tsx` | 修改     | 添加部署按钮和相关逻辑 |

---

## 预估工作量
- Task 12.1: 0.5h
- Task 12.2: 0.5h
- Task 12.3: 0.5h
- Task 12.4: 0.5h
- Task 12.5: 0.5h
- Task 12.6: 0.5h

**总计**: 约 3 小时

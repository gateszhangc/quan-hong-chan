# AGENTS.md

## Language

- 默认使用简体中文与用户沟通。

## Protected Projects

- 严禁修改、创建、删除或覆盖 `/Users/a1-6/Desktop/code/test/test22` 下的任何文件。
- 严禁在 `/Users/a1-6/Desktop/code/test/test22` 目录中执行会产生副作用的命令，包括但不限于：编辑、格式化、安装、构建、测试、代码生成、移动文件、删除文件。
- 如果任务涉及 `/Users/a1-6/Desktop/code/test/test22`，默认只允许做只读检查；除非用户在当前对话中明确撤销这条限制，否则不要触碰该项目。

## Testing Requirements

- 修改任何代码、配置、路由、接口、部署逻辑或运行时行为后，必须运行与改动直接相关的测试，不能只改不测。
- 没有完成测试前，不要把工作描述为“已完成”。
- 如果改动涉及前端或 UI，必须运行浏览器测试。
- 如果改动涉及后端、代理层、持久化兼容层、部署链路或运行时状态判断，除了单元测试外，还必须补一条能覆盖真实调用链的 smoke test 或等价验证。
- 如果测试无法运行，必须明确说明：
  - 哪些测试没跑
  - 为什么没跑
  - 当前剩余风险是什么

## Preferred Commands

- 后端测试：`npm run test:backend`
- 前端单测 / Vitest：`vitest run` 或 `npx vitest run <path>`
- 浏览器测试：`npx playwright test`
- 定向浏览器测试：`npx playwright test e2e/landing-model-selection.spec.ts`

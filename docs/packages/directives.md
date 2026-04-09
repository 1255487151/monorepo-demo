# `@smallbrother/directives`

## 安装方式

```bash
pnpm add @smallbrother/directives vue
```

当前包对外依赖 `vue`，不依赖其他内部发布包。

## 导出

| 入口                       | 作用                                          |
| -------------------------- | --------------------------------------------- |
| `@smallbrother/directives` | 导出插件默认入口与 `tableAutoHeightDirective` |

## 注册方式

### 插件安装

```ts
import { createApp } from "vue"
import SmallBrotherDirectives from "@smallbrother/directives"

const app = createApp(App)
app.use(SmallBrotherDirectives)
```

### 单独注册指令

```ts
import { tableAutoHeightDirective } from "@smallbrother/directives"

app.directive("table-auto-height", tableAutoHeightDirective)
```

## API

### `tableAutoHeightDirective`

该指令用于为 `el-table` 自动计算可用高度，核心行为包括：

- 基于表格所在容器或窗口高度计算可用空间
- 可选地把分页区占用高度纳入计算
- 支持 `minHeight`、`maxHeight`、`offset` 等约束
- 监听窗口尺寸变化与父容器尺寸变化
- 每次重算后触发表格 `doLayout()`

### 绑定值

| 字段                | 说明                     | 类型                                  | 默认值             |
| ------------------- | ------------------------ | ------------------------------------- | ------------------ |
| `offset`            | 额外减去的高度           | `number`                              | `0`                |
| `includePagination` | 是否把分页区高度纳入计算 | `boolean`                             | `true`             |
| `minHeight`         | 最小高度限制             | `number`                              | `128`              |
| `maxHeight`         | 最大高度限制             | `number`                              | `Infinity`         |
| `watchParent`       | 是否监听父容器尺寸变化   | `boolean`                             | `true`             |
| `calcHeight`        | 自定义高度变换函数       | `(availableHeight: number) => number` | `height => height` |

绑定值还可以是 `false`、`null` 或 `undefined`，用于关闭自动高度能力。

## 示例

```vue
<el-table v-table-auto-height="{ offset: 24, includePagination: true }" :data="rows">
  <!-- columns -->
</el-table>
```

## 行为说明

- 若元素不是 `el-table`，会输出警告并跳过初始化
- 指令会在 `mounted`、`updated`、`unmounted` 生命周期管理监听器和观察器
- 高度计算会优先读取 `.xlg-table-container` 容器，其次回退到窗口高度
- 当无法直接拿到分页容器时，会尝试在上层 DOM 中查找 `.el-pagination`

## 限制

- 指令只适用于 `el-table`
- 指令内部依赖 `ResizeObserver`，在不支持该 API 的环境下会降级。
- 当前公开能力只有表格自动高度，不是完整指令集合

## 依赖与产物

| 项目     | 说明               |
| -------- | ------------------ |
| 内部依赖 | 无内部发布包依赖   |
| 外部依赖 | `vue`              |
| 构建产物 | `ESM + CJS + d.ts` |

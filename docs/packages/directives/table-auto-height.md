# table-auto-height

## 用途说明

`tableAutoHeightDirective` 用于给 `el-table` 计算可用高度，并在窗口尺寸或父容器尺寸变化时重新布局。

## 注册方式

### 插件注册

```ts
import { createApp } from "vue"
import SmallBrotherDirectives from "@smallbrother/directives"

const app = createApp(App)

app.use(SmallBrotherDirectives)
```

### 单独注册

```ts
import { createApp } from "vue"
import { tableAutoHeightDirective } from "@smallbrother/directives"

const app = createApp(App)

app.directive("table-auto-height", tableAutoHeightDirective)
```

## 基础用法

```vue
<template>
  <el-table v-table-auto-height :data="rows">
    <el-table-column prop="name" label="Name" />
  </el-table>
</template>
```

## 带配置的用法

```vue
<template>
  <el-table v-table-auto-height="{ offset: 24, minHeight: 240, maxHeight: 640 }" :data="rows">
    <el-table-column prop="name" label="Name" />
  </el-table>
</template>
```

## 绑定值 / 参数表

| 字段                | 说明                         | 类型                                  | 默认值             |
| ------------------- | ---------------------------- | ------------------------------------- | ------------------ |
| `offset`            | 额外扣除的高度               | `number`                              | `0`                |
| `includePagination` | 是否把分页区域占用高度算进去 | `boolean`                             | `true`             |
| `minHeight`         | 计算结果允许的最小高度       | `number`                              | `128`              |
| `maxHeight`         | 计算结果允许的最大高度       | `number`                              | `Infinity`         |
| `watchParent`       | 是否监听父容器尺寸变化       | `boolean`                             | `true`             |
| `calcHeight`        | 对最终可用高度做二次变换     | `(availableHeight: number) => number` | `height => height` |

也支持直接传 `false`、`null` 或 `undefined` 来关闭自动高度。

## 行为说明

- 指令只会在挂载元素具有 `el-table` 类名时生效。
- 优先从 `.xlg-table-container` 计算可用高度；找不到时退回 `window.innerHeight`。
- 当 `includePagination` 为 `true` 且无法从容器直接算出高度时，会尝试查找分页锚点并扣除对应占位高度。
- 高度写入后会调用 `doLayout()`，确保表格内部重新布局。
- 会监听窗口 resize；当 `watchParent` 为 `true` 时，也会监听父容器尺寸变化。

## 限制条件

- 只能用于 `el-table`。
- 依赖浏览器环境；`ResizeObserver` 不存在时会退回窗口 resize。
- 如果你已经通过 `XlgTable` 使用表格，这项能力已经内置。

## 依赖说明

- 依赖 Vue 指令运行时
- 目标元素需要是 Element Plus 的 `ElTable`

## 关联模块

- [Directives 概览](/packages/directives/)
- [XlgTable](/packages/components/table)

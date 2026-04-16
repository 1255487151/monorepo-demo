# Directives 接入

## 插件注册

```ts
import { createApp } from "vue"
import SmallBrotherDirectives from "@smallbrother/directives"

const app = createApp(App)

app.use(SmallBrotherDirectives)
```

默认插件当前会注册 `v-table-auto-height`。

## 单独注册指令

```ts
import { createApp } from "vue"
import { tableAutoHeightDirective } from "@smallbrother/directives"

const app = createApp(App)

app.directive("table-auto-height", tableAutoHeightDirective)
```

适合你只想接入单个指令，而不希望把整个指令插件入口挂到应用上。

## 基础使用方式

```vue
<el-table v-table-auto-height :data="rows">
  <el-table-column prop="name" label="Name" />
</el-table>
```

指令也支持传入对象配置：

```vue
<el-table
  v-table-auto-height="{ offset: 24, minHeight: 240, includePagination: false }"
  :data="rows"
>
  <el-table-column prop="name" label="Name" />
</el-table>
```

## 接入边界

- 当前导出的核心能力是 `tableAutoHeightDirective`。
- 该指令只能挂在 `el-table` 元素上。
- 如果你是通过 `XlgTable` 使用表格自动高度，不需要再单独注册这一指令。
- 具体 API 说明看 [table-auto-height](/packages/directives/table-auto-height)。

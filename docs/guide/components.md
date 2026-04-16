# Components 接入

## 全局注册

```ts
import { createApp } from "vue"
import ElementPlus from "element-plus"
import SmallBrotherComponents from "@smallbrother/components"
import "@smallbrother/components/style"

const app = createApp(App)

app.use(ElementPlus)
app.use(SmallBrotherComponents)
```

这个入口是纯插件入口。全局安装时要自己显式引入 `@smallbrother/components/style`，这样库样式和组件依赖的 Element Plus 样式都会一起加载。

## 按需注册

```ts
import { XlgSelect, XlgTable } from "@smallbrother/components/components"
```

也可以深导入单组件：

```ts
import XlgSelect from "@smallbrother/components/components/xlg-select"
```

`@smallbrother/components/components` 和 `@smallbrother/components/components/*` 都是纯逻辑入口，不会自动补样式。

## 样式引入

### 聚合样式

```ts
import "@smallbrother/components/style"
```

适用于全局安装和常规按需导入。它会加载组件库聚合 CSS 以及库依赖的 Element Plus 样式。

### 仅库样式

```ts
import "@smallbrother/components/style.css"
```

只会加载库自身聚合 CSS，不会补 Element Plus 依赖样式。

### 单组件样式

```ts
import "@smallbrother/components/components/xlg-table/index.css"
```

适合深导入场景。这个入口只负责该组件自己的 CSS，依赖的 Element Plus 样式仍需要宿主项目自己处理。

## Resolver / 自动导入

```ts
import Components from "unplugin-vue-components/vite"
import { resolveComponents } from "@smallbrother/components/resolver"

export default defineConfig({
  plugins: [
    Components({
      resolvers: [resolveComponents()]
    })
  ]
})
```

`resolveComponents()` 会把 `Xlg*` 组件映射到 `@smallbrother/components/components`，并返回对应 `sideEffects`，让自动导入工具同时补齐组件导入和样式依赖。

## 接入边界

- 组件库依赖 `element-plus`，宿主项目需要自己安装并注册 `ElementPlus`。
- `XlgTable` 内部已经接入 `tableAutoHeightDirective`，通过组件库使用时，不需要额外执行 `app.use(@smallbrother/directives)`。
- 具体组件能力请继续看：
  - [XlgSelect](/packages/components/select)
  - [XlgTable](/packages/components/table)

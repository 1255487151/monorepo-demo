# @smallbrother/components

Vue 3 component library built on top of Element Plus.

## Install

```bash
pnpm add @smallbrother/components element-plus
```

`vue` and `element-plus` stay in the consumer app as peer dependencies.

## Usage

### Plugin install

```ts
import { createApp } from "vue"
import ElementPlus from "element-plus"
import SmallBrotherComponents from "@smallbrother/components"
import "@smallbrother/components/style.css"
import "element-plus/dist/index.css"

const app = createApp(App)

app.use(ElementPlus)
app.use(SmallBrotherComponents)
```

### Named import

```ts
import { XlgSelect } from "@smallbrother/components"
import "@smallbrother/components/style.css"
```

### Template example

```vue
<template>
  <xlg-select v-model="value" :options="options" placeholder="Please select" />
</template>

<script setup lang="ts">
import { ref } from "vue"
import { XlgSelect, type OptionItems } from "@smallbrother/components"

const value = ref("")

const options: OptionItems[] = [
  { label: "Option A", value: "a" },
  { label: "Option B", value: "b" }
]
</script>
```

## Styling

Element Plus theme variables are controlled by the consumer app. XLG only exposes a small set of component-level variables.

### Change global Element Plus theme tokens

```css
:root {
  --el-color-primary: #0f766e;
  --el-border-color: #99f6e4;
  --el-fill-color-light: #f0fdfa;
}
```

### Change XLG component tokens locally

```css
.xlg-select {
  --xlg-select-width: 320px;
}

.xlg-select-popper {
  --xlg-select-dropdown-padding-y: 6px;
}
```

### When to use which variables

- Use `--el-*` when you want Element Plus theme colors, borders, fills, and shared visual tokens to change globally.
- Use `--xlg-*` when you only want to tune a wrapped XLG component without affecting every Element Plus component.

## Auto import resolver

```ts
import { resolveComponents } from "@smallbrother/components"
```

`resolveComponents()` maps `Xlg*` components to `@smallbrother/components/components` and appends `components/<name>/index.css` as the side effect style path.

# @smallbrother/components

Vue 3 component library built on top of Element Plus.

## Install

```bash
pnpm add @smallbrother/components element-plus
```

`vue` and `element-plus` stay in the consumer app as peer dependencies.
`@smallbrother/directives` is installed transitively by `@smallbrother/components`, so `XlgTable` users do not need to add or register it separately.

## Usage

### Plugin install

```ts
import { createApp } from "vue"
import ElementPlus from "element-plus"
import SmallBrotherComponents from "@smallbrother/components"

const app = createApp(App)

app.use(ElementPlus)
app.use(SmallBrotherComponents)
```

The root entry auto-loads SmallBrother and dependent Element Plus styles when you install the plugin.

### Named import from components entry

```ts
import { XlgSelect } from "@smallbrother/components/components"
```

The components entry is now a pure logic entry. If you import components this way, bring styles in yourself.

### Deep component import

```ts
import XlgSelect from "@smallbrother/components/components/xlg-select"
```

Deep component imports are also pure logic entries.

### Template example

```vue
<template>
  <xlg-select v-model="value" :options="options" placeholder="Please select" />
</template>

<script setup lang="ts">
import { ref } from "vue"
import { XlgSelect, type OptionItems } from "@smallbrother/components/components"

const value = ref("")

const options: OptionItems[] = [
  { label: "Option A", value: "a" },
  { label: "Option B", value: "b" }
]
</script>
```

### XlgTable auto height

`XlgTable` wires `tableAutoHeightDirective` internally. When you install or import `@smallbrother/components`, the table can use auto height without an extra `app.use(@smallbrother/directives)`.

### Manual on-demand styles

If you do not use auto import with `resolveComponents()`, add styles yourself:

```ts
import "@smallbrother/components/style.css"
```

Or import a single component stylesheet:

```ts
import "@smallbrother/components/components/xlg-table/index.css"
```

When using single component CSS files, you are also responsible for any Element Plus styles that component needs.

### Grouped options

```vue
<template>
  <xlg-select v-model="value" :options="groupedOptions" placeholder="Please select" />
</template>

<script setup lang="ts">
import { ref } from "vue"
import { XlgSelect, type OptionItems } from "@smallbrother/components/components"

const value = ref("")

const groupedOptions: OptionItems[] = [
  {
    label: "Group A",
    options: [
      { label: "Option A-1", value: "a-1" },
      { label: "Option A-2", value: "a-2" }
    ]
  },
  {
    label: "Group B",
    options: [
      { label: "Option B-1", value: "b-1" },
      { label: "Option B-2", value: "b-2", disabled: true }
    ]
  }
]
</script>
```

### Custom slot mode

When you need more custom rendering, pass the default slot directly. Once the default slot exists, `XlgSelect` will stop auto-rendering `options`.

```vue
<xlg-select v-model="value" placeholder="Please select">
  <el-option label="Custom A" value="a" />
  <el-option-group label="Custom Group">
    <el-option label="Custom B-1" value="b-1" />
  </el-option-group>
</xlg-select>
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
import { resolveComponents } from "@smallbrother/components/resolver"
```

`resolveComponents()` maps `Xlg*` components to `@smallbrother/components/components` and returns standard `sideEffects`, so `unplugin-vue-components` can inject both component imports and required styles automatically.

## Breaking change

- `@smallbrother/components` no longer exports components or resolver helpers.
- Use `@smallbrother/components` for global `app.use(...)`.
- `@smallbrother/components/components` and `@smallbrother/components/components/*` are pure component entries and no longer auto-load styles.
- Use `@smallbrother/components/components` or `@smallbrother/components/components/*` for component imports.
- Use `@smallbrother/components/resolver` for `resolveComponents()`.

# XlgSelect

## 安装 / 导入

```ts
import { XlgSelect } from "@smallbrother/components/components"
```

需要全局样式时，引入：

```ts
import "@smallbrother/components/style"
```

## 基础用法

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

## 分组选项

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

## 默认插槽覆盖

当传入默认插槽时，组件会停止使用 `options` 自动渲染逻辑，直接渲染插槽内容。

```vue
<xlg-select v-model="value" placeholder="Please select">
  <el-option label="Custom A" value="a" />
  <el-option-group label="Custom Group">
    <el-option label="Custom B-1" value="b-1" />
  </el-option-group>
</xlg-select>
```

## Props / Attributes

除下表外，其余未消费的属性会透传给底层 `ElSelect`。

| 名称           | 说明                                       | 类型                                                | 默认值 |
| -------------- | ------------------------------------------ | --------------------------------------------------- | ------ |
| `modelValue`   | 选中值，支持字符串、数字、布尔、对象或数组 | `OptionItem["value"] \| Array<OptionItem["value"]>` | `""`   |
| `options`      | 选项列表，支持普通选项和分组选项           | `OptionItems[]`                                     | `[]`   |
| `class`        | 会和内部 `xlg-select` 合并                 | `string`                                            | `-`    |
| `popper-class` | 会和内部 `xlg-select-popper` 合并          | `string`                                            | `-`    |

## Slots

| 插槽名    | 说明                                                |
| --------- | --------------------------------------------------- |
| `default` | 自定义下拉项渲染；存在时不再使用 `options` 自动渲染 |

## Events

| 事件名              | 说明                   | 回调参数     |
| ------------------- | ---------------------- | ------------ |
| `update:modelValue` | `v-model` 对应更新事件 | `ModelValue` |

## Exposes / Methods

当前组件未通过 `defineExpose` 暴露额外实例方法。

## 类型说明

| 类型              | 说明                                        |
| ----------------- | ------------------------------------------- |
| `OptionItem`      | 单个选项，包含 `value`、`label`、`disabled` |
| `OptionGroupItem` | 分组选项，包含 `label` 和 `options`         |
| `OptionItems`     | `OptionItem` 或 `OptionGroupItem`           |

## 样式与依赖

- 组件基础实现依赖 `element-plus` 的 `ElSelect`、`ElOption`、`ElOptionGroup`
- 组件会附加 `xlg-select` 与 `xlg-select-popper` 语义类名
- 若只引入单组件 CSS，还需要自行补齐对应的 Element Plus 样式依赖

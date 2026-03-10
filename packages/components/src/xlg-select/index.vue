<template>
  <el-select v-model="modelValue" style="width: 100%" v-bind="$attrs">
    <el-option
      v-for="item in props.options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled"
    />
  </el-select>
</template>

<script lang="ts" setup>
import type { Options } from "../types"
import { ElSelect, ElOption } from "element-plus"

const props = withDefaults(
  defineProps<{
    options?: Options[]
  }>(),
  {
    options: () => []
  }
)

const modelValue = defineModel<string | number | (string | number)[]>("modelValue", {
  type: [String, Number, Array],
  default: ""
})
</script>

<style scoped></style>

<template>
  <el-select v-model="modelValue" style="width: 100%" v-bind="$attrs">
    <!-- @vue-ignore -->
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
import type { OptionItems } from "../types"

const props = withDefaults(
  defineProps<{
    options: OptionItems[]
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

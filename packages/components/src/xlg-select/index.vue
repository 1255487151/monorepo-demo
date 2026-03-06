<template>
  <el-select v-model="modelValue" placeholder="Select" style="width: 100%" v-bind="$attrs">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled"
    />
  </el-select>
</template>

<script lang="ts" setup>
import type { PropType } from "vue"
import type { Options } from "../types"

const options = defineModel<Options[]>("options", {
  type: Array as PropType<Options[]>,
  default: () => []
})

const modelValue = defineModel<string | number | (string | number)[]>("modelValue", {
  type: [String, Number, Array] as PropType<string | number | (string | number)[]>,
  default: ""
})
</script>

<style scoped></style>

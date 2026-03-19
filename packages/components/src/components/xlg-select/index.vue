<template>
  <el-select v-model="modelValue" style="width: 100%" v-bind="attrs">
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
import type { OptionItems } from "../../types"
import { useAttrs } from "vue"
import { ElSelect, ElOption } from "element-plus"

interface IProps {
  options: OptionItems[]
}

const props = withDefaults(defineProps<IProps>(), {
  options: () => []
})

const modelValue = defineModel<string | number | (string | number)[]>("modelValue", {
  type: [String, Number, Array],
  default: ""
})

const attrs = useAttrs()
</script>

<style scoped></style>

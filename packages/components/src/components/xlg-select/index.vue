<template>
  <el-select
    v-model="modelValue"
    v-bind="forwardedAttrs"
    :class="selectClass"
    :popper-class="popperClass"
  >
    <el-option
      v-for="item in props.options"
      :key="getOptionKey(item)"
      v-bind="getOptionProps(item)"
    />
  </el-select>
</template>

<script lang="ts" setup>
import type { OptionItems } from "../../types"
import { computed, useAttrs } from "vue"
import { ElOption, ElSelect } from "element-plus"

const props = withDefaults(defineProps<IProps>(), {
  options: () => []
})

defineOptions({
  name: "XlgSelect",
  inheritAttrs: false
})

type ModelValue = string | number | (string | number)[]

interface IProps {
  options: OptionItems[]
}

const modelValue = defineModel<ModelValue>("modelValue", {
  type: [String, Number, Array],
  default: ""
})

const attrs = useAttrs()

const selectClass = computed(() => ["xlg-select", attrs["class"]])

const popperClass = computed(() => {
  const customPopperClass = attrs["popper-class"]

  return [customPopperClass, "xlg-select-popper"]
    .filter(value => typeof value === "string" && value.length > 0)
    .join(" ")
})

const forwardedAttrs = computed(() => {
  const { class: _class, ["popper-class"]: _popperClass, ...restAttrs } = attrs

  return restAttrs
})

function getOptionKey(item: OptionItems) {
  if (typeof item.value === "object") {
    return JSON.stringify(item.value)
  }

  if (typeof item.value === "boolean") {
    return String(item.value)
  }

  return item.value
}

function getOptionProps(item: OptionItems): any {
  const optionProps: Record<string, unknown> = {
    value: item.value
  }

  if (item.label !== undefined) {
    optionProps["label"] = item.label
  }

  if (item.disabled !== undefined) {
    optionProps["disabled"] = item.disabled
  }

  return optionProps
}
</script>

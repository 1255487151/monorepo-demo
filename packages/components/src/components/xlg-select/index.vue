<template>
  <el-select
    v-model="modelValue"
    v-bind="forwardedAttrs"
    :class="selectClass"
    :popper-class="popperClass"
  >
    <slot v-if="hasDefaultSlot" />

    <template v-else>
      <template v-for="(item, index) in props.options" :key="getItemKey(item, index)">
        <ElOptionGroup v-if="isOptionGroup(item)" :label="String(item.label)">
          <template
            v-for="option in item.options"
            :key="`${index}-${String(item.label)}-${String(getOptionKey(option))}`"
          >
            <component :is="ElOption" v-bind="getOptionProps(option)" />
          </template>
        </ElOptionGroup>

        <template v-else>
          <component :is="ElOption" v-bind="getOptionProps(item)" />
        </template>
      </template>
    </template>
  </el-select>
</template>

<script lang="ts" setup>
import type { OptionGroupItem, OptionItem, OptionItems } from "../../types"
import { computed, useAttrs, useSlots } from "vue"
import { ElOption, ElOptionGroup, ElSelect } from "element-plus"

const props = withDefaults(defineProps<IProps>(), {
  options: () => []
})

defineOptions({
  name: "XlgSelect",
  inheritAttrs: false
})

type ModelValue = OptionItem["value"] | Array<OptionItem["value"]>

interface IProps {
  options: OptionItems[]
}

const modelValue = defineModel<ModelValue>("modelValue", {
  type: [String, Number, Boolean, Object, Array],
  default: ""
})

const attrs = useAttrs()
const slots = useSlots()

const selectClass = computed(() => ["xlg-select", attrs["class"]])
const hasDefaultSlot = computed(() => Boolean(slots["default"]))

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

function isOptionGroup(item: OptionItems): item is OptionGroupItem {
  return "options" in item
}

function getItemKey(item: OptionItems, index: number) {
  return isOptionGroup(item) ? `group-${index}-${item.label}` : getOptionKey(item)
}

function getOptionKey(item: OptionItem) {
  if (typeof item.value === "object") {
    return JSON.stringify(item.value)
  }

  if (typeof item.value === "boolean") {
    return String(item.value)
  }

  return item.value
}

function getOptionProps(item: OptionItem): any {
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

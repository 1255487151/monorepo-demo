export type OptionItemValue = string | number | boolean | Record<string, unknown>
export type OptionItemLabel = string | number

export interface OptionItem {
  value: OptionItemValue
  label?: OptionItemLabel
  disabled?: boolean
}

export interface OptionGroupItem {
  label: OptionItemLabel
  options: OptionItem[]
}

export type OptionItems = OptionItem | OptionGroupItem

export type OptionItemValue = string | number | boolean | Record<string, unknown>
export type OptionItemLabel = string | number

export interface OptionItems {
  value: OptionItemValue
  label?: OptionItemLabel
  disabled?: boolean
}

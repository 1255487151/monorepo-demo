declare module "@smallbrother/directives" {
  import type { ObjectDirective, Plugin } from "vue"
  import type { XlgTableAutoHeightOptions } from "./index"

  export type TableAutoHeightOptions = XlgTableAutoHeightOptions
  export type TableAutoHeightBinding = TableAutoHeightOptions | false | null | undefined

  export const tableAutoHeightDirective: ObjectDirective<HTMLElement, TableAutoHeightBinding>

  const SmallBrotherDirectives: Plugin
  export default SmallBrotherDirectives
}

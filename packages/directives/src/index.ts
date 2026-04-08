import type { App, Plugin } from "vue"
import { tableAutoHeightDirective } from "./table-auto-height"

export * from "./table-auto-height"

const SmallBrotherDirectives: Plugin = {
  install(app: App) {
    app.directive("table-auto-height", tableAutoHeightDirective)
  }
}

export default SmallBrotherDirectives

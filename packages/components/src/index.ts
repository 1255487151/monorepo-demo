/**
 * @smallbrother/components
 * Vue 3 组件库 - 基于 Element Plus
 */

import type { App } from "vue"
import type { Plugin } from "vue"
import * as XlgUi from "./components"
import { toComponentTagName } from "./utils"

const XlgUiPlugin: Plugin = {
  install: (_app: App) => {
    for (const [name, component] of Object.entries(XlgUi)) {
      const kebabName = toComponentTagName(name)

      _app.component(name, component)
      _app.component(kebabName, component)
    }
  }
}

export default XlgUiPlugin

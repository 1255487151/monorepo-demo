/**
 * @smallbrother/components
 * Vue 3 组件库 - 基于 Element Plus
 */

import type { App } from "vue"
import * as XlgUi from "./components"
// export * from "./components"
export { resolveComponents } from "./utils"
// export * from "./style/index.scss"
// 导出类型定义
export * from "./types"
// 默认导出
export default {
  install: (_app: App) => {
    for (const [name, component] of Object.entries(XlgUi)) {
      const kebabName = name
        .replace(/^[A-Z]/, c => c.toLowerCase())
        .replace(/[A-Z]/g, c => `-${c.toLowerCase()}`)
      _app.component(kebabName, component)
    }
  }
}

/**
 * @smallbrother/components
 * Vue 3 组件库 - 基于 Element Plus
 */

import type { App } from "vue"
import * as XlgUi from "./components"
// 导出类型定义
export * from "./types"
export * from "./components"

// 默认导出
export default {
  install: (_app: App) => {
    for (const [name, component] of Object.entries(XlgUi)) {
      _app.component(name, component)
    }
  }
}

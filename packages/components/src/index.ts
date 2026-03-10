/**
 * @smallbrother/components
 * Vue 3 组件库 - 基于 Element Plus
 */

import type { App } from "vue"
import XlgSelect from "./xlg-select/index.vue"

// 导出类型定义
export * from "./types"

// 默认导出
export default {
  install: (_app: App) => {
    // Vue 插件安装逻辑
    _app.component("XlgSelect", XlgSelect)
  }
}

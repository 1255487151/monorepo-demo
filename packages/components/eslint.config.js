/**
 * Components 子包 ESLint 配置
 * 继承根配置的 Vue 和 TypeScript 规则
 */
import { baseConfig } from "../../eslint/base.js"
import { vueConfig } from "../../eslint/vue.js"

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...baseConfig,
  ...vueConfig,
  {
    ignores: ["dist/**", "node_modules/**", "coverage/**", "*.d.ts", "eslint.config.js"]
  },
  // Element Plus 相关规则
  {
    files: ["**/*.vue"],
    rules: {
      // 允许使用 Element Plus 组件
      "vue/no-reserved-component-names": "off",
      // Vue 3 + TypeScript 最佳实践
      "vue/block-lang": [
        "error",
        {
          script: {
            lang: "ts"
          }
        }
      ],
      "vue/define-emits-declaration": ["error", "type-based"],
      "vue/define-macros-order": [
        "error",
        {
          order: ["defineProps", "defineEmits"]
        }
      ],
      // 组件命名规范（Element Plus 组件除外）
      "vue/component-name-in-template-casing": [
        "error",
        "PascalCase",
        {
          registeredComponentsOnly: false,
          ignores: [
            "el-button",
            "el-input",
            "el-form",
            "el-form-item",
            "el-select",
            "el-option",
            "el-table",
            "el-table-column",
            "el-dialog",
            "el-message",
            "el-notification"
          ]
        }
      ]
    }
  }
]

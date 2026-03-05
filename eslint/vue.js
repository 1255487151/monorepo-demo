/**
 * 使用 eslint-plugin-vue 预设 + 自定义规则覆盖
 */
import vuePlugin from "eslint-plugin-vue"
import vueParser from "vue-eslint-parser"
import tseslint from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"

/** @type {import('eslint').Linter.Config[]} */
export const vueConfig = [
  ...vuePlugin.configs["flat/strongly-recommended"],

  // 自定义配置覆盖
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",
        project: true,
        extraFileExtensions: [".vue"],
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        // Vue 3 全局变量
        defineProps: "readonly",
        defineEmits: "readonly",
        defineExpose: "readonly",
        withDefaults: "readonly",
        // 浏览器环境
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        console: "readonly"
      }
    },
    plugins: {
      vue: vuePlugin,
      "@typescript-eslint": tseslint
    },
    rules: {
      // ============ 自定义规则配置 ============
      "vue/component-api-style": ["error", ["script-setup"]],
      "vue/multi-word-component-names": "off",
      "vue/max-attributes-per-line": "off",
      "vue/html-indent": [
        "error",
        2,
        {
          attribute: 1,
          baseIndent: 1,
          closeBracket: 0,
          alignAttributesVertically: true,
          ignores: []
        }
      ],
      "vue/no-unsupported-features": [
        "error",
        {
          version: "3.5"
        }
      ],
      "vue/no-unused-vars": [
        "warn",
        {
          ignorePattern: "^_"
        }
      ],
      "vue/padding-line-between-blocks": ["error", "always"],
      "vue/singleline-html-element-content-newline": [
        "error",
        {
          ignoreWhenNoAttributes: true,
          ignoreWhenEmpty: true
        }
      ],
      // ============ TypeScript 相关规则 ============
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_|^props$|^emit",
          caughtErrorsIgnorePattern: "^_"
        }
      ]
    }
  }
]

export default vueConfig

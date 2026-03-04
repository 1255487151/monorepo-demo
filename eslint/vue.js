/**
 * ESLint Vue 配置 - 适用于 Vue 3 + TypeScript 项目
 * 包含 Vue 推荐规则、TypeScript 集成
 */
import vuePlugin from "eslint-plugin-vue"
import vueParser from "vue-eslint-parser"
import tseslint from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"

/** @type {import('eslint').Linter.Config[]} */
export const vueConfig = [
  // Vue 文件配置
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
      // Vue 基础规则
      "vue/comment-directive": "error",
      "vue/jsx-uses-vars": "error",

      // Vue 推荐规则
      "vue/attribute-hyphenation": ["error", "always"],
      "vue/component-api-style": ["error", ["script-setup"]],
      "vue/component-definition-name-casing": ["error", "PascalCase"],
      "vue/component-name-in-template-casing": ["error", "PascalCase"],
      "vue/component-options-name-casing": ["error", "PascalCase"],
      "vue/custom-event-name-casing": ["error", "camelCase"],
      "vue/define-emits-declaration": ["error", "type-based"],
      "vue/define-macros-order": [
        "error",
        {
          order: ["defineProps", "defineEmits"]
        }
      ],
      "vue/enforce-style-attribute": ["error", "allow"],
      "vue/html-button-name-reserved": "error",
      "vue/html-closing-bracket-newline": [
        "error",
        {
          singleline: "never",
          multiline: "always"
        }
      ],
      "vue/html-closing-bracket-spacing": [
        "error",
        {
          startTag: "never",
          endTag: "never",
          selfClosingTag: "always"
        }
      ],
      "vue/html-end-tags": "error",
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
      "vue/html-quotes": ["error", "double"],
      "vue/html-self-closing": [
        "error",
        {
          html: {
            void: "always",
            normal: "never",
            component: "always"
          },
          svg: "always",
          math: "always"
        }
      ],
      "vue/max-attributes-per-line": [
        "error",
        {
          singleline: { max: 3 },
          multiline: { max: 1 }
        }
      ],
      "vue/multi-word-component-names": "off",
      "vue/mustache-interpolation-spacing": ["error", "always"],
      "vue/no-async-in-computed-properties": "error",
      "vue/no-boolean-default": ["warn", "default-false"],
      "vue/no-child-content": "error",
      "vue/no-computed-properties-in-data": "error",
      "vue/no-constant-condition": "warn",
      "vue/no-custom-modifiers-on-v-model": "error",
      "vue/no-deprecated-data-object-declaration": "error",
      "vue/no-deprecated-destroyed-lifecycle": "error",
      "vue/no-deprecated-dollar-listeners-api": "error",
      "vue/no-deprecated-dollar-scopedslots-api": "error",
      "vue/no-deprecated-events-api": "error",
      "vue/no-deprecated-filter": "error",
      "vue/no-deprecated-functional-template": "error",
      "vue/no-deprecated-html-element-is": "error",
      "vue/no-deprecated-inline-template": "error",
      "vue/no-deprecated-props-default-this": "error",
      "vue/no-deprecated-router-link-tag-prop": "error",
      "vue/no-deprecated-scope-attribute": "error",
      "vue/no-deprecated-slot-attribute": "error",
      "vue/no-deprecated-slot-scope-attribute": "error",
      "vue/no-deprecated-v-bind-sync": "error",
      "vue/no-deprecated-v-is": "error",
      "vue/no-deprecated-v-on-native-modifier": "error",
      "vue/no-deprecated-v-on-number-modifiers": "error",
      "vue/no-deprecated-vue-config-keycodes": "error",
      "vue/no-dupe-keys": "error",
      "vue/no-dupe-v-else-if": "error",
      "vue/no-duplicate-attr-inheritance": "warn",
      "vue/no-duplicate-attributes": [
        "error",
        {
          allow: []
        }
      ],
      "vue/no-empty-component-block": "warn",
      "vue/no-empty-pattern": "error",
      "vue/no-export-in-script-setup": "error",
      "vue/no-expose-after-await": "error",
      "vue/no-invalid-model-keys": "error",
      "vue/no-lifecycle-after-await": "error",
      "vue/no-lone-template": "warn",
      "vue/no-loss-of-precision": "error",
      "vue/no-multi-spaces": "error",
      "vue/no-multiple-objects-in-class": "warn",
      "vue/no-multiple-slot-args": "error",
      "vue/no-multiple-template-root": "off",
      "vue/no-mutating-props": "error",
      "vue/no-parsing-error": "error",
      "vue/no-potential-component-option-typo": "warn",
      "vue/no-ref-as-operand": "error",
      "vue/no-reserved-component-names": "off",
      "vue/no-reserved-keys": "error",
      "vue/no-reserved-props": "error",
      "vue/no-restricted-block": "off",
      "vue/no-restricted-call-after-await": "error",
      "vue/no-restricted-class": "off",
      "vue/no-restricted-component-names": "off",
      "vue/no-restricted-component-options": "off",
      "vue/no-restricted-custom-event": "off",
      "vue/no-restricted-html-elements": "off",
      "vue/no-restricted-props": "off",
      "vue/no-restricted-static-attribute": "off",
      "vue/no-restricted-syntax": "off",
      "vue/no-restricted-v-bind": "off",
      "vue/no-root-v-if": "warn",
      "vue/no-setup-props-reactivity-loss": "error",
      "vue/no-shared-component-data": "error",
      "vue/no-side-effects-in-computed-properties": "error",
      "vue/no-spaces-around-equal-signs-in-attribute": "error",
      "vue/no-sparse-arrays": "error",
      "vue/no-static-inline-styles": "warn",
      "vue/no-template-shadow": "warn",
      "vue/no-template-target-blank": [
        "error",
        {
          allowReferrer: false,
          enforceDynamicLinks: "always"
        }
      ],
      "vue/no-textarea-mustache": "error",
      "vue/no-this-in-before-route-enter": "error",
      "vue/no-undef-components": "warn",
      "vue/no-undef-properties": "warn",
      "vue/no-unregistered-components": "off",
      "vue/no-unsupported-features": [
        "error",
        {
          version: "3.5"
        }
      ],
      "vue/no-unused-components": "warn",
      "vue/no-unused-refs": "warn",
      "vue/no-unused-vars": [
        "warn",
        {
          ignorePattern: "^_"
        }
      ],
      "vue/no-use-computed-property-like-method": "error",
      "vue/no-use-v-else-if-v-if": "error",
      "vue/no-useless-template-attributes": "warn",
      "vue/no-useless-v-bind": "error",
      "vue/no-v-for-template-key-on-child": "error",
      "vue/no-v-for-template-key": "error",
      "vue/no-v-html": "warn",
      "vue/no-v-model-argument": "off",
      "vue/no-v-text-v-html-on-component": "error",
      "vue/no-watch-after-await": "error",
      "vue/object-shorthand": ["error", "always"],
      "vue/one-component-per-file": "error",
      "vue/order-in-components": "warn",
      "vue/padding-line-between-blocks": ["error", "always"],
      "vue/prefer-define-options": "warn",
      "vue/prefer-import-from-vue": "error",
      "vue/prefer-prop-type-boolean-first": "warn",
      "vue/prefer-separate-static-class": "warn",
      "vue/prefer-template": "warn",
      "vue/prefer-true-attribute-shorthand": ["warn", "always"],
      "vue/prop-name-casing": ["error", "camelCase"],
      "vue/require-component-is": "error",
      "vue/require-default-prop": "warn",
      "vue/require-direct-export": "error",
      "vue/require-emit-validator": "warn",
      "vue/require-explicit-emits": "warn",
      "vue/require-expose": "warn",
      "vue/require-macro-variable-name": [
        "error",
        {
          defineProps: "props",
          defineEmits: "emit",
          defineExpose: "expose"
        }
      ],
      "vue/require-name-property": "warn",
      "vue/require-prop-comment": "off",
      "vue/require-prop-type-constructor": "error",
      "vue/require-prop-types": "off",
      "vue/require-render-return": "error",
      "vue/require-slots-as-functions": "error",
      "vue/require-toggle-inside-transition": "warn",
      "vue/require-typed-object-prop-in-macros": "warn",
      "vue/require-typed-ref": "warn",
      "vue/require-v-for-key": "error",
      "vue/return-in-computed-property": "error",
      "vue/return-in-emits-validator": "error",
      "vue/script-indent": [
        "error",
        2,
        {
          baseIndent: 1,
          switchCase: 1,
          ignores: []
        }
      ],
      "vue/script-setup-uses-vars": "error",
      "vue/singleline-html-element-content-newline": [
        "error",
        {
          ignoreWhenNoAttributes: true,
          ignoreWhenEmpty: true
        }
      ],
      "vue/slot-name-casing": ["error", "camelCase"],
      "vue/sort-keys": "off",
      "vue/static-class-names-order": "warn",
      "vue/style-indent": [
        "error",
        2,
        {
          baseIndent: 1
        }
      ],
      "vue/template-curly-spacing": ["error", "never"],
      "vue/this-in-template": ["error", "never"],
      "vue/use-v-on-exact": "error",
      "vue/v-bind-style": ["error", "shorthand"],
      "vue/v-for-delimiter-style": ["error", "in"],
      "vue/v-on-event-hyphenation": [
        "error",
        "always",
        {
          autofix: true
        }
      ],
      "vue/v-on-function-call": ["error", "never"],
      "vue/v-on-style": ["error", "shorthand"],
      "vue/v-slot-style": [
        "error",
        {
          atComponent: "v-slot",
          default: "v-slot",
          named: "longform"
        }
      ],
      "vue/valid-attribute-name": "error",
      "vue/valid-define-emits": "error",
      "vue/valid-define-expose": "error",
      "vue/valid-define-options": "error",
      "vue/valid-define-props": "error",
      "vue/valid-define-slots": "error",
      "vue/valid-model-definition": "error",
      "vue/valid-next-tick": "error",
      "vue/valid-template-root": "error",
      "vue/valid-v-bind-sync": "error",
      "vue/valid-v-bind": "error",
      "vue/valid-v-cloak": "error",
      "vue/valid-v-else-if": "error",
      "vue/valid-v-else": "error",
      "vue/valid-v-for": "error",
      "vue/valid-v-html": "error",
      "vue/valid-v-if": "error",
      "vue/valid-v-is": "error",
      "vue/valid-v-memo": "error",
      "vue/valid-v-model": "error",
      "vue/valid-v-on": "error",
      "vue/valid-v-once": "error",
      "vue/valid-v-pre": "error",
      "vue/valid-v-show": "error",
      "vue/valid-v-slot": "error",
      "vue/valid-v-text": "error",

      // 禁用与 TypeScript 冲突的规则
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

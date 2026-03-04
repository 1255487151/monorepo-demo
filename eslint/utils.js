/**
 * ESLint 工具库配置 - 适用于纯 TypeScript 工具库
 * 更严格的类型检查和 Node.js 环境支持
 */
import globals from "globals"
import tseslint from "@typescript-eslint/eslint-plugin"

/** @type {import('eslint').Linter.Config[]} */
export const utilsConfig = [
  // Node.js 环境配置
  {
    files: ["**/*.ts"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021
      }
    }
  },
  // 工具库特定规则
  {
    files: ["**/*.ts"],
    plugins: {
      "@typescript-eslint": tseslint
    },
    rules: {
      // 更严格的类型检查
      "@typescript-eslint/explicit-function-return-type": [
        "warn",
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
          allowDirectConstAssertionInArrowFunctions: true
        }
      ],
      "@typescript-eslint/explicit-module-boundary-types": [
        "warn",
        {
          allowArgumentsExplicitlyTypedAsAny: false,
          allowDirectConstAssertionInArrowFunctions: true,
          allowHigherOrderFunctions: true,
          allowTypedFunctionExpressions: true
        }
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-assertion": "error",

      // 代码质量
      "max-lines-per-function": [
        "warn",
        {
          max: 50,
          skipBlankLines: true,
          skipComments: true
        }
      ],
      complexity: ["warn", 10]
    }
  }
]

export default utilsConfig

/**
 * ESLint 基础配置 - 适用于所有 TypeScript 项目
 * 包含 TypeScript 推荐规则、Prettier 集成
 */
import globals from "globals"
import tseslint from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import prettierConfig from "eslint-config-prettier"
import prettierPlugin from "eslint-plugin-prettier"

/** @type {any[]} */
export const baseConfig = [
  // {
  //   globalIgnores: ["**/node_modules/**", "**/dist/**", "**/coverage/**", "**/*.d.ts"]
  // },
  {
    ignores: ["**/dist/**", "**/node_modules/**", "**/coverage/**", "**/*.d.ts"]
  },
  // TypeScript 基础配置
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      },
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2021
      }
    },
    plugins: {
      "@typescript-eslint": tseslint,
      prettier: prettierPlugin
    },
    rules: {
      // TypeScript ESLint 推荐规则（不需要类型检查）
      ...tseslint.configs?.["recommended"]?.rules,

      // Prettier 集成: 禁用冲突规则
      ...prettierConfig.rules,

      // Prettier 插件: 将 Prettier 作为 ESLint 规则运行
      "prettier/prettier": "warn",

      // TypeScript 自定义规则
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_"
        }
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/no-require-imports": "warn",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports"
        }
      ],

      // 通用规则
      "no-console": "off",
      "prefer-const": "error",
      "no-var": "error",
      eqeqeq: ["error", "always"]
    }
    // linterOptions: {
    //   noInlineConfig: false, // 是否禁用行内配置（如 /* eslint-disable */）
    //   reportUnusedDisableDirectives: "warn", // 报告未使用的禁用指令
    //   reportUnusedInlineConfigs: "warn" // 报告未使用的行内配置
    // }
  }
]

export default baseConfig

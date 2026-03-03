const globals = require("globals")
const tseslint = require("@typescript-eslint/eslint-plugin")
const tsParser = require("@typescript-eslint/parser")
const prettierConfig = require("eslint-config-prettier")
const prettierPlugin = require("eslint-plugin-prettier")

module.exports = [
  // 忽略模式
  {
    ignores: ["**/dist/**", "**/node_modules/**"]
  },
  // TypeScript 配置
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        tsconfigRootDir: __dirname,
        project: ["./packages/*/tsconfig.json"]
      },
      globals: {
        ...globals.node,
        ...globals.browser
      }
    },
    plugins: {
      "@typescript-eslint": tseslint,
      prettier: prettierPlugin
    },
    rules: {
      // TypeScript ESLint 推荐规则 (包含 eslint:recommended)
      ...tseslint.configs.recommended.rules,
      ...tseslint.configs["recommended-requiring-type-checking"].rules,
      // Prettier 集成: 禁用冲突规则
      ...prettierConfig.rules,
      // Prettier 插件: 将 Prettier 作为 ESLint 规则运行
      "prettier/prettier": "warn",
      // 自定义规则
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/explicit-function-return-type": "off"
    }
  }
]

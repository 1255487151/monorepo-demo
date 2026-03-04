/**
 * 根目录 ESLint 配置
 * 作为 monorepo 的基础配置，适用于所有通用 TypeScript 文件
 */
import { baseConfig } from "./eslint/base.js"

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...baseConfig,
  {
    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      "**/coverage/**",
      "**/*.d.ts",
      "**/eslint/**",
      "eslint.config.js",
      "eslint.config.ts",
      "eslint.config.cjs"
    ]
  }
]

import { baseConfig } from "../../eslint/base.js"
import { utilsConfig } from "../../eslint/utils.js"

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...baseConfig,
  ...utilsConfig,
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "coverage/**",
      "*.d.ts",
      "**/*.test.ts",
      "**/*.spec.ts",
      "eslint.config.js"
    ]
  }
]

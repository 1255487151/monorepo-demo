# Monorepo 项目配置文档

本文档详细说明 monorepo 项目中 TypeScript、ESLint、Prettier 等工具的配置细节。

## 📦 依赖安装

### 核心依赖

```bash
# TypeScript 相关
pnpm add -D typescript @types/node

# ESLint 相关
pnpm add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

# Prettier 相关
pnpm add -D prettier eslint-config-prettier eslint-plugin-prettier

# Vue 相关（如果需要）
pnpm add -D eslint-plugin-vue vue-eslint-parser

# Git Hooks 相关
pnpm add -D husky lint-staged

# 提交规范相关
pnpm add -D @commitlint/config-conventional commitlint commitizen git-cz

# 工具库
pnpm add -D globals
```

### 依赖说明

| 包名                               | 版本    | 作用                               |
| ---------------------------------- | ------- | ---------------------------------- |
| `typescript`                       | ^5.9.3  | TypeScript 编译器                  |
| `@types/node`                      | ^25.3.3 | Node.js 类型定义                   |
| `eslint`                           | ^10.0.2 | JavaScript/TypeScript 代码检查工具 |
| `@typescript-eslint/parser`        | ^8.56.1 | TypeScript ESLint 解析器           |
| `@typescript-eslint/eslint-plugin` | ^8.56.1 | TypeScript ESLint 规则插件         |
| `prettier`                         | ^3.8.1  | 代码格式化工具                     |
| `eslint-config-prettier`           | ^10.1.8 | 禁用与 Prettier 冲突的 ESLint 规则 |
| `eslint-plugin-prettier`           | ^5.5.5  | 将 Prettier 作为 ESLint 规则运行   |
| `eslint-plugin-vue`                | ^10.8.0 | Vue.js 官方 ESLint 插件            |
| `vue-eslint-parser`                | ^10.4.0 | Vue 文件 ESLint 解析器             |
| `husky`                            | ^9.1.7  | Git hooks 工具                     |
| `lint-staged`                      | ^16.3.2 | 对暂存文件运行 linters             |
| `@commitlint/config-conventional`  | ^20.4.3 | Conventional Commits 规范配置      |
| `commitlint`                       | ^20.4.3 | 提交信息检查工具                   |
| `commitizen`                       | ^4.3.1  | 提交信息规范化工具                 |
| `git-cz`                           | ^4.9.0  | Commitizen 的命令行工具            |
| `globals`                          | ^17.4.0 | 全局变量定义                       |

## ⚙️ TypeScript 配置

### 配置文件结构

```
monorepo-demo/
├── tsconfig.base.json       # 基础配置（所有包共享）
├── tsconfig.json            # 根项目配置
└── packages/
    ├── utils/
    │   └── tsconfig.json    # utils 包配置
    └── components/
        └── tsconfig.json    # components 包配置
```

### tsconfig.base.json - 基础配置

```json
{
  "compilerOptions": {
    // ========== 基础配置 ==========
    "module": "ESNext", // 模块系统：ESNext（ES 模块）
    "moduleResolution": "bundler", // 模块解析策略：bundler（适用于打包工具）
    "target": "ES2022", // 编译目标：ES2022
    "lib": ["ES2022", "DOM", "DOM.Iterable"], // 包含的库类型定义
    "jsx": "preserve", // JSX 编译方式：preserve（保留 JSX）

    // ========== 路径解析 ==========
    "baseUrl": ".", // 基准路径
    "rootDir": ".", // 根目录
    "paths": {
      "@small-brother/*": ["packages/*/src"] // 路径别名映射
    },

    // ========== 模块系统 ==========
    "verbatimModuleSyntax": true, // 精确的模块语法
    "esModuleInterop": true, // 允许 CommonJS 模块默认导入
    "allowSyntheticDefaultImports": true, // 允许合成默认导入
    "resolveJsonModule": true, // 允许导入 JSON 模块
    "moduleDetection": "force", // 强制模块检测

    // ========== 输出配置 ==========
    "declaration": true, // 生成 .d.ts 声明文件
    "declarationMap": true, // 生成声明文件的 source map
    "sourceMap": true, // 生成 source map
    "removeComments": false, // 不移除注释
    "preserveConstEnums": true, // 保留 const 枚举

    // ========== 严格类型检查 ==========
    "strict": true, // 启用所有严格类型检查选项
    "strictNullChecks": true, // 严格的 null 检查
    "strictFunctionTypes": true, // 严格的函数类型检查
    "strictBindCallApply": true, // 严格的 bind/call/apply 检查
    "strictPropertyInitialization": true, // 严格的类属性初始化检查
    "noImplicitAny": true, // 禁止隐式 any 类型
    "noImplicitThis": true, // 禁止隐式 this 类型
    "useUnknownInCatchVariables": true, // catch 子句变量类型为 unknown
    "alwaysStrict": true, // 总是以严格模式解析

    // ========== 额外检查 ==========
    "noUnusedLocals": true, // 检查未使用的局部变量
    "noUnusedParameters": true, // 检查未使用的参数
    "noImplicitReturns": true, // 检查函数所有代码路径都有返回值
    "noFallthroughCasesInSwitch": true, // 检查 switch 语句的 fallthrough
    "noUncheckedIndexedAccess": true, // 检查索引访问结果可能为 undefined
    "noImplicitOverride": true, // 检查 override 关键字
    "noPropertyAccessFromIndexSignature": true, // 索引签名属性访问必须使用索引语法
    "exactOptionalPropertyTypes": true, // 精确的可选属性类型检查
    "forceConsistentCasingInFileNames": true, // 强制文件名大小写一致

    // ========== 其他选项 ==========
    "skipLibCheck": true, // 跳过库文件类型检查
    "isolatedModules": true, // 确保每个文件可以独立编译
    "noUncheckedSideEffectImports": true, // 检查副作用导入可能为 undefined

    // ========== 类型定义 ==========
    "types": ["node"] // 包含的类型定义
  },
  "compileOnSave": true, // 保存时编译
  "include": ["packages/**/src/**/*", "**/*.d.ts", "**/*.ts"],
  "exclude": ["node_modules", "dist", "**/dist/**", "**/node_modules/**"]
}
```

**关键配置说明**:

1. **moduleResolution: "bundler"**
   - 适用于现代打包工具（Vite、webpack 5+、esbuild 等）
   - 自动解析 package.json 的 exports 和 imports 字段
   - 支持条件导入

2. **verbatimModuleSyntax: true**
   - 强制明确区分类型导入和值导入
   - 必须使用 `import type` 导入类型
   - 示例：

     ```typescript
     // 正确
     import type { User } from "./types"
     import { user } from "./user"

     // 错误
     import { User } from "./types" // User 是类型，应该使用 import type
     ```

3. **noUncheckedIndexedAccess: true**
   - 索引访问结果类型包含 undefined
   - 示例：
     ```typescript
     const arr = [1, 2, 3]
     const item = arr[0] // 类型: number | undefined
     ```

4. **exactOptionalPropertyTypes: true**
   - 可选属性不能赋值为 undefined（除非显式定义）
   - 示例：

     ```typescript
     interface Config {
       timeout?: number
     }

     const config: Config = { timeout: undefined } // 错误！
     const config2: Config = {} // 正确
     ```

### tsconfig.json - 根项目配置

```json
{
  "extends": "./tsconfig.base.json", // 继承基础配置
  "compilerOptions": {
    "baseUrl": ".", // 基准路径
    "rootDir": ".", // 根目录
    "noEmit": true, // 不生成输出文件（仅类型检查）
    "types": ["node"] // 类型定义
  },
  "include": [
    "packages/**/src/**/*", // 包含所有包的源码
    "eslint.config.js", // 包含配置文件
    "**/*.ts"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "**/dist/**",
    "**/node_modules/**",
    "**/*.test.ts",
    "**/*.spec.ts"
  ]
}
```

### packages/utils/tsconfig.json - 子包配置

```json
{
  "extends": "../../tsconfig.base.json", // 继承基础配置
  "compilerOptions": {
    // ========== 输出配置 ==========
    "baseUrl": ".",
    "rootDir": "./src", // 源码目录
    "outDir": "./dist", // 输出目录
    "declarationDir": "./dist/types", // 声明文件输出目录

    // ========== 模块系统 ==========
    "module": "ESNext",

    // ========== 路径别名 ==========
    "paths": {
      "@/*": ["./src/*"], // 相对于当前包的别名
      "@small-brother/utils": ["./src"] // 包名别名
    },

    // ========== 类型定义 ==========
    "types": ["node"]
  },
  "include": ["src/**/*", "**/*.d.ts"],
  "exclude": ["node_modules", "dist", "**/*.spec.ts", "**/*.test.ts", "vitest.config.ts"]
}
```

### Monorepo 路径映射

```json
// tsconfig.base.json
{
  "compilerOptions": {
    "paths": {
      "@small-brother/*": ["packages/*/src"]
    }
  }
}

// 使用示例
import { debounce } from '@small-brother/utils'
import { Button } from '@small-brother/components'
```

## 🔍 ESLint 配置

### 配置文件结构

```
monorepo-demo/
├── eslint/
│   ├── base.js              # TypeScript 基础配置
│   └── vue.js               # Vue 特定配置
├── eslint.config.js         # 根配置
└── packages/
    ├── utils/
    │   └── eslint.config.js # utils 包配置
    └── components/
        └── eslint.config.js # components 包配置
```

### eslint/base.js - TypeScript 基础配置

```javascript
/**
 * ESLint 基础配置 - 适用于所有 TypeScript 项目
 * 包含 TypeScript 推荐规则、Prettier 集成
 */
import globals from "globals"
import tseslint from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import prettierConfig from "eslint-config-prettier"
import prettierPlugin from "eslint-plugin-prettier"

/** @type {import('eslint').Linter.Config[]} */
export const baseConfig = [
  // 忽略模式
  {
    ignores: ["**/dist/**", "**/node_modules/**", "**/coverage/**", "**/*.d.ts"]
  },
  // TypeScript 基础配置
  {
    files: ["**/*.{ts,tsx}"], // 应用的文件类型
    languageOptions: {
      parser: tsParser, // TypeScript 解析器
      parserOptions: {
        ecmaVersion: "latest", // ECMAScript 版本
        sourceType: "module" // 模块类型
      },
      globals: {
        ...globals.node, // Node.js 全局变量
        ...globals.browser, // 浏览器全局变量
        ...globals.es2021 // ES2021 全局变量
      }
    },
    plugins: {
      "@typescript-eslint": tseslint, // TypeScript 插件
      prettier: prettierPlugin // Prettier 插件
    },
    rules: {
      // TypeScript ESLint 推荐规则（不需要类型检查）
      ...tseslint.configs.recommended.rules,

      // Prettier 集成: 禁用冲突规则
      ...prettierConfig.rules,

      // Prettier 插件: 将 Prettier 作为 ESLint 规则运行
      "prettier/prettier": "warn",

      // TypeScript 自定义规则
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_", // 参数忽略模式
          varsIgnorePattern: "^_", // 变量忽略模式
          caughtErrorsIgnorePattern: "^_" // catch 错误忽略模式
        }
      ],
      "@typescript-eslint/explicit-function-return-type": "off", // 不强制函数返回类型
      "@typescript-eslint/explicit-module-boundary-types": "off", // 不强制模块边界类型
      "@typescript-eslint/no-explicit-any": "warn", // 警告使用 any
      "@typescript-eslint/no-non-null-assertion": "warn", // 警告非空断言
      "@typescript-eslint/no-require-imports": "warn", // 警告 require 导入
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports", // 优先使用 type 导入
          fixStyle: "inline-type-imports" // 内联 type 导入
        }
      ],

      // 通用规则
      "no-console": ["warn", { allow: ["warn", "error"] }], // 警告 console
      "prefer-const": "error", // 优先使用 const
      "no-var": "error", // 禁止 var
      eqeqeq: ["error", "always"] // 强制 ===
    }
  }
]

export default baseConfig
```

**关键规则说明**:

1. **@typescript-eslint/consistent-type-imports**
   - 强制使用类型导入
   - 自动修复为内联类型导入
   - 示例：

     ```typescript
     // 修复前
     import { User, getUser } from "./user"

     // 修复后
     import { getUser } from "./user"
     import type { User } from "./user"
     ```

2. **@typescript-eslint/no-unused-vars**
   - 检查未使用的变量
   - 支持忽略模式（以 `_` 开头的变量）
   - 示例：
     ```typescript
     // 正确
     const _unused = "value"
     try {
       // ...
     } catch (_error) {
       // ...
     }
     ```

3. **prettier/prettier**
   - 将 Prettier 作为 ESLint 规则运行
   - 同时显示 Prettier 和 ESLint 错误
   - 级别设置为 `warn`，避免阻塞开发

### eslint/vue.js - Vue 配置

```javascript
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
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser, // Vue 解析器
      parserOptions: {
        parser: tsParser, // TypeScript 解析器（用于 <script>）
        ecmaVersion: "latest",
        sourceType: "module",
        project: true, // 启用类型信息
        extraFileExtensions: [".vue"], // 额外文件扩展名
        ecmaFeatures: {
          jsx: true // 支持 JSX
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
      "vue/attribute-hyphenation": ["error", "always"], // 属性名使用短横线
      "vue/component-api-style": ["error", ["script-setup"]], // 使用 script-setup
      "vue/component-definition-name-casing": ["error", "PascalCase"], // 组件名 PascalCase
      "vue/component-name-in-template-casing": ["error", "PascalCase"], // 模板中组件名 PascalCase
      "vue/custom-event-name-casing": ["error", "camelCase"], // 自定义事件 camelCase
      "vue/define-emits-declaration": ["error", "type-based"], // 使用类型定义 emits
      "vue/define-macros-order": [
        // 宏定义顺序
        "error",
        {
          order: ["defineProps", "defineEmits"]
        }
      ],
      "vue/html-indent": ["error", 2], // HTML 缩进 2 空格
      "vue/html-quotes": ["error", "double"], // HTML 使用双引号
      "vue/multi-word-component-names": "off", // 允许单词组件名
      "vue/no-v-html": "warn", // 警告 v-html
      "vue/require-default-prop": "warn", // 要求默认 prop
      "vue/require-explicit-emits": "warn", // 要求显式 emits

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
```

**关键规则说明**:

1. **vue/component-api-style**
   - 强制使用 `<script setup>` 语法
   - 符合 Vue 3 最佳实践

2. **vue/define-emits-declaration**
   - 使用类型定义 emits
   - 示例：

     ```vue
     <script setup lang="ts">
     // 正确：类型定义
     const emit = defineEmits<{
       (e: "update", value: string): void
       (e: "delete", id: number): void
     }>()

     // 错误：运行时声明
     const emit = defineEmits(["update", "delete"])
     </script>
     ```

3. **vue/define-macros-order**
   - 强制定义宏的顺序
   - `defineProps` 在 `defineEmits` 之前

### eslint.config.js - 根配置

```javascript
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
      "**/eslint/**", // 忽略 eslint 配置目录
      "eslint.config.js", // 忽略自身
      "eslint.config.ts",
      "eslint.config.cjs"
    ]
  }
]
```

### packages/components/eslint.config.js - 子包配置

```javascript
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
      "vue/no-reserved-component-names": "off", // 允许使用 Element Plus 组件
      "vue/block-lang": [
        "error",
        {
          script: {
            lang: "ts" // 强制 <script lang="ts">
          }
        }
      ],
      "vue/component-name-in-template-casing": [
        "error",
        "PascalCase",
        {
          registeredComponentsOnly: false,
          ignores: [
            // Element Plus 组件使用短横线命名
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
```

## 🎨 Prettier 配置

### .prettierrc.cjs - 配置文件

```javascript
module.exports = {
  semi: false, // 语句末尾不加分号
  singleQuote: false, // 使用双引号
  printWidth: 100, // 每行最大字符数
  tabWidth: 2, // 缩进空格数
  useTabs: false, // 使用空格缩进
  trailingComma: "none", // 不加尾逗号
  bracketSpacing: true, // 对象括号间加空格
  arrowParens: "avoid", // 箭头函数参数不加括号
  vueIndentScriptAndStyle: false, // Vue 文件不缩进 <script> 和 <style>
  endOfLine: "auto", // 自动换行符
  htmlWhitespaceSensitivity: "ignore" // HTML 空格敏感度
}
```

**配置说明**:

| 选项             | 默认值     | 项目值    | 说明                             |
| ---------------- | ---------- | --------- | -------------------------------- |
| `semi`           | `true`     | `false`   | 不添加分号，更简洁               |
| `singleQuote`    | `false`    | `false`   | 使用双引号，符合 JavaScript 标准 |
| `printWidth`     | `80`       | `100`     | 更宽的行宽，减少换行             |
| `tabWidth`       | `2`        | `2`       | 标准 2 空格缩进                  |
| `useTabs`        | `false`    | `false`   | 使用空格，跨编辑器一致性         |
| `trailingComma`  | `"all"`    | `"none"`  | 不加尾逗号，更简洁               |
| `bracketSpacing` | `true`     | `true`    | 对象字面量括号间加空格           |
| `arrowParens`    | `"always"` | `"avoid"` | 单参数箭头函数不加括号           |
| `endOfLine`      | `"lf"`     | `"auto"`  | 自动适配不同操作系统             |

### .prettierignore - 忽略文件

```
dist/
node_modules/
.gitignore
*.lock
*.log
*.tmp
*.map
```

### package.json - 脚本配置

```json
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

**使用方式**:

```bash
# 格式化所有文件
pnpm format

# 检查格式是否正确
pnpm format:check

# 格式化特定文件
pnpm prettier --write src/index.ts

# 格式化特定目录
pnpm prettier --write "src/**/*.{ts,tsx}"
```

## 🔗 Git Hooks 配置

### Husky 配置

#### package.json

```json
{
  "scripts": {
    "prepare": "husky" // 安装依赖时自动初始化 husky
  }
}
```

#### .husky/pre-commit

```bash
#!/bin/sh
pnpm exec lint-staged --relative
```

**说明**:

- 使用 `--relative` 选项，lint-staged 只处理相对路径文件
- 避免在 monorepo 中处理其他包的文件

### lint-staged 配置

#### package.json

```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx,vue}": [
      "eslint --fix --cache", // 修复 ESLint 问题并缓存结果
      "prettier --write" // 格式化代码
    ],
    "*.{json,md,yml,yaml}": [
      "prettier --write" // 格式化非代码文件
    ]
  }
}
```

**配置说明**:

1. **eslint --fix --cache**
   - `--fix`: 自动修复可修复的问题
   - `--cache`: 缓存结果，提升后续执行速度
   - 缓存文件: `.eslintcache`

2. **prettier --write**
   - 自动格式化代码
   - 覆盖原文件

**执行顺序**:

1. 暂存文件（`git add`）
2. 执行 `git commit`
3. 触发 `pre-commit` hook
4. lint-staged 检查暂存区文件
5. 对匹配文件执行 ESLint 和 Prettier
6. 如果有错误，中止提交
7. 如果成功，继续提交

### Commitlint 配置

#### commitlint.config.js

```javascript
export default {
  extends: ["@commitlint/config-conventional"]
}
```

**提交格式**:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**类型（type）**:

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建/工具链更新
- `ci`: CI 配置更新

**示例**:

```bash
# 正确格式
git commit -m "feat(utils): add debounce function"
git commit -m "fix(components): resolve button click issue"
git commit -m "docs: update README.md"

# 错误格式（会被 commitlint 拒绝）
git commit -m "add feature"
git commit -m "Fix bug"
```

### Commitizen 配置

#### package.json

```json
{
  "scripts": {
    "commit": "git-cz"
  }
}
```

**使用方式**:

```bash
# 交互式提交
pnpm commit

# 或
git-cz
```

## 📋 完整工作流程

### 1. 代码开发

```bash
# 创建分支
git checkout -b feature/new-feature

# 开发代码
# ... 编写代码 ...

# 手动检查（可选）
pnpm code:check

# 手动修复（可选）
pnpm code:fix
```

### 2. 提交代码

```bash
# 暂存文件
git add .

# 提交代码（触发 pre-commit hook）
pnpm commit

# 或使用传统方式
git commit -m "feat(utils): add debounce function"
```

**自动流程**:

1. lint-staged 检查暂存文件
2. 对 `.ts/.tsx/.js/.jsx/.vue` 文件执行 ESLint 和 Prettier
3. 对 `.json/.md/.yml/.yaml` 文件执行 Prettier
4. 如果检查失败，提交中止
5. 如果检查成功，commitlint 检查提交信息
6. 提交成功

### 3. 故障排除

#### 问题 1: ESLint 错误

```bash
# 查看详细错误信息
pnpm lint

# 自动修复
pnpm lint:fix
```

#### 问题 2: Prettier 格式错误

```bash
# 检查格式
pnpm format:check

# 自动格式化
pnpm format
```

#### 问题 3: TypeScript 类型错误

```bash
# 类型检查
pnpm type-check

# 在 IDE 中查看详细错误
```

## 🔧 高级配置

### Monorepo 特定配置

#### 1. 包级别 ESLint 配置

每个包可以有独立的 ESLint 配置：

```javascript
// packages/utils/eslint.config.js
import { baseConfig } from "../../eslint/base.js"

export default [
  ...baseConfig,
  {
    rules: {
      // 包特定的规则
    }
  }
]
```

#### 2. 共享 TypeScript 配置

所有包继承基础配置：

```json
// packages/utils/tsconfig.json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    // 包特定的配置
  }
}
```

#### 3. 路径映射

```json
// tsconfig.base.json
{
  "compilerOptions": {
    "paths": {
      "@small-brother/*": ["packages/*/src"]
    }
  }
}
```

### 性能优化

#### 1. ESLint 缓存

```json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix --cache", // 启用缓存
      "prettier --write"
    ]
  }
}
```

#### 2. TypeScript 增量编译

```json
// tsconfig.json
{
  "compilerOptions": {
    "incremental": true, // 启用增量编译
    "tsBuildInfoFile": ".tsbuildinfo"
  }
}
```

#### 3. Prettier 并行格式化

```bash
# 使用 prettier 的并行模式
pnpm prettier --write . --parallel
```

### IDE 集成

#### VS Code 配置

创建 `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

创建 `.vscode/extensions.json`:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "Vue.volar"
  ]
}
```

## 📚 参考资料

- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
- [ESLint 官方文档](https://eslint.org/docs/latest/)
- [Prettier 官方文档](https://prettier.io/docs/en/index.html)
- [Husky 官方文档](https://typicode.github.io/husky/)
- [lint-staged 官方文档](https://github.com/okonet/lint-staged)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Vue.js 风格指南](https://vuejs.org/style-guide/)

---

**文档版本**: 1.0.0
**最后更新**: 2026-03-04

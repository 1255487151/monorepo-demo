# eslint配置文件解析

```js
const globals = require("globals")
const tseslint = require("@typescript-eslint/eslint-plugin")
const tsParser = require("@typescript-eslint/parser")
const vuePlugin = require("eslint-plugin-vue")
const vueParser = require("vue-eslint-parser")

module.exports = [
  // ========== 配置块 1: 全局忽略模式 ==========
  {
    // 属性: ignores
    // 类型: string[]
    // 作用: 指定要完全忽略的文件/目录模式，ESLint 不会检查这些文件
    // 注意: 替代传统的 .eslintignore 文件
    ignores: [
      "**/dist/**", // 忽略所有 dist 目录
      "**/node_modules/**", // 忽略 node_modules
      "**/coverage/**", // 忽略测试覆盖率报告
      "**/*.min.js", // 忽略压缩文件
      "**/temp/**" // 忽略临时文件
    ]
  },

  // ========== 配置块 2: 通用配置 ==========
  {
    // 属性: files
    // 类型: string[] | string
    // 作用: 指定此配置块应用的文件模式
    // 注意: 支持 glob 模式，如 "**/*.js", "src/**/*.{ts,tsx}"
    files: ["**/*.{js,mjs,cjs}"],

    // 属性: languageOptions
    // 类型: Object
    // 作用: 所有与语言/环境相关的配置
    languageOptions: {
      // 属性: parser
      // 类型: Parser 对象
      // 作用: 指定代码解析器，默认为 espree
      // 示例:
      //   - espree (默认)
      //   - @typescript-eslint/parser (TypeScript)
      //   - vue-eslint-parser (Vue SFC)
      //   - @babel/eslint-parser (Babel)
      parser: require("espree"),

      // 属性: parserOptions
      // 类型: Object
      // 作用: 传递给解析器的额外配置
      parserOptions: {
        // 基础 ECMAScript 配置
        ecmaVersion: "latest", // ECMAScript 版本: "latest", 2022, 2021, 2015(ES6), 5, 3
        sourceType: "module", // 模块类型: "module" | "script"

        // ECMAScript 特性开关
        ecmaFeatures: {
          jsx: true, // 启用 JSX 支持
          globalReturn: true, // 允许在全局作用域中使用 return
          impliedStrict: true // 启用隐式严格模式
        },

        // TypeScript 特定配置
        project: ["./tsconfig.json"], // 启用类型检查的 TS 配置文件
        tsconfigRootDir: __dirname, // tsconfig 的根目录
        projectService: true, // 启用项目服务（提升性能）
        extraFileExtensions: [".vue"], // 额外文件扩展名

        // Babel 特定配置
        requireConfigFile: false, // 是否要求 babel 配置文件
        babelOptions: {} // Babel 配置选项
      },

      // 属性: ecmaVersion (替代 parserOptions.ecmaVersion)
      // 类型: number | string
      // 作用: 直接指定 ECMAScript 版本
      // 注意: 如果同时设置，会覆盖 parserOptions.ecmaVersion
      ecmaVersion: 2022,

      // 属性: sourceType (替代 parserOptions.sourceType)
      // 类型: "module" | "script" | "commonjs"
      // 作用: 直接指定源码类型
      sourceType: "module",

      // 属性: globals
      // 类型: Object
      // 作用: 定义全局变量，避免 "no-undef" 错误
      // 值: "readonly" (只读), "writable" (可写), "off" (禁用)
      globals: {
        // 使用 globals 包提供的预定义环境
        ...globals.browser, // 浏览器环境全局变量
        ...globals.node, // Node.js 环境全局变量
        ...globals.es2022, // ES2022 新增全局变量

        // 自定义全局变量
        myGlobal: "readonly", // 只读全局变量
        jQuery: "writable", // 可写全局变量
        legacyVar: "off" // 禁用该全局变量（不允许使用）
      },

      // 属性: linterOptions (ESLint 10.0.0+)
      // 类型: Object
      // 作用: ESLint 自身的配置选项
      linterOptions: {
        noInlineConfig: false, // 是否禁用行内配置（如 /* eslint-disable */）
        reportUnusedDisableDirectives: "warn", // 报告未使用的禁用指令
        reportUnusedInlineConfigs: "warn" // 报告未使用的行内配置
      }
    },

    // 属性: plugins
    // 类型: Object
    // 作用: 注册 ESLint 插件，提供额外规则
    // 格式: { "插件名": 插件对象 }
    plugins: {
      // 内置插件（已注册）
      // 自定义插件
      "@typescript-eslint": tseslint,
      vue: vuePlugin
      // 其他插件...
    },

    // 属性: rules
    // 类型: Object
    // 作用: 定义或覆盖规则
    // 值: "off" | "warn" | "error" | [规则名, 配置选项]
    rules: {
      // 错误级别规则
      "no-console": "error",
      "no-debugger": "error",

      // 警告级别规则
      "no-unused-vars": "warn",

      // 带配置选项的规则
      "prefer-const": [
        "error",
        {
          destructuring: "all",
          ignoreReadBeforeAssign: true
        }
      ],

      // 插件规则
      "@typescript-eslint/explicit-function-return-type": [
        "warn",
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true
        }
      ],

      // 禁用规则
      "no-alert": "off"
    },

    // 属性: settings
    // 类型: Object
    // 作用: 提供给插件共享的配置信息
    settings: {
      // 提供给 import/resolver 插件
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx", ".vue"]
        },
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json"
        }
      },

      // 提供给 react 插件
      react: {
        version: "detect" // 自动检测 React 版本
      },

      // 提供给 vue 插件
      "vue/sfc-blocks": {
        template: true, // 检查 <template> 块
        script: true, // 检查 <script> 块
        style: true // 检查 <style> 块
      }
    }

    // 属性: processor (已弃用，推荐使用 plugins)
    // 类型: string | Object
    // 作用: 指定处理器，用于处理特定文件类型
    // 注意: 在 Flat Config 中，推荐使用插件替代
    // processor: "vue/vue3-sfc",
  },

  // ========== 配置块 3: TypeScript 专用配置 ==========
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        tsconfigRootDir: __dirname,
        project: ["./packages/*/tsconfig.json"] // monorepo 支持
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      "@typescript-eslint": tseslint
    },
    rules: {
      // 继承 TypeScript ESLint 推荐配置
      ...tseslint.configs.recommended.rules,
      ...tseslint.configs["recommended-requiring-type-checking"].rules,

      // 自定义 TypeScript 规则
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off"
    }
  },

  // ========== 配置块 4: Vue 单文件组件配置 ==========
  {
    files: ["**/*.vue"],
    languageOptions: {
      // Vue 需要 vue-eslint-parser 作为主解析器
      parser: vueParser,
      parserOptions: {
        // 为 <script> 块指定 TypeScript 解析器
        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",
        extraFileExtensions: [".vue"]
      },
      globals: {
        ...globals.browser,
        ...globals.es2022
      }
    },
    plugins: {
      vue: vuePlugin
    },
    rules: {
      // Vue 3 推荐规则
      ...vuePlugin.configs["vue3-recommended"].rules,

      // 自定义 Vue 规则
      "vue/multi-word-component-names": "off",
      "vue/no-v-html": "warn"
    },
    settings: {
      "vue/sfc-blocks": {
        template: true,
        script: true,
        style: true
      }
    }
  },

  // ========== 配置块 5: 测试文件配置 ==========
  {
    files: ["**/__tests__/**", "**/*.{test,spec}.{js,ts,tsx,vue}"],
    languageOptions: {
      globals: {
        ...globals.jest, // Jest 全局变量
        ...globals.mocha, // Mocha 全局变量
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        vi: "readonly" // Vitest
      }
    },
    rules: {
      // 测试文件宽松规则
      "no-console": "off",
      "no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "off"
    }
  },

  // ========== 配置块 6: 配置文件专用配置 ==========
  {
    files: ["**/*.config.{js,ts}", "**/eslint.config.{js,cjs}"],
    languageOptions: {
      parserOptions: {
        project: null // 禁用 TypeScript 类型检查
      },
      globals: {
        ...globals.node,
        require: "readonly",
        module: "readonly",
        __dirname: "readonly",
        __filename: "readonly"
      }
    },
    rules: {
      // 配置文件宽松规则
      "no-console": "off",
      "@typescript-eslint/no-var-requires": "off"
    }
  }
]
```

# .prettierrc.js

> eslint-config-prettier eslint-plugin-prettier

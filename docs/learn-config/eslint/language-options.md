# Language Options

## 这一组配置解决什么问题

`languageOptions` 决定 ESLint 以什么语法和解析器去理解文件内容。

## 常见字段

| 名称                                | 类型                                       | 常见值                                           | 作用                       | 使用建议                               |
| ----------------------------------- | ------------------------------------------ | ------------------------------------------------ | -------------------------- | -------------------------------------- |
| `parser`                            | `Parser`                                   | `@typescript-eslint/parser`、`vue-eslint-parser` | 指定如何把源码解析成 AST   | TS 和 Vue 场景都要明确指定             |
| `parserOptions.ecmaVersion`         | `number \| "latest"`                       | `"latest"`、`2022`                               | 允许的 ECMAScript 语法版本 | 现代项目直接用 `"latest"`              |
| `parserOptions.sourceType`          | `"module" \| "script" \| "commonjs"`       | `"module"`                                       | 指定模块类型               | ESM 项目优先 `"module"`                |
| `parserOptions.project`             | `boolean \| string \| string[]`            | `true`、`"./tsconfig.json"`                      | 让解析器读取 tsconfig      | 只有规则或 parser 需要类型上下文时再加 |
| `parserOptions.extraFileExtensions` | `string[]`                                 | `[".vue"]`                                       | 追加特殊扩展名             | Vue SFC 场景常用                       |
| `globals`                           | `Record<string, "readonly" \| "writable">` | `window`、`defineProps`                          | 声明全局变量               | 宏和运行时全局都要在这里补齐           |

## 带注释示例

```ts
import globals from "globals"
import tsParser from "@typescript-eslint/parser"
import vueParser from "vue-eslint-parser"

export default [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      },
      globals: {
        ...globals.node,
        ...globals.browser
      }
    }
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",
        extraFileExtensions: [".vue"]
      },
      globals: {
        defineProps: "readonly",
        defineEmits: "readonly"
      }
    }
  }
]
```

## 当前项目对应片段

```ts
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
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly"
  }
}
```

## 注意事项

- `parser` 负责“谁来解析文件”，`parserOptions` 负责“解析时带什么参数”。
- Vue 场景一般是 `vue-eslint-parser` 外层包一层，再把 TS parser 放进 `parserOptions.parser`。
- `globals` 只是告诉 ESLint “这些变量存在”，不会自动导入任何运行时对象。

## 官方文档

- [languageOptions](https://eslint.org/docs/latest/use/configure/language-options)
- [globals package](https://www.npmjs.com/package/globals)

# 配置文件结构

## 这一组配置解决什么问题

这一页解释 Flat Config 文件本身怎么组织，以及一个配置对象里通常放哪些字段。

## 常见字段

| 名称                   | 类型                        | 常见值                           | 作用                       | 使用建议                                       |
| ---------------------- | --------------------------- | -------------------------------- | -------------------------- | ---------------------------------------------- |
| `export default [...]` | `Config[]`                  | 配置对象数组                     | Flat Config 的根结构       | 优先按“基础规则 / 技术栈 / 特殊目录”拆多个对象 |
| `name`                 | `string`                    | `"base"`、`"vue"`                | 给配置块命名，便于调试     | 多配置块时建议加                               |
| `files`                | `string[]`                  | `["**/*.ts"]`                    | 指定该配置块命中的文件     | 和 `ignores` 搭配使用                          |
| `ignores`              | `string[]`                  | `["**/dist/**"]`                 | 排除不参与此块匹配的文件   | 构建产物和依赖目录必须排除                     |
| `languageOptions`      | `object`                    | 见后文                           | 指定解析器、语法、全局变量 | JS/TS/Vue 项目一般都要配                       |
| `plugins`              | `Record<string, Plugin>`    | `{"@typescript-eslint": plugin}` | 注册规则命名空间           | 插件键名就是规则前缀                           |
| `rules`                | `Record<string, RuleLevel>` | `"error"`、`"warn"`              | 声明具体规则               | 先用推荐规则，再局部覆盖                       |
| `settings`             | `object`                    | 插件自定义配置                   | 提供插件运行时附加信息     | 只有插件明确需要时再配                         |
| `processor`            | `string \| Processor`       | 插件 processor                   | 先预处理文件再 lint        | 多数 TS/Vue 项目通常不需要单独写               |
| `linterOptions`        | `object`                    | `reportUnusedDisableDirectives`  | 配置 lint 本身的行为       | 适合治理历史注释                               |

## 带注释示例

```ts
import tsParser from "@typescript-eslint/parser"
import tseslint from "@typescript-eslint/eslint-plugin"

export default [
  {
    name: "base-ts",
    files: ["**/*.{ts,tsx}"],
    ignores: ["**/dist/**", "**/node_modules/**"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      }
    },
    plugins: {
      "@typescript-eslint": tseslint
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "no-var": "error"
    }
  }
]
```

## 当前项目对应片段

```ts
export const baseConfig = [
  {
    ignores: ["**/dist/**", "**/node_modules/**", "**/coverage/**", "**/*.d.ts"]
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: { ... },
    plugins: { ... },
    rules: { ... }
  }
]
```

## 注意事项

- Flat Config 用数组顺序决定覆盖关系，后面的配置块可以覆盖前面的规则。
- 不要把所有技术栈都塞进一个对象里，后续维护会很难。
- Flat Config 和旧 `.eslintrc` 的 `extends` 思维不完全一样，更常见的做法是“导入配置数组后再展开”。

## 官方文档

- [Configuration Files](https://eslint.org/docs/latest/use/configure/configuration-files)
- [Combine Configs](https://eslint.org/docs/latest/use/configure/combine-configs)

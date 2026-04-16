# ESLint

## 这一组配置解决什么问题

ESLint 用来做静态检查、代码风格约束和规则分组。在当前版本基线下，重点是 Flat Config 写法，而不是旧的 `.eslintrc*` 体系。

## 推荐阅读顺序

1. [配置文件结构](/learn-config/eslint/config-file)
2. [Language Options](/learn-config/eslint/language-options)
3. [Plugins And Rules](/learn-config/eslint/plugins-and-rules)
4. [Ignores And Files](/learn-config/eslint/ignores-and-files)

## 当前项目版本基线

| 项目                   | 当前基线 |
| ---------------------- | -------- |
| ESLint                 | `10.0.2` |
| `@typescript-eslint/*` | `8.56.1` |
| `eslint-plugin-vue`    | `10.8.0` |

## 当前项目对应片段

```ts
import { baseConfig } from "./eslint/base.js"

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
```

## 学习提示

- Flat Config 的核心不是“一个大对象”，而是“一个配置数组”。
- 大多数规则设计都围绕这四块展开：匹配范围、语言解析、插件注入、规则声明。

## 官方文档

- [Configuration Files](https://eslint.org/docs/latest/use/configure/configuration-files)
- [Configure Rules](https://eslint.org/docs/latest/use/configure/rules)

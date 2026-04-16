# Plugins And Rules

## 这一组配置解决什么问题

`plugins` 和 `rules` 决定 ESLint 最终检查什么，以及以什么严重级别报告问题。

## 常见字段

| 名称                 | 类型                                   | 常见值                          | 作用               | 使用建议                     |
| -------------------- | -------------------------------------- | ------------------------------- | ------------------ | ---------------------------- |
| `plugins`            | `Record<string, Plugin>`               | `{ vue: vuePlugin }`            | 注册规则来源       | 键名会变成规则前缀           |
| `rules["rule-name"]` | `RuleLevel \| [RuleLevel, ...options]` | `"off"`、`"warn"`、`"error"`    | 声明规则级别和参数 | 先用推荐规则，再覆盖局部差异 |
| 规则级别             | `string \| number`                     | `"off"`、`"warn"`、`"error"`    | 控制报错强度       | 文档里优先用字符串更直观     |
| 插件规则前缀         | `string`                               | `vue/*`、`@typescript-eslint/*` | 命名空间区分来源   | 一眼就能看出来自哪个插件     |

## 带注释示例

```ts
import tseslint from "@typescript-eslint/eslint-plugin"
import prettierPlugin from "eslint-plugin-prettier"

export default [
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@typescript-eslint": tseslint,
      prettier: prettierPlugin
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_"
        }
      ],
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports"
        }
      ],
      "prettier/prettier": "warn",
      "no-var": "error"
    }
  }
]
```

## 当前项目对应片段

```ts
plugins: {
  "@typescript-eslint": tseslint,
  prettier: prettierPlugin
},
rules: {
  ...tseslint.configs?.["recommended"]?.rules,
  ...prettierConfig.rules,
  "prettier/prettier": "warn",
  "@typescript-eslint/no-explicit-any": "warn",
  "@typescript-eslint/consistent-type-imports": [
    "warn",
    {
      prefer: "type-imports",
      fixStyle: "inline-type-imports"
    }
  ]
}
```

## 规则覆盖与分组思路

- 先引入推荐规则集。
- 再引入格式化冲突消除规则。
- 最后写项目自己的覆盖规则。

这种顺序的好处是：

- 推荐规则先兜底
- Prettier 冲突规则中间消掉
- 最后的小范围覆盖最清晰

## 注意事项

- `plugins` 的键名和包名不一定完全相同，但建议保持可读性一致。
- 当一个规则要带参数时，写成数组形式。
- 规则分组不要按“工具来源”堆在一起，最好按“推荐 / 格式化 / 项目覆盖”分层。

## 官方文档

- [Configure Plugins](https://eslint.org/docs/latest/use/configure/plugins)
- [Configure Rules](https://eslint.org/docs/latest/use/configure/rules)

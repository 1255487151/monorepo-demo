# Ignores And Files

## 这一组配置解决什么问题

`files` 和 `ignores` 决定“哪些文件命中某个配置块”，是 Flat Config 里最重要的范围控制能力之一。

## 常见字段

| 名称      | 类型       | 常见值           | 作用                           | 使用建议                             |
| --------- | ---------- | ---------------- | ------------------------------ | ------------------------------------ |
| `files`   | `string[]` | `["**/*.ts"]`    | 指定这个配置块要命中的文件     | 按技术栈或目录拆块时必配             |
| `ignores` | `string[]` | `["**/dist/**"]` | 排除匹配范围内不需要处理的文件 | 构建产物、依赖目录、生成文件必须排除 |
| glob 模式 | `string`   | `**/*.vue`       | 用 glob 匹配文件               | 文档里统一写绝对清晰的模式           |

## 带注释示例

```ts
export default [
  {
    ignores: ["**/dist/**", "**/node_modules/**", "**/*.d.ts"]
  },
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "no-var": "error"
    }
  },
  {
    files: ["**/*.vue"],
    ignores: ["packages/legacy/**"],
    rules: {
      "vue/component-api-style": ["error", ["script-setup"]]
    }
  }
]
```

## 当前项目对应片段

```ts
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
```

## 使用建议

- 根配置先放全局 `ignores`，避免构建产物污染 lint 结果。
- 技术栈相关规则再通过 `files` 拆成多个块。
- `files` 写得越清楚，后续维护越容易。

## 注意事项

- `ignores` 不是“删除文件”，只是从匹配范围里排除。
- 如果规则没生效，先查 `files` 是否命中，再查 `ignores` 是否把它排除了。

## 官方文档

- [Specify Files and Ignores](https://eslint.org/docs/latest/use/configure/configuration-files#specifying-files-and-ignores)

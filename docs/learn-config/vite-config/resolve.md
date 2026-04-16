# Resolve

## 该配置块负责什么

`resolve` 负责模块解析行为，最常见的是路径别名和扩展名补全。

## 常见字段

| 名称                 | 类型                                | 常见值                 | 作用                   | 使用建议                           |
| -------------------- | ----------------------------------- | ---------------------- | ---------------------- | ---------------------------------- |
| `resolve.alias`      | `Alias[] \| Record<string, string>` | `{ "@": "/src" }`      | 建立运行时别名映射     | 要和 TS `paths` 保持一致           |
| `resolve.extensions` | `string[]`                          | `[".ts", ".vue"]`      | 指定自动补全扩展名范围 | 保持最小必要集合                   |
| `resolve.conditions` | `string[]`                          | `["import", "module"]` | 控制条件导出解析       | 处理复杂包导出时使用               |
| `resolve.dedupe`     | `string[]`                          | `["vue"]`              | 强制某些依赖去重       | monorepo / linked package 场景常用 |

## 带注释示例

```ts
import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@types": resolve(__dirname, "src/types")
    },
    extensions: [".js", ".ts", ".vue", ".json"],
    conditions: ["import", "module", "default"]
  }
})
```

## 当前项目对应片段

```ts
resolve: {
  alias: {
    "@": resolve(rootDir, "src"),
    "@types": resolve(rootDir, "src/types")
  },
  extensions: [".js", ".ts", ".jsx", ".tsx", ".vue", ".json", ".mjs"],
  conditions: ["import", "module", "browser", "default"]
}
```

## 注意事项

- `resolve.alias` 是运行时和构建时生效，不能只改 TS 不改这里。
- 别名层级太多会让导入路径难懂，尽量只保留稳定前缀。
- `conditions` 一般只在处理复杂 `exports` 时才需要显式写。

## 官方文档

- [resolve.alias](https://vite.dev/config/shared-options.html#resolve-alias)

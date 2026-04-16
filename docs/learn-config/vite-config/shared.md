# Shared Options

## 该配置块负责什么

Shared options 是 `defineConfig` 顶层最常见的一批基础选项，用来描述项目根目录、基础路径、环境定义等。

## 常见字段

| 名称        | 类型                  | 常见值                     | 作用                           | 使用建议               |
| ----------- | --------------------- | -------------------------- | ------------------------------ | ---------------------- |
| `root`      | `string`              | `"."`、`"packages/demo"`   | 指定项目根目录                 | 多应用或子目录项目常用 |
| `base`      | `string`              | `"/"`、`"/docs/"`          | 控制资源基础路径               | 部署到子路径时必须配   |
| `define`    | `Record<string, any>` | `__DEV__`、`process.env.*` | 编译期常量替换                 | 只放纯静态值           |
| `publicDir` | `string \| false`     | `"public"`                 | 控制静态资源目录               | 纯库项目常常不用       |
| `envDir`    | `string`              | `"."`                      | 指定环境变量目录               | 多环境项目             |
| `envPrefix` | `string \| string[]`  | `"VITE_"`                  | 允许暴露给客户端的环境变量前缀 | 不要放过宽前缀         |

## 带注释示例

```ts
import { defineConfig } from "vite"

export default defineConfig({
  root: ".",
  base: "/",
  define: {
    __DEV__: true
  },
  publicDir: "public",
  envPrefix: ["VITE_"]
})
```

## 当前项目对应片段

当前仓库的库配置基本没有额外 shared options，主要依赖默认值和 `resolve` / `build` / `plugins`：

```ts
export default defineConfig({
  plugins: [dts({ ... })],
  build: { ... },
  resolve: { ... }
})
```

## 注意事项

- `define` 是字符串级替换，不是运行时赋值。
- 库模式下很多应用型 shared options 并不会频繁出现，但理解它们有助于迁移到应用项目。

## 官方文档

- [Shared Options](https://vite.dev/config/shared-options)

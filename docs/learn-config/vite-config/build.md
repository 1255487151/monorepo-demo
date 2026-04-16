# Build

## 该配置块负责什么

`build` 负责产物输出、库模式入口、外部依赖排除和 Rollup 输出行为。

## 常见字段

| 名称                     | 类型                               | 常见值                   | 作用                       | 使用建议                           |
| ------------------------ | ---------------------------------- | ------------------------ | -------------------------- | ---------------------------------- |
| `build.lib`              | `object`                           | `entry`、`formats`       | 进入库模式                 | npm 包构建核心入口                 |
| `build.lib.entry`        | `string \| Record<string, string>` | `"src/index.ts"`         | 指定入口，可单入口或多入口 | 组件库多入口常用对象形式           |
| `build.lib.formats`      | `string[]`                         | `["es"]`、`["es","cjs"]` | 控制输出格式               | 包导出策略要和 `package.json` 对齐 |
| `outDir`                 | `string`                           | `"dist"`                 | 指定输出目录               | 常规库项目默认选项                 |
| `emptyOutDir`            | `boolean`                          | `true`                   | 构建前清空输出目录         | 大多数场景建议开                   |
| `cssCodeSplit`           | `boolean`                          | `true` / `false`         | 是否拆分 CSS 产物          | 组件库按需样式常用 `true`          |
| `rollupOptions.external` | `Array<string \| RegExp>`          | `["vue"]`                | 排除外部依赖不打进包体     | peerDependencies 必须重点看这里    |
| `rollupOptions.output`   | `object`                           | `entryFileNames` 等      | 控制文件命名和导出形式     | 多入口库经常需要精细控制           |
| `target`                 | `string`                           | `"ES2020"`               | 控制构建目标               | 跟发布环境和依赖生态保持一致       |
| `minify`                 | `boolean \| string`                | `false`、`"esbuild"`     | 控制压缩策略               | 库项目是否压缩要按发布需求决定     |

## 带注释示例

```ts
import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "MyLibrary",
      formats: ["es", "cjs"]
    },
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named"
      }
    },
    target: "ES2020",
    minify: false
  }
})
```

## 当前项目对应片段

组件库多入口：

```ts
build: {
  lib: {
    entry: createLibraryEntries(componentEntries),
    name: "SmallBrotherComponents",
    formats: ["es"],
    fileName: (_format, entryName) => `${entryName}.mjs`
  },
  cssCodeSplit: true,
  rollupOptions: {
    external: [
      "vue",
      /^vue\\//,
      "element-plus",
      /^element-plus\\//,
      "@smallbrother/utils",
      /^@smallbrother\\//
    ]
  }
}
```

指令库与 utils：

```ts
build: {
  lib: {
    entry: resolve(__dirname, "src/index.ts"),
    formats: ["es", "cjs"]
  },
  rollupOptions: {
    output: {
      exports: "named"
    }
  },
  target: "ES2020",
  minify: false
}
```

## 注意事项

- `build.lib.formats` 必须和 `package.json exports`、`main`、`module` 保持一致。
- `external` 少配会把不该进包体的依赖打进去，过多又会让运行时缺依赖。
- 组件库如果要支持按需样式，通常要同时关注 `cssCodeSplit` 和自定义插件。

## 官方文档

- [Library Mode](https://vite.dev/guide/build#library-mode)
- [Build Options](https://vite.dev/config/build-options)

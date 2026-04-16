# Plugins

## 该配置块负责什么

`plugins` 用来扩展 Vite 的能力，例如处理 Vue、生成类型声明或接入自定义构建插件。

## 常见字段

| 名称       | 类型             | 常见值               | 作用                  | 使用建议                     |
| ---------- | ---------------- | -------------------- | --------------------- | ---------------------------- |
| `plugins`  | `PluginOption[]` | `vue()`、`dts()`     | 注入 Vite/Rollup 插件 | 插件顺序要有意识地安排       |
| `vue()`    | `Plugin`         | `@vitejs/plugin-vue` | 让 Vite 识别 Vue SFC  | Vue 项目基础插件             |
| `dts()`    | `Plugin`         | `vite-plugin-dts`    | 生成 `.d.ts`          | 库项目常用                   |
| 自定义插件 | `Plugin`         | 函数调用结果         | 封装项目特有构建行为  | 适合样式产物、入口重写等逻辑 |

## 带注释示例

```ts
import vue from "@vitejs/plugin-vue"
import dts from "vite-plugin-dts"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ["src/**/*"],
      outDir: "dist",
      insertTypesEntry: true
    })
  ]
})
```

## 当前项目对应片段

```ts
plugins: [
  vue(),
  emitLibraryCssAssets(componentEntries),
  rewriteRuntimeStyleEntries(componentEntries),
  dts({
    include: ["src/**/*.ts", "src/**/*.vue"],
    outDir: "dist",
    insertTypesEntry: true
  })
]
```

## 注意事项

- 插件顺序会影响执行结果，特别是源码转换和产物改写类插件。
- `vite-plugin-dts` 更适合和库模式搭配，用来补齐类型声明产物。
- 项目里出现自定义插件时，要优先理解它修改的是“源码输入”还是“打包输出”。

## 官方文档

- [Using Plugins](https://vite.dev/guide/using-plugins)
- [vite-plugin-dts](https://github.com/qmhc/vite-plugin-dts)

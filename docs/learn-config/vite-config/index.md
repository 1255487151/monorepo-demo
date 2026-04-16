# Vite Config

## 这一组配置解决什么问题

Vite Config 用来控制 Vite 如何解析源码、接插件、以及在库模式下输出 npm 包产物。

## 推荐阅读顺序

1. [Shared Options](/learn-config/vite-config/shared)
2. [Plugins](/learn-config/vite-config/plugins)
3. [Resolve](/learn-config/vite-config/resolve)
4. [Build](/learn-config/vite-config/build)

## 当前项目版本基线

| 项目              | 当前基线 |
| ----------------- | -------- |
| Vite              | `7.3.1`  |
| `vite-plugin-dts` | `4.5.4`  |

## 当前项目对应片段

```ts
export default defineConfig({
  plugins: [
    vue(),
    emitLibraryCssAssets(componentEntries),
    rewriteRuntimeStyleEntries(componentEntries),
    dts({ ... })
  ],
  build: {
    lib: {
      entry: createLibraryEntries(componentEntries),
      formats: ["es"]
    }
  }
})
```

## 官方文档

- [Config Reference](https://vite.dev/config/)
- [Guide: Build](https://vite.dev/guide/build)

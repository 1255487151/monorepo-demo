# Vite Config 配置学习

## 当前作用

仓库通过每个发布库各自的 `vite.config.ts` 完成构建，而不是使用单一的根构建配置。Vite 在这里承担的是“库打包器”角色，而不是应用开发服务器角色。

## 对应源码配置

- `packages/components/vite.config.ts`
- `packages/directives/vite.config.ts`
- `packages/utils/vite.config.ts`

## 关键理解点

### 每个库都以 library mode 构建

三个发布库都使用 `build.lib` 输出 npm 包产物，但各自职责不同：

- `components`：多入口组件库，额外处理样式资产和运行时入口重写
- `directives`：标准单入口指令库，输出 `ESM + CJS`
- `utils`：标准单入口工具库，输出 `ESM + CJS`

### `components` 的 Vite 配置最复杂

`@smallbrother/components` 除了 `vue()` 和 `vite-plugin-dts`，还包含自定义插件能力：

- 组件入口收集
- CSS 资产发射
- 运行时样式入口重写

这说明它不是普通单入口库，而是“多入口 + 样式分发 + resolver”型组件库。

### 旧文档里哪些 Vite 概念仍然值得保留

原 `docs/VITE_CONFIG.md` 是偏百科式的 Vite 7 配置手册。迁移到当前页面后，仍然保留以下对理解仓库有帮助的部分：

| 概念                     | 在当前仓库里的意义                                |
| ------------------------ | ------------------------------------------------- |
| `defineConfig`           | 所有包都以此组织配置                              |
| `plugins`                | 用于接入 Vue、dts 与自定义构建插件                |
| `resolve.alias`          | 用于包内源码别名                                  |
| `build.lib`              | 决定这是库打包而不是应用打包                      |
| `rollupOptions.external` | 控制 `vue`、`element-plus` 等外部依赖不被打进包里 |
| `output`                 | 控制产物文件名和导出形式                          |

### 当前 `components` 配置的关键片段

```ts
build: {
  lib: {
    entry: createLibraryEntries(componentEntries),
    name: "SmallBrotherComponents",
    formats: ["es"]
  },
  cssCodeSplit: true,
  rollupOptions: {
    external: ["vue", /^vue\\//, "element-plus", /^element-plus\\//, "@smallbrother/utils", /^@smallbrother\\//]
  }
}
```

这段配置决定了：

- `components` 是多入口库
- CSS 被拆分输出
- `element-plus` 与内部依赖不会被打进最终产物
- 包导出形态依赖自定义入口生成器与产物重写逻辑

### `directives` 和 `utils` 更接近标准库打包模板

这两个包的 Vite 配置都以：

- 单入口
- `vite-plugin-dts`
- `ESM/CJS`
- `exports: "named"`

为核心，复杂度显著低于 `components`。

## 在当前仓库里的使用建议

- 分析构建问题时，先定位到具体包，不要默认只有一个全局 Vite 配置。
- 修改 `components` 样式行为时，要同时关注 `plugin/` 目录下的打包插件。
- 解释构建行为时，优先基于当前包的 `vite.config.ts`，不要引用通用 Vite 指南替代真实实现。

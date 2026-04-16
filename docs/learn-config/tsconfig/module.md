# 模块系统

## 配置分组说明

这一页聚焦 TypeScript 如何理解模块、导入语义和 bundler 解析行为。

## 常见字段

| 名称                           | 类型      | 默认倾向                        | 作用                                   | 常见场景           |
| ------------------------------ | --------- | ------------------------------- | -------------------------------------- | ------------------ |
| `module`                       | `string`  | 现代前端常用 `ESNext`           | 决定模块输出形态                       | bundler / ESM 项目 |
| `moduleResolution`             | `string`  | `bundler`、`node16`、`nodenext` | 决定依赖解析策略                       | Vite、Node ESM     |
| `verbatimModuleSyntax`         | `boolean` | 新项目建议开启                  | 保持 `import type` 和值导入边界        | 现代 ESM 项目      |
| `esModuleInterop`              | `boolean` | 混用 CommonJS 时常开            | 改善默认导入互操作                     | 历史 npm 包兼容    |
| `allowSyntheticDefaultImports` | `boolean` | 常和上项一起开                  | 允许对没有默认导出的模块写默认导入语法 | 生态兼容           |
| `resolveJsonModule`            | `boolean` | 需要导入 JSON 时开启            | 允许直接导入 `.json`                   | 读配置或静态数据   |
| `moduleDetection`              | `string`  | `force` / `auto`                | 控制 TS 如何判断文件是否为模块         | 强制 ESM 边界      |
| `isolatedModules`              | `boolean` | 构建工具项目建议开启            | 保证每个文件都能独立转换               | Vite、esbuild、SWC |

## 带注释示例

```json
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "bundler",
    "verbatimModuleSyntax": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    "moduleDetection": "force",
    "isolatedModules": true
  }
}
```

## 当前项目相关字段映射

```json
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "bundler",
    "verbatimModuleSyntax": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    "moduleDetection": "force",
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true
  }
}
```

## 注意事项

- `moduleResolution: "bundler"` 更贴近 Vite 这类工具链，不等于 Node 运行时解析。
- `verbatimModuleSyntax` 开启后，导入写法会更严格，也更接近真实运行语义。
- `isolatedModules` 对单文件转换链路很重要，但也会限制一些只依赖全程序分析的写法。

## 官方文档

- [module](https://www.typescriptlang.org/tsconfig#module)
- [moduleResolution](https://www.typescriptlang.org/tsconfig#moduleResolution)
- [verbatimModuleSyntax](https://www.typescriptlang.org/tsconfig#verbatimModuleSyntax)

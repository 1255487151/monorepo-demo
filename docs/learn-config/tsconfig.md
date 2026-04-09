# TSConfig 配置学习

## 当前作用

仓库通过 `tsconfig.base.json` + 根 `tsconfig.json` + 各包 `tsconfig.json` 的方式组织类型系统配置，目标是让 monorepo 保持统一编译基线，同时允许每个发布库按产物需求追加输出设置。

## 对应源码配置

- `tsconfig.base.json`
- `tsconfig.json`
- `packages/components/tsconfig.json`
- `packages/directives/tsconfig.json`
- `packages/utils/tsconfig.json`

## 关键理解点

### `tsconfig.base.json` 定义统一基线

基础配置统一了以下重点：

- `moduleResolution: "bundler"`
- `target: "ES2022"`
- `strict: true`
- `verbatimModuleSyntax: true`
- `paths` 中 `@smallbrother/* -> packages/*/src`

它的职责是为所有包提供一致的类型检查与路径解析规则。

### 当前基础配置长什么样

旧版 `docs/TSCONFIG.md` 更像完整字段词典。迁移到这里后，只保留和当前仓库直接相关的配置形态：

```json
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "bundler",
    "target": "ES2022",
    "baseUrl": ".",
    "rootDir": ".",
    "paths": {
      "@smallbrother/*": ["packages/*/src"]
    },
    "strict": true,
    "verbatimModuleSyntax": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "types": ["node"]
  }
}
```

这比旧文档里的“所有可能配置项全集”更贴近当前仓库真实约束。

### 根 `tsconfig.json` 更偏向仓库级检查

根配置开启 `noEmit`，主要覆盖：

- `scripts/**/*.ts`
- 根配置文件
- `eslint/**/*.js`

也就是说，根配置更像“仓库维度的类型检查入口”，而不是单包产物配置。

### 各子包配置负责产物相关细节

每个发布库会在自己的 `tsconfig.json` 中声明：

- `rootDir`
- `outDir`
- 包级路径别名
- 包内额外排除规则

这让类型检查与打包产物声明能够按包收口。

### 旧文档里哪些概念依然值得保留

原文中以下概念仍然值得继续掌握：

| 概念                             | 在当前仓库里的意义                   |
| -------------------------------- | ------------------------------------ |
| `moduleResolution`               | 决定 monorepo 和打包工具如何解析依赖 |
| `paths`                          | 决定内部包源码别名与类型跳转         |
| `strict`                         | 决定类型系统整体严苛程度             |
| `noEmit`                         | 决定根配置是否只做检查不产生产物     |
| `declaration` / `declarationMap` | 决定子包是否输出声明文件             |
| `include` / `exclude`            | 决定检查边界                         |

## 在当前仓库里的使用建议

- 理解类型问题时，先判断它发生在“仓库层”还是“包层”。
- 修改路径别名时，同时检查 `tsconfig.base.json` 与包级配置是否一致。
- 解释一个类型行为时，优先引用当前实际配置，而不是通用 tsconfig 样例。

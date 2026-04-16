# 输出与边界

## 配置分组说明

这一页解释哪些字段控制编译输出、声明文件生成，以及哪些文件参与编译。

## 常见字段

| 名称                  | 类型       | 默认倾向           | 作用                 | 常见场景                 |
| --------------------- | ---------- | ------------------ | -------------------- | ------------------------ |
| `outDir`              | `string`   | `dist`             | 指定输出目录         | 库构建                   |
| `declaration`         | `boolean`  | 库项目建议开启     | 生成 `.d.ts`         | npm 包                   |
| `declarationDir`      | `string`   | 跟 `outDir` 对齐   | 单独指定声明文件目录 | 类型和 JS 分开输出       |
| `declarationMap`      | `boolean`  | 需要类型跳转时开启 | 生成声明映射         | 包调试和跳转             |
| `emitDeclarationOnly` | `boolean`  | 构建分离时常开     | 只输出声明文件       | Vite/rollup 负责 JS 构建 |
| `noEmit`              | `boolean`  | 仓库级检查常开     | 只做检查不产生产物   | 根级 ts 检查             |
| `include`             | `string[]` | 明确列出源码范围   | 控制参与编译的文件   | monorepo 分包管理        |
| `exclude`             | `string[]` | 排除 dist/test 等  | 控制不参与编译的文件 | 构建产物和测试           |

## 带注释示例

```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "declaration": true,
    "declarationDir": "./dist/types",
    "emitDeclarationOnly": true
  },
  "include": ["src/**/*", "**/*.d.ts"],
  "exclude": ["node_modules", "dist", "**/*.spec.ts", "**/*.test.ts"]
}
```

## 当前项目相关字段映射

根检查入口：

```json
{
  "compilerOptions": {
    "noEmit": true
  },
  "include": ["scripts/**/*.ts", "eslint.config.js", "commitlint.config.js", "eslint/**/*.js"]
}
```

包级输出配置：

```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "declaration": true,
    "declarationDir": "./dist",
    "emitDeclarationOnly": true
  },
  "include": ["src/**/*", "**/*.d.ts"],
  "exclude": ["node_modules", "dist", "**/*.spec.ts", "**/*.test.ts"]
}
```

## 注意事项

- `noEmit` 和 `emitDeclarationOnly` 是两种完全不同的用途。
- `include` / `exclude` 直接决定编译边界，排查“为什么没检查到”或“为什么多检查了”时优先看这里。
- 库项目常见模式是：TS 负责类型声明，Vite/Rollup 负责 JS 产物。

## 官方文档

- [declaration](https://www.typescriptlang.org/tsconfig#declaration)
- [noEmit](https://www.typescriptlang.org/tsconfig#noEmit)
- [include](https://www.typescriptlang.org/tsconfig#include)

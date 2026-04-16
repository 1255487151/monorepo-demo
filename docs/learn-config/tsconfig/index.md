# TSConfig

## 这一组配置解决什么问题

TSConfig 用来描述 TypeScript 如何解析模块、检查类型、输出声明文件，以及哪些文件参与编译。

## 推荐阅读顺序

1. [基础选项](/learn-config/tsconfig/basic)
2. [模块系统](/learn-config/tsconfig/module)
3. [路径别名](/learn-config/tsconfig/paths)
4. [严格模式](/learn-config/tsconfig/strict)
5. [输出与边界](/learn-config/tsconfig/output)

## 当前项目版本基线

| 项目       | 当前基线 |
| ---------- | -------- |
| TypeScript | `5.9.3`  |

## 当前项目对应片段

```json
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "bundler",
    "target": "ES2022",
    "paths": {
      "@smallbrother/*": ["packages/*/src"]
    },
    "strict": true,
    "verbatimModuleSyntax": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

## 学习提示

- `compilerOptions` 是主干。
- 先理解模块与路径，再理解严格模式和输出边界，排障会更快。

## 官方文档

- [TSConfig Reference](https://www.typescriptlang.org/tsconfig)

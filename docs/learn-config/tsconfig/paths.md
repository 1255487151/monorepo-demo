# 路径别名

## 配置分组说明

这一页解释 TSConfig 中和路径解析、源码别名相关的字段。

## 常见字段

| 名称      | 类型                       | 默认倾向         | 作用                   | 常见场景               |
| --------- | -------------------------- | ---------------- | ---------------------- | ---------------------- |
| `baseUrl` | `string`                   | `"."`            | 设置非相对路径解析起点 | monorepo、源码别名     |
| `rootDir` | `string`                   | 按源码根目录设置 | 声明源文件根目录       | 产物输出和声明文件组织 |
| `paths`   | `Record<string, string[]>` | 按模块前缀配置   | 给模块名建立别名映射   | 内部包别名、源码跳转   |

## 带注释示例

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "rootDir": ".",
    "paths": {
      "@smallbrother/*": ["packages/*/src"],
      "@/*": ["src/*"]
    }
  }
}
```

## 当前项目相关字段映射

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "rootDir": ".",
    "paths": {
      "@smallbrother/*": ["packages/*/src"]
    }
  }
}
```

子包里也有包内别名：

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@smallbrother/components": ["./src"]
    }
  }
}
```

## 注意事项

- `paths` 只影响 TypeScript 解析，不会自动改运行时路径。
- 一旦改了 `paths`，通常也要同步 bundler 的 alias 配置。
- monorepo 场景下，仓库级别名和包级别名不要互相打架。

## 官方文档

- [baseUrl](https://www.typescriptlang.org/tsconfig#baseUrl)
- [paths](https://www.typescriptlang.org/tsconfig#paths)
- [rootDir](https://www.typescriptlang.org/tsconfig#rootDir)

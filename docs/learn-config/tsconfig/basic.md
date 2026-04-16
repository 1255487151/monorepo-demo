# 基础选项

## 配置分组说明

这一页解释和基础编译环境直接相关的常见字段。

## 常见字段

| 名称           | 类型       | 默认倾向                 | 作用                     | 常见场景                  |
| -------------- | ---------- | ------------------------ | ------------------------ | ------------------------- |
| `target`       | `string`   | 现代项目常用 `ES2020+`   | 控制输出语法目标         | 构建面向现代浏览器或 Node |
| `lib`          | `string[]` | 按运行环境选择           | 注入可用运行时 API 类型  | 浏览器项目常配 `DOM`      |
| `jsx`          | `string`   | `preserve` / `react-jsx` | 控制 JSX 处理方式        | Vue JSX 或 React 项目     |
| `allowJs`      | `boolean`  | 渐进迁移时开启           | 允许把 JS 文件纳入编译   | JS 向 TS 迁移             |
| `checkJs`      | `boolean`  | 需要检查 JS 时开启       | 在 JS 文件中报告类型问题 | 配置文件或遗留 JS         |
| `types`        | `string[]` | 按运行环境指定           | 限制自动注入的全局类型包 | Node 脚本、Vite 客户端    |
| `skipLibCheck` | `boolean`  | 多数项目开启             | 跳过第三方声明文件检查   | 提升类型检查速度          |

## 带注释示例

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "allowJs": true,
    "checkJs": true,
    "types": ["node"],
    "skipLibCheck": true
  }
}
```

## 当前项目相关字段映射

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "allowJs": true,
    "checkJs": true,
    "types": ["node"],
    "skipLibCheck": true
  }
}
```

## 注意事项

- `target` 控制语法输出，不等于自动补 polyfill。
- `types` 一旦显式声明，就只会注入列出的类型包。
- `allowJs` 和 `checkJs` 一起开时，要准备好处理 JS 文件里的类型报错。

## 官方文档

- [target](https://www.typescriptlang.org/tsconfig#target)
- [lib](https://www.typescriptlang.org/tsconfig#lib)
- [types](https://www.typescriptlang.org/tsconfig#types)

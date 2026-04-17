# learn-config

## 这组页面的定位

`learn-config` 是学习型配置参考区，不再只解释当前仓库用到的几个字段。

写法目标是：

- 像 API 手册一样查配置项
- 看到字段时能快速知道类型、作用和常见值
- 能直接复制带注释示例
- 能跳到对应官方文档继续深入

正文以当前项目依赖的大版本为基线：

- ESLint 10 + Flat Config
- TypeScript 5.9
- Vite 7
- Git 协作流程按当前仓库约定组织

## 当前主题

| 主题        | 说明                                                  | 入口                                      |
| ----------- | ----------------------------------------------------- | ----------------------------------------- |
| ESLint      | Flat Config 体系、规则分组、解析器与匹配范围          | [ESLint](/learn-config/eslint/)           |
| TSConfig    | TypeScript 编译、模块、路径别名、严格模式和输出边界   | [TSConfig](/learn-config/tsconfig/)       |
| Vite Config | Vite shared options、plugins、resolve、build 和库模式 | [Vite Config](/learn-config/vite-config/) |
| Git         | 常用命令、hooks、提交约束、远程和发布流程             | [Git](/learn-config/git/)                 |
| Terminal    | mac 终端基础命令、mac 补充能力与 iTerm2 常用操作      | [Terminal](/learn-config/terminal)        |

## 推荐阅读顺序

1. 先看 [TSConfig](/learn-config/tsconfig/)，理解类型系统和路径解析。
2. 再看 [ESLint](/learn-config/eslint/)，理解静态检查的匹配范围和规则组织。
3. 再看 [Vite Config](/learn-config/vite-config/)，理解库模式构建。
4. 再看 [Git](/learn-config/git/)，补齐协作与发布流程。
5. 最后看 [Terminal](/learn-config/terminal)，熟悉本地终端和 iTerm2 常用操作。

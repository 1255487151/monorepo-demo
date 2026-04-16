# Git

## 这一组页面负责什么

这一组页面不是配置项词典，而是 Git 命令速查、协作流程和仓库约定手册。

## 推荐阅读顺序

1. [常用命令](/learn-config/git/common)
2. [Hooks 与提交](/learn-config/git/hooks)
3. [远程与代理](/learn-config/git/remote)
4. [版本与发布](/learn-config/git/release)

## 当前仓库对应入口

| 场景              | 仓库入口                               |
| ----------------- | -------------------------------------- |
| 提交前检查        | `.husky/pre-commit`                    |
| 暂存区格式化/修复 | `package.json -> lint-staged`          |
| 规范化提交        | `pnpm run commit`                      |
| 版本发布          | `pnpm run version`、`pnpm run release` |

## 学习提示

- 先掌握本地命令和远程操作。
- 再理解 hooks、提交约束和发布脚本。
- Git 页重点是“场景和命令怎么用”，不是 Git 内部原理。

## 官方文档

- [Git Documentation](https://git-scm.com/doc)

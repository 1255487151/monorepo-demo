# 常用命令

## 场景说明

这一页收录最常用的本地 Git 命令，适合日常查看状态、切分支、提交和查看历史。

## 命令表

| 命令                                       | 作用           | 说明                             |
| ------------------------------------------ | -------------- | -------------------------------- |
| `git status`                               | 查看工作区状态 | 最常用的当前状态检查命令         |
| `git diff`                                 | 查看未暂存差异 | 看工作区修改                     |
| `git diff --staged`                        | 查看已暂存差异 | 提交前检查暂存内容               |
| `git add <path>`                           | 暂存文件       | 把修改加入暂存区                 |
| `git restore --staged <path>`              | 取消暂存       | 从暂存区移除文件                 |
| `git commit`                               | 创建提交       | 当前仓库更推荐 `pnpm run commit` |
| `git log --oneline --graph --decorate -20` | 查看简要历史   | 适合看近期分支图                 |
| `git switch <branch>`                      | 切换分支       | 新写法，优于旧 `checkout`        |
| `git switch -c <branch>`                   | 新建并切换分支 | 新功能开发常用                   |

## 仓库内对应入口

- 提交信息生成：`pnpm run commit`
- 提交前总检查：`pnpm run code:check`

## 常见误区 / 注意事项

- 先看 `git diff --staged` 再提交，避免把不该提交的文件带进去。
- `git switch` 负责分支切换，`git restore` 负责文件恢复，语义比老 `checkout` 更清楚。

## 官方文档

- [git-status](https://git-scm.com/docs/git-status)
- [git-switch](https://git-scm.com/docs/git-switch)
- [git-diff](https://git-scm.com/docs/git-diff)

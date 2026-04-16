# Hooks 与提交

## 场景说明

这一页解释当前仓库的提交前检查、提交规范和相关命令入口。

## 命令与入口表

| 项目            | 当前入口                           | 说明                           |
| --------------- | ---------------------------------- | ------------------------------ |
| pre-commit hook | `.husky/pre-commit`                | 提交前自动执行检查             |
| 暂存区检查      | `pnpm exec lint-staged --relative` | 只处理已暂存文件               |
| 规范化提交      | `pnpm run commit`                  | 通过 `git-cz` 生成提交信息     |
| 提交格式校验    | `commitlint.config.js`             | 使用 conventional commits 规则 |

## 当前仓库片段

```sh
pnpm exec lint-staged --relative
```

```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx,vue}": ["eslint --fix", "prettier --write"],
    "*.{json,md,yml,yaml}": ["prettier --write"]
  }
}
```

```js
export default {
  extends: ["@commitlint/config-conventional"]
}
```

## 常见误区 / 注意事项

- `lint-staged` 只处理已暂存文件，不会替代全量检查。
- 提交前最好先手动跑 `pnpm run code:check`，不要只靠 hook 兜底。
- 提交信息建议走 `pnpm run commit`，减少不规范 message。

## 官方文档

- [Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)
- [Husky](https://typicode.github.io/husky/)
- [lint-staged](https://github.com/lint-staged/lint-staged)
- [Commitlint](https://commitlint.js.org/)

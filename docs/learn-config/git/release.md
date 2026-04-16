# 版本与发布

## 场景说明

这一页只解释当前仓库和版本、发布相关的命令入口，不展开 npm 发布原理。

## 命令表

| 命令               | 作用         | 说明                          |
| ------------------ | ------------ | ----------------------------- |
| `pnpm run version` | 进入版本流程 | 实际调用 `scripts/version.ts` |
| `pnpm run release` | 发布入口     | 当前脚本会串起版本和发布动作  |
| `pnpm run build`   | 构建全部包   | 发布前应先确保产物可构建      |

## 当前仓库片段

```json
{
  "scripts": {
    "version": "npx tsx scripts/version.ts",
    "release": "pnpm run version --publish --push"
  }
}
```

## 仓库内对应入口

- 版本流程入口：`scripts/version.ts`
- 发布命令入口：根 `package.json` `release`

## 常见误区 / 注意事项

- 发布前先保证工作区干净。
- 发布前至少跑一遍 `pnpm run build` 和 `pnpm run code:check`。
- 脚本如何改版本号、如何推 tag，应该以 `scripts/version.ts` 为准，不靠记忆。

## 官方文档

- [git-tag](https://git-scm.com/docs/git-tag)
- [npm publish](https://docs.npmjs.com/cli/v10/commands/npm-publish)

# Git 配置学习

## 当前作用

当前仓库的 Git 相关知识主要分为两部分：

- 日常命令和代理 / 远程仓库操作经验
- 提交前自动校验流程

## 对应源码配置

- `.husky/pre-commit`
- `commitlint.config.js`
- `package.json` 中 `commit`、`prepare`、`lint-staged`

## 关键理解点

### 提交前会自动执行 `lint-staged`

当前 `.husky/pre-commit` 直接执行：

```sh
pnpm exec lint-staged --relative
```

这意味着暂存区内的代码在提交前会自动经过 ESLint / Prettier 处理。

### 提交规范通过 Commitizen 和 Commitlint 约束

根脚本中已经提供：

- `pnpm run commit`
- `commitlint.config.js`

这套组合用于统一提交信息格式，减少发布和版本脚本中的噪音。

### Git 学习页偏向“仓库协作”

这里不把 Git 写成完整教程，而是聚焦当前仓库最常用的代理、远程仓库与提交流程。

## 命令速查

### 设置代理

```bash
git config http.proxy http://127.0.0.1:7890
git config http.proxy https://127.0.0.1:7890
git config --global http.proxy http://127.0.0.1:7890
git config --global http.proxy https://127.0.0.1:7890
```

### 取消代理

```bash
git config --unset http.proxy
git config --unset https.proxy
git config --global --unset http.proxy
git config --global --unset https.proxy
```

### 检查代理

```bash
git config --get http.proxy
git config --get https.proxy
git config --global --get http.proxy
git config --global --get https.proxy
```

### 查看和设置 npm 镜像源

```bash
npm config get registry
npm config set registry https://registry.npmjs.org/
```

### 设置、查看和修改远程仓库

```bash
git remote -v
git remote add origin https://github.com/username/repository.git
git remote set-url origin https://github.com/username/repository.git
```

## 在当前仓库里的使用建议

- 提交前先跑 `pnpm run code:check`，不要把校验完全留给 hook。
- 提交信息优先使用 `pnpm run commit`。
- 需要设置代理或修复远程地址时，再回看命令速查。

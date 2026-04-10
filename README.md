# Monorepo Project Guide

当前仓库是一个基于 `pnpm workspace` 的前端 monorepo，主要包含组件库、指令库、工具库以及配套脚本与文档。

## 项目规范

根目录 [SKILL.md](/d:/monorepo/monorepo-demo/SKILL.md) 作为当前 monorepo 的统一工程规范入口，适用于：

- `packages/components`
- `packages/directives`
- `packages/utils`
- `scripts`
- `packages/*`

规则优先级如下：

1. 仓库当前实际工具链与配置
2. 根目录 `SKILL.md`
3. 包级 README 与功能文档

若 README 中的描述与当前 ESLint、TypeScript、Prettier、Vite 等实际配置冲突，以仓库当前可执行配置为准。

### 样式规范

- 优先使用本地 `scss`、语义化类名、组件 `props`、Element Plus 主题变量表达样式。
- 可以消费 `--el-*` 主题变量，但不新增组件库自己的全局 `--xlg-*` 变量体系。
- 不通过宿主项目注入私有全局 CSS 变量来驱动组件库样式能力。

### 注释规范

- 所有导出方法都应补充中文注释。
- 内部复杂方法应补充中文注释，至少说明职责、输入输出、特殊约束或副作用。
- 简单 `handler`、简单映射、简单转发函数不强制逐个添加注释，但命名必须清晰。

### 目录职责

- `utils` 仅放无业务语义、可复用的纯函数或通用工具，不承载构建产物改写、入口注入、样式副作用编排。
- `plugin` 用于放置 Vite / Rollup 插件、入口生成、产物重写、样式注入等工程侧逻辑。
- `.vue` 文件主要承载模板、响应式状态、实例绑定、事件编排和必要的本地 glue code。
- `scripts` 中可复用能力继续下沉到脚本级 `utils`，命令编排保留在具体脚本入口。

### 新代码验收要求

- 不新增 `--xlg-*` 一类组件库自定义全局样式变量。
- 新增导出方法和复杂方法具备必要的中文注释。
- 代码实现满足仓库现有 ESLint、TypeScript、Prettier 约束。
- `utils`、`plugin`、`.vue` 的职责边界保持清晰。

## 仓库结构

```text
monorepo-demo/
├── docs/
├── eslint/
├── packages/
│   ├── components/
│   ├── directives/
│   └── utils/
├── scripts/
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── tsconfig.json
```

## 技术栈

- 包管理：`pnpm`
- 语言：`TypeScript`
- 构建：`Vite`
- 代码检查：`ESLint`
- 格式化：`Prettier`
- Vue 支持：`Vue 3`、`vue-tsc`
- Git 工作流：`husky`、`lint-staged`、`commitlint`、`commitizen`

## 依赖安装

```bash
pnpm install
```

## 常用脚本

根目录脚本定义见 [package.json](/d:/monorepo/monorepo-demo/package.json)：

```bash
pnpm lint
pnpm lint:fix
pnpm format
pnpm format:check
pnpm type-check
pnpm code:check
pnpm code:fix
pnpm build
pnpm build:components
pnpm build:directives
pnpm build:utils
pnpm docs:dev
pnpm docs:build
pnpm clean
pnpm commit
```

## TypeScript 约定

项目采用统一的根级 TypeScript 配置：

- [tsconfig.base.json](/d:/monorepo/monorepo-demo/tsconfig.base.json)：基础共享配置
- [tsconfig.json](/d:/monorepo/monorepo-demo/tsconfig.json)：根项目类型检查配置
- 各子包 `tsconfig.json`：包级构建或类型输出配置

关键约定：

- 使用 `moduleResolution: "bundler"`
- 使用 `verbatimModuleSyntax: true`
- 优先使用 `import type`
- 开启严格类型检查
- monorepo 路径别名为 `@smallbrother/*`

## ESLint 与 Prettier

ESLint 与 Prettier 配置统一由根级配置收口：

- [eslint.config.js](/d:/monorepo/monorepo-demo/eslint.config.js)
- [eslint/base.js](/d:/monorepo/monorepo-demo/eslint/base.js)
- [eslint/vue.js](/d:/monorepo/monorepo-demo/eslint/vue.js)
- [.prettierrc.cjs](/d:/monorepo/monorepo-demo/.prettierrc.cjs)

约定包括：

- TypeScript 文件遵循统一 ESLint 规则
- Vue 文件使用 `script setup`
- 统一双引号、无分号、2 空格缩进
- 由 `prettier` 负责格式化收口

## Git 工作流

### 提交前检查

- `husky` 通过 `.husky/pre-commit` 触发 `lint-staged`
- 暂存区代码会执行 ESLint 与 Prettier
- 提交信息由 `commitlint` 校验

### 提交方式

```bash
pnpm commit
```

或直接：

```bash
git commit -m "feat(utils): add debounce function"
```

推荐的提交类型：

- `feat`
- `fix`
- `docs`
- `style`
- `refactor`
- `perf`
- `test`
- `chore`
- `ci`

## 包级约定

### `packages/components`

- 基于 Vue 3 与 Element Plus 的组件库
- 样式依赖按组件维护，并通过构建插件注入导出入口
- 根入口与样式入口职责分离

### `packages/directives`

- 提供可复用的 Vue 指令能力
- 保持安装入口与具体指令实现分层

### `packages/utils`

- 放置无业务语义、可跨包复用的纯函数工具
- 避免承载组件实例强绑定逻辑

## 文档与参考

- [docs](/d:/monorepo/monorepo-demo/docs)
- [SKILL.md](/d:/monorepo/monorepo-demo/SKILL.md)
- [packages/components/README.md](/d:/monorepo/monorepo-demo/packages/components/README.md)

## 开发建议

```bash
pnpm code:check
```

在提交前建议至少执行一次全量检查；如果只改动单个包，优先运行对应包的 `build`、`lint` 或 `type-check` 脚本进行快速验证。

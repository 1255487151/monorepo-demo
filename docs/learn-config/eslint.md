# ESLint 配置学习

## 当前作用

仓库使用根 `eslint.config.js` 作为主入口，通过 `eslint/` 目录下的模块化配置组合规则，统一 TypeScript、Vue 和通用文件的静态检查行为。这里保留旧文档中“配置项解释”的写法，但只收口当前仓库仍然有用的部分。

## 对应源码配置

- `eslint.config.js`
- `eslint/base.js`
- `eslint/vue.js`
- `eslint/utils.js`
- `eslint/index.js`
- 各子包 `eslint.config.js`

## 关键理解点

### 根配置负责统一忽略和基础规则

旧文档里最有价值的部分，是对配置块职责的拆解。在当前仓库里，可以直接这样理解：

```ts
export default [
  ...baseConfig,
  {
    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      "**/coverage/**",
      "**/*.d.ts",
      "**/eslint/**",
      "eslint.config.js",
      "eslint.config.ts",
      "eslint.config.cjs"
    ]
  }
]
```

根配置目前通过 `baseConfig` 聚合基础规则，同时显式忽略：

- `dist`
- `node_modules`
- `coverage`
- 生成型声明文件
- `eslint/` 自身配置目录

这保证了 monorepo 在根执行 `pnpm run lint` 时，优先检查源码与脚本，而不是构建产物。

### 子包可以按技术栈追加差异化规则

当前 `components`、`directives`、`utils` 都有自己的 ESLint 配置文件，用于在统一底座上补充各自包的文件类型和边界。

### 旧文档里的配置项应该怎么读

原 `docs/ESLINT.md` 里用了大量“属性 / 类型 / 作用”的解释方式。迁移到现在这份学习页后，建议只重点理解以下几类：

| 配置项                          | 在当前仓库里的意义                        |
| ------------------------------- | ----------------------------------------- |
| `ignores`                       | 排除构建产物和无须检查的目录              |
| `files`                         | 指定某一组规则适用的文件类型              |
| `languageOptions.parser`        | 不同技术栈文件使用不同解析器              |
| `languageOptions.parserOptions` | 指定 TS / Vue 等额外解析行为              |
| `plugins`                       | 注入 `@typescript-eslint`、`vue` 等规则集 |
| `rules`                         | 统一风格与错误边界                        |

### 配置目标是“可执行一致”，不是“文档理论全集”

这套配置的重点不是罗列所有 ESLint 选项，而是让当前仓库的检查规则保持一致并可落地执行。

## 在当前仓库里的使用建议

- 根目录优先执行 `pnpm run lint`。
- 需要局部排查时，再执行 `lint:components`、`lint:directives`、`lint:utils`。
- 解释规则时优先看实际配置文件，不要只看历史文档。

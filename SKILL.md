# Monorepo Project Skill

## 1. 项目定位与适用范围

本文件是当前 monorepo 的统一工程规范入口，适用于以下目录与代码：

- `packages/components`
- `packages/directives`
- `packages/utils`
- `scripts`
- `packages/*`

本规范用于统一项目级约束，不替代具体功能文档，也不替代已有构建、类型、Lint 配置。

规则优先级如下：

1. 仓库实际工具链配置
2. 本文件
3. 包级 README 与功能文档

若本文件与现有 ESLint、TypeScript、Prettier、Vite 配置存在冲突，以仓库当前实际配置为准，后续通过配置调整统一收口。

## 2. 样式规范

### 2.1 基本原则

- 必须优先使用本地 `scss`、语义化类名、组件 props、Element Plus 主题变量完成样式表达。
- 禁止新增组件库自定义全局样式变量，如 `--xlg-select-width`、`--xlg-*`。
- 可以消费 Element Plus 主题变量，如 `--el-*`，但不新增组件库自己的全局变量体系。

### 2.2 推荐做法

- 组件样式优先写在组件对应的本地 `scss` 文件中。
- 样式配置优先通过 props、class、局部结构样式表达。
- 布局和视觉规则优先通过组件自己的语义化 class 收口，不依赖原子类框架。

### 2.3 禁止做法

- 禁止通过新增 `--xlg-*` 变量扩展组件库样式能力。
- 禁止把组件库样式能力设计为依赖宿主项目注入的自定义全局 CSS 变量。
- 禁止在新代码中继续沿用历史自定义全局样式变量模式。

### 2.4 示例

正例：

- 使用组件 props 控制背景、尺寸、状态
- 使用本地 `.scss` 和语义化 class 定义样式
- 使用 `--el-*` 调整 Element Plus 主题变量

反例：

- 新增 `--xlg-table-bg`
- 新增 `--xlg-select-width`
- 通过组件库私有全局 CSS 变量驱动组件样式

## 3. 方法注释规范

### 3.1 强制规则

- 所有导出方法必须补充注释。
- 所有内部复杂方法必须补充注释。

### 3.2 不强制逐个注释的场景

以下方法不强制逐个补注释，但命名必须清晰：

- 简单事件 handler
- 简单 getter
- 简单映射函数
- 只做一层转发的短函数

### 3.3 注释要求

注释必须简洁说明以下内容中的必要部分：

- 职责
- 输入 / 输出
- 特殊约束
- 副作用或依赖前置条件
- 注释采用中文

禁止低信息量注释，例如：

- “设置变量值”
- “处理数据”
- “执行方法”

### 3.4 示例

正例：

```ts
/**
 * Build runtime side effects for a component entry.
 * Returns the component CSS path and required Element Plus style imports.
 */
export function getComponentStyleSideEffects(componentDir: string, libraryName: string) {
  // ...
}
```

```ts
// Recalculate height only after DOM size settles to avoid repeated layouts.
const updateHeight = () => {
  // ...
}
```

反例：

```ts
// Handle logic
export function doSomething() {
  // ...
}
```

## 4. 代码标准与工具链约束

### 4.1 标准来源

本仓库代码规范基于以下现有配置与文档收口：

- [docs/ESLINT.md](/d:/monorepo/monorepo-demo/docs/ESLINT.md)
- 根与子包 ESLint 配置
- TypeScript 配置
- Prettier 配置

### 4.2 执行原则

- 不额外引入 Airbnb 等外部完整风格体系作为主标准。
- 所有新代码必须优先满足仓库当前 ESLint、TypeScript、Prettier 规则。
- 若文档约束与工具链校验结果不一致，以工具链可执行结果为准。

### 4.3 书写要求

- 优先使用清晰命名，而不是依赖注释弥补表达不清。
- 类型、导出、目录分层必须和当前 monorepo 结构一致。
- 避免在同一问题上同时引入多套风格约束。

## 5. 目录分层规范

### 5.1 `utils`

`utils` 仅用于放置以下内容：

- 不含业务语义的方法
- 可复用的方法
- 不写在 `.vue` 文件中的方法

适合放入 `utils` 的内容：

- 命名转换
- 路径解析
- 样式依赖计算
- 版本号解析
- 纯函数工具

禁止放入 `utils` 的内容：

- 明显带业务语义的方法
- 强依赖组件实例上下文的方法
- 明显只服务某个单一组件内部流程且不可复用的 glue code
- 构建插件、产物改写、入口注入这类工程插件逻辑

### 5.2 `plugin`

`plugin` 用于放置具备明确工程目的的插件能力，包括但不限于：

- 自定义 Vite / Rollup 插件
- 构建入口生成
- 产物重写
- 样式注入
- 组件入口导出拼装

凡是构建、产物、入口、样式副作用注入类逻辑，必须归类到 `plugin`，不得散落到 `utils`。

### 5.3 `.vue`

`.vue` 文件应主要承载：

- 模板
- 响应式状态
- 组件实例绑定
- 事件编排
- `defineExpose`
- 必要的本地 glue code

禁止长期把明显可复用的纯函数堆积在 `.vue` 文件中。

但以下内容可以保留在 `.vue` 中：

- 与当前组件实例强绑定的 handler
- 只服务当前组件的响应式编排
- 明显不具备跨组件复用价值的局部逻辑

### 5.4 `scripts`

`scripts` 目录中的方法同样遵循：

- 可复用、无业务耦合的方法进入脚本级 `utils`
- 编排流程、命令入口留在具体脚本文件中

## 6. 验收与执行原则

### 6.1 本轮不要求的事项

- 不批量重构现有代码以完全符合本规范
- 不同步修改 ESLint 规则实现强制校验
- 不新增 `docs` 镜像文档
- 不重写功能文档为项目总规范

### 6.2 新代码验收标准

后续新增或重构代码时，至少应满足以下标准：

- 不新增 `--xlg-*` 一类组件库自定义全局样式变量
- 导出方法和复杂方法具备注释
- 代码风格满足仓库现有 ESLint / TS / Prettier 约束
- `utils` 与 `plugin` 的职责边界清晰
- 不机械要求把所有组件内方法抽离出 `.vue`

### 6.3 迁移原则

- 现有历史实现若不完全符合本规范，视为待收敛项
- 新代码必须遵守本规范
- 旧代码在重构或修改时按本规范逐步收口

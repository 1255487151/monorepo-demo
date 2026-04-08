# XlgTable 迁移说明

## 目标

将本地项目 `/Users/muyangyang/code/electron-init` 中的表格组件和自动高度指令迁移到当前 monorepo：

- 组件来源：
  - `/Users/muyangyang/code/electron-init/src/components/xlg-ui/XlgTable.vue`
  - `/Users/muyangyang/code/electron-init/src/components/xlg-ui/types/table.ts`
- 指令来源：
  - `/Users/muyangyang/code/electron-init/src/directive/table-auto-height.ts`
  - `/Users/muyangyang/code/electron-init/src/directive/index.ts`

最终产物要求：

- `XlgTable` 进入 `@smallbrother/components`
- 组件内的 UnoCSS class 全部转换为本地 `scss`
- 组件导出和 `xlg-select` 保持一致的组件库组织方式
- `table-auto-height` 从业务项目中拆出，放入 monorepo 新建的 directive 库
- 不考虑 `playground`，后续会删除

## 现状分析

### XlgTable 当前结构

`XlgTable.vue` 当前能力包括：

- 表头区域：`header`、`toolbar` 插槽
- 表格主体：透传 `el-table` attrs，支持 `beforeColumn`、默认列渲染、`afterColumn`
- 分页区域：内置 `el-pagination`，同时支持 `footer` 插槽
- 自动高度：依赖 `v-table-auto-height="directiveAutoHeightOptions"`
- 暴露方法：`clearSelection`、`toggleRowSelection`、`toggleAllSelection`、`setCurrentRow`、`clearCurrentRow`、`sort`、`clearSort`、`refresh`、`doLayout`

### 当前 UnoCSS 需要转换的类

来自 `/Users/muyangyang/code/electron-init/src/components/xlg-ui/XlgTable.vue`：

- `flex`
- `flex-col`
- `h-full`
- `w-full`
- `bg-bg-page`
- `mb-4`
- `flex-between`
- `flex-wrap`
- `gap-3`
- `flex-1`
- `min-h-0`
- `overflow-hidden`
- `py-4`
- `flex-center`

迁移到组件库时，需要改成语义化类名配合 `scss`，不要保留 UnoCSS 依赖。

### table-auto-height 指令当前职责

指令主要完成：

- 读取主题变量 `--spacing-md`、`--spacing-xl`、`--font-size-base`
- 在 `XlgTable` 容器模式和普通视口模式下动态计算 `el-table` 高度
- 识别 `.xlg-table-container`、`.xlg-table-wrapper`、`.xlg-table-footer`
- 监听 `window.resize`
- 使用 `ResizeObserver` 监听 table 和父容器
- 自动调用 `doLayout()`
- 支持 `false | null` 关闭指令

这说明该指令已经不是业务页私有逻辑，适合拆成公共 directive 库。

## 迁移落点

### 组件库

在 `packages/components/src/components` 下新增：

- `xlg-table/index.vue`
- `xlg-table/index.ts`
- `xlg-table/index.scss`
- 如需拆类型，可在组件包内部增加 `xlg-table/types.ts`

并同步修改：

- `packages/components/src/components/index.ts`
- `packages/components/src/utils/style-deps.ts`

要求与现有 `xlg-select` 对齐：

- 单组件入口文件 `index.ts` 默认导出组件并引入 `index.scss`
- 聚合出口由 `packages/components/src/components/index.ts` 统一抛出
- 组件打包后支持：
  - `import { XlgTable } from "@smallbrother/components/components"`
  - `import XlgTable from "@smallbrother/components/components/xlg-table"`
- 不通过根入口 `@smallbrother/components` 做命名导出

### 指令库

在 `packages` 下新建一个独立包，建议命名：

- `packages/directives`
- 包名：`@smallbrother/directives`

建议结构：

- `packages/directives/package.json`
- `packages/directives/tsconfig.json`
- `packages/directives/vite.config.ts`
- `packages/directives/src/index.ts`
- `packages/directives/src/table-auto-height.ts`

对外提供一种能力：

- 单独导出指令：
  - `import { tableAutoHeightDirective } from "@smallbrother/directives"`

## 实施要求

### 1. 迁移 XlgTable 组件

- 保留现有插槽能力：
  - `header`
  - `toolbar`
  - `beforeColumn`
  - `default`
  - `afterColumn`
  - `footer`
- 保留现有 props：
  - `data`
  - `columns`
  - `pagination`
  - `autoHeight`
  - `autoHeightOptions`
  - `loading`
  - `loadingText`
- 保留现有 emits：
  - `page-change`
  - `size-change`
- 保留现有 `defineExpose` 方法

### 2. UnoCSS 改为 SCSS

建议样式类保持以下骨架，避免指令查找 DOM 结构失效：

- `.xlg-table-wrapper`
- `.xlg-table-header`
- `.xlg-table-container`
- `.xlg-table-footer`

对应的 `scss` 至少补齐这些布局语义：

- wrapper：`display: flex; flex-direction: column; width: 100%; height: 100%;`
- header：`display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;`
- container：`flex: 1; min-height: 0; overflow: hidden;`
- footer：`display: flex; justify-content: center; align-items: center;`

bg-bg-page默认白色,需要改可又外部传入增加一个backgroud属性配置,组件库不定义全局变量

### 3. 指令迁移到 directives 包

`table-auto-height` 迁移时保留现有行为，但要去掉对业务项目目录结构的依赖，只保留对表格 DOM 类名的依赖。

需要保留的兼容点：

- 绑定值类型：`TableAutoHeightOptions | false | null | undefined`
- 主题变量读取逻辑
- `ResizeObserver` 监听
- 禁用时清理内联高度和监听器
- `el-table` 校验与 `console.warn`

### 4. 组件和指令的依赖关系

`XlgTable` 不应在组件内部自己注册 directive。

推荐方案：

- 组件库只负责 `XlgTable` 组件本身
- 指令库独立提供 `table-auto-height`
- 使用 `XlgTable` 的项目，需要自行安装 `@smallbrother/directives`
- 指令组件库默认install使用

<!-- 如果后续希望组件库默认可用，再单独评估是否在组件库插件 `install` 中桥接注册 directive 库，但这不是本次迁移默认方案。 -->

## 需要同步修改的点

### components 包

- `packages/components/src/components/index.ts`
  - 增加 `XlgTable` 导出
- `packages/components/src/utils/style-deps.ts`
  - 为 `xlg-table` 增加 Element Plus 样式依赖

需要根据 `XlgTable` 实际使用到的 Element Plus 组件补齐依赖，至少应覆盖：

- `table`
- `table-column`
- `pagination`
- `loading`

如果模板里还直接依赖了按钮等组件，也要一并补齐。

### directives 包

- 根 `package.json` 的 workspace 不需要额外改，`pnpm-workspace.yaml` 已覆盖 `packages/*`
- 根脚本后续可以补充：
  - `build:directives`
  - `lint:directives`

## 验收标准

- `XlgTable` 在组件库内完成迁移并可正常构建
- `XlgTable` 的样式不再依赖 UnoCSS 或 `virtual:uno.css`
- `XlgTable` 的导出方式与当前 `xlg-select` 组件组织方式一致
- `@smallbrother/directives` 可独立构建并导出 `tableAutoHeightDirective`
- `table-auto-height` 指令迁移后，仍能根据 `.xlg-table-container` 和 `.xlg-table-footer` 正确计算高度
- 组件和指令拆分后，没有对 `playground` 的依赖

## 建议的实施顺序

1. 先创建 `packages/directives`，把 `table-auto-height` 单独迁进来并确保可构建。
2. 再迁移 `XlgTable` 到 `packages/components/src/components/xlg-table`。
3. 将 `XlgTable.vue` 中的 UnoCSS class 改成语义化类名，并补 `index.scss`。
4. 在 `style-deps.ts` 中补 `xlg-table` 的 Element Plus 样式依赖。
5. 更新 `components/index.ts` 导出，验证组件包构建。
6. 最后补组件 README 或示例文档，不处理 playground。

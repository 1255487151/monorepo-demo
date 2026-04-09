# XlgTable 实现规范

## 1. 目标与当前状态

本文档用于约束当前 monorepo 中 `XlgTable` 相关能力的实现方向，不再作为旧项目迁移清单使用。

当前仓库中的主要落点如下：

- `XlgTable` 组件目录：[packages/components/src/components/xlg-table](d:/monorepo/monorepo-demo/packages/components/src/components/xlg-table)
- 自动高度指令目录：[packages/directives/src/table-auto-height.ts](d:/monorepo/monorepo-demo/packages/directives/src/table-auto-height.ts)
- Element Plus 样式依赖声明：[packages/components/src/utils/style-deps.ts](d:/monorepo/monorepo-demo/packages/components/src/utils/style-deps.ts)

本规范统一以下方向：

1. `XlgTable` 不依赖 UnoCSS，不读取 UnoCSS 定义的主题变量。
2. 自动高度逻辑改为固定常量方案，不再读取 CSS 变量。
3. `XlgTable` 在组件内部接入自动高度指令，外层项目无需额外注册。
4. 根目录 `pnpm run version` 与 `pnpm run release` 按“单库优先、按影响传播”的策略执行。
5. 仓库不再保留 `packages/playground`，也不再将其作为默认联调入口。

## 2. XlgTable 组件规范

### 2.1 组件定位

`XlgTable` 是基于 Element Plus `el-table` 的轻量通用封装，用于统一：

- 表格头部插槽结构
- 列配置渲染
- 分页区渲染
- 自动高度能力
- 常用实例方法暴露

### 2.2 需要保留的能力

保留以下插槽：

- `header`
- `toolbar`
- `beforeColumn`
- `default`
- `afterColumn`
- `footer`

保留以下 props：

- `data`
- `columns`
- `pagination`
- `autoHeight`
- `autoHeightOptions`
- `loading`
- `loadingText`
- `background`

保留以下事件：

- `page-change`
- `size-change`

保留以下 `defineExpose` 方法：

- `clearSelection`
- `toggleRowSelection`
- `toggleAllSelection`
- `setCurrentRow`
- `clearCurrentRow`
- `sort`
- `clearSort`
- `refresh`
- `doLayout`

### 2.3 列渲染规则

- 表格主体继续透传 `el-table` 的 attrs。
- 默认列渲染基于 `columns`。
- `columns` 中 `show === false` 的列不渲染。
- 若列配置包含 `slot`，则通过同名插槽渲染对应列内容。
- `beforeColumn` 与 `afterColumn` 继续作为扩展列插槽。

### 2.4 分页规则

- 分页由组件内部集成 `el-pagination`。
- `pagination.showPagination === false` 时隐藏默认分页。
- 即使关闭分页，只要存在 `footer` 插槽，也应保留 footer 区域。

### 2.5 背景规则

- 组件库不定义全局背景变量。
- `background` 仅通过组件 props 控制。
- 默认值为白色 `#fff`。
- 背景仅作用于 `.xlg-table-wrapper`。

## 3. table-auto-height 指令规范

### 3.1 指令职责

`table-auto-height` 负责根据当前表格所在布局环境，自动计算 `el-table` 高度，并在需要时触发表格重新布局。

保留以下能力：

- 支持绑定类型：`TableAutoHeightOptions | false | null | undefined`
- 识别 `.xlg-table-container`
- 识别 `.xlg-table-wrapper`
- 识别 `.xlg-table-footer`
- 监听 `window.resize`
- 使用 `ResizeObserver`
- 自动调用 `doLayout()`
- 传入 `false | null` 时关闭能力并清理副作用
- 在非 `el-table` 元素上使用时允许 `console.warn`

### 3.2 固定常量规则

`getThemeMetrics()` 不再读取任何 CSS 变量，也不依赖宿主项目主题系统。

统一固定为：

- `fontSizeBase = 12`
- `spacingXl = 32`
- `spacingMd = 16`

以下旧逻辑全部废弃：

- 读取 `--spacing-md`
- 读取 `--spacing-xl`
- 读取 `--font-size-base`

### 3.3 高度计算规则

自动高度计算必须是“固定常量 + DOM 结构”的纯逻辑方案：

- 优先基于 `.xlg-table-container` 的剩余可用高度计算。
- 无容器上下文时，回退到视口高度计算。
- 需要扣减分页区域时，基于 `.xlg-table-footer` 或分页锚点估算。
- 所有估算默认值都来自代码中的固定常量，而不是主题变量。

## 4. 组件与指令依赖关系

### 4.1 组件内接入

`XlgTable` 组件内部负责接入 `table-auto-height` 指令能力。

目标行为如下：

- 外层业务项目使用 `XlgTable` 时，不需要再额外注册 `v-table-auto-height`。
- 外层业务项目使用 `XlgTable` 时，不需要再单独安装或 `app.use(@smallbrother/directives)` 才能获得自动高度能力。
- `XlgTable` 自身应具备完整自动高度能力。

### 4.2 指令库保留策略

`@smallbrother/directives` 仍然保留，用于非 `XlgTable` 场景的独立指令能力输出。

保留方式：

- 继续单独导出 `tableAutoHeightDirective`
- 继续支持默认 `install`
- `XlgTable` 直接依赖并引用这份唯一实现，不再在 `components` 包内复制一份
- 但它不再是 `XlgTable` 使用方的必需手动前置条件

## 5. 样式与主题约束

### 5.1 UnoCSS 约束

`XlgTable` 不再依赖以下能力：

- UnoCSS class
- `bg-bg-page`
- `virtual:uno.css`
- 任何 UnoCSS 定义的变量

### 5.2 SCSS 约束

组件仅使用本地 `scss` 与语义化类名，不依赖宿主项目的原子类体系。

推荐保留以下结构类名：

- `.xlg-table-wrapper`
- `.xlg-table-header`
- `.xlg-table-container`
- `.xlg-table-footer`

最低布局语义要求：

- wrapper: `display: flex; flex-direction: column; width: 100%; height: 100%`
- header: `display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap`
- container: `flex: 1; min-height: 0; overflow: hidden`
- footer: `display: flex; justify-content: center; align-items: center`

### 5.3 全局变量约束

组件库不定义以下形式：

- 全局背景变量
- 全局表格主题变量
- 依赖宿主项目注入的尺寸变量

组件内默认值只允许来自：

- props 默认值
- 本地 `scss`
- 指令内部固定常量

## 6. 版本发布与维护规范

### 6.1 根脚本现状

根目录保留以下脚本：

- `pnpm run version`
- `pnpm run release`

当前职责如下：

- `version = npx tsx scripts/version.ts`
- `release = pnpm run version --publish --push`

`version` 脚本负责：

1. 检查 Git 工作区状态
2. 扫描 workspace 发布包
3. 计算版本号
4. 更新目标包 `package.json`
5. 更新目标包内部依赖版本
6. 自动执行 Git commit
7. 自动创建 tag
8. 按需 push
9. 按需 publish

### 6.2 推荐执行顺序

发布前统一按以下顺序执行：

1. `pnpm run code:check`
2. `pnpm run build`
3. 确认工作区干净后执行 `pnpm run version`
4. 需要实际发布时再执行 `pnpm run release`

### 6.3 单库发布时的版本联动方案

单库发布不采用“所有包一起升级”的策略，而采用“按影响面传播”的策略。

核心原则：

- 只修改、发布真正发生对外变化的包。
- 若引用方代码未变，且当前依赖范围仍兼容新版本，则不强制跟随发布。
- 私有应用包不参与 npm 发布，只做仓库内联调验证。

当前仓库内需要关注的依赖关系：

- `@smallbrother/components` 依赖 `@smallbrother/utils`
- `@smallbrother/directives` 当前不依赖其他内部发布包

场景 A：叶子库单独发布

- 示例：只发布 `@smallbrother/directives`
- 处理：仅升级并发布当前目标包
- 其他包不需要跟随升级

场景 B：基础库发布，但引用发布库当前仍兼容

- 示例：`@smallbrother/utils` 发布 `patch` 或 `minor`
- 若 `@smallbrother/components` 当前无需立刻消费新能力，则不需要立刻发布 `@smallbrother/components`

结论：

- “引用库没更新”时，不一定需要更新它
- 只要依赖范围兼容，且引用库代码未使用新能力，就可以不发新版

场景 C：基础库发布，且引用发布库必须跟随

- 示例：`@smallbrother/utils` 发生 `major` 变更
- 或 `@smallbrother/components` 已经依赖新的 API / 修复行为
- 处理：先发布 `@smallbrother/utils`，再更新并发布 `@smallbrother/components`

场景 D：只改文档、脚本或内部实现，但未影响对外产物

- 不需要发布
- 只在仓库内提交代码即可

推荐判断顺序：

1. 先确认改动落在哪个包
2. 判断该包是否为对外发布包
3. 判断是否有其他发布包依赖它
4. 判断这些依赖方是否必须消费新版本
5. 私有应用只做验证，不参与发版

### 6.4 playground 删除维护要求

仓库不再保留 `packages/playground`。

同步要求如下：

- 删除 `packages/playground`
- 删除根目录脚本中的 `dev:playground`
- 删除根目录脚本中的 `build:playground`
- 不再把 `playground` 作为组件库发布后的默认验证入口
- 后续联调统一通过真实接入项目或更轻量的验证方式完成

### 6.5 根脚本优化目标

为支持上述发布策略，根脚本后续需要保持以下目标：

- `pnpm run version -p <package>` 默认只升级目标发布包
- 不再默认把所有依赖方一起升级
- 根包不参与版本升级与发布
- 私有包不参与发布
- 输出清晰的版本摘要、tag 摘要与 publish 摘要

### 6.6 验收标准

完成收口后，应满足以下标准：

- 文档中不再出现 UnoCSS 变量、主题 CSS 变量读取、宿主项目必须注册指令的旧规则
- `background` 的说明为：保留 props，默认白底，不定义全局变量
- 自动高度规则明确固定值：`fontSizeBase = 12`、`spacingXl = 32`
- `XlgTable` 与 `@smallbrother/directives` 的关系为“组件内接入，外层无需注册”
- `pnpm run version` / `pnpm run release` 的说明与脚本实现一致
- 单库发布的联动规则明确回答“引用库没更新时是否需要更新”
- 仓库中不再保留 `packages/playground` 及其根脚本入口

## 7. 后续代码调整顺序

后续如继续扩展或回归调整，建议按以下顺序执行：

1. 先调整自动高度固定常量与高度计算逻辑
2. 再调整 `XlgTable` 内部的指令接入方式
3. 再校正 `XlgTable` 样式与 props 默认值
4. 最后处理版本脚本、发布策略与仓库维护收尾

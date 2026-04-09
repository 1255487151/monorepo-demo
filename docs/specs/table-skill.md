# XlgTable 实现规范

## 目标与当前状态

本文档用于约束当前 monorepo 中 `XlgTable` 相关能力的实现方向，不作为旧项目迁移清单使用。

当前主要落点如下：

- `packages/components/src/components/xlg-table`
- `packages/directives/src/table-auto-height.ts`
- `packages/components/src/utils/style-deps.ts`

本规范统一以下方向：

1. `XlgTable` 不依赖 UnoCSS，也不读取 UnoCSS 主题变量。
2. 自动高度逻辑使用固定常量方案，不依赖组件库私有 CSS 变量。
3. `XlgTable` 在组件内部接入自动高度指令，外层项目无需额外注册。
4. 根目录版本与发布流程按“单库优先、按影响传播”的策略执行。
5. `packages/playground` 不作为默认联调入口，也不属于发布库文档范围。

## 组件定位

`XlgTable` 是基于 Element Plus `el-table` 的轻量通用封装，用于统一：

- 表格头部插槽结构
- 列配置渲染
- 分页区渲染
- 自动高度能力
- 常用实例方法暴露

## 必须保留的能力

### 插槽

- `header`
- `toolbar`
- `beforeColumn`
- `default`
- `afterColumn`
- `footer`

### Props

- `data`
- `columns`
- `pagination`
- `autoHeight`
- `autoHeightOptions`
- `loading`
- `loadingText`
- `background`

### 事件

- `page-change`
- `size-change`

### 暴露方法

- `clearSelection`
- `toggleRowSelection`
- `toggleAllSelection`
- `setCurrentRow`
- `clearCurrentRow`
- `sort`
- `clearSort`
- `refresh`
- `doLayout`

## 实现规则

### 列渲染规则

- 表格主体继续透传 `el-table` 的 `attrs`
- 默认列渲染基于 `columns`
- `show === false` 的列不渲染
- 若列配置包含 `slot`，则通过同名插槽渲染
- `beforeColumn` 与 `afterColumn` 作为扩展列插槽保留

### 分页规则

- 分页默认值由组件内部统一收口
- `showPagination !== false` 时才显示分页区
- 自动高度是否包含分页高度，应与分页显示状态保持一致

### 自动高度规则

- 通过 `tableAutoHeightDirective` 统一计算表格高度
- 明确传入 `height / maxHeight / max-height` 时，不再启用自动高度
- 支持监听窗口尺寸变化和父容器尺寸变化
- 每次重新计算高度后，都应触发表格 `doLayout()`

## 禁止事项

- 禁止重新引入 UnoCSS 变量依赖
- 禁止将自动高度能力重新变成“宿主项目必须手动注册”的模式
- 禁止把 `XlgTable` 的实现规则散落到库文档或配置学习页中

## 验收标准

- 组件接口仍覆盖现有 `props / slots / emits / expose`
- 自动高度行为与分页显示行为一致
- 外层项目使用 `XlgTable` 时，无需额外安装指令即可获得自动高度能力
- 规范与库文档职责分离，不混写

## 迁移原则

- 历史实现不完全符合本规范时，视为待收敛项
- 新代码必须遵守本规范
- 修改旧代码时按本规范逐步收口

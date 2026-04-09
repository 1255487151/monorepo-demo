# `@smallbrother/components`

## 安装

```bash
pnpm add @smallbrother/components element-plus
```

当前包把 `vue` 与 `element-plus` 作为 peer dependencies，由宿主项目负责安装。

## 导入方式

### 全局安装

```ts
import { createApp } from "vue"
import ElementPlus from "element-plus"
import SmallBrotherComponents from "@smallbrother/components"
import "@smallbrother/components/style"

const app = createApp(App)

app.use(ElementPlus)
app.use(SmallBrotherComponents)
```

### 组件按需导入

```ts
import { XlgSelect, XlgTable } from "@smallbrother/components/components"
```

### 自动导入解析器

```ts
import { resolveComponents } from "@smallbrother/components/resolver"
```

`resolveComponents()` 会把 `Xlg*` 组件映射到纯组件入口，并返回对应样式 side effects。

## 组件总览

| 组件        | 说明                                                                         | 文档                                     |
| ----------- | ---------------------------------------------------------------------------- | ---------------------------------------- |
| `XlgSelect` | 对 Element Plus `ElSelect` 的轻量封装，支持 `options` 数据驱动与默认插槽覆盖 | [XlgSelect](/packages/components/select) |
| `XlgTable`  | 对 `ElTable` + `ElPagination` 的统一封装，内部接入自动高度指令               | [XlgTable](/packages/components/table)   |

## 样式入口

| 入口                                              | 说明                                        |
| ------------------------------------------------- | ------------------------------------------- |
| `@smallbrother/components/style`                  | 加载聚合 CSS 与组件依赖的 Element Plus 样式 |
| `@smallbrother/components/style.css`              | 只加载库聚合 CSS                            |
| `@smallbrother/components/components/*/index.css` | 单组件 CSS，Element Plus 依赖样式需自行补齐 |

## 导出入口

| 入口                                    | 说明                     |
| --------------------------------------- | ------------------------ |
| `@smallbrother/components`              | 纯插件入口               |
| `@smallbrother/components/components`   | 纯组件入口               |
| `@smallbrother/components/components/*` | 单组件深导入             |
| `@smallbrother/components/resolver`     | 自动导入 resolver        |
| `@smallbrother/components/utils`        | 组件名和样式依赖相关工具 |

## 类型入口

当前组件库公开的核心类型集中在 `src/types/index.ts` 中，主要包括：

- `OptionItem`
- `OptionGroupItem`
- `OptionItems`
- `PaginationConfig`
- `XlgTableAutoHeightOptions`
- `TableColumn`
- `XlgTableProps`
- `XlgTableEmits`
- `XlgTableInstance`

## 内部依赖

| 依赖                       | 用途                       |
| -------------------------- | -------------------------- |
| `element-plus`             | 组件基础实现与依赖样式来源 |
| `@smallbrother/directives` | `XlgTable` 自动高度能力    |
| `@smallbrother/utils`      | 内部公共工具依赖           |

## 相关页面

- [XlgSelect](/packages/components/select)
- [XlgTable](/packages/components/table)

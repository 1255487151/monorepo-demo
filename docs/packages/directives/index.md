# `@smallbrother/directives`

## 安装方式

```bash
pnpm add @smallbrother/directives
```

宿主项目需要自己安装 `vue`。

## 注册方式

### 插件注册

```ts
import { createApp } from "vue"
import SmallBrotherDirectives from "@smallbrother/directives"

const app = createApp(App)

app.use(SmallBrotherDirectives)
```

### 单独注册

```ts
import { createApp } from "vue"
import { tableAutoHeightDirective } from "@smallbrother/directives"

const app = createApp(App)

app.directive("table-auto-height", tableAutoHeightDirective)
```

## 当前指令总览

| 指令名                     | 说明                                 | 文档                                                        |
| -------------------------- | ------------------------------------ | ----------------------------------------------------------- |
| `tableAutoHeightDirective` | 为 `el-table` 计算可用高度并触发布局 | [table-auto-height](/packages/directives/table-auto-height) |

## 适用边界

- 指令库当前只有一个公开能力：`tableAutoHeightDirective`
- `XlgTable` 已经内置这项能力，通过组件库使用时无需重复注册

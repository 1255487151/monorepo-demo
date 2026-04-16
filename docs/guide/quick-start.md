# 快速开始

## 安装依赖

### 组件库

```bash
pnpm add @smallbrother/components element-plus
```

`@smallbrother/components` 的宿主项目需要自己安装 `vue` 和 `element-plus`。  
`@smallbrother/directives` 会作为组件库依赖被带入，`XlgTable` 用户不需要再单独安装一次。

### 指令库

```bash
pnpm add @smallbrother/directives
```

宿主项目需要自己安装 `vue`。

### utils

```bash
pnpm add @smallbrother/utils
```

## 最小可运行示例

```ts
import { createApp } from "vue"
import ElementPlus from "element-plus"
import SmallBrotherComponents from "@smallbrother/components"
import "@smallbrother/components/style"
import App from "./App.vue"

const app = createApp(App)

app.use(ElementPlus)
app.use(SmallBrotherComponents)
app.mount("#app")
```

## 文档导航说明

- 先在 [Components 接入](/guide/components) 看全局注册、按需注册和样式策略。
- 只需要指令时看 [Directives 接入](/guide/directives)。
- 只需要函数工具时看 [Utils 接入](/guide/utils)。
- 需要具体 API 时，再进入模块页：
  - [组件](/packages/components/)
  - [指令](/packages/directives/)
  - [utils](/packages/utils/)

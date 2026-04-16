# Utils 接入

## 安装与导入

```bash
pnpm add @smallbrother/utils
```

```ts
import { add, debounce, deepClone, isEmpty, throttle } from "@smallbrother/utils"
```

## 推荐导入方式

当前包只提供根导出入口，优先从 `@smallbrother/utils` 统一导入。

```ts
import { deepClone, isEmpty } from "@smallbrother/utils"
```

## 适合放什么逻辑

- 和业务无关、可以跨包复用的纯函数
- 不依赖组件实例和指令运行时的基础工具
- 参数和返回值边界明确、容易单测的工具函数

## 不适合放什么逻辑

- 构建插件逻辑
- 组件 glue code
- 依赖 Vue 组件上下文的逻辑
- 带明显业务语义的函数

## 当前能力入口

- [add](/packages/utils/add)
- [isEmpty](/packages/utils/is-empty)
- [deepClone](/packages/utils/deep-clone)
- [debounce](/packages/utils/debounce)
- [throttle](/packages/utils/throttle)

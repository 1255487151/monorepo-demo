# `@smallbrother/utils`

## 安装方式

```bash
pnpm add @smallbrother/utils
```

## 导入方式

```ts
import { add, debounce, deepClone, isEmpty, throttle } from "@smallbrother/utils"
```

## 当前函数总览

| 函数名      | 说明             | 文档                                    |
| ----------- | ---------------- | --------------------------------------- |
| `add`       | 两数相加         | [add](/packages/utils/add)              |
| `isEmpty`   | 判断值是否为空   | [isEmpty](/packages/utils/is-empty)     |
| `deepClone` | 深拷贝对象或数组 | [deepClone](/packages/utils/deep-clone) |
| `debounce`  | 生成防抖函数     | [debounce](/packages/utils/debounce)    |
| `throttle`  | 生成节流函数     | [throttle](/packages/utils/throttle)    |

## 使用建议与边界

- 这个包只收录可复用的纯工具函数。
- 不要把构建插件逻辑、组件 glue code 或带业务语义的逻辑放进来。
- 需要具体签名、参数和示例时，直接进入单函数页面。

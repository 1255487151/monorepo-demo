# throttle

## 用途说明

`throttle` 用于把高频触发的函数包装成节流函数。

## 导入方式

```ts
import { throttle } from "@smallbrother/utils"
```

## 函数签名

```ts
const throttle = <T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void)
```

## 参数表

| 参数名  | 说明           | 类型     |
| ------- | -------------- | -------- |
| `fn`    | 原始函数       | `T`      |
| `delay` | 节流间隔，毫秒 | `number` |

## 返回值说明

返回一个新的函数。在任意 `delay` 时间窗口内，原函数最多只会执行一次。

## 示例代码

```ts
import { throttle } from "@smallbrother/utils"

const onScroll = throttle(() => {
  console.log("scroll")
}, 200)
```

## 适用场景

- scroll、mousemove 等连续事件
- 只需要固定频率更新 UI 的场景

## 限制 / 注意事项

- 当前实现不带尾调用
- 当前实现没有 `cancel` 或 `flush` 能力

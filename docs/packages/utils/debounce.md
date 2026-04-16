# debounce

## 用途说明

`debounce` 用于把高频触发的函数包装成防抖函数。

## 导入方式

```ts
import { debounce } from "@smallbrother/utils"
```

## 函数签名

```ts
const debounce = <T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void)
```

## 参数表

| 参数名  | 说明           | 类型     |
| ------- | -------------- | -------- |
| `fn`    | 原始函数       | `T`      |
| `delay` | 延迟时间，毫秒 | `number` |

## 返回值说明

返回一个新的函数。连续触发时只会在最后一次触发后、等待 `delay` 毫秒再执行。

## 示例代码

```ts
import { debounce } from "@smallbrother/utils"

const onSearch = debounce((keyword: string) => {
  console.log(keyword)
}, 300)
```

## 适用场景

- 输入框搜索
- resize、scroll 等高频事件的末次触发处理

## 限制 / 注意事项

- 当前实现没有 `cancel` 或 `flush` 能力
- 只保留最后一次触发

# add

## 用途说明

`add` 用于返回两个数字的和。

## 导入方式

```ts
import { add } from "@smallbrother/utils"
```

## 函数签名

```ts
const add = (a: number, b: number): number
```

## 参数表

| 参数名 | 说明     | 类型     |
| ------ | -------- | -------- |
| `a`    | 第一个数 | `number` |
| `b`    | 第二个数 | `number` |

## 返回值说明

返回两个参数相加后的结果，类型为 `number`。

## 示例代码

```ts
import { add } from "@smallbrother/utils"

const total = add(1, 2)
```

## 适用场景

- 示例代码
- 需要演示函数导入和类型边界的最小场景

## 限制 / 注意事项

- 不会做类型转换
- 传入非数字不在支持范围内

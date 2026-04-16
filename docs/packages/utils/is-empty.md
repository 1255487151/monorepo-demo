# isEmpty

## 用途说明

`isEmpty` 用于判断一个值是否为空值。

## 导入方式

```ts
import { isEmpty } from "@smallbrother/utils"
```

## 函数签名

```ts
const isEmpty = (value: unknown): boolean
```

## 参数表

| 参数名  | 说明       | 类型      |
| ------- | ---------- | --------- |
| `value` | 待检查的值 | `unknown` |

## 返回值说明

当值满足以下条件之一时返回 `true`：

- `null`
- `undefined`
- 空字符串
- 空数组
- 无自有属性的普通对象

其他情况返回 `false`。

## 示例代码

```ts
import { isEmpty } from "@smallbrother/utils"

isEmpty("") // true
isEmpty([]) // true
isEmpty({}) // true
isEmpty(0) // false
```

## 适用场景

- 表单提交前做空值判断
- 统一处理空字符串、空数组和空对象

## 限制 / 注意事项

- 只按当前实现判断“空”，不包含更复杂的业务语义
- `Map`、`Set` 等对象不会被特殊处理

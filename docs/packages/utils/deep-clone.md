# deepClone

## 用途说明

`deepClone` 用于递归拷贝对象或数组。

## 导入方式

```ts
import { deepClone } from "@smallbrother/utils"
```

## 函数签名

```ts
const deepClone = <T>(obj: T): T
```

## 参数表

| 参数名 | 说明     | 类型 |
| ------ | -------- | ---- |
| `obj`  | 待拷贝值 | `T`  |

## 返回值说明

返回结构相同的新值，类型保持为 `T`。

## 示例代码

```ts
import { deepClone } from "@smallbrother/utils"

const source = { user: { name: "Alpha" }, ids: [1, 2, 3] }
const cloned = deepClone(source)
```

## 适用场景

- 需要复制普通对象或数组
- 希望保留泛型类型信息

## 限制 / 注意事项

- 当前实现只覆盖普通对象和数组
- `Date`、`Map`、`Set`、函数、循环引用等场景不在支持范围内

# `@smallbrother/utils`

## 安装方式

```bash
pnpm add @smallbrother/utils
```

## 导出

| 入口                  | 作用                 |
| --------------------- | -------------------- |
| `@smallbrother/utils` | 导出全部公开工具函数 |

## 使用方式

```ts
import { debounce, deepClone, isEmpty } from "@smallbrother/utils"
```

## API

### `add`

```ts
add(a: number, b: number): number
```

| 参数 | 说明     | 类型     |
| ---- | -------- | -------- |
| `a`  | 第一个数 | `number` |
| `b`  | 第二个数 | `number` |

返回两数之和。

### `isEmpty`

```ts
isEmpty(value: unknown): boolean
```

| 参数    | 说明       | 类型      |
| ------- | ---------- | --------- |
| `value` | 要检查的值 | `unknown` |

- 判断 `null`、`undefined`、空字符串、空数组和空对象
- 当前实现不会把 `0`、`false` 视为空值

### `deepClone`

```ts
deepClone<T>(obj: T): T
```

| 参数  | 说明             | 类型 |
| ----- | ---------------- | ---- |
| `obj` | 需要深拷贝的对象 | `T`  |

- 递归克隆对象和数组
- 适合处理普通对象结构
- 当前实现不覆盖 `Map`、`Set`、`Date`、循环引用等复杂场景

### `debounce`

```ts
debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void
```

| 参数    | 说明           | 类型     |
| ------- | -------------- | -------- |
| `fn`    | 需要防抖的函数 | `T`      |
| `delay` | 延迟时间       | `number` |

- 返回防抖后的函数
- 在延迟结束后执行最后一次调用

### `throttle`

```ts
throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void
```

| 参数    | 说明           | 类型     |
| ------- | -------------- | -------- |
| `fn`    | 需要节流的函数 | `T`      |
| `delay` | 时间窗口       | `number` |

- 返回节流后的函数
- 在固定时间窗口内限制触发频率

## 示例

```ts
import { debounce, isEmpty } from "@smallbrother/utils"

const logInput = debounce((value: string) => {
  console.log(value)
}, 300)

console.log(isEmpty([])) // true
```

## 限制

- `deepClone` 只覆盖常见对象和数组场景
- 该包应保持无业务语义，不承接构建插件逻辑
- 当前公开方法数量不多，更偏向基础能力集合

## 依赖与产物

| 项目     | 说明               |
| -------- | ------------------ |
| 内部依赖 | 无                 |
| 构建产物 | `ESM + CJS + d.ts` |

/**
 * @small-brother/utils
 * 通用工具函数库
 */

/**
 * 两数相加
 * @param a - 第一个数
 * @param b - 第二个数
 * @returns 两数之和
 * @example
 * ```ts
 * add(1, 2) // 3
 * ```
 */
export const add = (a: number, b: number): number => a + b

/**
 * 判断是否为空值
 * @param value - 要检查的值
 * @returns 是否为空值
 */
export const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined) {
    return true
  }
  if (typeof value === "string" || Array.isArray(value)) {
    return value.length === 0
  }
  if (typeof value === "object") {
    return Object.keys(value).length === 0
  }
  return false
}

/**
 * 深拷贝对象
 * @param obj - 要拷贝的对象
 * @returns 深拷贝后的对象
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== "object") {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as T
  }

  const cloned = {} as T
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone(obj[key])
    }
  }

  return cloned
}

/**
 * 防抖函数
 * @param fn - 要防抖的函数
 * @param delay - 延迟时间（毫秒）
 * @returns 防抖后的函数
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout> | null = null

  return function (this: unknown, ...args: Parameters<T>) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

/**
 * 节流函数
 * @param fn - 要节流的函数
 * @param delay - 延迟时间（毫秒）
 * @returns 节流后的函数
 */
export const throttle = <T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastTime = 0

  return function (this: unknown, ...args: Parameters<T>) {
    const now = Date.now()
    if (now - lastTime >= delay) {
      fn.apply(this, args)
      lastTime = now
    }
  }
}
console.log("utils")

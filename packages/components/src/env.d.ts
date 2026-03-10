/// <reference types="vite/client" />

// 扩展 Vue 全局类型以支持 Element Plus 组件的类型推断
declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    ElSelect: (typeof import("element-plus"))["ElSelect"]
    ElOption: (typeof import("element-plus"))["ElOption"]
  }
}

export {}

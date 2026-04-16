# 指南总览

## 这组页面负责什么

这一组页面只回答“怎么接入当前项目的发布库”，不承担完整 API 说明。

- `components`：讲全局注册、按需注册、样式引入、resolver 接入
- `directives`：讲插件注册、单独注册和使用边界
- `utils`：讲导入方式和适用边界
- `learn-config`：单独负责工具链配置学习，不放在指南里展开

## 当前仓库的发布库

| 包名                       | 角色                            | 建议入口                             |
| -------------------------- | ------------------------------- | ------------------------------------ |
| `@smallbrother/components` | 基于 Element Plus 的 Vue 组件库 | [Components 接入](/guide/components) |
| `@smallbrother/directives` | Vue 指令库                      | [Directives 接入](/guide/directives) |
| `@smallbrother/utils`      | 通用工具函数库                  | [Utils 接入](/guide/utils)           |
| `learn-config`             | 配置学习专区                    | [配置学习](/learn-config/)           |

## 依赖关系

```txt
@smallbrother/components
  ├─ peerDependencies: vue, element-plus
  ├─ dependencies: @smallbrother/directives
  └─ dependencies: @smallbrother/utils

@smallbrother/directives
  └─ peerDependencies: vue

@smallbrother/utils
  └─ 无内部包依赖
```

## 推荐阅读路径

1. 先看 [快速开始](/guide/quick-start) 确认安装和阅读顺序。
2. 接入组件时看 [Components 接入](/guide/components)。
3. 单独接入指令时看 [Directives 接入](/guide/directives)。
4. 只用工具函数时看 [Utils 接入](/guide/utils)。
5. 需要理解配置项时进入 [learn-config](/learn-config/)。

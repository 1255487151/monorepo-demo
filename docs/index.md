---
layout: home

hero:
  name: SmallBrother Docs
  text: 面向当前 Monorepo 的使用文档与配置学习站点
  tagline: 首页负责导读，指南负责接入，组件/指令/utils 负责能力文档，learn-config 负责配置项学习。
  actions:
    - theme: brand
      text: 进入指南
      link: /guide/
    - theme: alt
      text: 查看组件
      link: /packages/components/

features:
  - title: 指南负责接入
    details: 先在指南里看全局注册、按需注册、样式引入、resolver 和模块边界，再决定进入哪一类能力文档。
  - title: 能力文档按模块拆页
    details: Components、Directives、Utils 都按“索引页 + 单能力页”组织，页面直接给出可复制示例和 API 信息。
  - title: 配置学习单独成线
    details: ESLint、Git、TSConfig、Vite Config 只讲当前项目真正使用的关键配置项，不写成组件库式文档。
---

## 你可以从这里开始

- [指南](/guide/)：先看接入方式、依赖关系、样式策略和推荐阅读路径。
- [组件](/packages/components/)：查看 `XlgSelect`、`XlgTable` 的用法、属性、事件和实例方法。
- [指令](/packages/directives/)：查看 `table-auto-height` 的注册方式、绑定值和限制条件。
- [utils](/packages/utils/)：查看 `add`、`isEmpty`、`deepClone`、`debounce`、`throttle`。
- [learn-config](/learn-config/)：理解当前仓库真正使用的 ESLint、Git、TSConfig、Vite Config 关键配置项。

## 当前仓库事实

| 维度       | 当前情况                                  |
| ---------- | ----------------------------------------- |
| 包管理     | `pnpm workspace`                          |
| 文档框架   | `VitePress`                               |
| 发布库数量 | 3                                         |
| 组件库基础 | Vue 3 + Element Plus                      |
| 主要工具链 | TypeScript、ESLint、Vite、Prettier、Husky |

## 推荐阅读路径

1. 先看 [指南](/guide/) 理解整体接入方式。
2. 需要接组件时进入 [组件](/packages/components/)。
3. 需要接指令时进入 [指令](/packages/directives/)。
4. 需要接工具函数时进入 [utils](/packages/utils/)。
5. 需要理解工具链时进入 [learn-config](/learn-config/)。

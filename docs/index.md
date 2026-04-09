---
layout: home

hero:
  name: SmallBrother Docs
  text: 面向当前 Monorepo 的 VitePress 文档站
  tagline: 按发布库、配置学习与规范要求组织，兼顾查阅效率与后续维护约束。
  actions:
    - theme: brand
      text: 进入入门
      link: /guide/
    - theme: alt
      text: 查看库文档
      link: /packages/

features:
  - title: 库文档优先
    details: 仅围绕当前三个发布库组织页面，每个库独立成页，不把规范和配置解释混入 API 文档。
  - title: 配置学习集中
    details: ESLint、Git、TSConfig、Vite Config 统一收纳到学习节点，便于理解仓库工具链的作用与边界。
  - title: 规范要求单列
    details: 类似 XlgTable 实现规范的约束型文档放到独立节点，避免和教程、包文档互相污染。
---

## 文档结构

- [入门](/guide/)：快速理解仓库定位、发布包边界和推荐阅读路径。
- [库文档](/packages/)：面向 `@smallbrother/components`、`@smallbrother/directives`、`@smallbrother/utils`。
- [配置学习](/learn-config/)：面向 ESLint、Git、TSConfig、Vite Config 的学习型文档。
- [规范要求](/specs/)：面向实现规则、验收标准和迁移原则。

## 当前仓库事实

| 维度       | 当前情况                                  |
| ---------- | ----------------------------------------- |
| 包管理     | `pnpm workspace`                          |
| 文档框架   | `VitePress`                               |
| 发布库数量 | 3                                         |
| 组件库基础 | Vue 3 + Element Plus                      |
| 主要工具链 | TypeScript、ESLint、Vite、Prettier、Husky |

## 推荐阅读路径

1. 先看 [入门](/guide/) 了解 monorepo 边界和库之间的依赖关系。
2. 再进入 [库文档](/packages/) 按发布库定位能力与导出入口。
3. 需要理解工具链时进入 [配置学习](/learn-config/)。
4. 做约束收口或评审时进入 [规范要求](/specs/)。

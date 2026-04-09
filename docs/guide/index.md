# 项目概览

## 仓库定位

当前仓库是一个以 `packages/*` 为中心的前端 monorepo，围绕以下三个发布库组织：

- `@smallbrother/components`
- `@smallbrother/directives`
- `@smallbrother/utils`

文档站只把这三个发布库作为“库文档”节点。`packages/playground` 不作为发布库，也不出现在库文档导航中。

## 目录结构

```txt
packages/
  components/    Vue 3 组件库，基于 Element Plus
  directives/    Vue 3 指令库
  utils/         通用工具函数库
docs/
  packages/      发布库文档
  learn-config/  配置学习文档
  specs/         规范要求文档
```

## 依赖关系

```txt
@smallbrother/components
  ├─ 依赖 @smallbrother/directives
  └─ 依赖 @smallbrother/utils

@smallbrother/directives
  └─ 依赖 vue

@smallbrother/utils
  └─ 无内部包依赖
```

## 文档分组规则

- “库文档”只承接发布库，一库一页。
- “配置学习”只承接工具链和仓库配置的学习型内容。
- “规范要求”只承接规则、要求、验收、迁移类内容。

## 建议阅读顺序

| 你当前的目标                | 建议入口                   |
| --------------------------- | -------------------------- |
| 了解包能力和导出入口        | [库文档](/packages/)       |
| 理解 lint / ts / build 配置 | [配置学习](/learn-config/) |
| 理解实现约束和评审边界      | [规范要求](/specs/)        |

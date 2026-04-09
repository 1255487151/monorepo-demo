import { defineConfig } from "vitepress"

export default defineConfig({
  lang: "zh-CN",
  title: "SmallBrother Docs",
  description: "基于 VitePress 的 monorepo 文档站，覆盖发布库、配置学习与规范要求。",
  cleanUrls: true,
  lastUpdated: true,
  appearance: {
    initialValue: "dark"
  },
  themeConfig: {
    logo: {
      text: "SmallBrother Docs"
    },
    nav: [
      { text: "首页", link: "/" },
      { text: "入门", link: "/guide/" },
      { text: "库文档", link: "/packages/" },
      { text: "配置学习", link: "/learn-config/" },
      { text: "规范要求", link: "/specs/" }
    ],
    sidebar: {
      "/guide/": [
        {
          text: "开始",
          items: [{ text: "项目概览", link: "/guide/" }]
        }
      ],
      "/packages/components/": [
        {
          text: "Components",
          items: [
            { text: "概览", link: "/packages/components/" },
            { text: "XlgSelect", link: "/packages/components/select" },
            { text: "XlgTable", link: "/packages/components/table" }
          ]
        }
      ],
      "/packages/": [
        {
          text: "库文档",
          items: [
            { text: "总览", link: "/packages/" },
            { text: "Components", link: "/packages/components/" },
            { text: "Directives", link: "/packages/directives" },
            { text: "Utils", link: "/packages/utils" }
          ]
        }
      ],
      "/learn-config/": [
        {
          text: "配置学习",
          items: [
            { text: "总览", link: "/learn-config/" },
            { text: "ESLint", link: "/learn-config/eslint" },
            { text: "Git", link: "/learn-config/git" },
            { text: "TSConfig", link: "/learn-config/tsconfig" },
            { text: "Vite Config", link: "/learn-config/vite-config" }
          ]
        }
      ],
      "/specs/": [
        {
          text: "规范要求",
          items: [
            { text: "总览", link: "/specs/" },
            { text: "XlgTable 实现规范", link: "/specs/table-skill" }
          ]
        }
      ]
    },
    search: {
      provider: "local"
    },
    footer: {
      message: "Monorepo 文档按发布库、配置学习和规范要求组织。",
      copyright: "Copyright © SmallBrother"
    },
    docFooter: {
      prev: "上一页",
      next: "下一页"
    },
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
    outline: {
      label: "本页目录"
    }
  }
})

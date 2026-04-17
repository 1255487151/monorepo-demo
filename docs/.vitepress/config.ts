import { defineConfig } from "vitepress"

export default defineConfig({
  lang: "zh-CN",
  title: "SmallBrother Docs",
  description: "基于 VitePress 的 monorepo 文档站，覆盖使用文档与配置学习两条主线。",
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
      { text: "指南", link: "/guide/" },
      { text: "组件", link: "/packages/components/" },
      { text: "指令", link: "/packages/directives/" },
      { text: "utils", link: "/packages/utils/" },
      { text: "learn-config", link: "/learn-config/" }
    ],
    sidebar: {
      "/guide/": [
        {
          text: "指南",
          items: [
            { text: "总览", link: "/guide/" },
            { text: "快速开始", link: "/guide/quick-start" },
            { text: "Components 接入", link: "/guide/components" },
            { text: "Directives 接入", link: "/guide/directives" },
            { text: "Utils 接入", link: "/guide/utils" }
          ]
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
      "/packages/directives/": [
        {
          text: "Directives",
          items: [
            { text: "概览", link: "/packages/directives/" },
            { text: "table-auto-height", link: "/packages/directives/table-auto-height" }
          ]
        }
      ],
      "/packages/utils/": [
        {
          text: "Utils",
          items: [
            { text: "概览", link: "/packages/utils/" },
            { text: "add", link: "/packages/utils/add" },
            { text: "isEmpty", link: "/packages/utils/is-empty" },
            { text: "deepClone", link: "/packages/utils/deep-clone" },
            { text: "debounce", link: "/packages/utils/debounce" },
            { text: "throttle", link: "/packages/utils/throttle" }
          ]
        }
      ],
      "/learn-config/eslint/": [
        {
          text: "ESLint",
          items: [
            { text: "总览", link: "/learn-config/eslint/" },
            { text: "配置文件结构", link: "/learn-config/eslint/config-file" },
            {
              text: "Language Options",
              link: "/learn-config/eslint/language-options"
            },
            {
              text: "Plugins And Rules",
              link: "/learn-config/eslint/plugins-and-rules"
            },
            {
              text: "Ignores And Files",
              link: "/learn-config/eslint/ignores-and-files"
            }
          ]
        }
      ],
      "/learn-config/tsconfig/": [
        {
          text: "TSConfig",
          items: [
            { text: "总览", link: "/learn-config/tsconfig/" },
            { text: "基础选项", link: "/learn-config/tsconfig/basic" },
            { text: "模块系统", link: "/learn-config/tsconfig/module" },
            { text: "路径别名", link: "/learn-config/tsconfig/paths" },
            { text: "严格模式", link: "/learn-config/tsconfig/strict" },
            { text: "输出与边界", link: "/learn-config/tsconfig/output" }
          ]
        }
      ],
      "/learn-config/vite-config/": [
        {
          text: "Vite Config",
          items: [
            { text: "总览", link: "/learn-config/vite-config/" },
            { text: "Shared Options", link: "/learn-config/vite-config/shared" },
            { text: "Plugins", link: "/learn-config/vite-config/plugins" },
            { text: "Resolve", link: "/learn-config/vite-config/resolve" },
            { text: "Build", link: "/learn-config/vite-config/build" }
          ]
        }
      ],
      "/learn-config/git/": [
        {
          text: "Git",
          items: [
            { text: "总览", link: "/learn-config/git/" },
            { text: "常用命令", link: "/learn-config/git/common" },
            { text: "Hooks 与提交", link: "/learn-config/git/hooks" },
            { text: "远程与代理", link: "/learn-config/git/remote" },
            { text: "版本与发布", link: "/learn-config/git/release" }
          ]
        }
      ],
      "/learn-config/": [
        {
          text: "learn-config",
          items: [
            { text: "总览", link: "/learn-config/" },
            { text: "ESLint", link: "/learn-config/eslint/" },
            { text: "TSConfig", link: "/learn-config/tsconfig/" },
            { text: "Vite Config", link: "/learn-config/vite-config/" },
            { text: "Git", link: "/learn-config/git/" },
            { text: "Terminal", link: "/learn-config/terminal" }
          ]
        }
      ]
    },
    search: {
      provider: "local"
    },
    footer: {
      message: "Monorepo 文档按使用文档与配置学习组织。",
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

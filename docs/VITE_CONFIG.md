# Vite 7 完整配置指南

> 📚 本文档详细介绍了 Vite 7 的所有配置选项、属性说明和使用示例

## 目录

- [配置文件基础](#配置文件基础)
- [共享选项 (Shared Options)](#共享选项-shared-options)
- [服务器选项 (Server Options)](#服务器选项-server-options)
- [构建选项 (Build Options)](#构建选项-build-options)
- [预览选项 (Preview Options)](#预览选项-preview-options)
- [依赖优化选项 (Dep Optimization Options)](#依赖优化选项-dep-optimization-options)
- [SSR 选项 (SSR Options)](#ssr-选项-ssr-options)
- [Worker 选项 (Worker Options)](#worker-选项-worker-options)
- [完整配置示例](#完整配置示例)

---

## 配置文件基础

### 文件命名与位置

- **默认文件名**: `vite.config.js` 或 `vite.config.ts`
- **位置**: 项目根目录
- **支持扩展名**: `.js`, `.ts`, `.mjs`, `.cjs`, `.mts`, `.cts`

### 配置加载方式

Vite 支持三种配置加载器:

| 加载器          | 说明                            | 使用场景         |
| --------------- | ------------------------------- | ---------------- |
| `bundle` (默认) | 使用 esbuild 打包配置到临时文件 | 大多数项目       |
| `runner`        | 使用模块运行器,不创建临时文件   | 需要避免临时文件 |
| `native`        | 使用环境原生运行时加载          | 特殊环境         |

### 配置智能提示

#### 方式 1: 使用 JSDoc 类型注释

```javascript
/** @type {import('vite').UserConfig} */
export default {
  // 配置选项
}
```

#### 方式 2: 使用 defineConfig 辅助函数 (推荐)

```javascript
import { defineConfig } from "vite"

export default defineConfig({
  // 配置选项
})
```

### 条件配置

配置可以导出函数,根据不同条件返回不同配置:

```javascript
import { defineConfig } from "vite"

export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  if (command === "serve") {
    return {
      // 开发环境配置
      server: {
        port: 3000
      }
    }
  } else {
    return {
      // 生产构建配置
      build: {
        minify: "terser"
      }
    }
  }
})
```

### 异步配置

支持异步函数配置:

```javascript
import { defineConfig } from "vite"

export default defineConfig(async ({ command, mode }) => {
  const data = await asyncFunction()

  return {
    // 使用 data 的配置
  }
})
```

---

## 共享选项 (Shared Options)

### 1. `plugins`

- **类型**: `PluginOption[]`
- **说明**: 要使用的插件数组

```javascript
import vue from "@vitejs/plugin-vue"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [
    vue(),
    react(),
    // 插件可以是一个数组
    [pluginA(), pluginB()],
    // 插件可以是一个 Promise
    async () => {
      const plugin = await import("./custom-plugin")
      return plugin.default
    }
  ]
})
```

### 2. `resolve.alias`

- **类型**: `Record<string, string> | Array<{ find: string | RegExp, replacement: string }>`
- **说明**: 路径别名配置

```javascript
export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
      'components': '/src/components',
      // 使用数组形式支持正则
      [
        {
          find: /^@components\/(.*)/,
          replacement: '/src/components/$1'
        }
      ]
    }
  }
})
```

### 3. `resolve.dedupe`

- **类型**: `string[]`
- **说明**: 去重依赖,防止多个版本同时存在

```javascript
export default defineConfig({
  resolve: {
    dedupe: ["lodash", "react", "react-dom"]
  }
})
```

### 4. `resolve.conditions`

- **类型**: `string[]`
- **说明**: 解析包的导出条件

```javascript
export default defineConfig({
  resolve: {
    conditions: ["import", "browser", "module", "esnext"]
  }
})
```

### 5. `resolve.mainFields`

- **类型**: `string[]`
- **默认值**: `['browser', 'module', 'jsnext:main', 'jsnext']`
- **说明**: 解析包的入口字段优先级

```javascript
export default defineConfig({
  resolve: {
    mainFields: ["module", "jsnext:main", "jsnext", "browser", "main"]
  }
})
```

### 6. `resolve.extensions`

- **类型**: `string[]`
- **默认值**: `['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']`
- **说明**: 导入时省略的扩展名列表

```javascript
export default defineConfig({
  resolve: {
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"]
  }
})
```

### 7. `resolve.preserveSymlinks`

- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 是否保留符号链接

### 8. `define`

- **类型**: `Record<string, string>`
- **说明**: 定义全局常量替换

```javascript
export default defineConfig({
  define: {
    __DEV__: JSON.stringify(true),
    __VERSION__: JSON.stringify("1.0.0"),
    "process.env.NODE_ENV": JSON.stringify("development")
  }
})
```

### 9. `css.modules`

- **类型**: `CSSModulesOptions`
- **说明**: CSS Modules 配置

```javascript
export default defineConfig({
  css: {
    modules: {
      // 生成类名格式
      generateScopedName: "[name]__[local]__[hash:base64:5]",
      // 自定义类名
      localsConvention: "camelCase", // 'camelCaseOnly' | 'dashes' | 'dashesOnly'
      // 修改 hash 前缀
      hashPrefix: "my-prefix",
      // 全局 CSS Modules
      globalModulePaths: [/global\.css$/]
    }
  }
})
```

### 10. `css.postcss`

- **类型**: `string | (PostCSS.ProcessOptions & { plugins?: PostCSS.Plugin[] })`
- **说明**: PostCSS 配置

```javascript
export default defineConfig({
  css: {
    postcss: {
      plugins: [require("autoprefixer"), require("postcss-nested")]
    }
  }
})
```

### 11. `css.preprocessorOptions`

- **类型**: `Record<string, object>`
- **说明**: CSS 预处理器选项

```javascript
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      },
      less: {
        modifyVars: {
          "primary-color": "#1890ff"
        },
        javascriptEnabled: true
      },
      styl: {
        additionalData: `@import "@/styles/variables.styl"`
      }
    }
  }
})
```

### 12. `css.devSourcemap`

- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 开发模式下启用 CSS sourcemap

### 13. `css.transformer`

- **类型**: `'postcss' | 'lightningcss'`
- **默认值**: `'postcss'`
- **说明**: CSS 转换器选择

### 14. `css.lightningcss`

- **类型**: `LightningCSSOptions`
- **说明**: LightningCSS 配置选项

```javascript
export default defineConfig({
  css: {
    transformer: "lightningcss",
    lightningcss: {
      targets: {
        chrome: 100
      }
    }
  }
})
```

### 15. `json.namedExports`

- **类型**: `boolean`
- **默认值**: `true`
- **说明**: 是否支持从 JSON 文件中按名称导入

### 16. `json.stringify`

- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 如果为 true,导入的 JSON 会被转换为 export default JSON.parse("...")

### 17. `esbuild`

- **类型**: `ESBuildOptions | false`
- **说明**: esbuild 转换选项

```javascript
export default defineConfig({
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
    jsxInject: `import React from 'react'`,
    // 禁用 esbuild 最小化
    minify: false
  }
})
```

### 18. `assetsInclude`

- **类型**: `string | RegExp | (string | RegExp)[]`
- **说明**: 额外的静态资源类型

```javascript
export default defineConfig({
  assetsInclude: ["**/*.gltf", "**/*.hdr", "**/*.wasm"]
})
```

### 19. `logLevel`

- **类型**: `'info' | 'warn' | 'error' | 'silent'`
- **默认值**: `'info'`
- **说明**: 控制台输出级别

### 20. `clearScreen`

- **类型**: `boolean`
- **默认值**: `true`
- **说明**: 打印日志时是否清空屏幕

### 21. `envDir`

- **类型**: `string`
- **默认值**: `<root>`
- **说明**: 环境变量文件所在目录

```javascript
export default defineConfig({
  envDir: "./config"
})
```

### 22. `envPrefix`

- **类型**: `string | string[]`
- **默认值**: `VITE_`
- **说明**: 环境变量前缀

```javascript
export default defineConfig({
  envPrefix: ["VITE_", "CUSTOM_"]
})
```

### 23. `appType`

- **类型**: `'spa' | 'mpa' | 'custom'`
- **默认值**: `'spa'`
- **说明**: 应用类型

```javascript
export default defineConfig({
  appType: "mpa" // 多页应用
})
```

### 24. `future`

- **类型**: `{ [key: string]: boolean }`
- **说明**: 实验性功能开关

```javascript
export default defineConfig({
  future: {
    removePluginHookHandleHotUpdate: true,
    removePluginHookSsrLoadModule: true
  }
})
```

---

## 服务器选项 (Server Options)

### 1. `server.host`

- **类型**: `string | boolean`
- **默认值**: `'localhost'`
- **说明**: 指定服务器监听的 IP 地址

```javascript
export default defineConfig({
  server: {
    host: "0.0.0.0", // 监听所有地址,包括局域网和公网
    // 或
    host: true // 等同于 '0.0.0.0'
  }
})
```

### 2. `server.allowedHosts`

- **类型**: `string[] | true`
- **默认值**: `[]`
- **说明**: 允许响应的主机名列表

```javascript
export default defineConfig({
  server: {
    allowedHosts: [
      "example.com",
      ".example.com", // 允许所有子域名
      "localhost"
    ]
  }
})
```

### 3. `server.port`

- **类型**: `number`
- **默认值**: `5173`
- **说明**: 指定服务器端口

```javascript
export default defineConfig({
  server: {
    port: 3000
  }
})
```

### 4. `server.strictPort`

- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 如果端口被占用则直接退出

```javascript
export default defineConfig({
  server: {
    port: 3000,
    strictPort: true // 端口被占用时报错退出
  }
})
```

### 5. `server.https`

- **类型**: `https.ServerOptions`
- **说明**: 启用 TLS + HTTP/2

```javascript
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem")
    }
  }
})
```

### 6. `server.open`

- **类型**: `boolean | string`
- **默认值**: `false`
- **说明**: 服务器启动时自动打开浏览器

```javascript
export default defineConfig({
  server: {
    open: true, // 打开默认浏览器
    // 或
    open: "/docs/index.html" // 打开指定路径
  }
})
```

### 7. `server.proxy`

- **类型**: `Record<string, string | ProxyOptions>`
- **说明**: 配置开发服务器的代理规则

```javascript
export default defineConfig({
  server: {
    proxy: {
      // 字符串简写
      "/api": "http://localhost:3000",

      // 完整配置
      "/api/v1": {
        target: "http://jsonplaceholder.typicode.com",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ""),
        headers: {
          "X-Custom-Header": "value"
        }
      },

      // 正则匹配
      "^/api/.*": {
        target: "http://api.example.com",
        changeOrigin: true
      },

      // WebSocket 代理
      "/socket.io": {
        target: "ws://localhost:5174",
        ws: true
      }
    }
  }
})
```

### 8. `server.cors`

- **类型**: `boolean | CorsOptions`
- **默认值**: 允许 `localhost`、`127.0.0.1` 和 `::1` 来源
- **说明**: 配置 CORS

```javascript
export default defineConfig({
  server: {
    cors: true, // 允许任何来源

    // 或详细配置
    cors: {
      origin: ["http://localhost:3000", "http://example.com"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true
    }
  }
})
```

### 9. `server.headers`

- **类型**: `OutgoingHttpHeaders`
- **说明**: 指定服务器响应头

```javascript
export default defineConfig({
  server: {
    headers: {
      "X-Frame-Options": "DENY",
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "default-src 'self'"
    }
  }
})
```

### 10. `server.hmr`

- **类型**: `boolean | HmrOptions`
- **说明**: 配置 HMR (热模块替换)

```javascript
export default defineConfig({
  server: {
    hmr: {
      overlay: true, // 在浏览器中显示错误覆盖层
      // 或禁用错误覆盖层
      overlay: false,

      // 自定义 HMR 服务器
      host: "localhost",
      port: 24678,
      protocol: "ws", // 'ws' 或 'wss'
      clientPort: 24678,
      path: "/",
      timeout: 60000
    }
  }
})
```

### 11. `server.warmup`

- **类型**: `{ clientFiles?: string[], ssrFiles?: string[] }`
- **说明**: 预转换和缓存常用文件

```javascript
export default defineConfig({
  server: {
    warmup: {
      clientFiles: ["./src/main.ts", "./src/components/*.vue"],
      ssrFiles: ["./src/server/entry-server.ts"]
    }
  }
})
```

### 12. `server.watch`

- **类型**: `object | null`
- **说明**: 文件系统监听选项 (基于 chokidar)

```javascript
export default defineConfig({
  server: {
    watch: {
      usePolling: true, // 在 WSL2 或 Docker 中使用轮询
      interval: 100, // 轮询间隔
      ignored: ["**/dist/**", "**/node_modules/**"]
    }
  }
})
```

### 13. `server.middlewareMode`

- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 以中间件模式创建服务器

```javascript
import express from "express"
import { createServer } from "vite"

const app = express()

const vite = await createServer({
  server: {
    middlewareMode: true
  }
})

app.use(vite.middlewares)
```

### 14. `server.fs.strict`

- **类型**: `boolean`
- **默认值**: `true` (Vite 2.7+)
- **说明**: 限制服务工作区根目录外的文件

### 15. `server.fs.allow`

- **类型**: `string[]`
- **说明**: 允许通过 `/@fs/` 服务的文件或目录列表

```javascript
import { searchForWorkspaceRoot } from "vite"

export default defineConfig({
  server: {
    fs: {
      // 允许访问项目根目录之外的文件
      allow: [searchForWorkspaceRoot(process.cwd()), "/path/to/external/folder"]
    }
  }
})
```

### 16. `server.fs.deny`

- **类型**: `string[]`
- **默认值**: `['.env', '.env.*', '*.{crt,pem}', '**/.git/**']`
- **说明**: 禁止服务敏感文件的阻止列表

```javascript
export default defineConfig({
  server: {
    fs: {
      deny: [".env", ".env.*", "*.{crt,pem,key}", "**/.git/**", "**/.env.*"]
    }
  }
})
```

### 17. `server.origin`

- **类型**: `string`
- **说明**: 定义开发环境下生成资源 URL 的源

```javascript
export default defineConfig({
  server: {
    origin: "http://127.0.0.1:8080"
  }
})
```

### 18. `server.sourcemapIgnoreList`

- **类型**: `false | (sourcePath: string, sourcemapPath: string) => boolean`
- **默认值**: 排除含 `node_modules` 的路径
- **说明**: 控制开发服务器的 sourcemap 中是否忽略某些源文件

```javascript
export default defineConfig({
  server: {
    sourcemapIgnoreList(sourcePath, sourcemapPath) {
      return sourcePath.includes("node_modules")
    }
  }
})
```

---

## 构建选项 (Build Options)

### 1. `build.target`

- **类型**: `string | string[]`
- **默认值**: `'baseline-widely-available'` (2025年5月1日广泛可用的基线浏览器)
- **说明**: 指定最终打包文件的浏览器兼容性目标

```javascript
export default defineConfig({
  build: {
    target: "es2015",
    // 或
    target: ["chrome100", "firefox100", "safari14"],
    // 特殊值
    target: "esnext" // 假设支持原生动态导入
  }
})
```

### 2. `build.modulePreload`

- **类型**: `boolean | { polyfill?: boolean, resolveDependencies?: Function }`
- **默认值**: `{ polyfill: true }`
- **说明**: 控制模块预加载 polyfill 的注入行为

```javascript
export default defineConfig({
  build: {
    modulePreload: {
      polyfill: true,
      // 自定义依赖解析
      resolveDependencies(filename, deps, context) {
        // 过滤依赖
        return deps.filter(dep => !dep.includes("test"))
      }
    }
  }
})
```

### 3. `build.outDir`

- **类型**: `string`
- **默认值**: `dist`
- **说明**: 指定输出目录 (相对于项目根目录)

```javascript
export default defineConfig({
  build: {
    outDir: "build"
  }
})
```

### 4. `build.assetsDir`

- **类型**: `string`
- **默认值**: `assets`
- **说明**: 指定资源文件在输出目录中的嵌套目录

```javascript
export default defineConfig({
  build: {
    assetsDir: "static"
  }
})
```

### 5. `build.assetsInlineLimit`

- **类型**: `number | Function`
- **默认值**: `4096` (4KB)
- **说明**: 小于此阈值的资源将被内联为 base64 URL

```javascript
export default defineConfig({
  build: {
    assetsInlineLimit: 8192, // 8KB

    // 或使用函数
    assetsInlineLimit: (filePath, content) => {
      // SVG 总是内联
      if (filePath.endsWith(".svg")) return true
      // PNG 小于 4KB 内联
      if (filePath.endsWith(".png")) return content.length < 4096
      return false
    }
  }
})
```

### 6. `build.cssCodeSplit`

- **类型**: `boolean`
- **默认值**: `true`
- **说明**: 启用/禁用 CSS 代码分割

```javascript
export default defineConfig({
  build: {
    cssCodeSplit: false // 所有 CSS 提取到单个文件
  }
})
```

### 7. `build.cssTarget`

- **类型**: `string | string[]`
- **默认值**: 与 `build.target` 相同
- **说明**: 为 CSS 压缩设置不同的浏览器目标

```javascript
export default defineConfig({
  build: {
    target: "esnext",
    cssTarget: "chrome61" // CSS 单独设置较低的目标
  }
})
```

### 8. `build.cssMinify`

- **类型**: `boolean | 'esbuild' | 'lightningcss'`
- **默认值**: 与 `build.minify` 相同
- **说明**: 覆盖 CSS 最小化设置

```javascript
export default defineConfig({
  build: {
    cssMinify: "lightningcss",
    // 或
    cssMinify: false // 禁用 CSS 压缩
  }
})
```

### 9. `build.sourcemap`

- **类型**: `boolean | 'inline' | 'hidden'`
- **默认值**: `false`
- **说明**: 生成生产环境 sourcemap

```javascript
export default defineConfig({
  build: {
    sourcemap: true, // 生成独立文件
    // 或
    sourcemap: "inline", // 内联到文件中
    // 或
    sourcemap: "hidden" // 生成文件但不引用
  }
})
```

### 10. `build.rollupOptions`

- **类型**: `RollupOptions`
- **说明**: 直接自定义底层 Rollup 打包配置

```javascript
export default defineConfig({
  build: {
    rollupOptions: {
      // 入口文件
      input: {
        main: resolve(__dirname, "index.html"),
        nested: resolve(__dirname, "nested/index.html")
      },

      // 外部依赖
      external: ["lodash", "react"],

      // 输出配置
      output: {
        // 文件命名
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",

        // 全局变量名称
        globals: {
          lodash: "_",
          react: "React"
        },

        // 手动分割代码块
        manualChunks: {
          vendor: ["react", "react-dom"],
          lodash: ["lodash"]
        },

        // 或使用函数
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString()
          }
        }
      },

      // 插件
      plugins: [
        // 自定义 Rollup 插件
      ]
    }
  }
})
```

### 11. `build.commonjsOptions`

- **类型**: `RollupCommonJSOptions`
- **说明**: 传递给 @rollup/plugin-commonjs 的选项

```javascript
export default defineConfig({
  build: {
    commonjsOptions: {
      include: [/node_modules/],
      extensions: [".js", ".cjs"],
      transformMixedEsModules: true
    }
  }
})
```

### 12. `build.dynamicImportVarsOptions`

- **类型**: `RollupDynamicImportVarsOptions`
- **说明**: 传递给 @rollup/plugin-dynamic-import-vars 的选项

```javascript
export default defineConfig({
  build: {
    dynamicImportVarsOptions: {
      include: ["**/*.js", "**/*.ts"],
      exclude: ["node_modules/**"]
    }
  }
})
```

### 13. `build.lib`

- **类型**: `{ entry: string | object, name?: string, formats?: string[], fileName?: string | Function }`
- **说明**: 构建为库模式

```javascript
export default defineConfig({
  build: {
    lib: {
      // 单入口
      entry: resolve(__dirname, "src/index.ts"),
      // 或多入口
      entry: {
        main: resolve(__dirname, "src/index.ts"),
        utils: resolve(__dirname, "src/utils.ts")
      },

      // UMD 全局变量名
      name: "MyLib",

      // 输出格式
      formats: ["es", "cjs", "umd", "iife"],

      // 文件命名
      fileName: (format, entryName) => {
        if (format === "es") return `${entryName}.mjs`
        if (format === "cjs") return `${entryName}.cjs`
        return `${entryName}.${format}.js`
      }
    },

    // 库模式下的外部依赖
    rollupOptions: {
      external: ["react", "react-dom", "lodash"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          lodash: "_"
        }
      }
    }
  }
})
```

### 14. `build.license`

- **类型**: `boolean | { fileName?: string }`
- **默认值**: `false`
- **说明**: 生成包含所有依赖许可证信息的文件

```javascript
export default defineConfig({
  build: {
    license: true,
    // 或自定义文件名
    license: {
      fileName: "LICENSES.txt"
    }
  }
})
```

### 15. `build.manifest`

- **类型**: `boolean | string`
- **默认值**: `false`
- **说明**: 生成资源映射清单文件,用于后端集成

```javascript
export default defineConfig({
  build: {
    manifest: true,
    // 或自定义文件名
    manifest: "manifest.json"
  }
})
```

### 16. `build.ssrManifest`

- **类型**: `boolean | string`
- **默认值**: `false`
- **说明**: 生成 SSR 清单文件

```javascript
export default defineConfig({
  build: {
    ssrManifest: true,
    // 或自定义文件名
    ssrManifest: "ssr-manifest.json"
  }
})
```

### 17. `build.ssr`

- **类型**: `boolean | string`
- **默认值**: `false`
- **说明**: 生成 SSR 导向的构建

```javascript
export default defineConfig({
  build: {
    ssr: true,
    // 或指定入口
    ssr: "src/entry-server.ts"
  }
})
```

### 18. `build.emitAssets`

- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 在非客户端构建中强制发出静态资源

### 19. `build.ssrEmitAssets`

- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 在 SSR 构建中强制发出静态资源

### 20. `build.minify`

- **类型**: `boolean | 'terser' | 'esbuild'`
- **默认值**: `'esbuild'`
- **说明**: 设置代码最小化工具

```javascript
export default defineConfig({
  build: {
    minify: "esbuild", // 速度快
    // 或
    minify: "terser", // 压缩率更高
    // 或
    minify: false // 禁用压缩
  }
})
```

### 21. `build.terserOptions`

- **类型**: `TerserOptions`
- **说明**: 传递给 Terser 的额外最小化选项

```javascript
export default defineConfig({
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log"]
      },
      format: {
        comments: false
      }
    }
  }
})
```

### 22. `build.write`

- **类型**: `boolean`
- **默认值**: `true`
- **说明**: 是否将打包结果写入磁盘

```javascript
export default defineConfig({
  build: {
    write: false // 适用于需要自定义输出处理
  }
})
```

### 23. `build.emptyOutDir`

- **类型**: `boolean`
- **默认值**: 如果 outDir 在项目根目录内则为 true
- **说明**: 构建时是否清空输出目录

```javascript
export default defineConfig({
  build: {
    outDir: "dist",
    emptyOutDir: true
  }
})
```

### 24. `build.copyPublicDir`

- **类型**: `boolean`
- **默认值**: `true`
- **说明**: 是否在构建时复制 public 目录中的文件

```javascript
export default defineConfig({
  build: {
    copyPublicDir: false
  }
})
```

### 25. `build.reportCompressedSize`

- **类型**: `boolean`
- **默认值**: `true`
- **说明**: 启用/禁用 gzip 压缩大小报告

```javascript
export default defineConfig({
  build: {
    reportCompressedSize: false // 加快构建速度
  }
})
```

### 26. `build.chunkSizeWarningLimit`

- **类型**: `number`
- **默认值**: `500` (kB)
- **说明**: 块大小警告限制

```javascript
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000 // 提高到 1MB
  }
})
```

### 27. `build.watch`

- **类型**: `WatcherOptions | null`
- **默认值**: `null`
- **说明**: 启用 Rollup 监视器

```javascript
export default defineConfig({
  build: {
    watch: {
      include: "src/**",
      exclude: "node_modules/**",
      clearScreen: false
    }
  }
})
```

---

## 预览选项 (Preview Options)

### 1. `preview.host`

- **类型**: `string | boolean`
- **默认值**: `server.host`
- **说明**: 指定预览服务器应监听的 IP 地址

```javascript
export default defineConfig({
  preview: {
    host: "0.0.0.0"
  }
})
```

### 2. `preview.allowedHosts`

- **类型**: `string[] | true`
- **默认值**: `server.allowedHosts`
- **说明**: 允许 Vite 响应的主机名列表

```javascript
export default defineConfig({
  preview: {
    allowedHosts: ["example.com"]
  }
})
```

### 3. `preview.port`

- **类型**: `number`
- **默认值**: `4173`
- **说明**: 指定预览服务器端口

```javascript
export default defineConfig({
  preview: {
    port: 8080
  }
})
```

### 4. `preview.strictPort`

- **类型**: `boolean`
- **默认值**: `server.strictPort`
- **说明**: 设置为 true 时,如果端口被占用则直接退出

```javascript
export default defineConfig({
  preview: {
    port: 8080,
    strictPort: true
  }
})
```

### 5. `preview.https`

- **类型**: `https.ServerOptions`
- **默认值**: `server.https`
- **说明**: 启用 TLS + HTTP/2

### 6. `preview.open`

- **类型**: `boolean | string`
- **默认值**: `server.open`
- **说明**: 服务器启动时自动在浏览器中打开应用

```javascript
export default defineConfig({
  preview: {
    open: true
  }
})
```

### 7. `preview.proxy`

- **类型**: `Record<string, string | ProxyOptions>`
- **默认值**: `server.proxy`
- **说明**: 配置预览服务器的自定义代理规则

```javascript
export default defineConfig({
  preview: {
    proxy: {
      "/api": "http://localhost:3000"
    }
  }
})
```

### 8. `preview.cors`

- **类型**: `boolean | CorsOptions`
- **默认值**: `server.cors`
- **说明**: 为预览服务器配置 CORS

### 9. `preview.headers`

- **类型**: `OutgoingHttpHeaders`
- **说明**: 指定服务器响应头

```javascript
export default defineConfig({
  preview: {
    headers: {
      "X-Frame-Options": "DENY"
    }
  }
})
```

---

## 依赖优化选项 (Dep Optimization Options)

### 1. `optimizeDeps.entries`

- **类型**: `string | string[]`
- **说明**: 自定义依赖扫描入口

```javascript
export default defineConfig({
  optimizeDeps: {
    entries: ["src/main.ts", "src/**/*.vue"]
  }
})
```

### 2. `optimizeDeps.exclude`

- **类型**: `string[]`
- **说明**: 从预构建中排除的依赖项

```javascript
export default defineConfig({
  optimizeDeps: {
    exclude: ["my-lib", "linked-package"]
  }
})
```

### 3. `optimizeDeps.include`

- **类型**: `string[]`
- **说明**: 强制预构建的依赖项

```javascript
export default defineConfig({
  optimizeDeps: {
    include: [
      "lodash",
      "axios",
      // 支持深层导入 (实验性)
      "my-lib/components/**/*.vue"
    ]
  }
})
```

### 4. `optimizeDeps.esbuildOptions`

- **类型**: `Omit<EsbuildBuildOptions, 'bundle' | 'entryPoints' | ... >`
- **说明**: 传递给 esbuild 的选项

```javascript
export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      plugins: [customPlugin()],
      define: {
        "process.env.NODE_ENV": '"development"'
      }
    }
  }
})
```

### 5. `optimizeDeps.force`

- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 强制重新预构建依赖,忽略缓存

```javascript
export default defineConfig({
  optimizeDeps: {
    force: true
  }
})
```

### 6. `optimizeDeps.noDiscovery`

- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 禁用自动依赖发现

```javascript
export default defineConfig({
  optimizeDeps: {
    noDiscovery: true,
    include: ["lodash", "axios"] // 仅优化这些依赖
  }
})
```

### 7. `optimizeDeps.holdUntilCrawlEnd`

- **类型**: `boolean`
- **默认值**: `true`
- **说明**: 实验性功能,等待所有静态导入爬取完毕再返回优化结果

```javascript
export default defineConfig({
  optimizeDeps: {
    holdUntilCrawlEnd: false // 加快冷启动
  }
})
```

### 8. `optimizeDeps.disabled`

- **已弃用**
- **类型**: `boolean | 'build' | 'dev'`
- **默认值**: `'build'`
- **说明**: 此选项已弃用

### 9. `optimizeDeps.needsInterop`

- **实验性**
- **类型**: `string[]`
- **说明**: 强制在导入这些依赖时进行 ESM 互操作

```javascript
export default defineConfig({
  optimizeDeps: {
    needsInterop: ["react-router-dom"]
  }
})
```

---

## SSR 选项 (SSR Options)

### 1. `ssr.external`

- **类型**: `string[]`
- **说明**: SSR 时外部化的依赖

```javascript
export default defineConfig({
  ssr: {
    external: ["lodash", "axios"]
  }
})
```

### 2. `ssr.noExternal`

- **类型**: `string | RegExp | (string | RegExp)[] | true`
- **说明**: SSR 时不外部化的依赖

```javascript
export default defineConfig({
  ssr: {
    noExternal: ["element-plus", /^@vue\//]
  }
})
```

### 3. `ssr.target`

- **类型**: `'node' | 'webworker'`
- **默认值**: `'node'`
- **说明**: SSR 构建目标

```javascript
export default defineConfig({
  ssr: {
    target: "webworker"
  }
})
```

### 4. `ssr.format`

- **类型**: `'esm' | 'cjs'`
- **默认值**: `'esm'`
- **说明**: SSR 构建格式

```javascript
export default defineConfig({
  ssr: {
    format: "cjs"
  }
})
```

---

## Worker 选项 (Worker Options)

### 1. `worker.format`

- **类型**: `'es' | 'iife'`
- **默认值**: `'iife'`
- **说明**: Worker 打包格式

```javascript
export default defineConfig({
  worker: {
    format: "es"
  }
})
```

### 2. `worker.plugins`

- **类型**: `PluginOption[]`
- **说明**: 应用于 Worker 构建的插件

```javascript
export default defineConfig({
  worker: {
    plugins: [myPlugin()]
  }
})
```

### 3. `worker.rollupOptions`

- **类型**: `RollupOptions`
- **说明**: Worker 构建的 Rollup 选项

```javascript
export default defineConfig({
  worker: {
    rollupOptions: {
      output: {
        entryFileNames: "worker/[name].js"
      }
    }
  }
})
```

---

## 完整配置示例

### 1. 基础 Web 应用

```javascript
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"

export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  },

  server: {
    port: 3000,
    open: true,
    proxy: {
      "/api": "http://localhost:8080"
    }
  },

  build: {
    outDir: "dist",
    sourcemap: true,
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["vue", "vue-router", "pinia"]
        }
      }
    }
  }
})
```

### 2. 库开发模式

```javascript
import { defineConfig } from "vite"
import { resolve } from "path"
import dts from "vite-plugin-dts"

export default defineConfig({
  plugins: [
    dts({
      include: ["src/**/*"],
      outDir: "dist"
    })
  ],

  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "MyLib",
      fileName: format => `index.${format === "es" ? "mjs" : "cjs"}`,
      formats: ["es", "cjs"]
    },

    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        }
      }
    },

    sourcemap: true,
    minify: false
  }
})
```

### 3. 多页应用 (MPA)

```javascript
import { defineConfig } from "vite"
import { resolve } from "path"
import { globSync } from "glob"

const input = globSync("src/pages/**/index.html").reduce((acc, file) => {
  const name = file.split("/").at(-2)
  acc[name] = resolve(__dirname, file)
  return acc
}, {})

export default defineConfig({
  appType: "mpa",

  build: {
    rollupOptions: {
      input
    }
  }
})
```

### 4. SSR 应用

```javascript
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"

export default defineConfig({
  plugins: [vue()],

  build: {
    manifest: true,
    ssrManifest: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html")
      }
    }
  },

  ssr: {
    noExternal: ["element-plus"]
  }
})
```

### 5. 企业级完整配置

```javascript
import { defineConfig, loadEnv, searchForWorkspaceRoot } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"
import Components from "unplugin-vue-components/vite"
import AutoImport from "unplugin-auto-import/vite"
import { visualizer } from "rollup-plugin-visualizer"
import viteCompression from "vite-plugin-compression"

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), "")
  const isProduction = mode === "production"

  return {
    plugins: [
      vue(),

      // 自动导入
      AutoImport({
        imports: ["vue", "vue-router"],
        dts: "src/auto-imports.d.ts"
      }),

      // 组件自动注册
      Components({
        dirs: ["src/components"],
        extensions: ["vue"],
        dts: "src/components.d.ts"
      }),

      // 生产环境插件
      isProduction &&
        visualizer({
          open: false,
          gzipSize: true,
          brotliSize: true
        }),

      isProduction &&
        viteCompression({
          algorithm: "gzip",
          ext: ".gz"
        })
    ].filter(Boolean),

    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        "@components": resolve(__dirname, "src/components"),
        "@utils": resolve(__dirname, "src/utils"),
        "@api": resolve(__dirname, "src/api")
      },
      dedupe: ["vue", "vue-router", "pinia"]
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";`,
          charset: false
        }
      },
      devSourcemap: true
    },

    server: {
      host: "0.0.0.0",
      port: 3000,
      open: true,
      cors: true,

      proxy: {
        "/api": {
          target: env.VITE_API_URL || "http://localhost:8080",
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, "")
        }
      },

      fs: {
        allow: [searchForWorkspaceRoot(process.cwd()), resolve(__dirname, "../shared")]
      },

      warmup: {
        clientFiles: ["./src/main.ts", "./src/App.vue"]
      }
    },

    build: {
      target: "es2015",
      outDir: "dist",
      assetsDir: "assets",
      assetsInlineLimit: 4096,
      cssCodeSplit: true,
      sourcemap: !isProduction,
      minify: isProduction ? "esbuild" : false,

      rollupOptions: {
        output: {
          entryFileNames: "assets/js/[name]-[hash].js",
          chunkFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: assetInfo => {
            const info = assetInfo.name.split(".")
            const ext = info[info.length - 1]

            if (/\.(png|jpe?g|gif|svg|webp|ico)$/i.test(assetInfo.name)) {
              return "assets/images/[name]-[hash].[ext]"
            } else if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
              return "assets/fonts/[name]-[hash].[ext]"
            } else if (/\.css$/i.test(assetInfo.name)) {
              return "assets/css/[name]-[hash].[ext]"
            }

            return "assets/[name]-[hash].[ext]"
          },

          manualChunks: {
            "vue-vendor": ["vue", "vue-router", "pinia"],
            "ui-vendor": ["element-plus", "axios"],
            utils: ["lodash-es", "dayjs"]
          }
        }
      },

      chunkSizeWarningLimit: 1000,
      reportCompressedSize: true
    },

    optimizeDeps: {
      include: [
        "vue",
        "vue-router",
        "pinia",
        "axios",
        "element-plus/es",
        "element-plus/es/components/message/style/css"
      ],

      exclude: ["@iconify/json"]
    },

    define: {
      __APP_VERSION__: JSON.stringify(env.npm_package_version),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString())
    }
  }
})
```

---

## 配置最佳实践

### 1. 环境变量管理

```javascript
// .env
VITE_API_URL=http://localhost:8080
VITE_APP_TITLE=My App

// .env.production
VITE_API_URL=https://api.example.com
VITE_APP_TITLE=My App (Production)

// vite.config.js
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    define: {
      __API_URL__: JSON.stringify(env.VITE_API_URL)
    }
  }
})
```

### 2. 路径别名规范

```javascript
export default defineConfig({
  resolve: {
    alias: {
      // 使用 @ 开头避免冲突
      "@": "/src",
      "@components": "/src/components",
      "@views": "/src/views",
      "@utils": "/src/utils",
      "@api": "/src/api",
      "@store": "/src/store",
      "@router": "/src/router"
    }
  }
})
```

### 3. 构建优化策略

```javascript
export default defineConfig({
  build: {
    // 1. 代码分割
    rollupOptions: {
      output: {
        manualChunks: {
          // 第三方库分离
          vendor: ["vue", "vue-router"],
          // UI 库分离
          ui: ["element-plus"],
          // 工具库分离
          utils: ["lodash-es", "dayjs"]
        }
      }
    },

    // 2. 资源优化
    assetsInlineLimit: 4096, // 小于 4KB 内联

    // 3. 压缩优化
    minify: "esbuild", // 速度快
    // 或
    minify: "terser", // 压缩率高
    terserOptions: {
      compress: {
        drop_console: true, // 移除 console
        drop_debugger: true // 移除 debugger
      }
    },

    // 4. 关闭不必要功能
    reportCompressedSize: false, // 加快构建速度
    sourcemap: false // 生产环境关闭
  }
})
```

### 4. 开发体验优化

```javascript
export default defineConfig({
  server: {
    // 快速启动
    warmup: {
      clientFiles: ["./src/main.ts", "./src/App.vue"]
    },

    // 网络访问
    host: "0.0.0.0",

    // 自动打开浏览器
    open: true,

    // CORS
    cors: true
  },

  // CSS 预处理
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    },
    devSourcemap: true
  }
})
```

---

## 常见问题解决

### 1. 依赖预构建问题

```javascript
export default defineConfig({
  optimizeDeps: {
    // 强制预构建
    include: ["element-plus/es/components/message/style/css"],

    // 排除不需要预构建的依赖
    exclude: ["@iconify/json"]
  }
})
```

### 2. 内存溢出问题

```bash
# 增加 Node.js 内存限制
NODE_OPTIONS=--max-old-space-size=8192 vite build
```

### 3. 公共文件访问权限

```javascript
export default defineConfig({
  server: {
    fs: {
      // 允许访问项目外的文件
      allow: [searchForWorkspaceRoot(process.cwd()), "/path/to/external/folder"],

      // 禁止访问敏感文件
      deny: [".env", ".env.*", "*.pem"]
    }
  }
})
```

### 4. WSL2 文件监听问题

```javascript
export default defineConfig({
  server: {
    watch: {
      usePolling: true,
      interval: 100
    }
  }
})
```

---

## 参考资料

- [Vite 官方文档](https://vite.dev/)
- [Vite 配置参考](https://vite.dev/config/)
- [Rollup 配置文档](https://rollupjs.org/configuration-options/)
- [esbuild 配置文档](https://esbuild.github.io/api/)

---

> 📝 **最后更新**: 2026年3月  
> 📦 **Vite 版本**: 7.x  
> ✍️ **作者**: 项目团队

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import dts from "vite-plugin-dts"
import { resolve } from "path"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"

export default defineConfig({
  plugins: [
    vue(),
    // 优化：增强自动导入配置
    AutoImport({
      imports: ["vue"],
      resolvers: [
        ElementPlusResolver({
          // 按需导入样式
          importStyle: "css"
        })
      ],
      // 启用严格模式，只生成实际使用的 API
      include: [
        /\.[jt]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/ // .vue
      ],
      // 自动生成类型声明文件
      dts: resolve(__dirname, "src/auto-imports.d.ts"),
      // 排除不需要自动导入的文件
      exclude: ["**/node_modules/**", "**/dist/**"],
      // 自动导入的 eslint 配置
      eslintrc: {
        enabled: true, // 生成 .eslintrc-auto-import.json
        filepath: resolve(__dirname, ".eslintrc-auto-import.json"),
        globalsPropValue: true
      },
      // 优化：添加 vue 模板支持
      vueTemplate: true
    }),
    // 优化：增强组件自动导入配置
    Components({
      resolvers: [
        // Element Plus 组件解析器
        ElementPlusResolver({
          // 按需导入样式
          importStyle: "css"
        }),
        // 自定义组件解析器（自动导入本地组件）
        componentName => {
          if (componentName.startsWith("xlg")) {
            return {
              name: componentName,
              from: resolve(__dirname, `src/${componentName.toLowerCase()}/index.vue`)
            }
          }
          return undefined // 默认返回值
        }
      ],
      // 组件自动导入的目录
      dirs: [resolve(__dirname, "src/**/"), resolve(__dirname, "src/components/**/")],
      // 包含的文件类型
      extensions: ["vue", "ts", "tsx"],
      // 排除的文件
      exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
      // 自动生成类型声明文件
      dts: resolve(__dirname, "src/components.d.ts"),
      // 组件名转换规则（kebab-case 转 PascalCase）
      directoryAsNamespace: true
    }),
    // 优化：增强类型声明生成配置（适用于 monorepo）
    dts({
      include: [
        "src/**/*.ts",
        "src/**/*.vue",
        "src/**/*.tsx",
        "src/auto-imports.d.ts",
        "src/components.d.ts"
      ],
      exclude: ["node_modules/**", "dist/**", "**/*.test.ts", "**/*.spec.ts"],
      outDir: "dist",
      // 生成入口文件类型声明
      insertTypesEntry: true,
      // 复制 .d.ts 文件到输出目录
      copyDtsFiles: true,
      // 静态导入
      staticImport: false,
      // 清理输出目录
      cleanVueFileName: true,
      // 优化：解决 monorepo 中的路径问题
      pathsToAliases: true,
      // 别名配置
      aliasesExclude: [/^@smallbrother\//],
      // 类型文件合并
      bundledPackages: ["vue", "element-plus"]
    })
  ],
  // 优化：构建配置增强
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "SmallBrotherComponents",
      formats: ["es", "umd"],
      fileName: format => `index.${format === "es" ? "mjs" : "umd.cjs"}`
    },
    rollupOptions: {
      // 外部化依赖，避免打包进库
      external: [
        "vue",
        "element-plus",
        "@smallbrother/utils",
        // 确保所有 workspace 包都被外部化
        /^@smallbrother\//
      ],
      output: {
        // UMD 模式的全局变量
        globals: {
          vue: "Vue",
          "element-plus": "ElementPlus",
          "@smallbrother/utils": "SmallBrotherUtils"
        },
        // 保留 CSS 文件名
        assetFileNames: assetInfo => {
          // 将所有 CSS 文件输出为 style.css（便于导入）
          if (assetInfo.name && /\.(css|scss|sass)$/.test(assetInfo.name)) {
            return "style.css"
          }
          return "assets/[name]-[hash][extname]"
        },
        // 启用 tree-shaking
        exports: "named",
        // 优化：更好的代码分割
        manualChunks: undefined,
        // 保留模块结构
        preserveModules: false,
        // 优化：更好的模块 ID
        generatedCode: {
          constBindings: true
        }
      },
      // 优化：tree-shaking 配置
      treeshake: {
        preset: "recommended",
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false
      }
    },
    // 生成 sourcemap
    sourcemap: true,
    // CSS 代码分割配置
    cssCodeSplit: true,
    target: "es2020",
    // 优化：模块解析
    modulePreload: {
      polyfill: false
    }
  },
  // 优化：解析配置增强
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@smallbrother/components": resolve(__dirname, "src"),
      // 添加更多常用别名
      "@components": resolve(__dirname, "src"),
      "@types": resolve(__dirname, "src/types")
    },
    // 优化：扩展名解析
    extensions: [".js", ".ts", ".jsx", ".tsx", ".vue", ".json", ".mjs"],
    // 优化：条件导出支持
    conditions: ["import", "module", "browser", "default"]
  }
  // 优化：CSS 配置
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       // 可添加全局 scss 变量
  //       additionalData: `@use "@/styles/variables.scss" as *;`
  //     }
  //   },
  //   // 启用 CSS 模块
  //   modules: {
  //     generateScopedName: "[name]__[local]___[hash:base64:5]"
  //   }
  // }
})

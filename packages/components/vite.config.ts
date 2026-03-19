import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import dts from "vite-plugin-dts"
import { resolve } from "path"

export default defineConfig({
  plugins: [
    vue(),
    // 优化：增强类型声明生成配置（适用于 monorepo）
    dts({
      include: ["src/**/*.ts", "src/**/*.vue", "src/**/*.tsx"],
      exclude: ["node_modules/**", "dist/**", "**/*.test.ts", "**/*.spec.ts"],
      outDir: "dist",
      // 生成入口文件类型声明
      insertTypesEntry: true,
      // 复制 .d.ts 文件到输出目录
      copyDtsFiles: true,
      // 清理输出目录
      cleanVueFileName: true,
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
      formats: ["es"],
      fileName: (format, name) => {
        console.log(format, name)
        return "index.mjs"
      }
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
        // 保留 CSS 文件名
        assetFileNames: assetInfo => {
          // 将所有 CSS 文件输出为 style.css（便于导入）
          if (assetInfo.name && /\.(css|scss|sass)$/.test(assetInfo.name)) {
            return "style.css"
          }
          return "assets/[name]-[hash][extname]"
        },
        // 启用 tree-shaking
        exports: "named"
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
    target: "latest",
    // 优化：模块解析
    modulePreload: {
      polyfill: false
    }
  },
  // 优化：解析配置增强
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@types": resolve(__dirname, "src/types")
    },
    // 优化：扩展名解析
    extensions: [".js", ".ts", ".jsx", ".tsx", ".vue", ".json", ".mjs"],
    // 优化：条件导出支持
    conditions: ["import", "module", "browser", "default"]
  }
})

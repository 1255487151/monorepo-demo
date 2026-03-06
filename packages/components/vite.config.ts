import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import dts from "vite-plugin-dts"
import { resolve } from "path"

export default defineConfig({
  plugins: [
    vue(),
    // 自动生成 TypeScript 类型声明文件
    dts({
      include: ["src/**/*.ts", "src/**/*.vue"],
      exclude: ["node_modules", "dist"],
      outDir: "dist",
      insertTypesEntry: true
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "SmallBrotherComponents",
      formats: ["es", "umd"],
      fileName: format => `index.${format === "es" ? "mjs" : "umd.cjs"}`
    },
    rollupOptions: {
      // 外部化依赖，避免打包进库
      external: ["vue", "element-plus", "@small-brother/utils"],
      output: {
        // UMD 模式的全局变量
        globals: {
          vue: "Vue",
          "element-plus": "ElementPlus",
          "@small-brother/utils": "SmallBrotherUtils"
        },
        // 保留 CSS 文件名
        assetFileNames: assetInfo => {
          if (assetInfo.name === "style.css") {
            return "style.css"
          }
          return assetInfo.name || "asset"
        },
        // 启用 tree-shaking
        exports: "named"
      }
    },
    sourcemap: true,
    cssCodeSplit: false
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@small-brother/components": resolve(__dirname, "src")
    }
  }
})

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import dts from "vite-plugin-dts"
import { resolve } from "path"

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      outDir: "dist/types",
      include: ["src/**/*.ts", "src/**/*.vue"],
      exclude: ["node_modules", "dist"]
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "SmallBrotherComponents",
      formats: ["es", "umd"],
      fileName: format => `index.${format === "es" ? "es" : "umd"}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue", "element-plus"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
          "element-plus": "ElementPlus"
        },
        // 保留 CSS 文件名
        assetFileNames: assetInfo => {
          if (assetInfo.name === "style.css") {
            return "style.css"
          }
          return assetInfo.name || "asset"
        }
      }
    },
    // 生成 sourcemap
    sourcemap: true,
    // CSS 代码分割
    cssCodeSplit: false
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@small-brother/components": resolve(__dirname, "src")
    }
  }
})

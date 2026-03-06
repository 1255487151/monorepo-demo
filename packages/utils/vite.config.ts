import { defineConfig } from "vite"
import { resolve } from "path"
import dts from "vite-plugin-dts"

export default defineConfig({
  plugins: [
    // 自动生成 TypeScript 类型声明文件
    dts({
      include: ["src/**/*"],
      exclude: ["node_modules", "dist"],
      outDir: "dist",
      insertTypesEntry: true
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "SmallBrotherUtils",
      fileName: format => `index.${format === "es" ? "mjs" : "cjs"}`,
      formats: ["es", "cjs"]
    },
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      external: [],
      output: {
        exports: "named"
      }
    },
    target: "esnext",
    minify: false
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  }
})

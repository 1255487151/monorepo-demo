import { resolve } from "path"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

export default defineConfig({
  plugins: [
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
      output: {
        exports: "named"
      }
    },
    target: "ES2020",
    minify: false
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  }
})

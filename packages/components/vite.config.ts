import { resolve } from "path"
import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import {
  createLibraryEntries,
  emitLibraryCssAssets,
  getComponentEntries,
  rewriteRuntimeStyleEntries,
  rootDir
} from "./plugin"

const componentEntries = getComponentEntries()

export default defineConfig({
  plugins: [
    vue(),
    emitLibraryCssAssets(componentEntries),
    rewriteRuntimeStyleEntries(componentEntries),
    dts({
      include: ["src/**/*.ts", "src/**/*.vue"],
      exclude: ["node_modules/**", "dist/**", "**/*.test.ts", "**/*.spec.ts"],
      outDir: "dist",
      entryRoot: "src",
      tsconfigPath: "./tsconfig.json",
      insertTypesEntry: true,
      copyDtsFiles: true,
      cleanVueFileName: true,
      aliasesExclude: [/^@smallbrother\//],
      compilerOptions: {
        declarationMap: false
      }
    })
  ],
  build: {
    lib: {
      entry: createLibraryEntries(componentEntries),
      name: "SmallBrotherComponents",
      formats: ["es"],
      fileName: (_format, entryName) => `${entryName}.mjs`
    },
    outDir: "dist",
    emptyOutDir: true,
    cssCodeSplit: true,
    rollupOptions: {
      external: [
        "vue",
        /^vue\//,
        "element-plus",
        /^element-plus\//,
        "@smallbrother/utils",
        /^@smallbrother\//
      ],
      output: {
        entryFileNames: "[name].mjs",
        chunkFileNames: "chunks/[name]-[hash].mjs",
        assetFileNames: assetInfo => {
          if (assetInfo.name?.endsWith(".css")) {
            return "[name][extname]"
          }

          return "assets/[name][extname]"
        },
        exports: "named"
      },
      treeshake: {
        preset: "recommended",
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false
      }
    },
    sourcemap: false,
    target: "ES2020",
    modulePreload: {
      polyfill: false
    }
  },
  resolve: {
    alias: {
      "@": resolve(rootDir, "src"),
      "@types": resolve(rootDir, "src/types")
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".vue", ".json", ".mjs"],
    conditions: ["import", "module", "browser", "default"]
  }
})

import { existsSync, readdirSync } from "fs"
import { resolve } from "path"
import vue from "@vitejs/plugin-vue"
import { compile } from "sass"
import { defineConfig, type Plugin } from "vite"
import dts from "vite-plugin-dts"

type ComponentEntry = {
  name: string
  entryFile: string
  styleFile?: string
}

const rootDir = __dirname
const srcDir = resolve(rootDir, "src")
const componentsDir = resolve(srcDir, "components")
const styleDir = resolve(srcDir, "style")

function getComponentEntries() {
  const entries: ComponentEntry[] = []

  for (const entry of readdirSync(componentsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      continue
    }

    const entryFile = resolve(componentsDir, entry.name, "index.ts")

    if (!existsSync(entryFile)) {
      continue
    }

    const styleFile = resolve(componentsDir, entry.name, "index.scss")
    const componentEntry: ComponentEntry = {
      name: entry.name,
      entryFile
    }

    if (existsSync(styleFile)) {
      componentEntry.styleFile = styleFile
    }

    entries.push(componentEntry)
  }

  return entries.sort((left, right) => left.name.localeCompare(right.name))
}

const componentEntries = getComponentEntries()

function createLibraryEntries() {
  const entries: Record<string, string> = {
    index: resolve(srcDir, "index.ts"),
    "components/index": resolve(componentsDir, "index.ts"),
    "style/index": resolve(styleDir, "index.ts")
  }

  for (const component of componentEntries) {
    entries[`components/${component.name}/index`] = component.entryFile
  }

  return entries
}

function compileScss(filePath: string) {
  return compile(filePath, {
    style: "compressed",
    loadPaths: [srcDir]
  }).css
}

function componentStyleVirtualModule(components: ComponentEntry[]): Plugin {
  const virtualId = "virtual:xlg-component-styles"
  const resolvedVirtualId = `\0${virtualId}`

  return {
    name: "xlg-component-style-virtual-module",
    resolveId(id) {
      if (id === virtualId) {
        return resolvedVirtualId
      }

      return null
    },
    load(id) {
      if (id !== resolvedVirtualId) {
        return null
      }

      return components
        .filter(component => component.styleFile)
        .map(component => `import ${JSON.stringify(component.styleFile)}`)
        .join("\n")
    }
  }
}

function emitLibraryCssAssets(components: ComponentEntry[]): Plugin {
  return {
    name: "xlg-emit-library-css-assets",
    generateBundle(_options, bundle) {
      for (const [fileName, file] of Object.entries(bundle)) {
        if (file.type === "asset" && fileName.endsWith(".css")) {
          delete bundle[fileName]
        }
      }

      const sharedStyleFile = resolve(styleDir, "index.scss")
      let sharedCss = ""

      if (existsSync(sharedStyleFile)) {
        sharedCss = compileScss(sharedStyleFile)
      }

      const componentCssMap = new Map<string, string>()

      for (const component of components) {
        const css = component.styleFile ? compileScss(component.styleFile) : ""
        componentCssMap.set(component.name, css)

        this.emitFile({
          type: "asset",
          fileName: `components/${component.name}/index.css`,
          source: css
        })
      }

      const aggregateCss = [sharedCss, ...componentCssMap.values()].filter(Boolean).join("\n")

      this.emitFile({
        type: "asset",
        fileName: "style/index.css",
        source: aggregateCss
      })
    }
  }
}

export default defineConfig({
  plugins: [
    vue(),
    componentStyleVirtualModule(componentEntries),
    emitLibraryCssAssets(componentEntries),
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
      entry: createLibraryEntries(),
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

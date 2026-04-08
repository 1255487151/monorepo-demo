import { existsSync } from "fs"
import { resolve } from "path"
import type { Plugin } from "vite"
import { styleDir } from "./paths"
import { compileScss } from "./scss"
import type { ComponentEntry } from "./types"

export function emitLibraryCssAssets(components: ComponentEntry[]): Plugin {
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

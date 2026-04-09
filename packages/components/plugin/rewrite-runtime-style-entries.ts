import type { Plugin } from "vite"
import { componentDirToExportName, getAllElementPlusStyleImports } from "../src/utils"
import type { ComponentEntry } from "./types"

export function rewriteRuntimeStyleEntries(componentEntries: ComponentEntry[]): Plugin {
  return {
    name: "xlg-rewrite-runtime-style-entries",
    generateBundle(_options, bundle) {
      const componentExportLines = componentEntries.map(component => {
        const exportName = componentDirToExportName(component.name)
        return `export { default as ${exportName} } from ${JSON.stringify(`./${component.name}/index.mjs`)};`
      })

      const componentsIndexEntry = bundle["components/index.mjs"]

      if (componentsIndexEntry?.type === "chunk") {
        componentsIndexEntry.code = `${componentExportLines.join("\n")}\n`
      }

      const styleEntry = bundle["style/index.mjs"]

      if (styleEntry?.type === "chunk") {
        const imports = ["./index.css", ...getAllElementPlusStyleImports()]
        styleEntry.code = `${imports.map(importPath => `import ${JSON.stringify(importPath)};`).join("\n")}\n\nexport {};\n`
      }
    }
  }
}

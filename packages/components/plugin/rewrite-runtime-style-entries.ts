import type { Plugin } from "vite"
import {
  componentDirToExportName,
  getAllElementPlusStyleImports,
  getElementPlusStyleImports
} from "../src/utils"
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

      for (const component of componentEntries) {
        const componentEntry = bundle[`components/${component.name}/index.mjs`]

        if (componentEntry?.type !== "chunk") {
          continue
        }

        const imports = ["./index.css", ...getElementPlusStyleImports(component.name)]

        componentEntry.code = `${imports.map(importPath => `import ${JSON.stringify(importPath)};`).join("\n")}\n\n${componentEntry.code}`
      }

      const styleEntry = bundle["style/index.mjs"]

      if (styleEntry?.type === "chunk") {
        const imports = ["./index.css", ...getAllElementPlusStyleImports()]
        styleEntry.code = `${imports.map(importPath => `import ${JSON.stringify(importPath)};`).join("\n")}\n\nexport {};\n`
      }

      const indexEntry = bundle["index.mjs"]

      if (indexEntry?.type === "chunk") {
        indexEntry.code = `import "./style/index.mjs";\n${indexEntry.code}`
      }
    }
  }
}

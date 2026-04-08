import { componentDirToExportName } from "./component-name"

export const componentElementPlusStyleDeps = {
  "xlg-select": ["select", "option"],
  "xlg-table": ["table", "table-column", "pagination", "loading"]
} as const satisfies Record<string, readonly string[]>

export { componentDirToExportName }

export function getElementPlusStyleImports(componentDir: string) {
  return [
    ...new Set(
      (
        componentElementPlusStyleDeps[componentDir as keyof typeof componentElementPlusStyleDeps] ??
        []
      ).map(styleName => `element-plus/es/components/${styleName}/style/index`)
    )
  ]
}

export function getComponentStyleSideEffects(
  componentDir: string,
  libraryName = "@smallbrother/components"
) {
  return [
    ...new Set([
      `${libraryName}/components/${componentDir}/index.css`,
      ...getElementPlusStyleImports(componentDir)
    ])
  ]
}

export function getAllElementPlusStyleImports() {
  return [
    ...new Set(
      Object.keys(componentElementPlusStyleDeps).flatMap(componentDir =>
        getElementPlusStyleImports(componentDir)
      )
    )
  ]
}

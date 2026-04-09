export const componentElementPlusStyleDeps = {
  "xlg-select": ["select", "option"],
  "xlg-table": ["table", "table-column", "pagination", "loading"]
} as const satisfies Record<string, readonly string[]>

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

/**
 * Return the full style side effects for global installation.
 * Includes the library CSS entry and all Element Plus styles used by the library.
 */
export function getLibraryStyleSideEffects(libraryName = "@smallbrother/components") {
  return [...new Set([`${libraryName}/style.css`, ...getAllElementPlusStyleImports()])]
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

import { getComponentStyleSideEffects } from "../style-deps"

export function resolveComponents(prefix = "Xlg", libraryName = "@smallbrother/components") {
  return (name: string) => {
    if (!name.startsWith(prefix)) return

    const componentDir = name
      .replace(/^[A-Z]/, c => c.toLowerCase())
      .replace(/[A-Z]/g, c => `-${c.toLowerCase()}`)

    return {
      name,
      from: `${libraryName}/components`,
      sideEffects: getComponentStyleSideEffects(componentDir, libraryName)
    }
  }
}

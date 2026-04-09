import { toComponentTagName } from "./component-name"
import { getComponentStyleSideEffects } from "./style-deps"

export function resolveComponents(prefix = "Xlg", libraryName = "@smallbrother/components") {
  return (name: string) => {
    if (!name.startsWith(prefix)) return

    const componentDir = toComponentTagName(name)

    return {
      name,
      from: `${libraryName}/components`,
      sideEffects: getComponentStyleSideEffects(componentDir, libraryName)
    }
  }
}

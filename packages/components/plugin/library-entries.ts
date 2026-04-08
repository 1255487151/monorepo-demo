import { resolve } from "path"
import { componentsDir, srcDir, styleDir } from "./paths"
import type { ComponentEntry } from "./types"

export function createLibraryEntries(componentEntries: ComponentEntry[]) {
  const entries: Record<string, string> = {
    index: resolve(srcDir, "index.ts"),
    "components/index": resolve(componentsDir, "index.ts"),
    "utils/index": resolve(srcDir, "utils/index.ts"),
    "utils/resolver": resolve(srcDir, "utils/resolver.ts"),
    "style/index": resolve(styleDir, "index.ts")
  }

  for (const component of componentEntries) {
    entries[`components/${component.name}/index`] = component.entryFile
  }

  return entries
}

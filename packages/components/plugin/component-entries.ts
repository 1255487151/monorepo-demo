import { existsSync, readdirSync } from "fs"
import { resolve } from "path"
import { componentsDir } from "./paths"
import type { ComponentEntry } from "./types"

export function getComponentEntries() {
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

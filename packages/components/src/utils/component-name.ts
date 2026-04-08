export function toComponentTagName(name: string) {
  return name.replace(/^[A-Z]/, c => c.toLowerCase()).replace(/[A-Z]/g, c => `-${c.toLowerCase()}`)
}

export function componentDirToExportName(componentDir: string) {
  return componentDir
    .split("-")
    .filter(Boolean)
    .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join("")
}

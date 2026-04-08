export function resolveComponents(prefix = "Xlg", libraryName = "@smallbrother/components") {
  return (name: string) => {
    if (!name.startsWith(prefix)) return

    return {
      name,
      from: `${libraryName}/components`
    }
  }
}

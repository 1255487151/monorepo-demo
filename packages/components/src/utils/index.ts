export const resolveComponents = (componentName: string) => {
  if (componentName.startsWith("xlg")) {
    return {
      name: componentName,
      from: "@smallbrother/components",
      directory: "src/components"
    }
  }
  return
}

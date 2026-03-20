export const resolveComponents = (componentName: string) => {
  if (componentName.startsWith("xlg")) {
    return {
      name: componentName,
      from: "@smallbrother/components"
      // directory: "src/components"
    }
  }
  return
}

// function createXlgResolver(prefix = "Xlg", libraryName = "@xlg/components"): ComponentResolver {
//   return (name: string) => {
//     // 1. 严格匹配：只处理指定前缀的组件
//     if (!name.startsWith(prefix)) return

//     // 2. 大驼峰转横线命名：XlgSelect → xlg-select
//     const componentDir = name
//       .replace(/^[A-Z]/, c => c.toLowerCase())
//       .replace(/[A-Z]/g, c => `-${c.toLowerCase()}`)

//     // 3. 组件路径（严格对应目录结构）
//     const path = `${componentDir}/index`

//     return {
//       name: name, // 组件名不变
//       from: `${libraryName}/${path}`, // 精确导入路径
//       sideEffects: [`${libraryName}/${componentDir}/index.css`] // 自动引入样式（如有）
//     }
//   }
// }

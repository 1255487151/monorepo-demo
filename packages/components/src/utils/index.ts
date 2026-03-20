export function resolveComponents(prefix = "xlg", libraryName = "@smallbrother/components") {
  return (name: string) => {
    // 1. 严格匹配：只处理指定前缀的组件
    if (!name.startsWith(prefix)) return

    // 2. 大驼峰转横线命名：XlgSelect → xlg-select
    const componentDir = name
      .replace(/^[A-Z]/, c => c.toLowerCase())
      .replace(/[A-Z]/g, c => `-${c.toLowerCase()}`)

    return {
      name: name, // 组件名不变
      from: `${libraryName}/components/${componentDir}`, // 精确导入路径
      sideEffects: [`${libraryName}/components/${componentDir}/index.css`] // 自动引入样式（如有）
    }
  }
}

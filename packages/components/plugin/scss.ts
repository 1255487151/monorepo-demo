import { compile } from "sass"
import { srcDir } from "./paths"

export function compileScss(filePath: string) {
  return compile(filePath, {
    style: "compressed",
    loadPaths: [srcDir]
  }).css
}

import { execSync } from "child_process"
import { existsSync, readdirSync, readFileSync, writeFileSync } from "fs"
import { dirname, resolve } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
export const ROOT_DIR = resolve(__dirname, "..")

// ==================== 类型定义 ====================

export interface PackageJson {
  name: string
  version: string
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
  private?: boolean
}

export type VersionType = "patch" | "minor" | "major" | "prerelease"

export interface ParsedVersion {
  major: number
  minor: number
  patch: number
  prerelease?: string
}

export interface PackageInfo {
  path: string
  packageJson: PackageJson
}

// ==================== 日志工具 ====================

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  red: "\x1b[31m",
  cyan: "\x1b[36m"
} as const

export type ColorType = keyof typeof colors

/**
 * 带颜色的日志输出
 */
export function log(message: string, color: ColorType = "reset"): void {
  process.stdout.write(`${colors[color]}${message}${colors.reset}\n`)
}

// ==================== 命令执行 ====================

/**
 * 执行 shell 命令
 * @param command 命令字符串
 * @param silent 是否静默执行
 * @param cwd 工作目录，默认为项目根目录
 */
export function execCommand(command: string, silent = false, cwd: string = ROOT_DIR): string {
  try {
    const result = execSync(command, {
      cwd,
      encoding: "utf-8",
      stdio: silent ? "pipe" : "inherit"
    })
    log(`❌ result结果: ${result}`, "yellow")
    return result
  } catch (error) {
    if (!silent) {
      log(`❌ 命令执行失败: ${command}`, "red")
    }
    throw error
  }
}

// ==================== 版本管理 ====================

/**
 * 解析版本号
 * @example parseVersion("1.2.3") => { major: 1, minor: 2, patch: 3 }
 * @example parseVersion("1.2.3-beta.0") => { major: 1, minor: 2, patch: 3, prerelease: "beta.0" }
 */
export function parseVersion(version: string): ParsedVersion {
  const match = version.match(/^(\d+)\.(\d+)\.(\d+)(?:-(.+))?$/)
  if (!match || !match[1] || !match[2] || !match[3]) {
    throw new Error(`无效的版本号格式: ${version}`)
  }
  const result: ParsedVersion = {
    major: parseInt(match[1], 10),
    minor: parseInt(match[2], 10),
    patch: parseInt(match[3], 10)
  }
  if (match[4]) {
    result.prerelease = match[4]
  }
  return result
}

/**
 * 递增版本号
 * @param currentVersion 当前版本
 * @param type 版本类型
 * @param prereleaseId 预发布标识
 */
export function incrementVersion(
  currentVersion: string,
  type: VersionType,
  prereleaseId?: string
): string {
  const parsed = parseVersion(currentVersion)

  switch (type) {
    case "major":
      return `${parsed.major + 1}.0.0`
    case "minor":
      return `${parsed.major}.${parsed.minor + 1}.0`
    case "patch":
      if (parsed.prerelease) {
        return `${parsed.major}.${parsed.minor}.${parsed.patch}`
      }
      return `${parsed.major}.${parsed.minor}.${parsed.patch + 1}`
    case "prerelease": {
      const prereleaseSuffix = prereleaseId || "beta"
      if (parsed.prerelease) {
        const prereleaseMatch = parsed.prerelease.match(/^(.+)\.(\d+)$/)
        if (prereleaseMatch && prereleaseMatch[1] && prereleaseMatch[2]) {
          return `${parsed.major}.${parsed.minor}.${parsed.patch}-${prereleaseMatch[1]}.${parseInt(prereleaseMatch[2], 10) + 1}`
        }
        return `${parsed.major}.${parsed.minor}.${parsed.patch}-${parsed.prerelease}.1`
      }
      return `${parsed.major}.${parsed.minor}.${parsed.patch + 1}-${prereleaseSuffix}.0`
    }
    default:
      throw new Error(`未知的版本类型: ${type}`)
  }
}

// ==================== Package.json 操作 ====================

/**
 * 读取 package.json 文件
 */
export function readPackageJson(packagePath: string): PackageJson {
  const content = readFileSync(packagePath, "utf-8")
  return JSON.parse(content) as PackageJson
}

/**
 * 写入 package.json 文件
 */
export function writePackageJson(packagePath: string, pkg: PackageJson): void {
  writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + "\n", "utf-8")
}

// ==================== Monorepo 工具 ====================

/**
 * 获取所有包信息
 */
export function getAllPackages(): Map<string, PackageInfo> {
  const packages = new Map<string, PackageInfo>()

  // 读取根目录 package.json
  const rootPkgPath = resolve(ROOT_DIR, "package.json")
  const rootPkg = readPackageJson(rootPkgPath)
  packages.set(rootPkg.name, { path: rootPkgPath, packageJson: rootPkg })

  // 读取工作区包
  try {
    const workspaceInfo = execCommand("pnpm list -r --depth -1 --json", true)
    console.log(workspaceInfo, "workspaceInfo")

    const workspaces = JSON.parse(workspaceInfo) as Array<{ path: string }>

    for (const workspace of workspaces) {
      const pkgPath = resolve(workspace.path, "package.json")
      const pkg = readPackageJson(pkgPath)
      packages.set(pkg.name, { path: pkgPath, packageJson: pkg })
    }
  } catch {
    log("⚠️  无法读取工作区信息，使用默认扫描", "yellow")
    // 如果 pnpm list 失败，手动扫描 packages 目录
    const packagesDir = resolve(ROOT_DIR, "packages")
    if (existsSync(packagesDir)) {
      const dirs = readdirSync(packagesDir)
      for (const dir of dirs) {
        const pkgPath = resolve(packagesDir, dir, "package.json")
        try {
          const pkg = readPackageJson(pkgPath)
          packages.set(pkg.name, { path: pkgPath, packageJson: pkg })
        } catch {
          // 忽略无法读取的包
        }
      }
    }
  }

  console.log(packages, "packages")
  log(`📦 找到 ${packages.size} 个包`, "blue")
  return packages
}

/**
 * 获取包的 monorepo 内部依赖
 * @param pkg 包信息
 * @param scope 包作用域，默认为 @smallbrother/
 */
export function getPackageDependencies(pkg: PackageJson, scope = "@smallbrother/"): string[] {
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ]
  return allDeps.filter(dep => dep.startsWith(scope))
}

/**
 * 拓扑排序包，确保依赖包在前
 */
export function topologicalSort(packages: Map<string, PackageInfo>): string[] {
  const sorted: string[] = []
  const visited = new Set<string>()
  const visiting = new Set<string>()

  function visit(pkgName: string): void {
    if (visited.has(pkgName)) return
    if (visiting.has(pkgName)) {
      throw new Error(`检测到循环依赖: ${pkgName}`)
    }

    visiting.add(pkgName)
    const pkgInfo = packages.get(pkgName)
    if (pkgInfo) {
      const deps = getPackageDependencies(pkgInfo.packageJson)
      for (const dep of deps) {
        if (packages.has(dep)) {
          visit(dep)
        }
      }
    }
    visiting.delete(pkgName)
    visited.add(pkgName)
    sorted.push(pkgName)
    log(`📦 ${pkgName} - pkgName`, "blue")
    log(`📦 ${visited} - visited`, "blue")
  }

  for (const pkgName of packages.keys()) {
    visit(pkgName)
  }

  return sorted
}

/**
 * 更新包的依赖版本
 */
export function updateDependencies(
  pkg: PackageJson,
  versionUpdates: Map<string, string>
): PackageJson {
  const updated = { ...pkg }

  const updateDeps = (
    deps: Record<string, string> | undefined
  ): Record<string, string> | undefined => {
    if (!deps) return undefined
    const result: Record<string, string> = {}
    for (const [name, version] of Object.entries(deps)) {
      if (versionUpdates.has(name)) {
        const newVersion = versionUpdates.get(name)
        result[name] = `^${newVersion}`
        log(`    更新依赖 ${name}: ${version} -> ${result[name]}`, "cyan")
      } else {
        result[name] = version
      }
    }
    return result
  }

  const deps = updateDeps(updated.dependencies)
  const peerDeps = updateDeps(updated.peerDependencies)

  if (deps) {
    updated.dependencies = deps
  }
  if (peerDeps) {
    updated.peerDependencies = peerDeps
  }

  return updated
}

// ==================== Git 工具 ====================

/**
 * 检查 Git 工作区状态
 * @returns 是否干净
 */
export function checkGitStatus(): boolean {
  try {
    const status = execCommand("git status --porcelain", true)
    if (status) {
      log("❌ 工作区有未提交的更改，请先提交或暂存", "red")
      log("\n未提交的文件:", "yellow")
      process.stdout.write(`${status}\n`)
      return false
    }
    return true
  } catch {
    log("⚠️  无法检查 Git 状态", "yellow")
    return true
  }
}

/**
 * 创建 Git 标签
 */
export function createGitTag(tagName: string): void {
  try {
    execCommand(`git tag -a ${tagName} -m "Release ${tagName}"`)
    log(`✅ 创建标签: ${tagName}`, "green")
  } catch {
    log(`⚠️  标签 ${tagName} 可能已存在`, "yellow")
  }
}

/**
 * Git 提交
 */
export function gitCommit(message: string): void {
  execCommand("git add .")
  execCommand(`git commit -m "${message}"`)
  log(`✅ 提交: ${message}`, "green")
}

/**
 * 推送到远程仓库
 */
export function gitPush(withTags = false): void {
  execCommand("git push")
  if (withTags) {
    execCommand("git push --tags")
  }
  log("✅ 推送完成", "green")
}

// ==================== NPM 工具 ====================

/**
 * 发布包到 npm
 */
export function publishPackage(pkgPath: string, pkgName: string): void {
  const pkgDir = dirname(pkgPath)
  log(`\n📦 发布 ${pkgName}...`, "blue")

  try {
    execCommand(`cd "${pkgDir}" && pnpm publish --access public`)
    log(`✅ ${pkgName} 发布成功`, "green")
  } catch (error) {
    log(`❌ ${pkgName} 发布失败`, "red")
    throw error
  }
}

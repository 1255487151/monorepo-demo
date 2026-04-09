import { execSync } from "child_process"
import { existsSync, readdirSync, readFileSync, writeFileSync } from "fs"
import { dirname, resolve } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
export const ROOT_DIR = resolve(__dirname, "..")

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

export function log(message: string, color: ColorType = "reset"): void {
  process.stdout.write(`${colors[color]}${message}${colors.reset}\n`)
}

export function execCommand(command: string, silent = false, cwd: string = ROOT_DIR): string {
  try {
    return execSync(command, {
      cwd,
      encoding: "utf-8",
      stdio: silent ? "pipe" : "inherit"
    })
  } catch (error) {
    if (!silent) {
      log(`Command failed: ${command}`, "red")
    }
    throw error
  }
}

export function parseVersion(version: string): ParsedVersion {
  const match = version.match(/^(\d+)\.(\d+)\.(\d+)(?:-(.+))?$/)
  if (!match || !match[1] || !match[2] || !match[3]) {
    throw new Error(`Invalid version: ${version}`)
  }

  const parsed: ParsedVersion = {
    major: Number.parseInt(match[1], 10),
    minor: Number.parseInt(match[2], 10),
    patch: Number.parseInt(match[3], 10)
  }

  if (match[4]) {
    parsed.prerelease = match[4]
  }

  return parsed
}

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
      return parsed.prerelease
        ? `${parsed.major}.${parsed.minor}.${parsed.patch}`
        : `${parsed.major}.${parsed.minor}.${parsed.patch + 1}`
    case "prerelease": {
      const id = prereleaseId || "beta"
      if (!parsed.prerelease) {
        return `${parsed.major}.${parsed.minor}.${parsed.patch + 1}-${id}.0`
      }

      const prereleaseMatch = parsed.prerelease.match(/^(.+)\.(\d+)$/)
      if (prereleaseMatch && prereleaseMatch[1] && prereleaseMatch[2]) {
        return `${parsed.major}.${parsed.minor}.${parsed.patch}-${prereleaseMatch[1]}.${Number.parseInt(prereleaseMatch[2], 10) + 1}`
      }

      return `${parsed.major}.${parsed.minor}.${parsed.patch}-${parsed.prerelease}.1`
    }
    default:
      throw new Error(`Unknown version type: ${type}`)
  }
}

export function readPackageJson(packagePath: string): PackageJson {
  return JSON.parse(readFileSync(packagePath, "utf-8")) as PackageJson
}

export function writePackageJson(packagePath: string, pkg: PackageJson): void {
  writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + "\n", "utf-8")
}

export function getAllPackages(): Map<string, PackageInfo> {
  const packages = new Map<string, PackageInfo>()
  const packagesDir = resolve(ROOT_DIR, "packages")

  if (!existsSync(packagesDir)) {
    return packages
  }

  for (const dir of readdirSync(packagesDir)) {
    const packagePath = resolve(packagesDir, dir, "package.json")
    if (!existsSync(packagePath)) {
      continue
    }

    const packageJson = readPackageJson(packagePath)
    packages.set(packageJson.name, {
      path: packagePath,
      packageJson
    })
  }

  return packages
}

export function getPackageDependencies(pkg: PackageJson, scope = "@smallbrother/"): string[] {
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ]

  return allDeps.filter(dep => dep.startsWith(scope))
}

export function topologicalSort(packages: Map<string, PackageInfo>): string[] {
  const sorted: string[] = []
  const visited = new Set<string>()
  const visiting = new Set<string>()

  const visit = (pkgName: string) => {
    if (visited.has(pkgName)) {
      return
    }

    if (visiting.has(pkgName)) {
      throw new Error(`Circular dependency detected: ${pkgName}`)
    }

    visiting.add(pkgName)

    const pkgInfo = packages.get(pkgName)
    if (pkgInfo) {
      for (const dep of getPackageDependencies(pkgInfo.packageJson)) {
        if (packages.has(dep)) {
          visit(dep)
        }
      }
    }

    visiting.delete(pkgName)
    visited.add(pkgName)
    sorted.push(pkgName)
  }

  for (const pkgName of packages.keys()) {
    visit(pkgName)
  }

  return sorted
}

export function updateDependencies(
  pkg: PackageJson,
  versionUpdates: Map<string, string>
): PackageJson {
  const updateDepMap = (deps: Record<string, string> | undefined) => {
    if (!deps) {
      return undefined
    }

    const result: Record<string, string> = {}
    for (const [name, version] of Object.entries(deps)) {
      result[name] = versionUpdates.has(name) ? `^${versionUpdates.get(name)}` : version
    }

    return result
  }

  const updatedPkg: PackageJson = { ...pkg }
  const dependencies = updateDepMap(pkg.dependencies)
  const peerDependencies = updateDepMap(pkg.peerDependencies)

  if (dependencies) {
    updatedPkg.dependencies = dependencies
  } else {
    delete updatedPkg.dependencies
  }

  if (peerDependencies) {
    updatedPkg.peerDependencies = peerDependencies
  } else {
    delete updatedPkg.peerDependencies
  }

  return updatedPkg
}

export function checkGitStatus(): boolean {
  try {
    const status = execCommand("git status --porcelain", true).trim()
    if (!status) {
      return true
    }

    log("Working tree is not clean. Please commit or stash your changes first.", "red")
    process.stdout.write(`${status}\n`)
    return false
  } catch {
    log("Unable to inspect git status. Skip clean check.", "yellow")
    return true
  }
}

export function createGitTag(tagName: string): void {
  try {
    execCommand(`git tag -a ${tagName} -m "Release ${tagName}"`)
    log(`Created tag: ${tagName}`, "green")
  } catch {
    log(`Tag already exists or could not be created: ${tagName}`, "yellow")
  }
}

export function gitCommit(message: string): void {
  execCommand("git add .")
  execCommand(`git commit -m "${message}"`)
  log(`Created commit: ${message}`, "green")
}

export function gitPush(withTags = false): void {
  execCommand("git push")
  if (withTags) {
    execCommand("git push --tags")
  }
  log("Pushed changes to remote.", "green")
}

export function publishPackage(pkgPath: string, pkgName: string): void {
  const pkgDir = dirname(pkgPath)
  log(`Publishing ${pkgName}...`, "blue")
  execCommand("pnpm publish --access public", false, pkgDir)
  log(`Published ${pkgName}`, "green")
}

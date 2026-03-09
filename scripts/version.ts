#!/usr/bin/env node

import {
  type PackageInfo,
  type VersionType,
  checkGitStatus,
  createGitTag,
  getAllPackages,
  getPackageDependencies,
  gitCommit,
  gitPush,
  incrementVersion,
  log,
  publishPackage,
  topologicalSort,
  updateDependencies,
  writePackageJson
} from "./utils"

// ==================== 类型定义 ====================

interface CliOptions {
  package?: string
  type: VersionType
  message?: string
  push: boolean
  publish: boolean
  tag: boolean
  prereleaseId?: string
}

// ==================== 命令行参数解析 ====================

function parseArgs(): CliOptions {
  const args = process.argv.slice(2)
  const options: CliOptions = {
    type: "patch",
    push: false,
    publish: false,
    tag: true
  }

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (!arg) continue

    switch (arg) {
      case "-p":
      case "--package": {
        const pkg = args[++i]
        if (pkg) options.package = pkg
        break
      }
      case "-t":
      case "--type": {
        const typeVal = args[++i]
        if (typeVal) options.type = typeVal as VersionType
        break
      }
      case "-m":
      case "--message": {
        const msg = args[++i]
        if (msg) options.message = msg
        break
      }
      case "--push":
        options.push = true
        break
      case "--publish":
        options.publish = true
        break
      case "--no-tag":
        options.tag = false
        break
      case "--prerelease-id": {
        const id = args[++i]
        if (id) options.prereleaseId = id
        break
      }
      case "-h":
      case "--help":
        printHelp()
        process.exit(0)
      default:
        if (arg.startsWith("-")) {
          log(`❌ 未知选项: ${arg}`, "red")
          printHelp()
          process.exit(1)
        }
    }
  }

  return options
}

function printHelp(): void {
  const helpText = `
\x1b[1m版本管理脚本\x1b[0m

用法: pnpm version [选项]

选项:
  -p, --package <name>      指定要更新的包名（默认更新所有包）
  -t, --type <type>         版本类型: patch | minor | major | prerelease (默认: patch)
  -m, --message <msg>       自定义提交消息
  --push                    推送到远程仓库
  --publish                 发布到 npm
  --no-tag                  不创建 Git 标签
  --prerelease-id <id>      预发布标识 (如: beta, alpha, rc)
  -h, --help                显示帮助信息

示例:
  # 更新所有包的 patch 版本
  pnpm version

  # 更新 components 包的 minor 版本
  pnpm version -p @small-brother/components -t minor

  # 更新 utils 包并发布
  pnpm version -p @small-brother/utils --publish

  # 创建预发布版本
  pnpm version -t prerelease --prerelease-id beta

  # 更新并推送到远程
  pnpm version --push
`
  process.stdout.write(helpText)
}

// ==================== 核心逻辑 ====================

function getPackageInfo(packages: Map<string, PackageInfo>, pkgName: string): PackageInfo {
  const info = packages.get(pkgName)
  if (!info) {
    throw new Error(`未找到包: ${pkgName}`)
  }
  return info
}

function collectPackagesToUpdate(
  options: CliOptions,
  packages: Map<string, PackageInfo>,
  sortedPackages: string[]
): string[] {
  const packagesToUpdate: string[] = []

  if (options.package) {
    if (!packages.has(options.package)) {
      log(`❌ 未找到包: ${options.package}`, "red")
      process.exit(1)
    }
    packagesToUpdate.push(options.package)

    // 添加依赖此包的其他包
    for (const [name, info] of packages) {
      const deps = getPackageDependencies(info.packageJson)
      if (deps.includes(options.package) && !packagesToUpdate.includes(name)) {
        packagesToUpdate.push(name)
      }
    }
  } else {
    for (const name of sortedPackages) {
      const info = packages.get(name)
      if (info && !info.packageJson.private) {
        packagesToUpdate.push(name)
      }
    }
  }

  return packagesToUpdate
}

function updatePackageVersions(
  packagesToUpdate: string[],
  packages: Map<string, PackageInfo>,
  options: CliOptions
): Map<string, string> {
  const versionUpdates = new Map<string, string>()

  for (const pkgName of packagesToUpdate) {
    const info = getPackageInfo(packages, pkgName)
    const currentVersion = info.packageJson.version
    const newVersion = incrementVersion(currentVersion, options.type, options.prereleaseId)

    versionUpdates.set(pkgName, newVersion)
    log(`📌 ${pkgName}: ${currentVersion} -> ${newVersion}`, "green")
  }

  return versionUpdates
}

function writePackageJsonFiles(
  packagesToUpdate: string[],
  packages: Map<string, PackageInfo>,
  versionUpdates: Map<string, string>
): void {
  log("\n📝 更新 package.json 文件...", "blue")

  for (const pkgName of packagesToUpdate) {
    const info = getPackageInfo(packages, pkgName)
    const newVersion = versionUpdates.get(pkgName)

    if (!newVersion) continue

    const updatedPkg = updateDependencies(
      { ...info.packageJson, version: newVersion },
      versionUpdates
    )

    writePackageJson(info.path, updatedPkg)
    log(`  ✅ 已更新 ${pkgName}`, "green")
  }
}

function handleGitOperations(
  versionUpdates: Map<string, string>,
  packages: Map<string, PackageInfo>,
  options: CliOptions
): void {
  const versionList = Array.from(versionUpdates.entries())
    .map(([name, version]) => `${name}@${version}`)
    .join(", ")

  const commitMessage = options.message || `chore: release ${versionList}`

  log("\n🔧 执行 Git 操作...", "blue")
  gitCommit(commitMessage)

  // 创建标签
  if (options.tag) {
    for (const [pkgName, version] of versionUpdates) {
      const info = packages.get(pkgName)
      if (info && !info.packageJson.private) {
        createGitTag(`${pkgName}@${version}`)
      }
    }
  }

  // 推送到远程
  if (options.push) {
    log("\n📤 推送到远程仓库...", "blue")
    gitPush(options.tag)
  }
}

function handlePublish(packagesToUpdate: string[], packages: Map<string, PackageInfo>): void {
  log("\n📦 发布到 npm...", "blue")

  for (const pkgName of packagesToUpdate) {
    const info = packages.get(pkgName)
    if (info && !info.packageJson.private) {
      publishPackage(info.path, pkgName)
    }
  }
}

function printSummary(versionUpdates: Map<string, string>): void {
  log("\n✨ 版本更新完成！\n", "bright")
  log("版本摘要:", "cyan")
  for (const [name, version] of versionUpdates) {
    process.stdout.write(`  ${name}: ${version}\n`)
  }
}

// ==================== 主函数 ====================

function main(): void {
  const options = parseArgs()

  log("\n🚀 开始版本更新...\n", "bright")

  // 检查 Git 状态
  if (!checkGitStatus()) {
    process.exit(1)
  }

  // 获取所有包
  const packages = getAllPackages()
  log(`📦 找到 ${packages.size} 个包`, "blue")

  // 拓扑排序
  const sortedPackages = topologicalSort(packages)

  // 收集需要更新的包
  const packagesToUpdate = collectPackagesToUpdate(options, packages, sortedPackages)
  log(`📝 将更新以下包: ${packagesToUpdate.join(", ")}\n`, "cyan")

  // 更新版本号
  const versionUpdates = updatePackageVersions(packagesToUpdate, packages, options)

  // 写入 package.json
  writePackageJsonFiles(packagesToUpdate, packages, versionUpdates)

  // Git 操作
  handleGitOperations(versionUpdates, packages, options)

  // 发布到 npm
  if (options.publish) {
    handlePublish(packagesToUpdate, packages)
  }

  // 打印摘要
  printSummary(versionUpdates)
}

main()

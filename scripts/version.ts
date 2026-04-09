#!/usr/bin/env node

import {
  type PackageInfo,
  type VersionType,
  checkGitStatus,
  createGitTag,
  getAllPackages,
  gitCommit,
  gitPush,
  incrementVersion,
  log,
  publishPackage,
  topologicalSort,
  updateDependencies,
  writePackageJson
} from "./utils"

interface CliOptions {
  package?: string
  type: VersionType
  message?: string
  push: boolean
  publish: boolean
  tag: boolean
  prereleaseId?: string
}

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
    if (!arg) {
      continue
    }

    switch (arg) {
      case "-p":
      case "--package": {
        const pkg = args[++i]
        if (pkg) {
          options.package = pkg
        }
        break
      }
      case "-t":
      case "--type": {
        const type = args[++i]
        if (type) {
          options.type = type as VersionType
        }
        break
      }
      case "-m":
      case "--message": {
        const message = args[++i]
        if (message) {
          options.message = message
        }
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
        if (id) {
          options.prereleaseId = id
        }
        break
      }
      case "-h":
      case "--help":
        printHelp()
        process.exit(0)
      default:
        if (arg.startsWith("-")) {
          log(`Unknown option: ${arg}`, "red")
          printHelp()
          process.exit(1)
        }
    }
  }

  return options
}

function printHelp(): void {
  const helpText = `
\x1b[1mVersion Management Script\x1b[0m

Usage: pnpm version [options]

Options:
  -p, --package <name>      Target a single publishable package
  -t, --type <type>         patch | minor | major | prerelease (default: patch)
  -m, --message <msg>       Custom commit message
  --push                    Push commits and tags to remote
  --publish                 Publish updated packages to npm
  --no-tag                  Skip creating Git tags
  --prerelease-id <id>      Prerelease identifier, for example beta or rc
  -h, --help                Show help

Examples:
  pnpm version
  pnpm version -p @smallbrother/components -t minor
  pnpm version -p @smallbrother/utils --publish
  pnpm version -t prerelease --prerelease-id beta
  pnpm version --push
`

  process.stdout.write(helpText)
}

function getPackageInfo(packages: Map<string, PackageInfo>, pkgName: string): PackageInfo {
  const info = packages.get(pkgName)
  if (!info) {
    throw new Error(`Package not found: ${pkgName}`)
  }

  return info
}

function collectPackagesToUpdate(
  options: CliOptions,
  packages: Map<string, PackageInfo>,
  sortedPackages: string[]
): string[] {
  if (options.package) {
    const packageInfo = packages.get(options.package)
    if (!packageInfo) {
      log(`Package not found: ${options.package}`, "red")
      process.exit(1)
    }

    if (packageInfo.packageJson.private) {
      log(`Private package cannot be versioned for release: ${options.package}`, "red")
      process.exit(1)
    }

    return [options.package]
  }

  return sortedPackages.filter(name => !packages.get(name)?.packageJson.private)
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
    log(`${pkgName}: ${currentVersion} -> ${newVersion}`, "green")
  }

  return versionUpdates
}

function writePackageJsonFiles(
  packagesToUpdate: string[],
  packages: Map<string, PackageInfo>,
  versionUpdates: Map<string, string>
): void {
  log("\nUpdating package.json files...", "blue")

  for (const pkgName of packagesToUpdate) {
    const info = getPackageInfo(packages, pkgName)
    const newVersion = versionUpdates.get(pkgName)
    if (!newVersion) {
      continue
    }

    const updatedPkg = updateDependencies(
      {
        ...info.packageJson,
        version: newVersion
      },
      versionUpdates
    )

    writePackageJson(info.path, updatedPkg)
    log(`  updated ${pkgName}`, "green")
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

  log("\nRunning git operations...", "blue")
  gitCommit(commitMessage)

  if (options.tag) {
    for (const [pkgName, version] of versionUpdates) {
      const info = packages.get(pkgName)
      if (info && !info.packageJson.private) {
        createGitTag(`${pkgName}@${version}`)
      }
    }
  }

  if (options.push) {
    log("\nPushing to remote...", "blue")
    gitPush(options.tag)
  }
}

function handlePublish(packagesToUpdate: string[], packages: Map<string, PackageInfo>): void {
  log("\nPublishing packages...", "blue")

  for (const pkgName of packagesToUpdate) {
    const info = packages.get(pkgName)
    if (info && !info.packageJson.private) {
      publishPackage(info.path, pkgName)
    }
  }
}

function printSummary(versionUpdates: Map<string, string>): void {
  log("\nVersion update completed.\n", "bright")
  log("Summary:", "cyan")

  for (const [name, version] of versionUpdates) {
    process.stdout.write(`  ${name}: ${version}\n`)
  }
}

function main(): void {
  const options = parseArgs()

  log("\nStarting version update...\n", "bright")

  if (!checkGitStatus()) {
    process.exit(1)
  }

  const packages = getAllPackages()
  log(`Found ${packages.size} workspace packages`, "blue")

  const sortedPackages = topologicalSort(packages)
  const packagesToUpdate = collectPackagesToUpdate(options, packages, sortedPackages)

  if (packagesToUpdate.length === 0) {
    log("No publishable package needs to be updated.", "yellow")
    process.exit(0)
  }

  log(`Target packages: ${packagesToUpdate.join(", ")}\n`, "cyan")

  const versionUpdates = updatePackageVersions(packagesToUpdate, packages, options)
  writePackageJsonFiles(packagesToUpdate, packages, versionUpdates)
  handleGitOperations(versionUpdates, packages, options)

  if (options.publish) {
    handlePublish(packagesToUpdate, packages)
  }

  printSummary(versionUpdates)
}

main()

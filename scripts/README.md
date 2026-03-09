# Scripts 脚本工具

本目录包含项目的自动化脚本工具。

## 目录结构

```
scripts/
├── utils.ts      # 通用工具函数库
├── version.ts    # 版本管理脚本
└── README.md     # 本文档
```

## 版本管理脚本 (version.ts)

### 功能特性

- ✅ 语义化版本控制 (SemVer)
- ✅ 单个包或全部包更新
- ✅ 自动更新依赖包版本
- ✅ Git 提交和标签创建
- ✅ 推送到远程仓库
- ✅ 发布到 npm

### 使用方法

```bash
# 基本用法
pnpm version [选项]

# 快捷发布命令（更新版本 + 发布 + 推送）
pnpm release
```

### 命令选项

| 选项                   | 简写 | 说明                                   | 默认值     |
| ---------------------- | ---- | -------------------------------------- | ---------- |
| `--package <name>`     | `-p` | 指定要更新的包名                       | 更新所有包 |
| `--type <type>`        | `-t` | 版本类型: patch/minor/major/prerelease | patch      |
| `--message <msg>`      | `-m` | 自定义提交消息                         | 自动生成   |
| `--push`               | -    | 推送到远程仓库                         | false      |
| `--publish`            | -    | 发布到 npm                             | false      |
| `--no-tag`             | -    | 不创建 Git 标签                        | 创建标签   |
| `--prerelease-id <id>` | -    | 预发布标识 (beta/alpha/rc)             | beta       |
| `--help`               | `-h` | 显示帮助信息                           | -          |

### 版本类型说明

| 类型         | 示例                 | 说明               |
| ------------ | -------------------- | ------------------ |
| `patch`      | 1.0.0 → 1.0.1        | 修复 bug，向后兼容 |
| `minor`      | 1.0.0 → 1.1.0        | 新功能，向后兼容   |
| `major`      | 1.0.0 → 2.0.0        | 重大变更，不兼容   |
| `prerelease` | 1.0.0 → 1.0.1-beta.0 | 预发布版本         |

### 使用示例

#### 1. 更新所有包

```bash
# 更新所有包的 patch 版本 (1.0.0 → 1.0.1)
pnpm version

# 更新所有包的 minor 版本 (1.0.0 → 1.1.0)
pnpm version -t minor

# 更新所有包的 major 版本 (1.0.0 → 2.0.0)
pnpm version -t major
```

#### 2. 更新单个包

```bash
# 更新 components 包
pnpm version -p @small-brother/components

# 更新 utils 包的 minor 版本
pnpm version -p @small-brother/utils -t minor
```

#### 3. 创建预发布版本

```bash
# 创建 beta 版本 (1.0.0 → 1.0.1-beta.0)
pnpm version -t prerelease

# 创建 alpha 版本
pnpm version -t prerelease --prerelease-id alpha

# 创建 rc 版本
pnpm version -t prerelease --prerelease-id rc

# 递增预发布版本 (1.0.1-beta.0 → 1.0.1-beta.1)
pnpm version -t prerelease
```

#### 4. 发布流程

```bash
# 方式一：分步执行
pnpm version -t patch          # 更新版本
pnpm version --push --publish  # 推送并发布

# 方式二：一键发布
pnpm release  # 等同于 pnpm version --publish --push

# 只发布不推送
pnpm version --publish
```

#### 5. 自定义提交消息

```bash
pnpm version -m "feat: 发布新版本"
```

### 工作流程

脚本执行时会按以下顺序进行：

1. **检查 Git 状态** - 确保工作区干净
2. **扫描包** - 获取所有 monorepo 包信息
3. **拓扑排序** - 按依赖关系排序包
4. **计算新版本** - 根据类型递增版本号
5. **更新 package.json** - 修改版本和依赖
6. **Git 提交** - 创建提交记录
7. **创建标签** - 为每个包创建 Git 标签
8. **推送远程** - 可选推送到远程仓库
9. **发布 npm** - 可选发布到 npm

### 依赖关系处理

脚本会自动处理包之间的依赖关系：

- 如果 `@small-brother/components` 依赖 `@small-brother/utils`
- 更新 `utils` 时，会自动更新 `components` 的依赖版本
- 按拓扑顺序更新，确保依赖包先更新

---

## 工具函数库 (utils.ts)

`utils.ts` 提供了可复用的工具函数，可用于编写其他脚本。

### 导出内容

#### 类型定义

```typescript
// Package.json 类型
interface PackageJson { ... }

// 版本类型
type VersionType = "patch" | "minor" | "major" | "prerelease"

// 解析后的版本
interface ParsedVersion {
  major: number
  minor: number
  patch: number
  prerelease?: string
}

// 包信息
interface PackageInfo {
  path: string
  packageJson: PackageJson
}
```

#### 日志工具

```typescript
// 带颜色的日志输出
function log(message: string, color?: ColorType): void

// 可用颜色: reset, bright, green, yellow, blue, red, cyan
```

#### 命令执行

```typescript
// 执行 shell 命令
function execCommand(command: string, silent?: boolean, cwd?: string): string
```

#### 版本管理

```typescript
// 解析版本号
function parseVersion(version: string): ParsedVersion

// 递增版本号
function incrementVersion(currentVersion: string, type: VersionType, prereleaseId?: string): string
```

#### Package.json 操作

```typescript
// 读取 package.json
function readPackageJson(path: string): PackageJson

// 写入 package.json
function writePackageJson(path: string, pkg: PackageJson): void
```

#### Monorepo 工具

```typescript
// 获取所有包
function getAllPackages(): Map<string, PackageInfo>

// 获取包依赖
function getPackageDependencies(pkg: PackageJson, scope?: string): string[]

// 拓扑排序
function topologicalSort(packages: Map<string, PackageInfo>): string[]

// 更新依赖版本
function updateDependencies(pkg: PackageJson, versionUpdates: Map<string, string>): PackageJson
```

#### Git 工具

```typescript
// 检查 Git 状态
function checkGitStatus(): boolean

// 创建标签
function createGitTag(tagName: string): void

// Git 提交
function gitCommit(message: string): void

// 推送远程
function gitPush(withTags?: boolean): void
```

#### NPM 工具

```typescript
// 发布包
function publishPackage(pkgPath: string, pkgName: string): void
```

### 使用示例

```typescript
import { log, getAllPackages, topologicalSort, incrementVersion, writePackageJson } from "./utils"

// 获取所有包并打印
const packages = getAllPackages()
log(`找到 ${packages.size} 个包`, "blue")

// 拓扑排序
const sorted = topologicalSort(packages)

// 更新版本
const newVersion = incrementVersion("1.0.0", "minor")
console.log(newVersion) // "1.1.0"
```

---

## 扩展开发

### 创建新脚本

1. 在 `scripts/` 目录创建新的 `.ts` 文件
2. 从 `utils.ts` 导入需要的工具函数
3. 在 `package.json` 中添加运行脚本

```typescript
// scripts/my-script.ts
import { log, execCommand, getAllPackages } from "./utils"

export function myFunction() {
  log("执行自定义脚本", "green")
  const packages = getAllPackages()
  // ... 你的逻辑
}

myFunction()
```

```json
// package.json
{
  "scripts": {
    "my-script": "npx tsx scripts/my-script.ts"
  }
}
```

### 最佳实践

1. **代码复用** - 优先使用 `utils.ts` 中的工具函数
2. **错误处理** - 使用 try-catch 捕获异常
3. **日志输出** - 使用 `log()` 函数，提供清晰的输出
4. **类型安全** - 充分利用 TypeScript 类型检查

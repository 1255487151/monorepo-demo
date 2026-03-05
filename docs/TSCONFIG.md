# tsconfig.json 全量配置

```json
{
  // ========== 编译选项 ==========
  "compilerOptions": {
    // ========== 基础配置 ==========
    "extends": "./tsconfig.base.json", // 继承基础配置文件（常用于 monorepo）
    "incremental": true, // 启用增量编译，提高编译速度
    "tsBuildInfoFile": "./.tsbuildinfo", // 增量编译信息文件路径

    // ========== 模块系统 ==========
    "module": "nodenext", // 模块系统：nodenext（Node.js ESM）、commonjs、esnext等
    "moduleResolution": "nodenext", // 模块解析策略：与 module 对应
    "baseUrl": "./", // 基础目录，用于解析非相对模块名称
    "paths": {
      // 路径映射，用于别名
      "@/*": ["src/*"],
      "@components/*": ["packages/components/src/*"]
    },
    "rootDir": "./src", // 指定源文件根目录
    "moduleDetection": "force", // 强制检测模块类型
    "verbatimModuleSyntax": true, // 严格遵循模块语法，避免不必要的类型导入

    // ========== 目标环境 ==========
    "target": "esnext", // 编译目标 ECMAScript 版本：esnext、es2022、es6等
    "lib": ["esnext"], // 包含的库定义文件，如 DOM、ES2015 等
    "types": [], // 要包含的类型声明文件包名
    "typeRoots": ["./node_modules/@types"], // 类型声明文件搜索目录

    // ========== 输出配置 ==========
    "outDir": "./dist", // 输出目录
    "outFile": "./dist/bundle.js", // 将输出合并为单个文件（仅限 amd/system）
    "declaration": true, // 生成 .d.ts 类型声明文件
    "declarationMap": true, // 为声明文件生成 source map
    "sourceMap": true, // 生成 source map 文件
    "declarationDir": "./dist/types", // 声明文件输出目录
    "emitDeclarationOnly": false, // 仅生成声明文件，不生成 JS
    "noEmit": false, // 不生成输出文件（仅进行类型检查）

    // ========== JavaScript 支持 ==========
    "allowJs": true, // 允许编译 JavaScript 文件
    "checkJs": true, // 在 JavaScript 文件中报告错误
    "maxNodeModuleJsDepth": 1, // 检查 node_modules 中 JS 文件的深度

    // ========== 互操作性 ==========
    "esModuleInterop": true, // 启用 ES 模块互操作性
    "allowSyntheticDefaultImports": true, // 允许从没有默认导出的模块进行默认导入
    "resolveJsonModule": true, // 允许导入 JSON 模块

    // ========== 严格类型检查 ==========
    "strict": true, // 启用所有严格类型检查选项
    "noImplicitAny": true, // 禁止隐式 any 类型（包含在 strict 中）
    "strictNullChecks": true, // 启用严格的 null 检查（包含在 strict 中）
    "strictFunctionTypes": true, // 启用严格的函数类型检查（包含在 strict 中）
    "strictBindCallApply": true, // 启用严格的 bind/call/apply 检查（包含在 strict 中）
    "strictPropertyInitialization": true, // 启用严格的属性初始化检查（包含在 strict 中）
    "noImplicitThis": true, // 禁止隐式 any 类型的 this（包含在 strict 中）
    "alwaysStrict": true, // 始终以严格模式解析（包含在 strict 中）

    // ========== 额外严格选项 ==========
    "noUncheckedIndexedAccess": true, // 索引访问时包含 undefined 类型（如 arr[0] 可能是 T | undefined）
    "exactOptionalPropertyTypes": true, // 精确的可选属性类型检查
    "noImplicitReturns": true, // 函数中所有代码路径必须返回值
    "noImplicitOverride": true, // 必须显式使用 override 关键字
    "noUnusedLocals": true, // 检查未使用的局部变量
    "noUnusedParameters": true, // 检查未使用的参数
    "noFallthroughCasesInSwitch": true, // 防止 switch 语句贯穿
    "noPropertyAccessFromIndexSignature": true, // 禁止通过点号访问索引签名属性

    // ========== 实验性功能 ==========
    "experimentalDecorators": true, // 启用实验性装饰器支持
    "emitDecoratorMetadata": true, // 为装饰器发出元数据
    "useDefineForClassFields": true, // 使用现代类字段语义

    // ========== 高级选项 ==========
    "skipLibCheck": true, // 跳过库文件的类型检查
    "skipDefaultLibCheck": true, // 跳过默认库文件的类型检查
    "forceConsistentCasingInFileNames": true, // 强制文件名大小写一致
    "isolatedModules": true, // 确保每个文件可独立编译
    "allowUnreachableCode": false, // 不允许不可达代码
    "allowUnusedLabels": false, // 不允许未使用的标签
    "assumeChangesOnlyAffectDirectDependencies": true, // 假设更改仅影响直接依赖
    "noUncheckedSideEffectImports": true, // 检查导入的副作用

    // ========== JSX 支持 ==========
    "jsx": "react-jsx", // JSX 处理方式：react-jsx、react、preserve
    "jsxFactory": "React.createElement", // JSX 工厂函数
    "jsxFragmentFactory": "React.Fragment", // JSX Fragment 工厂函数
    "jsxImportSource": "react", // JSX 导入源

    // ========== 项目引用（Monorepo 专用） ==========
    "composite": true, // 启用复合项目，支持项目引用
    "disableReferencedProjectLoad": false, // 禁止加载引用项目
    "disableSolutionSearching": false, // 禁止搜索解决方案
    "disableSourceOfProjectReferenceRedirect": false // 禁止项目引用重定向源
  },

  // ========== 文件包含/排除 ==========
  "include": [
    // 包含的文件/目录
    "src/**/*",
    "packages/**/src/**/*"
  ],
  "exclude": [
    // 排除的文件/目录
    "node_modules",
    "dist",
    "build",
    "**/*.test.ts",
    "**/*.spec.ts"
  ],
  "files": [
    // 明确包含的文件列表（优先级高于 include）
    // "src/main.ts"
  ],

  // ========== 项目引用（Monorepo） ==========
  "references": [
    // 引用的其他 TypeScript 项目
    {
      "path": "./packages/components" // 组件包
    },
    {
      "path": "./packages/utils" // 工具包
    }
  ],

  // ========== 其他配置 ==========
  "compileOnSave": true, // 保存时自动编译
  "typeAcquisition": {
    // 类型自动获取（用于 JavaScript 项目）
    "enable": false, // 禁用自动获取类型
    "include": [], // 要获取类型的包名
    "exclude": [] // 排除的类型包名
  }
}
```

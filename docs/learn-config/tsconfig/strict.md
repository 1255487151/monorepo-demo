# 严格模式

## 配置分组说明

这一页聚焦严格类型检查和容易影响日常开发体验的安全选项。

## 常见字段

| 名称                                 | 类型      | 默认倾向             | 作用                                 | 常见场景       |
| ------------------------------------ | --------- | -------------------- | ------------------------------------ | -------------- |
| `strict`                             | `boolean` | 新项目建议开启       | 打开一组严格检查                     | 作为整体开关   |
| `strictNullChecks`                   | `boolean` | 跟随 `strict`        | 区分 `null` / `undefined`            | 避免空值误用   |
| `noImplicitAny`                      | `boolean` | 跟随 `strict`        | 阻止隐式 `any`                       | 提升类型可信度 |
| `noUncheckedIndexedAccess`           | `boolean` | 强烈建议开启         | 索引访问自动带 `undefined`           | 数组和字典访问 |
| `exactOptionalPropertyTypes`         | `boolean` | 新项目建议开启       | 区分“属性不存在”和“属性为 undefined” | 精细对象建模   |
| `noImplicitOverride`                 | `boolean` | 类继承多时建议开     | 覆盖父类成员必须显式标注             | 面向对象代码   |
| `noPropertyAccessFromIndexSignature` | `boolean` | 想强化字典访问时开启 | 限制索引签名对象的点访问             | 规范字典结构   |
| `forceConsistentCasingInFileNames`   | `boolean` | 建议开启             | 统一文件路径大小写                   | 跨平台协作     |

## 带注释示例

```json
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true,
    "noImplicitAny": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

## 当前项目相关字段映射

```json
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "useUnknownInCatchVariables": true,
    "alwaysStrict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true
  }
}
```

## 注意事项

- `strict` 打开后，很多细分项都会一起生效。
- `noUncheckedIndexedAccess` 和 `exactOptionalPropertyTypes` 经常会显著改变类型推导结果。
- 严格模式问题不要靠大量断言硬压，优先改数据建模。

## 官方文档

- [strict](https://www.typescriptlang.org/tsconfig#strict)
- [noUncheckedIndexedAccess](https://www.typescriptlang.org/tsconfig#noUncheckedIndexedAccess)
- [exactOptionalPropertyTypes](https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes)

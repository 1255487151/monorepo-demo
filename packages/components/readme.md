# 组件库注意事项

## 组件库所需要的外部插件

> 1. 插件依赖外部项目 需要安装到 peerDependencies 中例如：Element plus、Vue
>    > - element-plus 组件库不导入样式文件和组件，外层需要自行导入样式文件及use 组件;
>    > - 不能使用 unplugin-vue-components unplugin-auto-import/vite 按需自动引入

```bash
pnpm add --save-peer <package>
pnpm add --save-peer <package>@<version>
```

```json
{
  "peerDependencies": {
    "<package>": "<version>"
  }
}
```

# 远程与代理

## 场景说明

这一页收录远程仓库管理、代理设置和连接排障时常用的命令。

## 命令表

| 命令                                     | 作用             | 说明                 |
| ---------------------------------------- | ---------------- | -------------------- |
| `git remote -v`                          | 查看远程仓库     | 确认当前 origin 指向 |
| `git remote add origin <url>`            | 新增远程仓库     | 首次接仓库常用       |
| `git remote set-url origin <url>`        | 修改远程仓库地址 | 切换 HTTPS/SSH       |
| `git config http.proxy <url>`            | 设置当前仓库代理 | 只作用于当前仓库     |
| `git config --global http.proxy <url>`   | 设置全局代理     | 作用于当前用户       |
| `git config --unset http.proxy`          | 取消当前仓库代理 | 排障时常用           |
| `git config --global --unset http.proxy` | 取消全局代理     | 清理全局设置         |

## 示例

```bash
git remote -v
git remote set-url origin git@github.com:owner/repo.git
```

```bash
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy https://127.0.0.1:7890
```

## 仓库内对应入口

这一页主要是 Git 自身命令速查，仓库里没有单独脚本包裹这些操作。

## 常见误区 / 注意事项

- 设置了全局代理后，排查网络问题要先确认是否忘了清掉。
- 修改远程地址前，先 `git remote -v` 看当前状态，避免误改错误 remote。

## 官方文档

- [git-remote](https://git-scm.com/docs/git-remote)
- [git-config](https://git-scm.com/docs/git-config)

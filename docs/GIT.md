# GIT 命令 单词记不起来的一些命令

### 设置代理

```bash
git config http.proxy http://127.0.0.1:7890
git config http.proxy https://127.0.0.1:7890
git config --global http.proxy http://127.0.0.1:7890
git config --global http.proxy https://127.0.0.1:7890
```

### 取消代理

```bash
git config --unset http.proxy
git config --unset https.proxy
git config --global --unset http.proxy
git config --global --unset https.proxy
```

### 检查代理

```bash
git config --get http.proxy
git config --get https.proxy
git config --global --get http.proxy
git config --global --get https.proxy
```

### 查看、设置npm镜像源

```bash
npm config get registry
npm config set registry https://registry.npmjs.org/
```

### 设置、查看、修改远程git仓库

```bash
git remote -v
git remote add origin https://github.com/username/repository.git
git remote set-url origin https://github.com/username/repository.git
```

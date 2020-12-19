---
title: npm
categories:
  - JavaScript
author: lele88lala,BAI
---

## NPM {data-visible=false}

### 包管理

| 命令                              | 描述                                               |
| --------------------------------- | -------------------------------------------------- |
| `npm i`                           | `npm` install 简写                                 |
| `npm install`                     | 安装 package.json 中的所有包                       |
| `npm install --production`        | 安装 package.json 中除了 devDependecies 中的所有包 |
| ---                               | ---                                                |
| `npm install lodash`              | 安装包                                             |
| `npm install --save-dev lodash`   | 安装 dev 环境依赖的包                              |
| `npm install --save-exact lodash` | 精确安装指定版本的包                               |

从 npm @ 5 开始，默认为 --save。之前的版本，使用不带 --save 的 npm install 不会更新 package.json

### 安装名称

| 命令                                 | 描述              |
| ------------------------------------ | ----------------- |
| `npm i sax`                          | NPM 包            |
| `npm i sax@latest`                   | 指定标签 `latest` |
| `npm i sax@3.0.0`                    | 指定版本 `3.0.0`  |
| `npm i sax@">=1 <2.0"`               |                   |
| ---                                  | ---               |
| `npm i @org/sax`                     | 作用域包          |
| ---                                  | ---               |
| `npm i user/repo`                    | GitHub            |
| `npm i user/repo#master`             | GitHub            |
| `npm i github:user/repo`             | GitHub            |
| `npm i gitlab:user/repo`             | GitLab            |
| ---                                  | ---               |
| `npm i /path/to/repo`                | 绝对路径          |
| `npm i ./archive.tgz`                | Tarball           |
| `npm i https://site.com/archive.tgz` | Tarball via HTTP  |

### Listing

| 命令                    | 描述                               |
| ----------------------- | ---------------------------------- |
| `npm list`              | 列出此项目中所有依赖包的安装版本   |
| `npm list -g --depth 0` | 列出所有全局安装的软件包的安装版本 |
| `npm view`              | 列出此软件中所有依赖项的最新版本   |
| `npm outdated`          | 仅列出此软件中已过时的依赖项       |

### Updating

| 命令                | 描述               |
| ------------------- | ------------------ |
| `npm update`        | 更新生产环境依赖包 |
| `npm update --dev`  | 更新开发环境依赖包 |
| `npm update -g`     | 更新全局依赖包     |
| ---                 | ---                |
| `npm update lodash` | 更新一个软件包     |

### 其他特性

```bash
# 添加 owner
npm owner add USERNAME PACKAGENAME
```

```bash
# 列出包
npm ls
```

```bash
# 添加废弃警告
npm deprecate PACKAGE@"< 0.2.0" "critical bug fixed in v0.2.0"
```

```bash
# 更新包
npm update [-g] PACKAGE
```

```bash
# 检查过期的包
npm outdated [PACKAGE]
```

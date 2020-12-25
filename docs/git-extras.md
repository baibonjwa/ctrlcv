---
title: Git extras
categories:
  - Git
contributors:
  - BAI
intro: |
  [git-extras](https://github.com/tj/git-extras) 的一些参考命令
---

## 参考

### Git-flow

```sh
$ git feature myfeature
  switched to branch 'feature/rofl'

$ git checkout develop
$ git feature finish myfeature
  merging 'feature/rofl' into develop
  deleted branch 'feature/rofl'
```

同样可以用 `git-bug` 和 `git-refactor`.

### Branch

```sh
git delete-merged-branches
# 之后可以执行 `git remote prune origin` 来删除掉远端分支

git create-branch development
git delete-branch development

git fresh-branch gh-pages
```

### 查看一些信息

```sh
git summary   # 代码仓库的创建时间、提交记录、活跃天数等等
git impact    # 影响图表
git effort
```

### Github

```sh
git fork strongloop/express
# 同步你的 Fork 和原始的 Repo 一致
git remote add upstream https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git
git fetch upstream; git merge upstream/master
```

### Tag

```sh
git release v1.0.0           # commit, tag, push-tags
git delete-tag v1.0.0
```

### git ignore

```sh
git ignore "*.log"
```

### git lock

设置这个改变不会被提交

```sh
git lock config/database.yml
git unlock config/database.yml
```

### 其他

```sh
git obliterate secret.yml   # remove all references to it
```

### 其他参考

- [https://github.com/visionmedia/git-extras](https://github.com/visionmedia/git-extras)

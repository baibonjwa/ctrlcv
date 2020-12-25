---
title: Git branch
categories:
  - Git
contributors:
  - BAI
---

## Git branch

### 创建分支

```bash
git checkout -b $branchname
git push origin $branchname --set-upstream
```

### 从远端分支获取

```bash
git fetch origin
git checkout --track origin/$branchname
```

### 删除本地的远程分支

```bash
git remote prune origin

```

删除本地的 `origin/*` 分支，不会影响到远程仓库

### 列出存在的分支

```bash
git branch --list
```

列出当前存在分支，当前分支会被高亮

### 列出已合并的分支

```bash
git branch -a --merged
```

### 删除一个本地分支

```bash
git branch -d $branchname
```

删除的分支只能是已经被推送到远端并且被合并的

### 强制删除本地分支

```bash
git branch -D $branchname
```

大写的 `-D` 参数可以强制删除分支，无关该分支的状态

### 删除远端分支

```bash
git push origin --delete :$branchname
```

也可以用来删除 Tag

### 获取当前的 SHA

```bash
git show-ref HEAD -s
```

### 重置分支并且恢复全部的修改

```bash
git reset --hard
```

### 回滚指定的 commit

```bash
git reset --hard $commit_id

git push --force
```

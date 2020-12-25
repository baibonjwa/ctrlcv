---
title: Git
categories:
  - Git
contributors:
  - BAI
---

## Git 常见命令

### Refs

```text
    HEAD^       # HEAD 前 1 个 commit
    HEAD^^      # HEAD 前 2 个 commit
    HEAD~5      # HEAD 前 5 个 commit
```

### 分支

```shell
  # 创建新分支
  git checkout -b $branchname
  git push origin $branchname --set-upstream

  # 获取一个远程分支
  git fetch origin
  git checkout --track origin/$branchname

  # 删除本地的远程分支
  git remote prune origin

  # 列出已 merge 的分支
  git branch -a --merged

  # 删除远程分支
  git push origin :$branchname

  # 返回至前一个分支
  git checkout -
```

### 协作相关

```shell
  # Rebase 你的修改至最新的远端 master 分支
  git pull --rebase upstream master

  # Squash 多个 commit 至 1 个，在接下来的的操作，将 pick 改成 s 或者 f，来合并多个 commit
  git rebase -i $commit_ref
```

### 子模块

```shell
  # 导入 .gitmodules
  git submodule init

  # 克隆丢失的子模块并 checkout commit
  git submodule update --init --recursive

  # 更新在 .gitmodules 中的远程 URL（当你改变了 submodule 时使用）
  git submodule sync
```

### Diff

```shell
  git diff --stat
  app/a.txt    | 2 +-
  app/b.txt    | 8 ++----
  2 files changed, 10 insertions(+), 84 deletions(-)
```

```shell
    git diff --summary
```

### Log 选项

```shell
  --oneline
    e11e9f9 Commit message here

  --decorate
    shows "(origin/master)"

  --graph
    shows graph lines

  --date=relative
    "2 hours ago"
```

## 杂项

### Cherry pick

```shell
    git cherry-pick 76acada^
```

### 杂项

```shell
  # 获取当前的 SHA
  git show-ref HEAD -s

  # 显示指定的 commit 信息
  git log -1 f5a960b5

  # 回到 Git 所在根目录
  cd "$(git rev-parse --show-top-level)"
```

### short log

```shell
  git shortlog
  git shortlog HEAD~20..    # 最近的 20 commit

  James Dean (1):
      Commit here
      Commit there

  Frank Sinatra (5):
      Another commit
      This other commit
```

### Bisect

```shell
  git bisect start HEAD HEAD~6
  git bisect run npm test
  git checkout refs/bisect/bad
  git bisect reset
```

### 手动 bisection

```shell
  git bisect start
  git bisect good   # 当前版本完好

  git checkout HEAD~8
  npm test          # 查看是否完好
  git bisect bad    # 当前版本损坏

  git bisect reset  # 中断
```

### 检索

```shell
  git log --grep="fixes things"  # 在 commit 信息里检索
  git log -S"window.alert"       # 在代码中搜索
  git log -G"foo.*"              # 在代码中(正则表达式)
```

### GPG 签名

```shell
  git config set user.signingkey <GPG KEY ID>       # 设置 GPG key

  git commit -m "Implement feature Y" --gpg-sign    # 或者 -S, GPG 签名的 Commit

  git config set commit.gpgsign true                # 默认签名 Commit
  git commit -m "Implement feature Y" --no-gpg-sign # 不使用 GPG 签名
```

---
title: Git revision
categories:
  - Git
intro: |
  一个 revision 的规范及使用方法整理，从 `man gitrevisions` 整理而来，可以用于 `git log` 等命令
---

### 示例

| 参考                            | 说明                              |
| ------------------------------- | --------------------------------- |
| _`git log`_ `master...develop`  | 查看分支的不同                    |
| _`git rebase -i`_ `HEAD~3`      | Rebase 最新的 3 个 Commit         |
| _`git reset --hard`_ `HEAD@{2}` | 撤销最新的操作                    |
| _`git checkout`_ `v2^{}`        | 切换到 `v2` 标签 (不是 `v2` 分支) |

The 3rd argument in each of these commands is a `gitrevision`. These gitrevisions can be passed to many Git commands.

### 常见的 Revision

| 示例                         | 说明                                          |
| ---------------------------- | --------------------------------------------- |
| _`git show`_ `dae68e1`       | SHA1                                          |
| _`git show`_ `HEAD`          | reference                                     |
| _`git show`_ `v1.0.0`        | 标签                                          |
| ---                          | ---                                           |
| _`git show`_ `master`        | 本地分支                                      |
| _`git show`_ `origin/master` | 远程分支                                      |
| ---                          | ---                                           |
| _`git show`_ `master~2`      | master 之前的两个 Commit                      |
| ---                          | ---                                           |
| _`git show`_ `master..fix`   | 从 _fix_ 到 _master_ (不包括 master)          |
| _`git show`_ `master...fix`  | 从 _fix_ 到 _master_ (fix 和 master 均不包括) |

## 参考

### Commit

| _`git checkout`_ `dae68e1` | sha1 |

### 参考

| 示例                             | 说明                                   |
| -------------------------------- | -------------------------------------- |
| _`git checkout`_ `HEAD`          | reference                              |
| _`git checkout`_ `master`        | branch                                 |
| _`git checkout`_ `v1.0.0`        | tag                                    |
| ---                              | ---                                    |
| _`git checkout`_ `origin/master` | 也可写作, _refs/remotes/origin/master_ |
| _`git checkout`_ `heads/master`  | 也可写作, _refs/heads/master_          |

### 向前检索

| 示例                                  | 说明                                     |
| ------------------------------------- | ---------------------------------------- |
| _`git checkout`_ `master@{yesterday}` | 也可以写 _1 day ago_, 等等               |
| _`git checkout`_ `master@{2}`         | 向前数第二个                             |
| _`git checkout`_ `master@{push}`      | _master_ 将要 push 的地方                |
| ---                                   | ---                                      |
| _`git checkout`_ `master^`            | master 之前的 commit                     |
| _`git checkout`_ `master^2`           | master 的前两个 commit                   |
| _`git checkout`_ `master~5`           | master 的前 5 个 commit                  |
| _`git checkout`_ `master^0`           | 当前 commit                              |
| ---                                   | ---                                      |
| _`git checkout`_ `v0.99.8^{tag}`      | 可以是 _commit_, _tag_, _tree_, _object_ |
| _`git checkout`_ `v0.99.8^{}`         | 默认是 _{tag}_                           |
| ---                                   | ---                                      |
| _`git checkout`_ `":/fix bug"`        | 搜搜 commit 的信息                       |

### 其他

| `HEAD:README` | ... |
| `0:README` | (0 to 3) ... |

## 范围

### 范围

| _`git log`_ `master` | master 分支的祖先 Commit |
| _`git log`_ `^master` | master 分支的祖先 Commit, 但排除祖先的祖先 |
| _`git log`_ `master..fix` | 从 _fix_ 到 _master_ 不包含 master |
| _`git log`_ `master...fix` | 从 _fix_ 到 _master_， master 和 fix 均不包含 |
| _`git log`_ `HEAD^@` | _HEAD_ 的祖先 Commit |
| _`git log`_ `HEAD^!` | _HEAD_, 但排除祖先的祖先节点 |
| _`git log`_ `HEAD^` | 搜之前一个 HEAD 匹配的标准|

### 范围图标

```nohighlight
A ─┬─ E ── F ── G   master
   │
   └─ B ── C ── D   fix
```

| _`git log`_ `master..fix` | BCD |
| _`git log`_ `master...fix` | BCD and EFG |

## 参考资料

- [Git Tools - Revision 选择](https://www.kernel.org/pub/software/scm/git/docs/gitrevisions.html) _(git-scm.com)_
- [gitrevisions(7)](https://www.kernel.org/pub/software/scm/git/docs/gitrevisions.html) _(kernel.org)_

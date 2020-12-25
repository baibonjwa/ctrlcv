---
title: git log
categories:
  - Git
contributors:
  - BAI
---

### 修订范围

```bash
git log master             # branch
git log origin/master      # branch, remote
git log v1.0.0             # tag

git log master develop

git log v2.0..master       # 获取从 *master* 至 *v2.0*(不包含 *v2.0*)
git log v2.0...master      # 获取从 *master* 至 *v2.0*(不包含 *v2.0*, 也不包含 *master*)
```

详见 [gitrevisions](./git-revisions).

### 基本过滤器

```bash
-n, --max-count=2
    --skip=2
```

```bash
    --since="1 week ago"
    --until="yesterday"
```

```bash
    --author="Rico"
    --committer="Rico"
```

### 搜索

```bash
    --grep="Merge pull request"   # 在 commint 信息中
    -S"console.log"               # 在代码中
    -G"foo.*"                     # 在代码中（正则）
```

```bash
    --invert-grep
    --all-match
```

### 限制

```bash
    --merges
    --no-merges
```

```bash
    --first-parent
```

```bash
    --branches="feature/*"
    --tags="v*"
    --remotes="origin"
```

### 简化

```bash
git log -- app/file.rb          # 只有文件
    --simplify-by-decoration    # Tag 和 分支
```

### 排序

```bash
    --date-order
    --author-date-order
    --topo-order              # 拓扑排序
    --reverse
```

### 格式化

```bash
    --abbrev-commit
    --oneline
    --graph
```

### 自定义格式

```bash
    --pretty="format:%H"
```

## 其他资料

- [Git log format](./git-log-format)

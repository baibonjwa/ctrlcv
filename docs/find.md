---
title: Find
categories:
  - CLI
---

### 使用方法

```bash
find <path> <condition> <action>
```

### 条件（Condition）

```bash
-name "*.c"
```

```bash
-user jonathan
-nouser
```

```bash
-type f            # 文件
-type d            # 目录
-type l            # Symlink
```

```bash
-depth 2
-regex PATTERN
```

```bash
-size 8            # 等于 8 512-bit blocks
-size -128c        # 小于 128 bytes
-size 1440k        # 等于 1440KiB
-size +10M         # 大于 10MiB
-size +2G          # 大于 2GiB
```

```bash
-newer   file.txt
-newerm  file.txt        # 修改时间比 file.txt 更新
-newerX  file.txt        # [c]hange, [m]odified, [B]create
-newerXt "1 hour ago"    # [t]imestamp
```

### 访问时间的条件

```bash
-atime 0           # 最后访问时间在 24 小时前至现在
-atime +0          # 最后访问时间超过 24 小时的
-atime 1           # 最后访问时间在 24 小时至 48 小时的
-atime +1          # 最后访问时间超过 48 小时的
-atime -1          # 最后访问时间小于 24 小时的（和 0 相同）
-ctime -6h30m      # 文件状态在过去 6 个小时至 30 分钟之间的
-mtime +1w         # 最后修改时间超过一周的
```

这些条件只在 MacOS 或 BSD-like 的系统中支持 （GNU/Linux 不支持）

### 条件流

```bash
\! -name "*.c"
\( x -or y \)
```

### 动作（Action）

```bash
-exec rm {} \;
-print
-delete
```

### 示例

```bash
find . -name '*.jpg'
find . -name '*.jpg' -exec rm {} \;
```

```bash
find . -newerBt "24 hours ago"
```

```bash
find . -type f -mtime +29 # 查找文件修改超过 30 天的
```

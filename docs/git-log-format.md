---
title: Git log format string
categories:
  - Git
keywords:
  - "git log --pretty=format:%H"
  - "%H - Commit hash"
  - "%an - Author"
  - "%aD - Author date"
contributors:
  - BAI
---

## Log 格式

### Pretty 格式

```bash
git log --pretty="format:%H"
```

后面的表格显示了具体的变量设置

### Hash

#### Commit

| 变量 | 说明              |
| ---- | ----------------- |
| `%H` | commit hash       |
| `%h` | commit hash(缩写) |

#### Tree

| 变量 | 说明            |
| ---- | --------------- |
| `%T` | tree hash       |
| `%t` | tree hash(缩写) |

#### Parent

| 变量 | 说明                      |
| ---- | ------------------------- |
| `%P` | 祖先 Commit 的 hash       |
| `%p` | 祖先 Commit 的 hash(缩写) |

### Commit

| 变量 | 说明                    |
| ---- | ----------------------- |
| `%s` | commit 标题             |
| `%f` | commit 标题, 文件名风格 |
| `%b` | commit 内容             |
| ---  | ---                     |
| `%d` | ref 名称                |
| `%e` | 编码                    |

## 作者和提交者

### 作者

#### 名字

| 变量  | 说明                  |
| ----- | --------------------- |
| `%an` | 作者                  |
| `%aN` | 作者, 根据 mailmap 分 |

#### 邮箱

| 变量  | 说明                      |
| ----- | ------------------------- |
| `%ae` | 作者邮箱                  |
| `%aE` | 作者邮箱, 根据 mailmap 分 |

#### 日期

| 变量  | 说明                      |
| ----- | ------------------------- |
| `%aD` | 作者日期 (rfc2882)        |
| `%ar` | 作者日期 (relative)       |
| `%at` | 作者日期 (unix timestamp) |
| `%ai` | 作者日期 (iso8601)        |

### 提交者

#### 名称

| 变量  | 说明                        |
| ----- | --------------------------- |
| `%cn` | 提交者姓名                  |
| `%cN` | 提交者姓名, 根据 mailmap 分 |

#### 邮箱

| 变量  | 说明                        |
| ----- | --------------------------- |
| `%ce` | 提交者邮箱                  |
| `%cE` | 提交者邮箱, 根据 mailmap 分 |

#### 日期

| 变量  | 说明                      |
| ----- | ------------------------- |
| `%cD` | 作者日期 (rfc2882)        |
| `%cr` | 作者日期 (relative)       |
| `%ct` | 作者日期 (unix timestamp) |
| `%ci` | 作者日期 (iso8601)        |

## 其他参考

- [Git log cheatsheet](./git-log)

---
title: Cron
categories:
  - CLI
contributors:
  - BAI
---

## 格式

### 格式

```text
Min  Hour Day  Mon  Weekday
```

```text
*    *    *    *    *  command to be executed
```

```text
┬    ┬    ┬    ┬    ┬
│    │    │    │    └─  Weekday  (0=Sun .. 6=Sat)
│    │    │    └──────  Month    (1..12)
│    │    └───────────  Day      (1..31)
│    └────────────────  Hour     (0..23)
└─────────────────────  Minute   (0..59)
```

### 示例

| 示例           | 说明          |
| -------------- | ------------- |
| `0 * * * *`    | 每个小时      |
| `*/15 * * * *` | 每 15 分钟    |
| `0 */2 * * *`  | 每 2 个小时   |
| `0 0 * * 0`    | 每个周日 0 点 |
| ---            | ---           |
| `@reboot`      | 每次重启      |

### Crontab

```bash
# 添加任务
echo "@reboot echo hi" | crontab
```

```bash
# 在编辑器中打开
crontab -e
```

```bash
# 列出任务
crontab -l [-u user]
```

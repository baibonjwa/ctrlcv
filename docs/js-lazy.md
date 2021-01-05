---
title: JS 简写
categories:
  - JavaScript
contributors:
  - BAI
---

### 例子

```js
n = +"4096"; // n === 4096
s = "" + 200; // s === '200'
```

```js
now = +new Date();
isPublished = !!post.publishedAt;
```

### 简写

| 描述                    | 简写          | 正常写法                                |
| ----------------------- | ------------- | --------------------------------------- |
| 字符串转数字            | `+str`        | `parseInt(str, 10)` _or_ `parseFloat()` |
| Math.floor(num)         | `num \| 0`    | `Math.floor(num)`                       |
| 数字转字符串            | `'' + num`    | `num.toString()`                        |
| 时间转换为 UNIX 时间戳  | `+new Date()` | `new Date().getTime()`                  |
| 任何只转换成 boolean 值 | `!!value`     | `Boolean(value)`                        |

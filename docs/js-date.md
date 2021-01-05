---
title: JS 日期
categories:
  - JavaScript
contributors:
  - BAI
---

## 日期

### Constructor

```js
// Now
new Date();
```

```js
new Date(1419785527580);
```

```js
// 日期格式
new Date("May 17, 1995 03:24:00");
```

```js
// ISO 日期格式
new Date("2013-03-01T01:10:00");
```

```js
new Date(2014, 2, 1, 13, 0, 59, 0);
```

| `new Date(` | `2014,` | `2,`  | `1,` | `13,` | `0,` | `59,` | `0)`  |
| ----------- | ------- | ----- | ---- | ----- | ---- | ----- | ----- |
| Date        | Year    | Month | Day  | Hour  | Min  | Sec   | Milli |

月份从 0 开始计算(例如 January 是 `0`).

### 转换

| 方法                     | 结果                                        |
| ------------------------ | ------------------------------------------- |
| `d.toString()`           | `"Mon Dec 29 2014 00:58:28 GMT+0800 (PHT)"` |
| `d.toTimeString()`       | `"00:58:46 GMT+0800 (PHT)"`                 |
| `d.toUTCString()`        | `"Sun, 28 Dec 2014 16:58:59 GMT"`           |
| ---                      | ---                                         |
| `d.toDateString()`       | `"Thu Jan 10 2013"`                         |
| `d.toISOString()`        | `"2013-01-09T16:00:00.000Z"`                |
| `d.toLocaleString()`     | `"12/29/2014, 12:57:31 AM"`                 |
| `d.toLocaleTimeString()` | `"12:57:31 AM"`                             |
| ---                      | ---                                         |
| `d.getTime()`            | `1419785527580`                             |

## 访问

### Get 方法

| 方法                   | 结果              |
| ---------------------- | ----------------- |
| `.getDate()`           | `1..31`           |
| `.getDay()`            | `0..6` (sun..sat) |
| `.getFullYear()`       | `2014`            |
| `.getMonth()`          | `0..11`           |
| ---                    | ---               |
| `.getHours()`          |                   |
| `.getMinutes()`        |                   |
| `.getSeconds()`        |                   |
| `.getMilliseconds()`   |                   |
| ---                    | ---               |
| `.getTime()`           | ms since epoch    |
| `.getTimezoneOffset()` |                   |

也可以通过 `.getUTCDate()`, `.getUTCDay()` 来获得 UTC 的版本

### Set 方法

| 方法                         | 结果 |
| ---------------------------- | ---- |
| `.setDate` _(val)_           |      |
| `.setDay` _(val)_            |      |
| `.setFullYear` _(val)_       |      |
| `.setMonth` _(val)_          |      |
| ---                          | ---  |
| `.setHours` _(val)_          |      |
| `.setMinutes` _(val)_        |      |
| `.setSeconds` _(val)_        |      |
| `.setMilliseconds` _(val)_   |      |
| ---                          | ---  |
| `.setTime` _(val)_           |      |
| `.setTimezoneOffset` _(val)_ |      |

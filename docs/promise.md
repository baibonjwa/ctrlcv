---
title: Promise
categories:
  - JavaScript
contributors:
  - lele88lala
  - BAI
---

## Promise

### 简介

简介: 快速参考 JavaScript Promise API 的途径.

- [Profile API](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Promise 使用指南](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises) _(developer.mozilla.org)_
- [Promise 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) _(developer.mozilla.org)_

### 创建 Promise

```js
new Promise((resolve, reject) => {
  doStuff(() => {
    if (success) {
      resolve("good");
    } else {
      reject(new Error("oops"));
    }
  });
});
```

用 [new Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#Contstructor) 创建新的 Promise.

### 处理 promises

```js
promise
  .then((result) => {
    /* success */
  })
  .catch((error) => {
    /* failure */
  });
```

当 promise 操作完成时执行 [then()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)
当 promise 操作失败时候执行 [catch()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)

### 多 promises

```js
const promises = [promise1(), promise2() /* ... */];
```

```js
// 当所有 Promise 均执行成功时， 执行 then
Promise.all(promises).then((results) => {
  /* ... */
});
```

```js
// 当有一个 Promise 执行完成时，执行 then
Promise.race(promises).then((result) => {
  /* ... */
});
```

### 转换其它 promises

```js
return Promise.resolve("result");
return Promise.resolve(promise);
return Promise.resolve(thenable);

return Promise.reject("reason");

Promise.resolve(result).then(() => {
  /* ... */
});
```

`Promise.resolve(val)`将返回一个 promise，该 promise 将解决为其赋予的值.

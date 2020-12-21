---
title: bluebird.js
categories:
  - JavaScript
  - Libraries
author: BAI
intro: 新版本的 Node Native 的 Promise 和 Async/Await 实现已经很快了 bluebird.js 已经不再那么有必要使用了
---

## 参考文档

[promise cheatsheet](promise.html)
[Bluebird.js API](https://github.com/petkaantonov/bluebird/blob/master/API.md) (github.com).

### 示例

```js
promise
  .then(okFn, errFn)
  .spread(okFn, errFn)        // *
  .catch(errFn)
  .catch(TypeError, errFn)    // *
  .finally(fn)
  .map(function (e) { ··· })  // *
  .each(function (e) { ··· }) // *
```

标记 `*` 的均不是标准的 Promise API，并且只能在 Bluebird 下使用

### 多返回值

```js
.then(function () {
  return [ 'abc', 'def' ]
})
.spread(function (abc, def) {
  ···
})
```

详见 [Promise.spread](http://bluebirdjs.com/docs/api/promise.spread.html)

### 多个 Promise

```js
Promise.join(
  getPictures(),
  getMessages(),
  getTweets(),
  function (pics, msgs, tweets) {
    return ···
  }
)
```

详见 [Promise.join](http://bluebirdjs.com/docs/api/promise.join.html)

### 多个 Promise(数组)

- [Promise.all](http://bluebirdjs.com/docs/api/promise.all.html)([p]) - 全部 Promise 均执行成功
- [Promise.some](http://bluebirdjs.com/docs/api/promise.some.html)([p], count) - count 数量的成功 expect `count` to pass
- [Promise.any](http://bluebirdjs.com/docs/api/promise.any.html)([p]) - 相当于上面的方法 count 设置为 1，即有一个 Promise 成功
- [Promise.race](http://bluebirdjs.com/docs/api/promise.race.html)([p], count) - 可以用 any 替代
- [Promise.map](http://bluebirdjs.com/docs/api/promise.map.html)([p], fn, options) - 支持并行

```js
Promise.all([promise1, promise2]).then((results) => {
  results[0];
  results[1];
});

Promise.any(promises).then((results) => {});
```

```js
Promise.map(urls, url => fetch(url))
  .then(···)
```

详见 [Promise.map](http://bluebirdjs.com/docs/api/promise.map.html)

### 对象

```js
Promise.props({
  photos: get("photos"),
  posts: get("posts"),
}).then((res) => {
  res.photos;
  res.posts;
});
```

详见 [Promise.props](http://bluebirdjs.com/docs/api/promise.props.html).

### Promise 链式调用

```js
function getPhotos() {
  return Promise.try(() => {
    if (err) throw new Error("boo")
    return result
  })
}

getPhotos().then(···)
```

详见 [Promise.try](http://bluebirdjs.com/docs/api/promise.try.html).

### Node 风格的函数

```js
var readFile = Promise.promisify(fs.readFile);
var fs = Promise.promisifyAll(require("fs"));
```

详见 [Promisification](http://bluebirdjs.com/docs/api/promisification.html).

### Promise 返回的方法

```js
User.login = Promise.method((email, password) => {
  if (!valid) throw new Error("Email not valid");

  return; /* promise */
});
```

详见 [Promise.method](http://bluebirdjs.com/docs/api/promise.method.html).

### 生成器（Generator）

```js
User.login = Promise.coroutine(function* (email, password) {
  let user = yield User.find({ email: email }).fetch();
  return user;
});
```

详见 [Promise.coroutine](http://bluebirdjs.com/docs/api/promise.coroutine.html).

## 参考

<http://bluebirdjs.com/docs/api-reference.html>

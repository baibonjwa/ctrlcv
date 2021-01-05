---
title: JS fetch()
categories:
  - JavaScript
contributors:
  - BAI
---

### Fetch

```js
fetch('/data.json')
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })
  .catch(err => ...)
```

### Response

```js
fetch("/data.json").then((res) => {
  res.text(); // response body (=> Promise)
  res.json(); // JSON 格式 (=> Promise)
  res.status; //=> 200
  res.statusText; //=> 'OK'
  res.redirected; //=> false
  res.ok; //=> true
  res.url; //=> 'http://site.com/data.json'
  res.type; //=> 'basic'
  //   ('cors' 'default' 'error'
  //    'opaque' 'opaqueredirect')

  res.headers.get("Content-Type");
});
```

### Request 选项

```js
fetch('/data.json', {
  method: 'post',
  body: new FormData(form),
  body: JSON.stringify(...),

  headers: {
    'Accept': 'application/json'
  },

  credentials: 'same-origin',
  credentials: 'include',

})
```

### 错误捕捉

```js
fetch("/data.json").then(checkStatus);
```

```js
function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res;
  } else {
    let err = new Error(res.statusText);
    err.response = res;
    throw err;
  }
}
```

不是 2xx 的响应依旧是成功的请求，需要用另一个函数去做错误处理

### 在 Node.js 中使用

```js
const fetch = require("isomorphic-fetch");
```

详见: [isomorphic-fetch](https://npmjs.com/package/isomorphic-fetch) _(npmjs.com)_

## 参考资料

- <https://fetch.spec.whatwg.org/>
- <https://www.npmjs.com/package/whatwg-fetch>

---
title: Awesome Redux
categories:
  - React
contributors:
  - BAI
---

### redux-actions

创建一个符合 [Flux standard action](https://github.com/redux-utilities/flux-standard-action) 格式的 Action

```js
increment = createAction("INCREMENT", (amount) => amount);
increment = createAction("INCREMENT"); // 功能同上
```

```js
increment(42) === { type: "INCREMENT", payload: 42 };
```

```js
// 错误处理
err = new Error();
increment(err) === { type: "INCREMENT", payload: err, error: true };
```

[redux-actions](https://www.npmjs.com/package/redux-actions)

### flux-standard-action

一种标准的 Flux 格式，Action 可能包含 error、payload、meta 属性

```js
{ type: 'ADD_TODO', payload: { text: 'Work it' } }
{ type: 'ADD_TODO', payload: new Error(), error: true }
```

[flux-standard-action](https://github.com/acdlite/flux-standard-action)

### reduce-reducers

组合多个 Reducer 成一个

```js
re = reduceReducers(
  (state, action) => state + action.number,
  (state, action) => state + action.number
);

re(10, { number: 2 }); //=> 14
```

[reduce-reducers](https://www.npmjs.com/package/reduce-reducers)

### redux-logger

Redux 日志工具

```js
// Nothing to see here
```

[redux-logger](https://github.com/evgenyrodionov/redux-logger)

## Async

### redux-promise

Action 接收 Promise 参数

```js
increment = createAction("INCREMENT"); // redux-actions
increment(Promise.resolve(42));
```

[redux-promise](https://github.com/acdlite/redux-promise)

### redux-effects

可以在 Action 上增加一些附加功能，来保证 Action 更干净

```js
{
  type: 'EFFECT_COMPOSE',
  payload: {
    type: 'FETCH'
    payload: {url: '/some/thing', method: 'GET'}
  },
  meta: {
    steps: [ [success, failure] ]
  }
}
```

[redux-effects](https://www.npmjs.com/package/redux-effects)

### redux-thunk

Action 接收 Thunks 函数，和 redux-promise 类似

```js
fetchData = (url) => (dispatch, getState) => {
  dispatch({ type: 'FETCH_REQUEST' })
  fetch(url)
    .then((data) => dispatch({ type: 'FETCH_DONE', data })
    .catch((error) => dispatch({ type: 'FETCH_ERROR', error })
})

store.dispatch(fetchData('/posts'))
```

```js
// 也可以简写成
fetchData("/posts")(store.dispatch, store.getState);
```

```js
// 因为 fetchData 返回 Promise 所以可以用下面形式来做 SSR
store.dispatch(fetchPosts()).then(() => {
  ReactDOMServer.renderToString(<MyApp store={store} />);
});
```

[redux-thunk](https://www.npmjs.com/package/redux-thunk)

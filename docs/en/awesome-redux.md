---
title: Awesome Redux
categories:
  - React
---

### redux-actions

Create action creators in flux standard action format.

```js
increment = createAction("INCREMENT", (amount) => amount);
increment = createAction("INCREMENT"); // same
```

```js
increment(42) === { type: "INCREMENT", payload: 42 };
```

```js
// Errors are handled for you:
err = new Error();
increment(err) === { type: "INCREMENT", payload: err, error: true };
```

[redux-actions](https://www.npmjs.com/package/redux-actions)

### flux-standard-action

A standard for flux action objects. An action may have an `error`, `payload` and `meta` and nothing else.

```js
{ type: 'ADD_TODO', payload: { text: 'Work it' } }
{ type: 'ADD_TODO', payload: new Error(), error: true }
```

[flux-standard-action](https://github.com/acdlite/flux-standard-action)

### reduce-reducers

Combines reducers (like _combineReducers()_), but without namespacing magic.

```js
re = reduceReducers(
  (state, action) => state + action.number,
  (state, action) => state + action.number
);

re(10, { number: 2 }); //=> 14
```

[reduce-reducers](https://www.npmjs.com/package/reduce-reducers)

### redux-logger

Logs actions to your console.

```js
// Nothing to see here
```

[redux-logger](https://github.com/evgenyrodionov/redux-logger)

## Async

### redux-promise

Pass promises to actions. Dispatches a flux-standard-action.

```js
increment = createAction("INCREMENT"); // redux-actions
increment(Promise.resolve(42));
```

[redux-promise](https://github.com/acdlite/redux-promise)

### redux-effects

Pass side effects declaratively to keep your actions pure.

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

Pass "thunks" to as actions. Extremely similar to redux-promises, but has support for getState.

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
// That's actually shorthand for:
fetchData("/posts")(store.dispatch, store.getState);
```

```js
// Optional: since fetchData returns a promise, it can be chained
// for server-side rendering
store.dispatch(fetchPosts()).then(() => {
  ReactDOMServer.renderToString(<MyApp store={store} />);
});
```

[redux-thunk](https://www.npmjs.com/package/redux-thunk)

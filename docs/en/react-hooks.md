# React Hooks

## TBD

### State Hook

```jsx
import React, { useState } from "react";

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

Hooks are a new addition in React 16.8.

See: [Hooks at a Glance](https://reactjs.org/docs/hooks-overview.html)

### Declaring multiple state variables

```jsx
function ExampleWithManyStates() {
  // Declare multiple state variables!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState("banana");
  const [todos, setTodos] = useState([{ text: "Learn Hooks" }]);
  // ...
}
```

### Effect hook

```jsx
import React, { useState, useEffect } from "react";

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

If you’re familiar with React class lifecycle methods, you can think of `useEffect` Hook as `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` combined.

By default, React runs the effects after every render — including the first render.

### Building your own hooks

#### Define FriendStatus

```jsx
import React, { useState, useEffect } from "react";

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  }, [props.friend.id]);

  if (isOnline === null) {
    return "Loading...";
  }
  return isOnline ? "Online" : "Offline";
}
```

Effects may also optionally specify how to “clean up” after them by returning a function.

#### Use FriendStatus

```jsx
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return "Loading...";
  }
  return isOnline ? "Online" : "Offline";
}
```

See: [Building Your Own Hooks](https://reactjs.org/docs/hooks-custom.html)

### Hooks API Reference

Also see: [Hooks FAQ](https://reactjs.org/docs/hooks-faq.html)

#### Basic Hooks

| Hook                         | Description                               |
| ---------------------------- | ----------------------------------------- |
| `useState`_(initialState)_   |                                           |
| `useEffect`_(() => { ... })_ |                                           |
| `useContext`_(MyContext)_    | value returned from `React.createContext` |

Full details: [Basic Hooks](https://reactjs.org/docs/hooks-reference.html#basic-hooks)

#### Additional Hooks

| Hook                                        | Description                                                                  |
| ------------------------------------------- | ---------------------------------------------------------------------------- |
| `useReducer`_(reducer, initialArg, init)_   |                                                                              |
| `useCallback`_(() => { ... })_              |                                                                              |
| `useMemo`_(() => { ... })_                  |                                                                              |
| `useRef`_(initialValue)_                    |                                                                              |
| `useImperativeHandle`_(ref, () => { ... })_ |                                                                              |
| `useLayoutEffect`                           | identical to `useEffect`, but it fires synchronously after all DOM mutations |
| `useDebugValue`_(value)_                    | display a label for custom hooks in React DevTools                           |

Full details: [Additional Hooks](https://reactjs.org/docs/hooks-reference.html#additional-hooks)

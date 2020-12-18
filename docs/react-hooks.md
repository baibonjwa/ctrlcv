---
title: React Hooks
category: React
---


```jsx
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

*Hook* 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

查看: [Hooks at a Glance](https://reactjs.org/docs/hooks-overview.html)

### Effect hook

```jsx
import React, { useState, useEffect } from 'react';

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
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

如果您熟悉React类的生命周期方法，则可以将`useEffect Hook 视为` componentDidMount`，`componentDidUpdate`和`componentWillUnmount 的组合。

默认情况下，React在每个渲染后（包括第一个渲染）运行effects。

### 构建自己的 hooks

#### 定义 FriendStatus

```jsx
import React, { useState, useEffect } from 'react';

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
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

Effects 也可以有选择地指定如何通过返回函数来进行“清理”。

#### 使用 FriendStatus

```jsx
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

查看: [Building Your Own Hooks](https://reactjs.org/docs/hooks-custom.html)

### Hooks API 参照

也可以查看: [Hooks FAQ](https://reactjs.org/docs/hooks-faq.html)

#### Basic Hooks

| Hook                         | Description                               |
| ---------------------------- | ----------------------------------------- |
| `useState`_(initialState)_   |                                           |
| `useEffect`_(() => { ... })_ |                                           |
| `useContext`_(MyContext)_    | value returned from `React.createContext` |

查看更多: [Basic Hooks](https://reactjs.org/docs/hooks-reference.html#basic-hooks)

#### 额外的 Hooks

| Hook                                        | Description                                                  |
| ------------------------------------------- | ------------------------------------------------------------ |
| `useReducer`_(reducer, initialArg, init)_   |                                                              |
| `useCallback`_(() => { ... })_              |                                                              |
| `useMemo`_(() => { ... })_                  |                                                              |
| `useRef`_(initialValue)_                    |                                                              |
| `useImperativeHandle`_(ref, () => { ... })_ |                                                              |
| `useLayoutEffect`                           | identical to `useEffect`, but it fires synchronously after all DOM mutations |
| `useDebugValue`_(value)_                    | display a label for custom hooks in React DevTools           |

查看更多: [Additional Hooks](https://reactjs.org/docs/hooks-reference.html#additional-hooks)


### 声明多 state 变量

```jsx
function ExampleWithManyStates() {
  // Declare multiple state variables!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  // ...
}
```


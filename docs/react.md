---
title: React.js
category: React
layout: 2017/sheet
ads: true
tags: [Featured]
updated: 2020-07-05
weight: -10
keywords:
  - React.Component
  - render()
  - componentDidMount()
  - props/state
  - dangerouslySetInnerHTML
intro: |
  [React](https://reactjs.org/) is a JavaScript library for building user interfaces. This guide targets React v15 to v16.
---

## 组件

### 组件相关

```jsx title=Title live=true
import React from 'react'
import ReactDOM from 'react-dom'
```

```jsx
class Hello extends React.Component {
  render () {
    return <div className='message-box'>
      Hello {this.props.name}
    </div>
  }
}
```

```jsx
const el = document.body
ReactDOM.render(<Hello name='John' />, el)
```

可以使用 [React.js jsfiddle](http://jsfiddle.net/reactjs/69z2wepo/) (或者 [jsbin](http://jsbin.com/yafixat/edit?js,output)) 进行代码调试。

### 引入多个输出

```jsx
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
```

```jsx
class Hello extends Component {
  ...
}
```

### Properties

```html
<Video fullscreen={true} autoplay={false} />
```

```jsx
render () {
  this.props.fullscreen
  const { fullscreen, autoplay } = this.props
  ···
}
```

使用 this.props 获取传递给组件的属性。

查看: [Properties](https://reactjs.org/docs/tutorial.html#using-props)

### States

```jsx
constructor(props) {
  super(props)
  this.state = { username: undefined }
}
```

```jsx
this.setState({ username: 'rstacruz' })
```

```jsx
render () {
  this.state.username
  const { username } = this.state
  ···
}
```

使用 states ( this.state ) 管理动态数据。

通过 [Babel](https://babeljs.io/) 您可以使用  [proposal-class-fields](https://github.com/tc39/proposal-class-fields) 并摆脱构造函数。

```jsx
class Hello extends Component {
  state = { username: undefined };
  ...
}
```

查看: [States](https://reactjs.org/docs/tutorial.html#reactive-state)

### 组合组件

```jsx
class Info extends Component {
  render () {
    const { avatar, username } = this.props

    return <div>
      <UserAvatar src={avatar} />
      <UserProfile username={username} />
    </div>
  }
}
```

从React v16.2.0开始，Fragment可以用于返回多个子组件，而无需向DOM添加额外的包装节点。

```jsx
import React, {
  Component,
  Fragment
} from 'react'

class Info extends Component {
  render () {
    const { avatar, username } = this.props

    return (
      <Fragment>
        <UserAvatar src={avatar} />
        <UserProfile username={username} />
      </Fragment>
    )
  }
}
```

嵌套组件以分离关注点。

查看: [Composing Components](https://reactjs.org/docs/components-and-props.html#composing-components)

### Children

```jsx
<AlertBox>
  <h1>You have pending notifications</h1>
</AlertBox>
```

```jsx
class AlertBox extends Component {
  render () {
    return <div className='alert-box'>
      {this.props.children}
    </div>
  }
}
```

每个组件都可以获取到 this.props.children，它包含组件的开始标签和结束标签之间的内容。

## Defaults

### 设置默认props

```jsx
Hello.defaultProps = {
  color: 'blue'
}
```

See: [defaultProps](https://reactjs.org/docs/react-component.html#defaultprops)

### 设置默认state

```jsx
class Hello extends Component {
  constructor (props) {
    super(props)
    this.state = { visible: true }
  }
}
```

在`constructor()`中设置默认状态。

在没有构造函数的情况下可以使用 [Babel 和  [proposal-class-fields](https://github.com/tc39/proposal-class-fields).。

```jsx
class Hello extends Component {
  state = { visible: true }
}
```

查看: [Setting the default state](https://reactjs.org/docs/react-without-es6.html#setting-the-initial-state)

## 其它组件 {data-columns="3"}

### 函数式组件

```jsx
function MyComponent ({ name }) {
  return <div className='message-box'>
    Hello {name}
  </div>
}
```

Functional components have no state. Also, their `props` are passed as the first parameter to a function.

函数组件没有状态。此外，它们的`props`是以函数的第一个参数的形式来传递的。

查看: [Function and Class Components](https://reactjs.org/docs/components-and-props.html#functional-and-class-components)

### PureComponent

```jsx
import React, {PureComponent} from 'react'

class MessageBox extends PureComponent {
  ···
}
```

PureComponent是React 组件性能优化的版本，如果props 或者 state 不变的话不进行渲染。

React 组件性能优化的版本，如果props 或者 state 不变的话不进行渲染。

查看: [Pure components](https://reactjs.org/docs/react-api.html#react.purecomponent)

### 组件 API

```jsx
this.forceUpdate()
```

```jsx
this.setState({ ... })
this.setState(state => { ... })
```

```jsx
this.state
this.props
```

这些方法和属性可以用于组件实例。

查看: [Component API](http://facebook.github.io/react/docs/component-api.html)

## 生命周期

### Mounting

| Method                   | Description                                                  |
| ------------------------ | ------------------------------------------------------------ |
| `constructor` _(props)_  | Before rendering [#](https://reactjs.org/docs/react-component.html#constructor) |
| `componentWillMount()`   | _Don't use this_ [#](https://reactjs.org/docs/react-component.html#componentwillmount) |
| `render()`               | Render [#](https://reactjs.org/docs/react-component.html#render) |
| `componentDidMount()`    | After rendering (DOM available) [#](https://reactjs.org/docs/react-component.html#componentdidmount) |
| ---                      | ---                                                          |
| `componentWillUnmount()` | Before DOM removal [#](https://reactjs.org/docs/react-component.html#componentwillunmount) |
| ---                      | ---                                                          |
| `componentDidCatch()`    | Catch errors (16+) [#](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html) |

在 `constructor()` 中设置初始状态。

在`componentDidMount()`上添加DOM事件处理程序，计时器（等），然后在`componentWillUnmou()`上删除它们。

### Updating

| 方法                                                    | Description                                          |
| ------------------------------------------------------- | ---------------------------------------------------- |
| `componentDidUpdate` _(prevProps, prevState, snapshot)_ | Use `setState()` here, but remember to compare props |
| `shouldComponentUpdate` _(newProps, newState)_          | Skips `render()` if returns false                    |
| `render()`                                              | Render                                               |
| `componentDidUpdate` _(prevProps, prevState)_           | Operate on the DOM here                              |

Called when parents change properties and `.setState()`. These are not called for initial renders.

当父组件更改属性和`.setState（）`时调用。在初始渲染的时候不被调用。

查看: [Component specs](http://facebook.github.io/react/docs/component-specs.html#updating-componentwillreceiveprops)

## Hooks (新特征)  {data-columns="2"}

### State Hook

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

## DOM 元素

### 参考

```jsx
class MyComponent extends Component {
  render () {
    return <div>
      <input ref={el => this.input = el} />
    </div>
  }

  componentDidMount () {
    this.input.focus()
  }
}
```

允许访问 DOM 元素

查看: [Refs and the DOM](https://reactjs.org/docs/refs-and-the-dom.html)

### DOM 事件

```jsx
class MyComponent extends Component {
  render () {
    <input type="text"
        value={this.state.value}
        onChange={event => this.onChange(event)} />
  }

  onChange (event) {
    this.setState({ value: event.target.value })
  }
}
```

以属性的方式传递函数，例如上述 onChange

查看: [Events](https://reactjs.org/docs/events.html)

## 其他特性

### 传递 props

```html
<VideoPlayer src="video.mp4" />
```

```jsx
class VideoPlayer extends Component {
  render () {
    return <VideoEmbed {...this.props} />
  }
}
```

将 src =“ ...” 向下传递到子组件。

查看： [Transferring props](http://facebook.github.io/react/docs/transferring-props.html)

### 顶层 API

```jsx
React.createClass({ ... })
React.isValidElement(c)
```

```jsx
ReactDOM.render(<Component />, domnode, [callback])
ReactDOM.unmountComponentAtNode(domnode)
```

```jsx
ReactDOMServer.renderToString(<Component />)
ReactDOMServer.renderToStaticMarkup(<Component />)
```

含有很多，列出的几种是最常见的。

查看: [React top-level API](https://reactjs.org/docs/react-api.html)

## JSX 模式

### Style 简写

```jsx
const style = { height: 10 }
return <div style={style}></div>
```

```jsx
return <div style={{ margin: 0, padding: 0 }}></div>
```

更多: [Inline styles](https://reactjs.org/tips/inline-styles.html)

### Inner HTML

```jsx
function markdownify() { return "<p>...</p>"; }
<div dangerouslySetInnerHTML={{__html: markdownify()}} />
```

See: [Dangerously set innerHTML](https://reactjs.org/tips/dangerously-set-inner-html.html)

### 列表

```jsx
class TodoList extends Component {
  render () {
    const { items } = this.props

    return <ul>
      {items.map(item =>
        <TodoItem item={item} key={item.key} />)}
    </ul>
  }
}
```

列表项要包含一个 key 属性

### 条件渲染

```jsx
<Fragment>
  {showMyComponent
    ? <MyComponent />
    : <OtherComponent />}
</Fragment>
```

### 短路求值

```jsx
<Fragment>
  {showPopup && <Popup />}
  ...
</Fragment>
```

## 新特性

### 返回多个元素

您可以将多个元素作为 arrays或fragments返回。

#### Arrays

```js
render () {
  // Don't forget the keys!
  return [
    <li key="A">First item</li>,
    <li key="B">Second item</li>
  ]
}
```

#### Fragments

```js
render () {
  // Fragments don't require keys!
  return (
    <Fragment>
      <li>First item</li>
      <li>Second item</li>
    </Fragment>
  )
}
```

查看: [Fragments and strings](https://reactjs.org/blog/2017/09/26/react-v16.0.html#new-render-return-types-fragments-and-strings)

### 返回字符串

```js
render() {
  return 'Look ma, no spans!';
}
```

可以直接返回一个字符串

See: [Fragments and strings](https://reactjs.org/blog/2017/09/26/react-v16.0.html#new-render-return-types-fragments-and-strings)

### Errors

```js
class MyComponent extends Component {
  ···
  componentDidCatch (error, info) {
    this.setState({ error })
  }
}
```

通过`componentDidCatch`捕获 errors。 (React 16+)

查看: [Error handling in React 16](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html)

### Portals

```js
render () {
  return React.createPortal(
    this.props.children,
    document.getElementById('menu')
  )
}
```

它可以把`this.props.children`渲染到 DOM 中的任何位置

查看: [Portals](https://reactjs.org/docs/portals.html)

### Hydration

```js
const el = document.getElementById('app')
ReactDOM.hydrate(<App />, el)
```

与 [`render()`](https://zh-hans.reactjs.org/docs/react-dom.html#render) 相同，但它用于在 [`ReactDOMServer`](https://zh-hans.reactjs.org/docs/react-dom-server.html) 渲染的容器中对 HTML 的内容进行 hydrate 操作

查看: [Hydrate](https://reactjs.org/docs/react-dom.html#hydrate)

## 属性验证

### PropTypes

```js
import PropTypes from 'prop-types'
```

查看: [Typechecking with PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)

| Key   | Description |
| ----- | ----------- |
| `any` | Anything    |

#### Basic

| Key      | Description   |
| -------- | ------------- |
| `string` |               |
| `number` |               |
| `func`   | Function      |
| `bool`   | True or false |

#### Enum

| Key                       | Description |
| ------------------------- | ----------- |
| `oneOf`_(any)_            | Enum types  |
| `oneOfType`_(type array)_ | Union       |

#### Array

| Key              | Description |
| ---------------- | ----------- |
| `array`          |             |
| `arrayOf`_(...)_ |             |

#### Object

| Key                 | Description                          |
| ------------------- | ------------------------------------ |
| `object`            |                                      |
| `objectOf`_(...)_   | Object with values of a certain type |
| `instanceOf`_(...)_ | Instance of a class                  |
| `shape`_(...)_      |                                      |

#### Elements

| Key       | Description   |
| --------- | ------------- |
| `element` | React element |
| `node`    | DOM node      |

#### Required

| Key                | Description |
| ------------------ | ----------- |
| `(···).isRequired` | Required    |

### 基础类型

```jsx
MyComponent.propTypes = {
  email:      PropTypes.string,
  seats:      PropTypes.number,
  callback:   PropTypes.func,
  isClosed:   PropTypes.bool,
  any:        PropTypes.any
}
```

### 必填类型

```jsx
MyCo.propTypes = {
  name:  PropTypes.string.isRequired
}
```

### 元素类型

```jsx
MyCo.propTypes = {
  // React element
  element: PropTypes.element,

  // num, string, element, or an array of those
  node: PropTypes.node
}
```

### 枚举 (oneOf)

```jsx
MyCo.propTypes = {
  direction: PropTypes.oneOf([
    'left', 'right'
  ])
}
```

### 数组和对象

```jsx
MyCo.propTypes = {
  list: PropTypes.array,
  ages: PropTypes.arrayOf(PropTypes.number),
  user: PropTypes.object,
  user: PropTypes.objectOf(PropTypes.number),
  message: PropTypes.instanceOf(Message)
}
```

```jsx
MyCo.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    age:  PropTypes.number
  })
}
```

用 `.array[Of]`, `.object[Of]`, `.instanceOf`, `.shape`.

### 自定义校验

```jsx
MyCo.propTypes = {
  customProp: (props, key, componentName) => {
    if (!/matchme/.test(props[key])) {
      return new Error('Validation failed!')
    }
  }
}
```

## 另见

* [React website](https://reactjs.org) _(reactjs.org)_
* [React cheatsheet](https://reactcheatsheet.com/) _(reactcheatsheet.com)_
* [Awesome React](https://github.com/enaqx/awesome-react) _(github.com)_
* [React v0.14 cheatsheet](react@0.14) _Legacy version_

{%endraw%}

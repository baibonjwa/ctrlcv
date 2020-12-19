---
title: React.js
category: React
author: lele88lala,BAI
verification: BAI
path: /react
lang: zh-CN,en
updated: 2020-12-18
keywords:
  - React
intro: |
  React 代码示例
---

## React {data-visible=false}

### 组件

```jsx
import React from "react";
import ReactDOM from "react-dom";
```

```jsx
class Hello extends React.Component {
  render() {
    return <div className="message-box">Hello {this.props.name}</div>;
  }
}
```

```jsx
const el = document.body;
ReactDOM.render(<Hello name="John" />, el);
```

可以使用 [React.js jsfiddle](http://jsfiddle.net/reactjs/69z2wepo/)

```jsx
import React, { Component } from "react";
import ReactDOM from "react-dom";
```

```jsx
class Hello extends Component {
  ...
}
```

### 属性（Property）

```html
<video fullscreen="{true}" autoplay="{false}" />
```

```jsx
render () {
  this.props.fullscreen
  const { fullscreen, autoplay } = this.props
  ···
}
```

使用 this.props 获取传递给组件的属性。

详见: [Properties](https://reactjs.org/docs/tutorial.html#using-props)

### 状态（State）

```jsx
constructor(props) {
  super(props)
  this.state = { username: undefined }
}
```

```jsx
this.setState({ username: "bai" });
```

```jsx
render () {
  this.state.username
  const { username } = this.state
  ···
}
```

使用 State (`this.state`) 管理动态的数据。

通过 [Babel](https://babeljs.io/) 您可以使用 [proposal-class-fields](https://github.com/tc39/proposal-class-fields) 并去除构造函数。

```jsx
class Hello extends Component {
  state = { username: undefined };
  ...
}
```

详见: [States](https://reactjs.org/docs/tutorial.html#reactive-state)

### 组合嵌套

```jsx
class Info extends Component {
  render() {
    const { avatar, username } = this.props;

    return (
      <div>
        <UserAvatar src={avatar} />
        <UserProfile username={username} />
      </div>
    );
  }
}
```

从 React v16.2.0 开始，Fragment 可以用于返回多个子组件，而无需向 DOM 添加额外的包装节点。

```jsx
import React, { Component, Fragment } from "react";

class Info extends Component {
  render() {
    const { avatar, username } = this.props;

    return (
      <Fragment>
        <UserAvatar src={avatar} />
        <UserProfile username={username} />
      </Fragment>
    );
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
  render() {
    return <div className="alert-box">{this.props.children}</div>;
  }
}
```

每个组件都可以获取到 this.props.children，它包含组件的开始标签和结束标签之间的内容。

## 默认值

### 设置默认 props

```jsx
Hello.defaultProps = {
  color: "blue",
};
```

详见: [defaultProps](https://reactjs.org/docs/react-component.html#defaultprops)

### 设置默认 state

```jsx
class Hello extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: true };
  }
}
```

在`constructor()`中设置默认状态。

在没有构造函数的情况下可以使用 [Babel 和 [proposal-class-fields](https://github.com/tc39/proposal-class-fields).。

```jsx
class Hello extends Component {
  state = { visible: true };
}
```

详见: [Setting the default state](https://reactjs.org/docs/react-without-es6.html#setting-the-initial-state)

## 其它组件 {data-columns="3"}

### 函数式组件

```jsx
function MyComponent({ name }) {
  return <div className="message-box">Hello {name}</div>;
}
```

函数组件没有状态。此外，它们的`props`是以函数的第一个参数的形式来传递的。

详见: [Function and Class Components](https://reactjs.org/docs/components-and-props.html#functional-and-class-components)

### Pure Component

```jsx
import React, { PureComponent } from 'react'

class MessageBox extends PureComponent {
  ···
}
```

PureComponent 是 React 组件性能优化的版本，如果 props 或者 state 不变的话不进行渲染。
详见: [Pure components](https://reactjs.org/docs/react-api.html#react.purecomponent)

### 组件 API

```jsx
this.forceUpdate();
```

```jsx
this.setState({ ... })
this.setState(state => { ... })
```

```jsx
this.state;
this.props;
```

这些方法和属性可以用于组件实例。
详见: [Component API](http://facebook.github.io/react/docs/component-api.html)

## 生命周期

### 组件加载

| 方法                     | 描述                                                                                            |
| ------------------------ | ----------------------------------------------------------------------------------------------- |
| `constructor` _(props)_  | 在渲染之前 [#](https://reactjs.org/docs/react-component.html#constructor)                       |
| `render()`               | 渲染 【[#](https://reactjs.org/docs/react-component.html#render)                                |
| `componentDidMount()`    | 在渲染之后(DOM 可用的状态) [#](https://reactjs.org/docs/react-component.html#componentdidmount) |
| `componentWillUnmount()` | 在 DOM 移除之前 [#](https://reactjs.org/docs/react-component.html#componentwillunmount)         |
| `componentDidCatch()`    | Catch errors (16+) [#](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html)     |

在 `constructor()` 中设置初始状态。

在`componentDidMount()`上添加 DOM 事件处理程序，计时器（等），然后在`componentWillUnmou()`上删除它们。

### 组件更新

| 方法                                                    | 描述                                                |
| ------------------------------------------------------- | --------------------------------------------------- |
| `componentDidUpdate` _(prevProps, prevState, snapshot)_ | 可以在这里使用 setState() 方法，记得比较 props 的值 |
| `shouldComponentUpdate` _(newProps, newState)_          | 当返回 fasle 的时候会跳过 render 渲染               |
| `render()`                                              | Render                                              |
| `componentDidUpdate` _(prevProps, prevState)_           | Operate on the DOM here                             |

当父级组件属性更改和调用`.setState（）`时。在初始渲染的时候不会被调用。

详见: [Component specs](http://facebook.github.io/react/docs/component-specs.html#updating-componentwillreceiveprops)

## DOM 元素

### 参考

```jsx
class MyComponent extends Component {
  render() {
    return (
      <div>
        <input ref={(el) => (this.input = el)} />
      </div>
    );
  }

  componentDidMount() {
    this.input.focus();
  }
}
```

允许访问 DOM 元素

详见: [Refs and the DOM](https://reactjs.org/docs/refs-and-the-dom.html)

### DOM 事件

```jsx
class MyComponent extends Component {
  render() {
    <input
      type="text"
      value={this.state.value}
      onChange={(event) => this.onChange(event)}
    />;
  }

  onChange(event) {
    this.setState({ value: event.target.value });
  }
}
```

传递函数至属性中，例如上述 `onChange`

详见: [Events](https://reactjs.org/docs/events.html)

## 其他特性

### 传递 props

```html
<VideoPlayer src="video.mp4" />
```

```jsx
class VideoPlayer extends Component {
  render() {
    return <VideoEmbed {...this.props} />;
  }
}
```

将 src =“ ...” 向下传递到子组件。

详见： [Transferring props](http://facebook.github.io/react/docs/transferring-props.html)

### 顶层 API

```jsx
React.createClass({ ... })
React.isValidElement(c)
```

```jsx
ReactDOM.render(<Component />, domnode, [callback]);
ReactDOM.unmountComponentAtNode(domnode);
```

```jsx
ReactDOMServer.renderToString(<Component />);
ReactDOMServer.renderToStaticMarkup(<Component />);
```

还有很多 API，仅列出的几种最常见的。

详见: [React top-level API](https://reactjs.org/docs/react-api.html)

## JSX 模式

### Style 简写

```jsx
const style = { height: 10 };
return <div style={style}></div>;
```

```jsx
return <div style={{ margin: 0, padding: 0 }}></div>;
```

详见: [Inline styles](https://reactjs.org/tips/inline-styles.html)

### Inner HTML

```jsx
function markdownify() {
  return "<p>...</p>";
}
<div dangerouslySetInnerHTML={{ __html: markdownify() }} />;
```

详见: [Dangerously set innerHTML](https://reactjs.org/tips/dangerously-set-inner-html.html)

### 列表

```jsx
class TodoList extends Component {
  render() {
    const { items } = this.props;

    return (
      <ul>
        {items.map((item) => (
          <TodoItem item={item} key={item.key} />
        ))}
      </ul>
    );
  }
}
```

列表项需要包含一个 key 属性

### 条件渲染

```jsx
<Fragment>{showMyComponent ? <MyComponent /> : <OtherComponent />}</Fragment>
```

### 短路求值（Short-circuit evaluation）

```jsx
<Fragment>
  {showPopup && <Popup />}
  ...
</Fragment>
```

## 新特性

### 返回多个元素

您可以将多个元素作为 arrays 或 fragments 返回。

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

详见: [Fragments and strings](https://reactjs.org/blog/2017/09/26/react-v16.0.html#new-render-return-types-fragments-and-strings)

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

详见: [Error handling in React 16](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html)

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
const el = document.getElementById("app");
ReactDOM.hydrate(<App />, el);
```

与 [`render()`](https://zh-hans.reactjs.org/docs/react-dom.html#render) 相同，但它用于在 [`ReactDOMServer`](https://zh-hans.reactjs.org/docs/react-dom-server.html) 渲染的容器中对 HTML 的内容进行 hydrate 操作

查看: [Hydrate](https://reactjs.org/docs/react-dom.html#hydrate)

## 属性验证

### PropTypes

```js
import PropTypes from "prop-types";
```

查看: [Typechecking with PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)

| Key   | Description |
| ----- | ----------- |
| `any` |             |

#### 基础类型

| Key      | Description   |
| -------- | ------------- |
| `string` |               |
| `number` |               |
| `func`   |
| `bool`   | true 或 false |

#### 枚举

| Key                       | Description |
| ------------------------- | ----------- |
| `oneOf`_(any)_            |             |
| `oneOfType`_(type array)_ |             |

#### 数组

| Key              | Description |
| ---------------- | ----------- |
| `array`          |             |
| `arrayOf`_(...)_ |             |

#### 对象

| Key                 | Description        |
| ------------------- | ------------------ |
| `object`            |                    |
| `objectOf`_(...)_   | 指定确定类型的对象 |
| `instanceOf`_(...)_ | 指定一个类的实例   |
| `shape`_(...)_      |                    |

#### 元素

| Key       | Description |
| --------- | ----------- |
| `element` | React 元素  |
| `node`    | DOM 节点    |

#### 是否必需

| Key                | Description |
| ------------------ | ----------- |
| `(···).isRequired` | Required    |

### 基本类型

```jsx
MyComponent.propTypes = {
  email: PropTypes.string,
  seats: PropTypes.number,
  callback: PropTypes.func,
  isClosed: PropTypes.bool,
  any: PropTypes.any,
};
```

### 必填类型

```jsx
MyCo.propTypes = {
  name: PropTypes.string.isRequired,
};
```

### 元素类型

```jsx
MyCo.propTypes = {
  element: PropTypes.element,
  node: PropTypes.node,
};
```

### 枚举 (oneOf)

```jsx
MyCo.propTypes = {
  direction: PropTypes.oneOf(["left", "right"]),
};
```

### 数组和对象

```jsx
MyCo.propTypes = {
  list: PropTypes.array,
  ages: PropTypes.arrayOf(PropTypes.number),
  user: PropTypes.object,
  user: PropTypes.objectOf(PropTypes.number),
  message: PropTypes.instanceOf(Message),
};
```

```jsx
MyCo.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.number,
  }),
};
```

用 `.array[Of]`, `.object[Of]`, `.instanceOf`, `.shape`.

### 自定义校验

```jsx
MyCo.propTypes = {
  customProp: (props, key, componentName) => {
    if (!/matchme/.test(props[key])) {
      return new Error("Validation failed!");
    }
  },
};
```

## 另见

- [React website](https://reactjs.org) _(reactjs.org)_
- [React cheatsheet](https://reactcheatsheet.com/) _(reactcheatsheet.com)_
- [Awesome React](https://github.com/enaqx/awesome-react) _(github.com)_
- [React v0.14 cheatsheet](react@0.14) _Legacy version_

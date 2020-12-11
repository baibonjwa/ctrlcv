---
title: ES2015+
category: JavaScript
layout: 2017/sheet
tags: [Featured]
updated: 2019-11-14
weight: -10
intro: |
  A quick overview of new JavaScript features in ES2015, ES2016, ES2017, ES2018 and beyond.
---

### 块级作用域

#### Let

```js
function fn () {
  let x = 0
  if (true) {
    let x = 1 // only inside this `if`
  }
}
```
#### Const

```js
const a = 1
```

`let` 是对 `var`的升级版本， const  的作用跟 `let`差不多, 只不过不能被再次重新赋值。
查看: [Let and const](https://www.babeljs.cn/docs/learn/#let--const)

### 反引号字符串

#### 插值

```js
const message = `Hello ${name}`
```

#### 多行字符串

```js
const str = `
hello
world
`
```

模板和多行字符串
查看: [Template strings](https://www.babeljs.cn/docs/learn/#%E6%A8%A1%E6%9D%BF%E5%AD%97%E7%AC%A6%E4%B8%B2)

### 二进制和八进制

```js
let bin = 0b1010010
let oct = 0o755
```

查看: [Binary and octal literals](https://www.babeljs.cn/docs/learn/#%E4%BA%8C%E8%BF%9B%E5%88%B6%E5%92%8C%E5%85%AB%E8%BF%9B%E5%88%B6%E5%AD%97%E9%9D%A2%E9%87%8F)

### 新方法

#### 新字符串方法

```js
"hello".repeat(3)
"hello".includes("ll")
"hello".startsWith("he")
"hello".padStart(8) // "   hello"
"hello".padEnd(8) // "hello   " 
"hello".padEnd(8, '!') // hello!!!
"\u1E9B\u0323".normalize("NFC")
```

查看: [New methods](https://www.babeljs.cn/docs/learn/#math--number--string--object-apis)

### 类（Class）

```js
class Circle extends Shape {
```

#### 构造函数

```js
  constructor (radius) {
    this.radius = radius
  }
```

#### 方法

```js
  getArea () {
    return Math.PI * 2 * this.radius
  }
```

#### 调用超类方法

```js
  expand (n) {
    return super.expand(n) * Math.PI
  }
```

#### 静态方法

```js
  static createFromDiameter(diameter) {
    return new Circle(diameter / 2)
  }
}
```

原型语法糖
查看: [Classes](https://www.babeljs.cn/docs/learn/#%E7%B1%BB%EF%BC%88class%EF%BC%89)

### 指数算法

```js
const byte = 2 ** 8
// Same as: Math.pow(2, 8)
```

Promises
--------

### 创建 promises

```js
new Promise((resolve, reject) => {
  if (ok) { resolve(result) }
  else { reject(error) }
})
```

解决异步编程的问题.
See: [Promises](https://www.babeljs.cn/docs/learn/#promises)

### 使用 promises

```js
promise
  .then((result) => { ··· })
  .catch((error) => { ··· })
```


### promises 中使用 finally

```js
promise
  .then((result) => { ··· })
  .catch((error) => { ··· })
  .finally(() => { // logic independent of success/error })
```

当promise 完成或拒绝时，将调用处理程序。


### Promise 方法

```js
Promise.all(···)
Promise.race(···)
Promise.reject(···)
Promise.resolve(···)
```

### Async-await

```js
async function run () {
  const user = await getUser()
  const tweets = await getTweets(user)
  return [user, tweets]
}
```

`async` 方法是使用函数的另一种方式。

查看: [async function](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)

解构
-------------

### 解构任务

#### Arrays

```js
const [first, last] = ['Nikola', 'Tesla']
```

#### Objects

```js
let {title, author} = {
  title: 'The Silkworm',
  author: 'R. Galbraith'
}
```

支持数组和对象的匹配。
查看: [Destructuring](https://www.babeljs.cn/docs/learn/#%E8%A7%A3%E6%9E%84%EF%BC%88destructuring%EF%BC%89)

### 默认值

```js
const scores = [22, 33]
const [math = 50, sci = 50, arts = 50] = scores
```

```js
// Result:
// math === 22, sci === 33, arts === 50
```


解构数组或对象时可以分配默认值。

### 函数参数

```js
function greet({ name, greeting }) {
  console.log(`${greeting}, ${name}!`)
}
```

```js
greet({ name: 'Larry', greeting: 'Ahoy' })
```

在函数参数中也可以执行对象和数组的解构

### 默认值

```js
function greet({ name = 'Rauno' } = {}) {
  console.log(`Hi ${name}!`);
}
```

```js
greet() // Hi Rauno!
greet({ name: 'Larry' }) // Hi Larry!
```

### 重新分配 key

```js
function printCoordinates({ left: x, top: y }) {
  console.log(`x: ${x}, y: ${y}`)
}
```

```js
printCoordinates({ left: 25, top: 90 })
```

在这个例子中，把 `x`重新分配给`left`键的值

### 循环

```js
for (let {title, artist} of songs) {
  ···
}
```

赋值表达式也可以循环工作。


### 对象解构

```js
const { id, ...detail } = song;
```

使用rest（...）运算符分别提取一些键和对象中的其余键

展开（Spread）
------

### 对象展开

#### 含有对象展开

```js
const options = {
  ...defaults,
  visible: true
}
```

#### 不含对象展开

```js
const options = Object.assign(
  {}, defaults,
  { visible: true })
```

对象的展开运算可以实现在其它对象的基础上创建对象。

查看: [Object spread](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

### 数组展开

#### 含有数组展开

```js
const users = [
  ...admins,
  ...editors,
  'rstacruz'
]
```

#### 不含数组展开

```js
const users = admins
  .concat(editors)
  .concat([ 'rstacruz' ])
```

展开运算可以用相同的方式构建新阵列。

查看: [Spread operator](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

函数
---------

### 函数参数

#### 默认参数

```js
function greet (name = 'Jerry') {
  return `Hello ${name}`
}
```

#### Rest 参数

```js
function fn(x, ...y) {
  // y is an Array
  return x * y.length
}
```

#### 展开

```js
fn(...[1, 2, 3])
// same as fn(1, 2, 3)
```

Default, rest, spread.
查看: [Function arguments](https://www.babeljs.cn/docs/learn/#default--rest--spread)

### 箭头函数

#### 箭头函数

```js
setTimeout(() => {
  ···
})
```

#### 带参数

```js
readFile('text.txt', (err, data) => {
  ...
})
```

#### 隐式返回
```js
numbers.map(n => n * 2)
// No curly braces = implicit return
// Same as: numbers.map(function (n) { return n * 2 })
numbers.map(n => ({
  result: n * 2
}))
// Implicitly returning objects requires parentheses around the object
```

类似于函数，但保留 `this`。
查看: [Fat arrows](https://www.babeljs.cn/docs/learn/#%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0%E4%B8%8E-lexical-this)

Objects
-------

### 简写语法

```js
module.exports = { hello, bye }
// Same as: module.exports = { hello: hello, bye: bye }
```

查看: [Object literal enhancements](https://www.babeljs.cn/docs/learn/#enhanced-object-literals)

### 函数

```js
const App = {
  start () {
    console.log('running')
  }
}
// Same as: App = { start: function () {···} }
```

查看: [Object literal enhancements](https://www.babeljs.cn/docs/learn/#enhanced-object-literals)

### Getters and setters

```js
const App = {
  get closed () {
    return this.status === 'closed'
  },
  set closed (value) {
    this.status = value ? 'closed' : 'open'
  }
}
```

查看: [Object literal enhancements](https://www.babeljs.cn/docs/learn/#enhanced-object-literals)

### 计算属性名称

```js
let event = 'click'
let handlers = {
  [`on${event}`]: true
}
// Same as: handlers = { 'onclick': true }
```

查看: [Object literal enhancements](https://www.babeljs.cn/docs/learn/#enhanced-object-literals)


### 提取值

```js
const fatherJS = { age: 57, name: "Brendan Eich" }

Object.values(fatherJS)
// [57, "Brendan Eich"]
Object.entries(fatherJS)
// [["age", 57], ["name", "Brendan Eich"]]
```


模块
-------

### Imports

```js
import 'helpers'
// aka: require('···')
```

```js
import Express from 'express'
// aka: const Express = require('···').default || require('···')
```

```js
import { indent } from 'helpers'
// aka: const indent = require('···').indent
```

```js
import * as Helpers from 'helpers'
// aka: const Helpers = require('···')
```

```js
import { indentSpaces as indent } from 'helpers'
// aka: const indent = require('···').indentSpaces
```

`import` 是对 `require()`的优化。
查看: [Module imports](https://www.babeljs.cn/docs/learn/#%E6%A8%A1%E5%9D%97)

### Exports

```js
export default function () { ··· }
// aka: module.exports.default = ···
```

```js
export function mymethod () { ··· }
// aka: module.exports.mymethod = ···
```

```js
export const pi = 3.14159
// aka: module.exports.pi = ···
```

`export` 是 `module.exports`的优化。
查看: [Module exports](https://www.babeljs.cn/docs/learn/#%E6%A8%A1%E5%9D%97)

生成器
----------

### 生成器

```js
function* idMaker () {
  let id = 0
  while (true) { yield id++ }
}
```

```js
let gen = idMaker()
gen.next().value  // → 0
gen.next().value  // → 1
gen.next().value  // → 2
```

查看: [Generators](https://www.babeljs.cn/docs/learn/#generators)

### For..of iteration

```js
for (let i of iterable) {
  ···
}
```

用于遍历生成器和数组

查看: [For..of iteration](https://www.babeljs.cn/docs/learn/#iterators--forof)
---
title: ES6/ES2015+
category: JavaScript
author: lele88lala,BAI
---

## ES2015 {data-visible=false}

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

`let` 是新的 `var` 关键字， const  的作用跟 `let` 一样, 只不过不能被再次重新赋值。
详见: [Let and const](https://www.babeljs.cn/docs/learn/#let--const)

### 反引号字符串

#### 字符串

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

详见: [Template strings](https://www.babeljs.cn/docs/learn/#%E6%A8%A1%E6%9D%BF%E5%AD%97%E7%AC%A6%E4%B8%B2)

### 二进制和八进制

```js
let bin = 0b1010010
let oct = 0o755
```

详见: [Binary and octal literals](https://www.babeljs.cn/docs/learn/#%E4%BA%8C%E8%BF%9B%E5%88%B6%E5%92%8C%E5%85%AB%E8%BF%9B%E5%88%B6%E5%AD%97%E9%9D%A2%E9%87%8F)

### 一些新方法

#### 新的字符串方法

```js
"hello".repeat(3)
"hello".includes("ll")
"hello".startsWith("he")
"hello".padStart(8) // "   hello"
"hello".padEnd(8) // "hello   " 
"hello".padEnd(8, '!') // hello!!!
"\u1E9B\u0323".normalize("NFC")
```

详见: [New methods](https://www.babeljs.cn/docs/learn/#math--number--string--object-apis)

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

Class 是原型的一些语法糖
详见: [Classes](https://www.babeljs.cn/docs/learn/#%E7%B1%BB%EF%BC%88class%EF%BC%89)

### 指数算法

```js
const byte = 2 ** 8
// 也可以写成  Math.pow(2, 8)
```

## Promises

### 创建 promises

```js
new Promise((resolve, reject) => {
  if (ok) { resolve(result) }
  else { reject(error) }
})
```

解决异步编程的问题.
详见: [Promises](https://www.babeljs.cn/docs/learn/#promises)

### 使用 Promise

```js
promise
  .then((result) => { ··· })
  .catch((error) => { ··· })
```

### Promise 中使用 finally

```js
promise
  .then((result) => { ··· })
  .catch((error) => { ··· })
  .finally(() => { /* logic independent of success/error */ })
```

当 promise 完成或拒绝时，将调用 finally 中的回调函数。

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

详见: [async function](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)

## 解构

### 解构赋值

#### 数组

```js
const [first, last] = ['Nikola', 'Tesla']
```

#### 对象

```js
let {title, author} = {
  title: 'The Silkworm',
  author: 'R. Galbraith'
}
```

支持数组和对象的解构。
查看: [Destructuring](https://www.babeljs.cn/docs/learn/#%E8%A7%A3%E6%9E%84%EF%BC%88destructuring%EF%BC%89)

### 默认值

```js
const scores = [22, 33]
const [math = 50, sci = 50, arts = 50] = scores
// Result:
// math === 22, sci === 33, arts === 50
```

解构数组或对象时可以设置默认值。

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

### 函数参数中的默认值

```js
function greet({ name = 'Rauno' } = {}) {
  console.log(`Hi ${name}!`);
}
```

```js
greet() // Hi Rauno!
greet({ name: 'Larry' }) // Hi Larry!
```

### 重新设置 key

```js
function printCoordinates({ left: x, top: y }) {
  console.log(`x: ${x}, y: ${y}`)
}
```

```js
printCoordinates({ left: 25, top: 90 })
```

在这个例子中，把 `x` 重新分配给 `left` 键的值

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

## 展开（Spread）

### 对象展开

```js
const options = {
  ...defaults,
  visible: true
}
```

```js
const options = Object.assign(
  {}, defaults,
  { visible: true })
```

对象的展开运算可以使你在一个对象的基础上创建一个新对象。

详见: [Object spread](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

### 数组展开

```js
const users = [
  ...admins,
  ...editors,
  'rstacruz'
]
```

```js
const users = admins
  .concat(editors)
  .concat([ 'rstacruz' ])
```

展开运算可以用相同的方式构建新阵列。

查看: [Spread operator](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

## 函数

### 默认参数

```js
function greet (name = 'Jerry') {
  return `Hello ${name}`
}
```

### 剩余(Rest)参数

```js
function fn(x, ...y) {
  // y is an Array
  return x * y.length
}
```

### 函数展开

```js
fn(...[1, 2, 3])
// 与 fn(1, 2, 3) 相同
```

详见: [Function arguments](https://www.babeljs.cn/docs/learn/#default--rest--spread)

### 箭头函数

```js
setTimeout(() => {
  ···
})
```

```js
readFile('text.txt', (err, data) => {
  ...
})
```

```js
// 无内层的花括号可以隐式返回
numbers.map(n => n * 2)
// 与 numbers.map(function (n) { return n * 2 }) 相同
numbers.map(n => ({ result: n * 2 }))
// 也可以返回一个对象
```

箭头函数与普通函数类似，但保留 `this` 的作用域
详见: [Fat arrows](https://www.babeljs.cn/docs/learn/#%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0%E4%B8%8E-lexical-this)

## 对象相关

### 简写语法

```js
module.exports = { hello, bye }
// 与 module.exports = { hello: hello, bye: bye } 相同
```

详见: [Object literal enhancements](https://www.babeljs.cn/docs/learn/#enhanced-object-literals)

### 对象方法

```js
const App = {
  start () {
    console.log('running')
  }
}
// 与 App = { start: function () {···} } 相同
```

详见: [Object literal enhancements](https://www.babeljs.cn/docs/learn/#enhanced-object-literals)

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

详见: [Object literal enhancements](https://www.babeljs.cn/docs/learn/#enhanced-object-literals)

### 动态属性名称

```js
let event = 'click'
let handlers = {
  [`on${event}`]: true
}
// 与 handlers = { 'onclick': true } 相同
```

详见: [Object literal enhancements](https://www.babeljs.cn/docs/learn/#enhanced-object-literals)

### 提取(Extract)值

```js
const fatherJS = { age: 57, name: "张三" }

Object.values(fatherJS)
// [57, "张三"]
Object.entries(fatherJS)
// [["age", 57], ["name", "张三"]]
```

## 模块

### 导入（Import)

```js
import 'helpers'
// require('···')
```

```js
import Express from 'express'
// const Express = require('···').default || require('···')
```

```js
import { indent } from 'helpers'
// const indent = require('···').indent
```

```js
import * as Helpers from 'helpers'
// const Helpers = require('···')
```

```js
import { indentSpaces as indent } from 'helpers'
// const indent = require('···').indentSpaces
```

`import` 是对 `require()`的优化。
详见: [Module imports](https://www.babeljs.cn/docs/learn/#%E6%A8%A1%E5%9D%97)

### 导出（Export）

```js
export default function () { ··· }
// aka: module.exports.default = ···
```

```js
export function mymethod () { ··· }
// module.exports.mymethod = ···
```

```js
export const pi = 3.14159
// module.exports.pi = ···
```

`export` 是 `module.exports`的优化。
详见: [Module exports](https://www.babeljs.cn/docs/learn/#%E6%A8%A1%E5%9D%97)

## 生成器(Generator)

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

详见: [Generators](https://www.babeljs.cn/docs/learn/#generators)

### For..of 迭代

```js
for (let i of iterable) {
  ···
}
```

用于遍历生成器和数组

详见: [For..of iteration](https://www.babeljs.cn/docs/learn/#iterators--forof)

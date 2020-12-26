---
title: Go
categories:
  - Language
contributors:
  - BAI
---

## GO

### 介绍

- [Go tour](https://tour.golang.org/welcome/1) _(tour.golang.org)_
- [Go repl](https://repl.it/languages/go) _(repl.it)_
- [Go Wiki](https://github.com/golang/go/wiki/) _(github.com)_

### Hello world

#### hello.go

```go
package main

import "fmt"

func main() {
  message := greetMe("world")
  fmt.Println(message)
}

func greetMe(name string) string {
  return "Hello, " + name + "!"
}
```

```bash
$ go build
```

也可以在 [Go repl](https://repl.it/languages/go),或 [A Tour of Go](https://tour.golang.org/welcome/1). 做实验

### 变量

#### 变量声明

```go
var msg string
msg = "Hello"
```

#### 缩写（推断类型）

```go
msg := "Hello"
```

### 常量

```go
const Phi = 1.618
```

常量可以是字符、字符串、布尔值或数字类型

详见: [Constants](https://tour.golang.org/basics/15)

## 基本类型

### 字符串

```go
str := "Hello"
```

```go
str := `Multiline
string`
```

### 数字

#### 基本的数字类型

```go
num := 3          // int
num := 3.         // float64
num := 3 + 4i     // complex128
num := byte('a')  // byte (alias for uint8)
```

#### 其他类型

```go
var u uint = 7        // uint (无符号)
var p float32 = 22.7  // 32-bit float
```

### 数组

```go
// var numbers [5]int
numbers := [...]int{0, 0, 0, 0, 0}
```

数组需要一个固定的尺寸

### Slice

```go
slice := []int{2, 3, 4}
```

```go
slice := []byte("Hello")
```

Slice 类型可以有动态的尺寸

### 指针

```go
func main () {
  b := *getPointer()
  fmt.Println("Value is", b)
}
```

```go
func getPointer () (myPointer *int) {
  a := 234
  return &a
}
```

```go
a := new(int)
*a = 234
```

指针指向一个变量的内存所在的位置，Go 是一种完全的垃圾回收机制的语言。
Pointers point to a memory location of a variable. Go is fully garbage-collected.

详见: [指针](https://tour.golang.org/moretypes/1)

### 类型转换

```go
i := 2
f := float64(i)
u := uint(i)
```

详见: [类型转换](https://tour.golang.org/basics/13)

## 控制流

### 条件语句

```go
if day == "sunday" || day == "saturday" {
  rest()
} else if day == "monday" && isTired() {
  groan()
} else {
  work()
}
```

详 f: [If](https://tour.golang.org/flowcontrol/5)

### if 条件中的语句

```go
if _, err := doThing(); err != nil {
  fmt.Println("Uh oh")
}
```

在 `if` 语句中可以执行一系列其他带 `;` 的语句。生命的变量仅在 `if` 这个作用域内生效

详见: [If with a short statement](https://tour.golang.org/flowcontrol/6)

### Switch 语句

```go
switch day {
  case "sunday":
    // case 语句不会向下vixy
    fallthrough

  case "saturday":
    rest()

  default:
    work()
}
```

详见: [Switch](https://github.com/golang/go/wiki/Switch)

### For 循环

```go
for count := 0; count <= 10; count++ {
  fmt.Println("My counter is at", count)
}
```

详见: [For 循环](https://tour.golang.org/flowcontrol/1)

### For-Range 循环

```go
entry := []string{"Jack","John","Jones"}
for i, val := range entry {
  fmt.Printf("At position %d, the character %s is present\n", i, val)
}
```

详见: [For-Range 循环](https://gobyexample.com/range)

### While 循环

```go
n := 0
x := 42
for n != x {
  n := guess()
}
```

详见: [Go 的 "while"](https://tour.golang.org/flowcontrol/3)

## 函数

### Lambda

```go
myfunc := func() bool {
  return x > 10000
}
```

函数是第一个类对象

### 多类型返回

```go
a, b := getMessage()
```

```go
func getMessage() (a string, b string) {
  return "Hello", "World"
}
```

### 带命名的返回值

```go
func split(sum int) (x, y int) {
  x = sum * 4 / 9
  y = sum - x
  return
}
```

详见: [Named return values](https://tour.golang.org/basics/7)

## 包

### 导入

```go
import "fmt"
import "math/rand"
```

```go
import (
  "fmt"        // gives fmt.Println
  "math/rand"  // gives rand.Intn
)
```

上面两者等效

详见: [Importing](https://tour.golang.org/basics/1)

### 别名

```go
import r "math/rand"
```

```go
r.Intn()
```

### 导出命名

```go
func Hello () {
  ···
}
```

导出的名称需要大写开头

详见: [Exported names](https://tour.golang.org/basics/3)

### 包

```go
package hello
```

Every package file has to start with `package`.

## 并发

### Goroutines

```go
func main() {
  // 一个 Channel
  ch := make(chan string)

  // 开始并发
  go push("Moe", ch)
  go push("Larry", ch)
  go push("Curly", ch)

  // 读取 3 个结果
  // 因为goroutines 是并发的，所以顺序不固定
  fmt.Println(<-ch, <-ch, <-ch)
}
```

```go
func push(name string, ch chan string) {
  msg := "Hey, " + name
  ch <- msg
}
```

Channel 是并发安全的通讯对象，可以在 goroutines 中 使用

详见: [Goroutines](https://tour.golang.org/concurrency/1), [Channels](https://tour.golang.org/concurrency/2)

### 带缓存的 Channel

```go
ch := make(chan int, 2)
ch <- 1
ch <- 2
ch <- 3
// fatal error:
// all goroutines are asleep - deadlock!
```

带缓存的 Channel 限制了可以保存的消息的数量

详见: [Buffered channels](https://tour.golang.org/concurrency/3)

### 关闭 Channel

#### 关闭一个 Channel

```go
ch <- 1
ch <- 2
ch <- 3
close(ch)
```

#### 迭代 Channel 直到频道关闭

```go
for i := range ch {
  ···
}
```

#### 如果 `ok === false` 则关闭

```go
v, ok := <- ch
```

详见: [Range and close](https://tour.golang.org/concurrency/4)

### WaitGroup

```go
import "sync"

func main() {
  var wg sync.WaitGroup

  for _, item := range itemList {
    // 增加 WaitGroup 计数器
    wg.Add(1)
    go doOperation(item)
  }
  // 等待 goroutines 完成
  wg.Wait()

}
```

```go
func doOperation(item string) {
  defer wg.Done()
  // do operation on item
  // ...
}
```

一个 WaitGroup 会等待一组 goroutines 执行完毕。主 goroutines 执行时会添加其他需要等待的 goroutines。 goroutines 执行 `wg.Done()` 时结束

详见: [WaitGroup](https://golang.org/pkg/sync/#WaitGroup)

## 错误控制

### Defer

```go
func main() {
  defer fmt.Println("Done")
  fmt.Println("Working...")
}
```

Defer 可以执行一个函数，直到被包裹的函数返回，其参数会直接计算，但函数调用不会直接执行

详见: [Defer, panic and recover](https://blog.golang.org/defer-panic-and-recover)

### Defer 函数

```go
func main() {
  defer func() {
    fmt.Println("Done")
  }()
  fmt.Println("Working...")
}
```

Lambda 操作符更适合 defer 块

```go
func main() {
  var d = int64(0)
  defer func(d *int64) {
    fmt.Printf("& %v Unix Sec\n", *d)
  }(&d)
  fmt.Print("Done ")
  d = time.Now().Unix()
}
```

除非我们用一个指针去在在 main 函数的末尾去取值，不然 Defer 函数会使用当前 d 的值，

## 结构体

### 定义

```go
type Vertex struct {
  X int
  Y int
}
```

```go
func main() {
  v := Vertex{1, 2}
  v.X = 4
  fmt.Println(v.X, v.Y)
}
```

详见: [Structs](https://tour.golang.org/moretypes/2)

### 语法

```go
v := Vertex{X: 1, Y: 2}
```

```go
// 字段名可省略
v := Vertex{1, 2}
```

```go
// Y 是隐式的
v := Vertex{X: 1}
```

你也可以设置字段名

### 结构体指针

```go
v := &Vertex{1, 2}
v.X = 2
```

当 `v` 是指针时。`v.X` 和 `(*v).X` 一样;

## 方法

### Receiver

```go
type Vertex struct {
  X, Y float64
}
```

```go
func (v Vertex) Abs() float64 {
  return math.Sqrt(v.X * v.X + v.Y * v.Y)
}
```

```go
v := Vertex{1, 2}
v.Abs()
```

上面这些不是类，但是你可以用 _receivers_ 定义方法

详见: [Methods](https://tour.golang.org/methods/1)

### Mutation

```go
func (v *Vertex) Scale(f float64) {
  v.X = v.X * f
  v.Y = v.Y * f
}
```

```go
v := Vertex{6, 12}
v.Scale(0.5)
// `v` is updated
```

通过将你的 receiver 定义为一个指针，你可以直接修改其中的值。

详见: [Pointer receivers](https://tour.golang.org/methods/4)

## 接口

### 基本接口

```go
type Shape interface {
  Area() float64
  Perimeter() float64
}
```

### 结构

```go
type Rectangle struct {
  Length, Width float64
}
```

`Rectangle` 结构通过实现了 `Shape` 的全部方法隐式实现了 `Shape` 接口

### 方法

```go
func (r Rectangle) Area() float64 {
  return r.Length * r.Width
}

func (r Rectangle) Perimeter() float64 {
  return 2 * (r.Length + r.Width)
}
```

这些方法定义在 `Shape`中，并在 `Rectangle` 中实现。

### 接口示例

```go
func main() {
  var r Shape = Rectangle{Length: 3, Width: 4}
  fmt.Printf("Type of r: %T, Area: %v, Perimeter: %v.", r, r.Area(), r.Perimeter())
}
```

## 参考

### 官方资料

- [A tour of Go](https://tour.golang.org/welcome/1) _(tour.golang.org)_
- [Golang wiki](https://github.com/golang/go/wiki/) _(github.com)_
- [Effective Go](https://golang.org/doc/effective_go.html) _(golang.org)_

### 其他链接

- [Go by Example](https://gobyexample.com/) _(gobyexample.com)_
- [Awesome Go](https://awesome-go.com/) _(awesome-go.com)_
- [JustForFunc Youtube](https://www.youtube.com/channel/UC_BzFbxG2za3bp5NRRRXJSw) _(youtube.com)_
- [Style Guide](https://github.com/golang/go/wiki/CodeReviewComments) _(github.com)_

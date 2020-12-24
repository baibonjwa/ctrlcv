---
title: Elixir
categories:
  - Elixir
contributors:
  - BAI
---

## Getting started

### Hello world

```elixir
# hello.exs
defmodule Greeter do
  def greet(name) do
    message = "Hello, " <> name <> "!"
    IO.puts message
  end
end

Greeter.greet("world")
```

```bash
elixir hello.exs
# Hello, world!
```

### 变量

```elixir
age = 23
```

### Map

```elixir
user = %{
  name: "John",
  city: "Melbourne"
}
```

```elixir
IO.puts "Hello, " <> user.name
```

### List

```elixir
users = [ "Tom", "Dick", "Harry" ]
```

```elixir
Enum.map(users, fn user ->
  IO.puts "Hello " <> user
end)
```

### Piping

```elixir
source
|> transform(:hello)
|> print()
```

```elixir
print(transform(source, :hello))
```

上面两个等价

### 模式匹配

```elixir
user = %{name: "Tom", age: 23}
%{name: username} = user
```

上面语境将 `username` 赋值为 `"TOM"`

### 函数中的模式匹配

```elixir
def greet(%{name: username}) do
  IO.puts "Hello, " <> username
end

user = %{name: "Tom", age: 23}
```

模式匹配也可以在函数参数中使用

## 控制流

### If

```elixir
if false do
  "This will never be seen"
else
  "This will"
end
```

### Case

```elixir
case {1, 2, 3} do
  {4, 5, 6} ->
    "This clause won't match"
  {1, x, 3} ->
    "This will match and bind x to 2"
  _ ->
   "This will match any value"
end
```

### Cond

```elixir
cond do
  1 + 1 == 3 ->
    "I will never be seen"
  2 * 5 == 12 ->
    "Me neither"
  true ->
    "But I will (this is essentially an else)"
end
```

### Errors

```elixir
try do
  throw(:hello)
catch
  message -> "Got #{message}."
after
  IO.puts("I'm the after clause.")
end
```

## 类型

### 原始类型

| Sample                  | Type            |
| ----------------------- | --------------- |
| `nil`                   | Nil/null        |
| `true` _/_ `false`      | Boolean         |
| ---                     | ---             |
| `?a`                    | Integer (ASCII) |
| `23`                    | Integer         |
| `3.14`                  | Float           |
| ---                     | ---             |
| `'hello'`               | Charlist        |
| `<<2, 3>>`              | Binary          |
| `"hello"`               | Binary string   |
| `:hello`                | Atom            |
| ---                     | ---             |
| `[a, b]`                | List            |
| `{a, b}`                | Tuple           |
| ---                     | ---             |
| `%{a: "hello"}`         | Map             |
| `%MyStruct{a: "hello"}` | Struct          |
| `fn -> ... end`         | Function        |

### 类型检查

```elixir
is_atom/1
is_bitstring/1
is_boolean/1
is_function/1
is_function/2
is_integer/1
is_float/1
```

```elixir
is_binary/1
is_list/1
is_map/1
is_tuple/1
```

```elixir
is_nil/1
is_number/1
is_pid/1
is_port/1
is_reference/1
```

### 操作符

```elixir
left != right   # equal
left !== right  # match
left ++ right   # concat lists
left <> right   # concat string/binary
left =~ right   # regexp
```

## 模块

### 导入

```elixir
require Redux   # compiles a module
import Redux    # compiles, and you can use without the `Redux.` prefix

use Redux       # compiles, and runs Redux.__using__/1
use Redux, async: true

import Redux, only: [duplicate: 2]
import Redux, only: :functions
import Redux, only: :macros

import Foo.{Bar, Baz}
```

### 别名（Alias）

```elixir
alias Foo.Bar, as: Bar
alias Foo.Bar   # same as above

alias Foo.{Bar, Baz}
```

## 字符串

### 常用函数

```elixir
import String
```

```elixir
str = "hello"
str |> length()        # → 5
str |> codepoints()    # → ["h", "e", "l", "l", "o"]
str |> slice(2..-1)    # → "llo"
str |> split(" ")      # → ["hello"]
str |> capitalize()    # → "Hello"
str |> match(regex)
```

### 检查对象

```elixir
inspect(object, opts \\ [])
```

```elixir
value |> IO.inspect()
```

```elixir
value |> IO.inspect(label: "value")
```

## 数字

### 操作符

```elixir
abs(n)
round(n)
rem(a, b)   # remainder (modulo)
div(a, b)   # integer division
```

### Float

```elixir
import Float
```

```elixir
n = 10.3
```

```elixir
n |> ceil()            # → 11.0
n |> ceil(2)           # → 11.30
n |> to_string()       # → "1.030000+e01"
n |> to_string([decimals: 2, compact: true])
```

```elixir
Float.parse("34")  # → { 34.0, "" }
```

### Integer

```elixir
import Integer
```

```elixir
n = 12
```

```elixir
n |> digits()         # → [1, 2]
n |> to_charlist()    # → '12'
n |> to_string()      # → "12"
n |> is_even()
n |> is_odd()
```

```elixir
# Different base:
n |> digits(2)        # → [1, 1, 0, 0]
n |> to_charlist(2)   # → '1100'
n |> to_string(2)     # → "1100"
```

```elixir
parse("12")           # → {12, ""}
undigits([1, 2])      # → 12
```

### Type 转换

```elixir
Float.parse("34.1")    # → {34.1, ""}
Integer.parse("34")    # → {34, ""}
```

```elixir
Float.to_string(34.1)  # → "3.4100e+01"
Float.to_string(34.1, [decimals: 2, compact: true])  # → "34.1"
```

## Map

### 定义

```elixir
m = %{name: "hi"}       # atom keys (:name)
m = %{"name" => "hi"}   # string keys ("name")
```

### 更改

```elixir
import Map
```

```elixir
m = %{m | name: "yo"}  # key must exist
```

```elixir
m |> put(:id, 2)      # → %{id: 2, name: "hi"}
m |> put_new(:id, 2)  # only if `id` doesn't exist (`||=`)
```

```elixir
m |> put(:b, "Banana")
m |> merge(%{b: "Banana"})
m |> update(:a, &(&1 + 1))
m |> update(:a, fun a -> a + 1 end)
```

```elixir
m |> get_and_update(:a, &(&1 || "default"))
# → {old, new}
```

### 删除

```elixir
m |> delete(:name)  # → %{}
m |> pop(:name)     # → {"John", %{}}
```

### 读取

```elixir
m |> get(:id)       # → 1
m |> keys()         # → [:id, :name]
m |> values()       # → [1, "hi"]
```

```elixir
m |> to_list()      # → [id: 1, name: "hi"]
                    # → []
```

### 深层读取

```elixir
put_in(map, [:b, :c], "Banana")
put_in(map[:b][:c], "Banana")    # via macros
```

```elixir
get_and_update_in(users, ["john", :age], &{&1, &1 + 1})
```

### 从 List 中构建

```elixir
Map.new([])
Map.new([a: 1, b: 2])
Map.new([:a, :b], fn x -> {x, x} end)  # → %{a: :a, b: :b}
```

## List

```elixir
import List
```

```elixir
l = [ 1, 2, 3, 4 ]
```

```elixir
l = l ++ [5]         # push (append)
l = [ 0 | list ]     # unshift (prepend)
```

```elixir
l |> first()
l |> last()
```

```elixir
l |> flatten()
l |> flatten(tail)
```

详见 [Enum](#enum).

## Enum

### 用法

```elixir
import Enum
```

```elixir
list = [:a, :b, :c]
```

```elixir
list |> at(0)         # → :a
list |> count()       # → 3
list |> empty?()      # → false
list |> any?()        # → true
```

```elixir
list |> concat([:d])  # → [:a, :b, :c, :d]
```

也可以用 Stream 代替

### Map 和 Reduce

```elixir
list |> reduce(fn)
list |> reduce(acc, fn)
list |> map(fn)
list |> reject(fn)
list |> any?(fn)
list |> empty?(fn)
```

```elixir
[1, 2, 3, 4]
|> Enum.reduce(0, fn(x, acc) -> x + acc end)
```

## Tuple

### Tuple

```elixir
import Tuple
```

```elixir
t = { :a, :b }
```

```elixir
t |> elem(1)    # like tuple[1]
t |> put_elem(index, value)
t |> tuple_size()
```

### 带关键字的 List

```elixir
list = [{ :name, "John" }, { :age, 15 }]
list[:name]
```

```elixir
# For string-keyed keyword lists
list = [{"size", 2}, {"type", "shoe"}]
List.keyfind(list, "size", 0)  # → {"size", 2}
```

## 函数

### Lambda

```elixir
square = fn n -> n*n end
square.(20)
```

### & 标识符

```elixir
square = &(&1 * &1)
square.(20)

square = &Math.square/1
```

### 函数执行

```elixir
fun.(args)
apply(fun, args)
apply(module, fun, args)
```

### 函数头

```elixir
def join(a, b \\ nil)
def join(a, b) when is_nil(b) do: a
def join(a, b) do: a <> b
```

## 结构体

### 结构体

```elixir
defmodule User do
  defstruct name: "", age: nil
end

%User{name: "John", age: 20}

%User{}.struct  # → User
```

详见: [Structs](http://elixir-lang.org/getting-started/structs.html)

## 协议（Protocol）

### 定义

```elixir
defprotocol Blank do
  @doc "Returns true if data is considered blank/empty"
  def blank?(data)
end
```

```elixir
defimpl Blank, for: List do
  def blank?([]), do: true
  def blank?(_), do: false
end

Blank.blank?([])  # → true
```

### Any

```elixir
defimpl Blank, for: Any do ... end

defmodule User do
  @derive Blank     # Falls back to Any
  defstruct name: ""
end
```

### 示例

- `Enumerable` and `Enum.map()`
- `Inspect` and `inspect()`

## 推导式

### For

```elixir
for n <- [1, 2, 3, 4], do: n * n
for n <- 1..4, do: n * n
```

```elixir
for {key, val} <- %{a: 10, b: 20}, do: val
# → [10, 20]
```

```elixir
for {key, val} <- %{a: 10, b: 20}, into: %{}, do: {key, val*val}
```

### 条件

```elixir
for n <- 1..10, rem(n, 2) == 0, do: n
# → [2, 4, 6, 8, 10]
```

### 复杂的示例

```elixir
for dir <- dirs,
    file <- File.ls!(dir),          # 嵌套
    path = Path.join(dir, file),    # 调用
    File.regular?(path) do          # 条件判断
  IO.puts(file)
end
```

## Misc

### 元编程

```elixir
__MODULE__
__MODULE__.__info__

@after_compile __MODULE__
def __before_compile__(env)
def __after_compile__(env, _bytecode)
def __using__(opts)    # invoked on `use`

@on_definition {__MODULE__, :on_def}
def on_def(_env, kind, name, args, guards, body)

@on_load :load_check
def load_check
```

### 正则

```elixir
exp = ~r/hello/
exp = ~r/hello/i
"hello world" =~ exp
```

### Sigil

```elixir
~r/regexp/
~w(list of strings)
~s|strings with #{interpolation} and \x20 escape codes|
~S|no interpolation and no escapes|
~c(charlist)
```

允许的字符: `/` `|` `"` `'` `(` `[` `{` `<` `"""`.
详见: [Sigils](http://elixir-lang.org/getting-started/sigils.html)

### 类型 Spec

```elixir
@spec round(number) :: integer

@type number_with_remark :: {number, String.t}
@spec add(number, number) :: number_with_remark
```

相关资料:
[dialyzer](http://www.erlang.org/doc/man/dialyzer.html).
[Typespecs](http://elixir-lang.org/getting-started/typespecs-and-behaviours.html)

### 行为

```elixir
defmodule Parser do
  @callback parse(String.t) :: any
  @callback extensions() :: [String.t]
end
```

```elixir
defmodule JSONParser do
  @behaviour Parser

  def parse(str), do: # ... parse JSON
  def extensions, do: ["json"]
end
```

详见: [Module](http://elixir-lang.org/docs/stable/elixir/Module.html)

## 参考资料

- [Learn Elixir in Y minutes](https://learnxinyminutes.com/docs/elixir/)

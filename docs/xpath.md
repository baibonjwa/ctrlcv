---
title: Xpath
categories:
  - HTML
description: |
  Xpath 各种示例
contributors:
  - BAI
---

## 测试工具

### Xpath 测试工具

- [Xpath 测试工具](http://xpather.com) _(xpather.com)_

### 在浏览器的 Console 中测试

```js
$x("//div");
```

## 选择器

### 后代选择器

| CSS            | Xpath       | ?              |
| -------------- | ----------- | -------------- |
| `h1`           | `//h1`      | [?](#prefixes) |
| `div p`        | `//div//p`  | [?](#axes)     |
| `ul > li`      | `//ul/li`   | [?](#axes)     |
| `ul > li > a`  | `//ul/li/a` |                |
| `div > *`      | `//div/*`   |                |
| ----           | ----        | --             |
| `:root`        | `/`         | [?](#prefixes) |
| `:root > body` | `/body`     |                |

### 属性选择器

| CSS                    | Xpath                                                    | ?                      |
| ---------------------- | -------------------------------------------------------- | ---------------------- |
| `#id`                  | `//*[@id="id"]`                                          | [?](#predicates)       |
| `.class`               | `//*[@class="class"]` _...[kinda](#class-check)_         |                        |
| `input[type="submit"]` | `//input[@type="submit"]`                                |                        |
| `a#abc[for="xyz"]`     | `//a[@id="abc"][@for="xyz"]`                             | [?](#chaining-order)   |
| `a[rel]`               | `//a[@rel]`                                              |                        |
| ----                   | ----                                                     | --                     |
| `a[href^='/']`         | `//a[starts-with(@href, '/')]`                           | [?](#string-functions) |
| `a[href$='pdf']`       | `//a[ends-with(@href, '.pdf')]`                          |                        |
| `a[href*='://']`       | `//a[contains(@href, '://')]`                            |                        |
| `a[rel~='help']`       | `//a[contains(@rel, 'help')]` _...[kinda](#class-check)_ |                        |

### 顺序选择器

| CSS                    | Xpath               | ?              |
| ---------------------- | ------------------- | -------------- |
| `ul > li:first-child`  | `//ul/li[1]`        | [?](#indexing) |
| `ul > li:nth-child(2)` | `//ul/li[2]`        |                |
| `ul > li:last-child`   | `//ul/li[last()]`   |                |
| `li#id:first-child`    | `//li[@id="id"][1]` |                |
| `a:first-child`        | `//a[1]`            |                |
| `a:last-child`         | `//a[last()]`       |                |

### 相邻节点（Sibling）选择器

| CSS        | Xpath                                | ?                |
| ---------- | ------------------------------------ | ---------------- |
| `h1 ~ ul`  | `//h1/following-sibling::ul`         | [?](#using-axes) |
| `h1 + ul`  | `//h1/following-sibling::ul[1]`      |                  |
| `h1 ~ #id` | `//h1/following-sibling::[@id="id"]` |                  |

### jQuery

| CSS                          | Xpath                            | ?                |
| ---------------------------- | -------------------------------- | ---------------- |
| `$('ul > li').parent()`      | `//ul/li/..`                     | [?](#other-axes) |
| `$('li').closest('section')` | `//li/ancestor-or-self::section` |                  |
| `$('a').attr('href')`        | `//a/@href`                      | [?](#steps)      |
| `$('span').text()`           | `//span/text()`                  |                  |

### 其他

| CSS                     | Xpath                             | ?                       |
| ----------------------- | --------------------------------- | ----------------------- | ------------ |
| `h1:not([id])`          | `//h1[not(@id)]`                  | [?](#boolean-functions) |
| Text match              | `//button[text()="Submit"]`       | [?](#operators)         |
| Text match (substring)  | `//button[contains(text(),"Go")]` |                         |
| Arithmetic              | `//product[@price > 2.50]`        |                         |
| Has children            | `//ul[*]`                         |                         |
| Has children (specific) | `//ul[li]`                        |                         |
| Or logic                | `//a[@name or @href]`             | [?](#operators)         |
| Union (joins results)   | `//a                              | //div`                  | [?](#unions) |

### 类检查

```bash
//div[contains(concat(' ',normalize-space(@class),' '),' foobar ')]
```

Xpath doesn't have the "check if part of space-separated list" operator, so this is the workaround ([source](http://pivotallabs.com/xpath-css-class-matching/)).

## 表达式

### 步和轴

| 轴   | 步   | 轴  | 步              |
| ---- | ---- | --- | --------------- |
| `//` | `ul` | `/` | `a[@id='link']` |

### XPath 前缀

| 前缀 | 示例                  | 说明     |
| ---- | --------------------- | -------- |
| `//` | `//hr[@class='edge']` | 任何位置 |
| `./` | `./a`                 | 相对位置 |
| `/`  | `/html/body/div`      | 根元素   |

### 轴(Axis)

| 轴   | 示例                | 说明     |
| ---- | ------------------- | -------- |
| `/`  | `//ul/li/a`         | 直接后代 |
| `//` | `//[@id="list"]//a` | 全部后代 |

用 `/` 选取直接的后代. 用 `//` 选择全部后代

### 步（Steps）

```xpath
//div
//div[@name='box']
//[@id='link']
```

每一"步"可以有一个元素名和一个[谓词](#predicate)。都是可选的。

```bash
//a/text()
//a/@href
//a/*
```

## 谓词(Predicate)

### 谓词

```bash
//div[true()]
//div[@class="head"]
//div[@class="head"][@id="top"]
```

### 操作符

```bash
//a[@id = "xyz"]
//a[@id != "xyz"]
//a[@price > 25]
```

```bash
# 与或非
//div[@id="head" and position()=2]
//div[(x and y) or not(z)]
```

### 使用节点

```bash
# 在函数中使用
//ul[count(li) > 2]
//ul[count(li[@class='hide']) > 0]
```

```bash
# 下面结果返回有 li 标签的 ul
//ul[li]
```

你也可以在节点中使用谓词

### 索引

```bash
//a[1]                  # 第一个 <a>
//a[last()]             # 最后一个 <a>
//ol/li[2]              # 第二个 <li>
//ol/li[position()=2]   # 同上
//ol/li[position()>1]   # 不是第一个元素，同 :not(:first-child)
```

### 链的顺序

```bash
a[1][@href='/']
a[@href='/'][1]
```

前后顺序是很重要的，上面两个的结果是不一样的

### 嵌套谓词

```bash
//section[.//h1[@id='hi']]
```

上面的结果返回子节点中含有 `id='hi'` 属性的 `<h1>` 的 `<section>`

## 函数

### 节点函数

```bash
name()                     # //[starts-with(name(), 'h')]
text()                     # //button[text()="Submit"]
                           # //button/text()
lang(str)
namespace-uri()
```

```bash
count()                    # //table[count(tr)=1]
position()                 # //ol/li[position()=2]
```

### 布尔函数

```bash
not(expr)                  # button[not(starts-with(text(),"Submit"))]
```

### 字符串函数

```bash
contains()                 # font[contains(@class,"head")]
starts-with()              # font[starts-with(@class,"head")]
ends-with()                # font[ends-with(@class,"head")]
```

```bash
concat(x,y)
substring(str, start, len)
substring-before("01/02", "/")  #=> 01
substring-after("01/02", "/")   #=> 02
translate()
normalize-space()
string-length()
```

### 类型转换

```bash
string()
number()
boolean()
```

## 轴（Axis）

### 轴的使用示例

```bash
//ul/li                       # ul > li
//ul/child::li                # ul > li (same)
//ul/following-sibling::li    # ul ~ li
//ul/descendant-or-self::li   # ul li
//ul/ancestor-or-self::li     # $('ul').closest('li')
```

每一"步"的表达式均由 `/` 分隔， 通常用于选择子节点，但这个也不是永远唯一的，比如也可以使用`::`

| `//` | `ul` | `/child::` | `li` |
| 轴 | 步 | 轴 | 步 |

### 子轴

```bash
# 下面两种写法等效
//ul/li/a
//child::ul/child::li/child::a
```

```bash
# 下面两种写法等效
# 下面的能成功执行时因为 `child::li` 是正确的，所以谓词成立
//ul[li]
//ul[child::li]
```

```bash
# 下面两种写法等效
//ul[count(li) > 2]
//ul[count(child::li) > 2]
```

### Descendant-or-self 轴

```bash
# 下面两种写法等效
//div//h4
//div/descendant-or-self::h4
```

`//` 是 `descendant-or-self::` 轴的简写.

```bash
# 下面两种写法等效
//ul//[last()]
//ul/descendant-or-self::[last()]
```

### 其他的轴

| 轴                   | 缩写 | 说明                                          |
| -------------------- | ---- | --------------------------------------------- |
| `ancestor`           |      |                                               |
| `ancestor-or-self`   |      |                                               |
| ---                  | ---  | ---                                           |
| `attribute`          | `@`  | `@href` 是 `attribute::href` 的缩写           |
| `child`              |      | `div`是 `child::div` 的缩写                   |
| `descendant`         |      |                                               |
| `descendant-or-self` | `//` | `//` 是 `/descendant-or-self::node()/` 的缩写 |
| `namespace`          |      |                                               |
| ---                  | ---  | ---                                           |
| `self`               | `.`  | `.` 是 `self::node()` 的缩写                  |
| `parent`             | `..` | `..` 是 `parent::node()` 的缩写               |
| ---                  | ---  | ---                                           |
| `following`          |      |                                               |
| `following-sibling`  |      |                                               |
| `preceding`          |      |                                               |
| `preceding-sibling`  |      |                                               |

### 联合（Union）

```bash
//a | //span
```

可以使用 `|` 来结合两个表达式

## 更多的示例

### 示例

```bash
//*                 # 全部元素
count(//*)          # 统计全部元素数量
(//h1)[1]/text()    # 第一个 H1 标签中的文字
//li[span]          # 找到包含 <span> 的 <li> 标签
//ul/li/..          # 使用 '..' 去选择父级元素
```

### 寻找父级元素

```bash
//section[h1[@id='section-name']]
```

找一个直接包含`h1#section-name`的`<section>`

```bash
//section[//h1[@id='section-name']]
```

找一个直接包含 `h1#section-name` 的 `<section>`（可以不是直接子节点）

### 查找最近子节点

```bash
./ancestor-or-self::[@class="box"]
```

### 属性

```bash
//item[@price > 2*@discount]
```

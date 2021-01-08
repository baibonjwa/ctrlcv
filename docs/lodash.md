---
title: Lodash
categories:
  - JavaScript
  - Libraries
intro: |
  完整列表详见官网 <https://lodash.com/docs>
---

完整列表详见官网 <https://lodash.com/docs>

## 集合

### 查找

```js
_.filter(list, (n) => n % 2)    // → Array
_.find(list, (n) => n % 2)      // → item
_.findLast(list, ...)           // → item
```

对象和数组均可使用

### 访问

```js
_.at([abcd], 0); // → [ a ] - 和 list[0] 相同
_.at([abcd], [0, 1]); // → [ ab ]
```

### GET/SET

```js
_.set(object, "users[0].name", value);
_.get(object, "users[0].name");
_.get(object, ["users", 0, "name"]);
```

### 迭代

```js
_.forEach(list, (item, i) => ...)
_.forEachRight(list, ...)

_.map(list, ...)
```

```js
_.every(users, (u) => u.active)  // → true|false (同 _.all)
_.any(users, ...)                // → true|false (同 _.some)
```

## 数组

### 数组

```js
_.chunk([abcd], 2); // → [ [ab], [cd] ]
_.compact(list);

_.fill(Array(4), "x"); // → [ 'x', 'x', 'x', 'x' ]
_.flatten;
_.flattenDeep;
```

### 过滤

```js
_.drop([abcdef], 2); // → [   cdef ]
_.dropRight([abcdef], 2); // → [ abcd   ]
_.take([abcdef], 2); // → [ ab     ]
_.takeRight([abcdef], 2); // → [     de ]
_.slice([abcdef], 2, 4); // → [   cd   ]
```

```js
_.initial([abcdef]); // → [ abcde  ] - dropRight(list, 1)
_.rest([abcdef]); // → [  bcdef ] - takeRight(list, 1)
```

```js
_.dropWhile(list, 'active')            // 和 filter 功能类似
_.dropWhile(list, 'active', true)
_.dropWhile(list, { active: true })
_.dropWhile(list, (n) => ...)
_.dropRightWhile(list, ...)
```

```js
_.without([abcde], b); // → [ acde ]
```

```js
_.remove(list, (n) => n % 2);
```

### 访问

```js
_.first([abcdef]); // → a
_.last([abcdef]); // → f
```

### 集合

```js
_.uniq();
_.difference([abc], [bc]); // → [ a    ]
_.intersection([abc], [bcd]); // → [  bc  ]
_.union([abc], [bcd]); // → [ abcd ] (unique)
```

```js
Array#concat()
```

### 索引

```js
_.findIndex(list, fn);
_.findLastIndex(list, fn);
```

```js
_.sortedIndex(list, val);
_.sortedLastIndex(list, val);
```

```js
_.indexOf(list, val);
```

## 方法

### 柯里操作

```js
greet = (greeting, name) => `${greeting}, ${name}!`;
```

```js
fn = _.partial(fn, "hi");
fn("joe"); // → 'hi, joe!'

fn = _.partial(fn, "joe");
fn("yo"); // → 'yo, joe!'
```

```js
_.curry(greet)("hi"); // → function(name)
_.curryRight(greet)("joe"); // → function(greet)
```

## 装饰函数

### 节流（Debounce）/防抖（Throttle）

```js
_.throttle(fn);
_.debounce(fn);
```

### 限制

```js
_.before(5, fn); // 只执行 5 次
_.after(5, fn); // 只执行 5 次以后的
_.once(fn); // 相当于 _.before(fn, 1)
```

### 其他杂项

```js
_.wrap(_.escape, (name) => `hi ${name}`)
// 同 `name = _.escape(name)`

_.delay(fn, 2000)

_.negate(fn)

_.memoize(fn)
_.memoize(fn, ...)
```

## 字符串

### 大小写转换

```js
_.capitalize("hello world"); // → 'Hello world'
_.startCase("hello_world"); // → 'Hello World'
_.snakeCase("hello world"); // → 'hello_world'
_.kebabCase("hello world"); // → 'hello-world'
_.camelCase("hello world"); // → 'helloWorld'
```

### 补位

```js
_.pad("abc", 3); // → 'abc'
_.pad("abc", 8); // → '   abc  '
_.pad("abc", 8, "_-"); // → '_-abc_-_'
_.padStart("abc", 3); // → 'abc'
_.padStart("abc", 6); // → '   abc'
_.padStart("abc", 6, "_-"); // → '_-_abc'
_.padEnd("abc", 3); // → 'abc'
_.padEnd("abc", 6); // → 'abc   '
_.padEnd("abc", 6, "_-"); // → 'abc_-_'
```

### 裁剪

```js
_.trim("  str  "); // → 'str'
_.trimLeft("  str  "); // → 'str  '
_.trimRight("  str  "); // → '  str'
```

### 其他

```js
_.repeat("-", 2); // → '--'
_.deburr("déjà vu"); // → 'deja vu'
_.trunc("hello world", 5); // → 'hello...'
```

```js
_.startsWith("abc", "a"); // → true
_.endsWith("abc", "c"); // → true
```

## 对象

### 键与值

```js
_.keys(obj);
_.values(obj);
```

## 链式调用

### 链式调用

```js
_([1, 2, 3])
  .reduce((total, n) => total + n)
  .map((n) => n * n)
  .tap(console.log)
  .thru((n) => n.reverse())
  .value();
```

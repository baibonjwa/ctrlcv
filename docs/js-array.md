---
title: JS 数组
categories:
  - JavaScript
contributors:
  - BAI
---

## JS 数组

### 数组

```bash
list = [a,b,c,d,e]
```

```bash
list[1]                 // → b
list.indexOf(b)         // → 1
```

### 子集

#### 不可变

```bash
list.slice(0,1)         // → [a        ]
list.slice(1)           // → [  b,c,d,e]
list.slice(1,2)         // → [  b      ]
```

#### 可变

```bash
re = list.splice(1)     // re = [b,c,d,e]  list == [a]
re = list.splice(1,2)   // re = [b,c]      list == [a,d,e]
```

### 添加元素

#### 不可变

```bash
list.concat([X,Y])      // → [_,_,_,_,_,X,Y]
```

#### 可变

```bash
list.push(X)            // list == [_,_,_,_,_,X]
list.unshift(X)         // list == [X,_,_,_,_,_]
list.splice(2, 0, X)    // list == [_,_,X,_,_,_]
```

### 插入元素

```bash
// after -- [_,_,REF,NEW,_,_]
list.splice(list.indexOf(REF)+1, 0, NEW))
```

```bash
// before -- [_,_,NEW,REF,_,_]
list.splice(list.indexOf(REF), 0, NEW))
```

### 替换元素

```bash
list.splice(2, 1, X)    // list == [a,b,X,d,e]
```

### 移除元素

```bash
list.pop()              // → e    list == [a,b,c,d]
list.shift()            // → a    list == [b,c,d,e]
list.splice(2, 1)       // → [c]  list == [a,b,d,e]
```

### 可迭代的一些方法

```bash
.filter(n => ...) => array
```

```bash
.find(n => ...)  // es6
.findIndex(...)  // es6
```

```bash
.every(n => ...) => Boolean // ie9+
.some(n => ..) => Boolean   // ie9+
```

```bash
.map(n => ...)   // ie9+
.reduce((total, n) => total) // ie9+
.reduceRight(...)
```

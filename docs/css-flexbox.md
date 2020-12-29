---
title: CSS flexbox
categories:
  - CSS
---

## CSS

### 简单示例

```css
.container {
  display: flex;
}
```

```css
.container > div {
  flex: 1 1 auto;
}
```

### Container

```css
.container {
```

```css
display: flex;
display: inline-flex;
```

```css
flex-direction: row; /* 从左至右排列 */
flex-direction: row-reverse; /* 从右至左排列 */
flex-direction: column; /* 从上至下排列 */
flex-direction: column-reverse; /* 从下至上排列 */
```

```css
flex-wrap: nowrap; /* 一行显示 */
flex-wrap: wrap; /* 多行显示 */
```

```css
align-items: flex-start; /* 顶部对齐 */
align-items: flex-end; /* 底部对齐 */
align-items: center; /* 居中对齐 */
align-items: stretch; /* 拉伸至等高 */
```

```css
justify-content: flex-start; /* [xxx        ] */
justify-content: center; /* [    xxx    ] */
justify-content: flex-end; /* [        xxx] */
justify-content: space-between; /* [x    x    x] */
justify-content: space-around; /* [ x   x   x ] */
justify-content: space-evenly; /* [  x  x  x  ] */
```

```css
}
```

### Child

```css
.container > div {
```

```css
flex: 1 0 auto;

/* 等同于 */
flex-grow: 1;
flex-shrink: 0;
flex-basis: auto;
```

```css
order: 1;
```

```css
align-self: flex-start; /* 左 */
margin-left: auto; /* 右 */
```

## 小技巧

### 垂直居中

```css
.container {
  display: flex;
}

.container > div {
  width: 100px;
  height: 100px;
  margin: auto;
}
```

### 垂直居中(2)

```css
.container {
  display: flex;
  align-items: center; /* vertical */
  justify-content: center; /* horizontal */
}
```

### 重新排序

```css
.container > .top {
  order: 1;
}

.container > .bottom {
  order: 2;
}
```

### 移动端布局

```css
.container {
  display: flex;
  flex-direction: column;
}

.container > .top {
  flex: 0 0 100px;
}

.container > .content {
  flex: 1 0 auto;
}
```

一个固定高度的顶部栏和动态高度的内容区域

### 模拟表格

```css
.container {
  display: flex;
}

.container > .checkbox {
  flex: 1 0 20px;
}
.container > .subject {
  flex: 1 0 400px;
}
.container > .date {
  flex: 1 0 120px;
}
```

### 垂直

```css
.container {
  align-items: center;
}
```

### 左右

```css
.menu > .left {
  align-self: flex-start;
}
.menu > .right {
  align-self: flex-end;
}
```

## 参考

- [MDN: 使用 CSS flexbox](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Flexible_boxes)
- [flexbox cheatsheet](http://www.sketchingwithcss.com/samplechapter/cheatsheet.html)

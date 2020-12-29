---
title: CSS 小技巧
categories:
  - CSS
contributors:
  - BAI
---

## CSS 小技巧

### 类似 iOS 的滚动效果

```css
-webkit-overflow-scrolling: touch;
overflow-y: auto;
```

### 渐变字

```css
background: -webkit-gradient(
  linear,
  left top,
  left bottom,
  from(#eee),
  to(#333)
);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

### 镂空字

```css
-webkit-text-stroke: 3px black;
```

详见: [Introducing text stroke](http://www.webkit.org/blog/85/introducing-text-stroke/)

### UIWebView 优化

```css
* {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-user-select: none; /* disable text select */
  -webkit-touch-callout: none; /* disable callout, image save panel (popup) */
  -webkit-tap-highlight-color: transparent; /* "turn off" link highlight */
}

a:focus {
  outline: 0; // Firefox (remove border on link click)
}
```

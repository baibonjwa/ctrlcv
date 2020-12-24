---
title: CSS
categories:
  - CSS
keywords:
  - "margin, padding, border"
  - "div, .class, #id, [attr]"
  - "font, background"
  - "display: block, inline, flex"
  - Selectors
  - Properties
contributors:
  - BAI
---

## 基础 CSS

### 选择器

```css
.class {
  font-weight: bold;
}
```

| 选择器            | 说明       |
| ----------------- | ---------- |
| `*`               | 全部元素   |
| `div`             | 元素       |
| `.class`          | 类         |
| `#id`             | ID         |
| `[disabled]`      | 属性       |
| `[role="dialog"]` | 属性（值） |

### 选择器组合

| 选择器              | 说明                           |
| ------------------- | ------------------------------ |
| `.parent .child`    | 子元素                         |
| `.parent > .child`  | 直接的子元素                   |
| `.child + .sibling` | 同级的相邻元素                 |
| `.child ~ .sibling` | 最远的同级元素                 |
| `.class1.class2`    | 同时有 class1 和 class2 的元素 |

### 属性选择器

| 选择器             | 说明                                                                                         |
| ------------------ | -------------------------------------------------------------------------------------------- | ---------------- |
| `[role="dialog"]`  | `=` 精确等于                                                                                 |
| `[class~="box"]`   | `~=` 包含 box                                                                                |
| `[class            | ="box"]`                                                                                     | 等于或前缀为 box |
| `[href$=".doc"]`   | `$=` 结尾为 .doc                                                                             |
| `[href^="/index"]` | `^=` 以 index 开头的                                                                         |
| `[class*="-is-"]`  | `*=` 包含 box 但和~= 有一些区别 [详见](https://www.w3.org/TR/selectors/#attribute-selectors) |

### 伪类

| 选择器               | 说明                 |
| -------------------- | -------------------- |
| `:target`            | 例如 `h2#foo:target` |
| ---                  | ---                  |
| `:disabled`          |                      |
| `:focus`             |                      |
| `:active`            |                      |
| ---                  | ---                  |
| `:nth-child(3)`      | 第三个子元素         |
| `:nth-child(3n+2)`   |
| `:nth-child(-n+4)`   |                      |
| ---                  | ---                  |
| `:nth-last-child(2)` |                      |
| `:nth-of-type(2)`    |                      |
| ---                  | ---                  |
| `:checked`           | Checked 状态的 Input |
| `:disabled`          | Disabled 状态的元素  |
| `:default`           | Default 状态的元素   |
| ---                  | ---                  |
| `:empty`             | 没有子元素的元素     |

### 伪类选择器的一些变种

| 选择器            | 说明 |
| ----------------- | ---- |
| `:first-of-type`  |      |
| `:last-of-type`   |      |
| `:nth-of-type(2)` |      |
| `:only-of-type`   |      |
| ---------------   |      |
| `:first-child`    |      |
| `:last-child`     |      |
| `:nth-child(2)`   |      |
| `:only-child`     |      |

## 字体

### 属性

| 选择器             | 说明                                 |
| ------------------ | ------------------------------------ |
| `font-family:`     |                                      |
| `font-size:`       |                                      |
| `letter-spacing:`  |                                      |
| `line-height:`     |                                      |
| ---                | ---                                  |
| `font-weight:`     | `bold` `normal`                      |
| `font-style:`      | `italic` `normal`                    |
| `text-decoration:` | `underline` `none`                   |
| ---                | ---                                  |
| `text-align:`      | `left` `right` `center` `justify`    |
| `text-transform:`  | `capitalize` `uppercase` `lowercase` |

### 简写

|         | style    | weight | size (必须)     |     | line-height | family            |
| ------- | -------- | ------ | --------------- | --- | ----------- | ----------------- |
| `font:` | `italic` | `400`  | `14px`          | `/` | `1.5`       | `sans-serif`      |
|         | style    | weight | size (required) |     | line-height | family (required) |

### 例子

```css
font-family: Arial;
font-size: 12pt;
line-height: 1.5;
letter-spacing: 0.02em;
color: #aa3322;
```

```css
text-transform: capitalize; /* Hello */
text-transform: uppercase; /* HELLO */
text-transform: lowercase; /* hello */
```

## 背景

### 背景相关属性

| 属性                     | 说明                                     |
| ------------------------ | ---------------------------------------- |
| `background:`            | _(Shorthand)_                            |
| ---                      | ---                                      |
| `background-color:`      | `<color>`                                |
| `background-image:`      | `url(...)`                               |
| `background-position:`   | `left/center/right` `top/center/bottom`  |
| `background-size:`       | `cover` `X Y`                            |
| `background-clip:`       | `border-box` `padding-box` `content-box` |
| `background-repeat:`     | `no-repeat` `repeat-x` `repeat-y`        |
| `background-attachment:` | `scroll` `fixed` `local`                 |

### 简写

|               | 颜色   | 图片          | X        | Y        |     | 尺寸           | 重复        | 附加(attachment) |
| ------------- | ------ | ------------- | -------- | -------- | --- | -------------- | ----------- | ---------------- |
| `background:` | `#ff0` | `url(bg.jpg)` | `left`   | `top`    | `/` | `100px` `auto` | `no-repeat` | `fixed;`         |
| `background:` | `#abc` | `url(bg.png)` | `center` | `center` | `/` | `cover`        | `repeat-x`  | `local;`         |

### 多背景

```css
background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
  url("background.jpg") center center / cover, #333;
```

## 动画

### 属性

| 属性                         | 值                                                       |
| ---------------------------- | -------------------------------------------------------- |
| `animation:`                 | _(shorthand)_                                            |
| `animation-name:`            | `<name>`                                                 |
| `animation-duration:`        | `<time>ms`                                               |
| `animation-timing-function:` | `ease` `linear` `ease-in` `ease-out` `ease-in-out`       |
| `animation-delay:`           | `<time>ms`                                               |
| `animation-iteration-count:` | `infinite` `<number>`                                    |
| `animation-direction:`       | `normal` `reverse` `alternate` `alternate-reverse`       |
| `animation-fill-mode:`       | `none` `forwards` `backwards` `both` `initial` `inherit` |
| `animation-play-state:`      | `normal` `reverse` `alternate` `alternate-reverse`       |

### 简写

|              | 动画名称 | 持续时间 | 时间函数 | 延时    | 播放次数   | 动画方向            | 填充模式(fill-mode) | 播放状态  |
| ------------ | -------- | -------- | -------- | ------- | ---------- | ------------------- | ------------------- | --------- |
| `animation:` | `bounce` | `300ms`  | `linear` | `100ms` | `infinite` | `alternate-reverse` | `both`              | `reverse` |

### 例子

```css
animation: bounce 300ms linear 0s infinite normal;
animation: bounce 300ms linear infinite;
animation: bounce 300ms linear infinite alternate-reverse;
animation: bounce 300ms linear 2s infinite alternate-reverse forwards normal;
```

### 事件

```js
.one('webkitAnimationEnd oanimationend msAnimationEnd animationend')
```

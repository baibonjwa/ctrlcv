---
title: Bulma
categories:
  - CSS
contributors:
  - BAI
---

## Bulma { data-visible=false }

### 屏幕尺寸

```text
0        768         1024                1216         1408
'     '     '     '     '     '     '     '     '     '     '     '
<---------^------------^------------------^-------------^------------->
  mobile      tablet         desktop         widescreen      fullhd
```

### 列

```css
.container
```

```html
<div class="columns">
  <div class="column"></div>
  <div class="column"></div>
  <div class="column"></div>
  <div class="column"></div>
  <div class="column"></div>
</div>
```

### 修饰器

下面的 CSS 会影响颜色

```CSS
.is-primary .is-link .is-info .is-success .is-warning .is-danger
```

下面的 CSS 会影响尺寸

```CSS
.is-small .is-medium .is-large
```

下面的 CSS 会影响状态

```CSS
.is-outlined .is-loading
```

### Typography 帮助方法

下面的类可以影响字体大小

| Class        | 字体大小 |
| ------------ | -------- |
| `.is-size-1` | 3rem     |
| `.is-size-2` | 2.5rem   |
| `.is-size-3` | 2rem     |
| `.is-size-4` | 1.5rem   |
| `.is-size-5` | 1.25rem  |
| `.is-size-6` | 1rem     |
| `.is-size-7` | 0.75rem  |

下面的类可以影响排列格式

| Class                 | 排列         |
| --------------------- | ------------ |
| `.has-text-centered`  | 文字居中对齐 |
| `.has-text-justified` | 文字两端对齐 |
| `.has-text-left`.     | 文字左对齐   |
| `.has-text-right`     | 文字右对齐   |

下面的类可以转换文字

| Class             | 转换               |
| ----------------- | ------------------ |
| `.is-capitalized` | 使文字首字母大写   |
| `.is-lowercase`   | 转换全部文字为小写 |
| `.is-uppercase`   | 转换全部文字为大写 |

### 所见即所得内容

```html
<div class="content">
  <!-- start WYSIWYG contents -->
  <h1>Heading</h1>
  <p>Paragraph</p>

  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
  <!-- end WYSIWYG contents -->
</div>
```

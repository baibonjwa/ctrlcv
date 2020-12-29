---
title: CSS Grid
categories:
  - CSS
contributors:
  - BAI
---

## CSS Grid

### Container

```css
display: grid;
display: inline-grid;
display: subgrid;
```

```css
grid-template-columns: 1rem 2rem 1rem; /* rem 单位 */
grid-template-columns: 25% 50% 25%; /* 百分比单位 */
grid-template-columns: 1rem auto 1rem 2fr; /* auth 和 fr */
grid-template-columns: repeat(12, 1fr); /* 重复写法 */

grid-template-rows: 1rem 10% auto repeat(5, 10px); /* 可以混合写 */
```

```css
/* 自动行于列 */

grid-auto-columns: 10px; /* 不论一共有多少列，每列均有相同的宽度 */
grid-auto-rows: 1rem; /* 不论一共有多少行，每列均有相同的高度 */
```

```css
/* Areas */
grid-template-areas:
  "header header"
  "main aside"
  "footer footer"; /* Grid-style */

grid-template-areas: "header header" "main aside" "footer footer"; /* Inline-style */
```

```css
/* Template 简写 */
grid-template:
  "header header" auto
  "main aside" 100vh
  "footer footer" 10rem
  / 80% 20%;

/* 上面写法等同于 */
grid-template-columns: 80% 20%;
grid-template-rows: auto 100vh 10rem;
grid-template-areas:
  "header header"
  "main aside"
  "footer footer";
```

```css
/* Gaps */
grid-row-gap: 1rem;
grid-column-gap: 0.5rem; /* 分别定义不同的值 */

/* 简写 */
grid-gap: 1rem 0.5rem;
grid-gap: 1rem;
```

```css
/* 元素对齐 */
justify-items: start; /* 左对齐 */
justify-items: center; /* 居中 */
justify-items: end; /* 右对齐 */
justify-items: stretch; /* 拉伸 */
```

```css
align-items: start;
align-items: center;
align-items: end;
align-items: stretch;
```

```css
/* place-items 简写 */
place-items: start stretch;

/* 等同于 */
align-items: start;
justify-items: stretch;
```

```css
/* 内容对齐 */
justify-content: start;
justify-content: center;
justify-content: end;
justify-content: stretch;

justify-content: space-around;
justify-content: space-between;
justify-content: space-evenly;
```

```css
align-content: start;
align-content: center;
align-content: end;
align-content: stretch;

align-content: space-around;
align-content: space-between;
align-content: space-evenly;
```

```css
/* place-content 简写 */
place-content: center start;

/* 等同于 */
align-content: center;
justify-content: start;
```

```css
/* Automatic grid 定位 */

grid-auto-flow: row; /*  从左至右，然后从上至下 */
grid-auto-flow: column; /* 从上至下，然后从左至右 */
grid-auto-flow: dense; /* 系统自适应 */
```

```css
/* 简写 */

/* 定义了 grid columns, rows 和 areas */
grid:
  "header header" auto
  "main aside" 100vh
  "footer footer" 10rem
  / 80% 20%; /* 你也可以包括一个 Template 等同于下面. */
grid-template:
  "header header" auto
  "main aside" 100vh
  "footer footer" 10rem
  / 80% 20%; /* 也等同于下面 */
grid-template-columns: 80% 20%;
grid-template-rows: auto 100vh 10rem;
grid-template-areas:
  "header header"
  "main aside"
  "footer footer";

/* 自动 Grid 流 */
grid: 1rem / auto-flow dense 1fr; /* 等同于下面 */
grid-template-rows: 1rem;
grid-auto-flow: dense;
grid-auto-columns: 1fr;

grid: auto-flow dense 1rem / repeat(10, 10%);
grid-auto-flow: dense;
grid-auto-rows: 1rem;
grid-template-columns: repeat(10, 10%);
```

### Child

```css
.grid-child {
```

```css
/* Column 位置 */
grid-column-start: 1;
grid-column-end: 2;

grid-column: 1 / 2; /* 简写  */
grid-column: 1 / span 2; /* 合并两列 */
grid-column: 1; /* 有且只有一列 */
```

```css
/* Row 位置 */
grid-row-start: 2;
grid-row-end: 4;

grid-row: 2 / 4; /* 简写 */
grid-row: 2 / span 3; /* 合并三行 */
grid-row: 1; /* 有且只有一行 */
```

```css
/* Area 定位 */
grid-area: header; /* 你可以命名 grid area */

grid-area: 2 / 1 / 4 / 2; /* 你可以用使用简写，等同于下面 */
grid-row-start: 2;
grid-column-start: 1;
grid-row-end: 4;
grid-column-end: 2;
```

```css
justify-self: start;
justify-self: center;
justify-self: end;
justify-self: stretch;
```

```css
align-self: start;
align-self: center;
align-self: end;
align-self: stretch;
```

```css
/* place-self 简写 */
place-self: start stretch;

/* 等同于 */
align-self: start;
justify-self: stretch;
```

## 参考资料

- [GRID: A simple visual cheatsheet](http://grid.malven.co/)
- [CSS Tricks: A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Browser support](https://caniuse.com/#feat=css-grid)

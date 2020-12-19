---
title: Canvas
categories:
  - JavaScript
author: lele88lala,BAI
---

## 指令集

### 获取 context

```js
var canvas = document.getElementById("c");
var c = canvas.getContext("2d");
```

### 基础绘制

```js
// x = 10, y = 20, width = 200, height = 100
c.fillStyle = "#ff0000";
c.strokeStyle = "#ff00ff";
```

```js
c.lineWidth = 5;
c.lineCap = "round";
```

```js
c.fillRect(10, 20, 200, 100);
```

```js
c.stroke();
c.fill();
```

### 保存与还原

```js
c.save();
```

```js
c.restore();
```

### 动画

```js
onframe: function() {
  c.clearRect(0, 0, w, h)
}
```

### 转换

```js
c.translate(0, 0);
c.rotate((Math.PI * 2) / 5);
c.scale(1.0, 1.0);
```

原点旋转:

```js
c.translate(ox, oy);
c.rotate(theta);
c.translate(-ox, -oy);
```

原点缩放:

```js
c.translate(-ox * x, -oy * y);
c.scale(x, y);
c.translate(ox / x, oy / y);
```

详见 [MDN: Transformations][xform].

### 绘制图像

```js
c.drawImage(image, dx, dy, [dw, dh]);
/* `image` can be HTML Image/Canvas/Video */
```

详见 [MDN: Images][images]

### 颜色,、样式、阴影

```js
c.strokeStyle = "#ff00ff";
c.fillStyle = "#ff00ff";
```

```js
c.shadowOffsetX = 0;
c.shadowOffsetY = 0;
c.shadowOffsetBlur = 3.0;
c.shadowColor = "rgba(0,0,0,0.2)";
```

详见 [MDN: Styles][styles]

### 渐变

```js
gr = c.createLinearGradient(x0, y0, x1, y1);
gr = c.createRadialGradient(x0, y0, r0, x1, y1, r1);
pat = c.createPattern(image, "repeat-x");
```

```js
c.fillStyle = gr;
```

### 绘图

```js
c.beginPath()
c.moveTo(x,y)
c.lineTo(x,y)
c.quadraticCurveTo(cpx,cpy,x,y)
c.bezierCurveTo(cp1x,cp1y,cp2x,cp2y)
c.arcTo(...)
c.arc(...)
c.closePath()
```

### 参考

[xform]: https://developer.mozilla.org/zh-CN/docs/Canvas_tutorial/Transformations
[styles]: https://developer.mozilla.org/zh-CN/docs/Canvas_tutorial/Applying_styles_and_colors
[images]: https://developer.mozilla.org/zh-CN/docs/Canvas_tutorial/Using_images

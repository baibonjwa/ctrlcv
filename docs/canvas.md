---
title: Canvas
category: JavaScript
layout: 2017/sheet
---

## 指令集

### 获取 context

```js
var canvas = document.getElementById('c')
var c = canvas.getContext('2d')
```

### 基础画法

```js
// x = 10, y = 20, width = 200, height = 100
c.fillStyle = '#ff0000'
c.strokeStyle = '#ff00ff'
```

```js
c.lineWidth = 5
c.lineCap = 'round'
```

```js
c.fillRect(10, 20, 200, 100)
```

```js
c.stroke()
c.fill()
```

### 保存与还原

```js
c.save()
```

```js
c.restore()
```

保存: `strokeStyle` `fillStyle` `globalAlpha` `lineWidth` `lineCap` `lineJoin` `miterLimit` `shadowOffsetX` `shadowOffsetY` `shadowBlur` `shadowColor`
`globalCompositeOperation`, 转换 (`translate` `rotate` `scale` `transform` `setTransform`), 剪切路径


### 动画

```js
onframe: function() {
  c.clearRect(0, 0, w, h)
}
```

### 转换

```js
c.translate(0, 0)
c.rotate(Math.PI*2/5)
c.scale(1.0, 1.0)
```

沿远点旋转:

```js
c.translate(ox, oy)
c.rotate(theta)
c.translate(-ox, -oy)
```

沿远点放大:

```js
c.translate(-ox*x, -oy*y)
c.scale(x, y)
c.translate(ox/x, oy/y)
```

### 绘制图像

```js
c.drawImage(image, dx, dy, [dw, dh]);
/* `image` can be HTML Image/Canvas/Video */
```

### 颜色,、样式、阴影

```js
c.strokeStyle = '#ff00ff';
c.fillStyle = '#ff00ff';
```

```js
c.shadowOffsetX = 0;
c.shadowOffsetY = 0;
c.shadowOffsetBlur = 3.0;
c.shadowColor = 'rgba(0,0,0,0.2)';
```

### 渐变

```js
gr = c.createLinearGradient(x0,y0,x1,y1)
gr = c.createRadialGradient(x0,y0,r0,x1,y1,r1)
pat = c.createPattern(image, 'repeat-x')
```

```js
c.fillStyle = gr
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

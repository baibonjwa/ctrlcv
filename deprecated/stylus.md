---
title: Stylus
category: CSS
layout: 2017/sheet
prism_languages: [stylus]
weight: -3
updated: 2017-10-30
tags: [Featurable]
---

Getting started
---------------


### CSS syntax

```stylus
.box {
  color: blue;

  .button {
    color: red;
  }
}
```

Stylus is a CSS pre-processor.

See: [stylus-lang.com](http://stylus-lang.com/)

### Indent syntax

```stylus
.box
  color: blue

  .button
    color: red
```

Also works! The colon is optional, as well. This is typically the syntax used with Stylus documents.

### Mixins

```stylus
caps-type()
  text-transform: uppercase
  letter-spacing: 0.05em
```


```stylus
h5
  caps-type()
```


See [Mixins](#mixins-1) below.

### Variables

```stylus
royal-blue = #36a
```


```stylus
div
  color: royal-blue
```

Mixins
------


### Without arguments

```stylus
red-border()
  border: solid 2px red
```


```stylus
div
  red-border()
```


See: [Mixins](http://stylus-lang.com/docs/mixins.html)

### With arguments

```stylus
border-radius(n)
  -webkit-border-radius: n
  border-radius: n
```


```stylus
div
  border-radius: 2px
  border-radius(2px)
```


Mixins can be applied in two different ways.

### Argument defaults

```stylus
border-radius(n = 2px)
  -webkit-border-radius: n
```


### Block mixins

```stylus
mobile()
  @media (max-width: 480px)
    {block}
```


```stylus
+mobile()
  width: 10px
```


See: [Block mixins](http://stylus-lang.com/docs/mixins.html#block-mixins)

### Rest params

```stylus
shadow(offset-x, args...)
  box-shadow: offset-x args
  margin-top: offset-x
```


```stylus
#login
  shadow: 1px 2px 5px #eee
```

See: [Rest params](http://stylus-lang.com/docs/vargs.html)

Functions
---------


### Functions

```stylus
add(a, b)
  a + b
```


```stylus
body
  padding: add(10px, 5)
```


See: [Functions](http://stylus-lang.com/docs/functions.html)

### Argument defaults

```stylus
add(a, b = 2)
  a + b
```


See: [Argument defaults](http://stylus-lang.com/docs/functions.html#argument-defaults)

### Named parameters

```stylus
shadow(x, y)
  x y (y * 1.5) #000
```

```stylus
.button
  box-shadow: shadow(x: 2, y: 4)
```


See: [Named parameters](http://stylus-lang.com/docs/functions.html#named-parameters)

### Multiple return values

```stylus
sizes()
  8px 16px
```


```stylus
sizes()[0]  // → 8px
sizes()[1]  // → 16px
```

See: [Multiple return values](http://stylus-lang.com/docs/functions.html#multiple-return-values)

Values
------


### Conditional assignment

```stylus
royal-blue = #36a
royal-blue ?= #89f
```


```stylus
div
  color: royal-blue  // #36a
```

`?=` will only set a variable if it's previously unset.

See: [Conditional assignment](http://stylus-lang.com/docs/operators.html#conditional-assignment--)

### Property lookup

```stylus
.logo
  width: w = 150
  margin-left: -(w / 2)
```


See: [Property lookup](http://stylus-lang.com/docs/variables.html#property-lookup)

### Interpolation

```stylus
-{prefix}-border-radius: 2px
```

See: [Interpolation](http://stylus-lang.com/docs/interpolation.html)

### Color operators

```stylus
#888 + 50%    // → #c3c3c3 (lighten)
#888 - 50%    // → #444 (darken)
#f00 + 50deg  // → #ffd500 (hue)
```

### Casting

```stylus
n = 5px
```

```stylus
foo: (n)em
foo: (n * 5)%
```


### Lookup

```stylus
light-blue = #3bd
name = 'blue'
lookup('light-' + name)
```


See: [lookup](http://stylus-lang.com/docs/bifs.html#lookupname)

Advanced features
-----------------


### Conditional

```stylus
if color == blue
  display: block
else if true and true
  display: inline
else if 'hey' is not 'bye'
  display: flex
else
  display: none
```

Aliases:


| `==` | `is` |
| `!=` | `is not` |
| `!=` | `isnt` |

See: [Conditionals](http://stylus-lang.com/docs/functions.html#conditionals)

### For loops

```stylus
font-size-1 = 10px
font-size-2 = 20px
font-size-3 = 30px

for i in 1..3
  .text-{i}
    font-size: lookup('font-size-' + i)
```


### Definition check

```stylus
if ohnoes is defined
  color: blue
```


See: [is defined](http://stylus-lang.com/docs/operators.html#variable-definition-is-defined)

### False values

```stylus
0
null
false
''
```

### Type check

```stylus
if val is a 'string'
if val is a 'ident'
if #fff is a 'rgba'    // → true
```

See: [Instance check](http://stylus-lang.com/docs/operators.html#instance-check-is-a)

Built-in functions
------------------


### Color functions

```stylus
alpha(#fff)   //→ 1
alpha(rgba(0, 0, 0, 0.2))   //→ 0.2
```

```stylus
dark(black)  //→ true
light(black) //→ false
```

```stylus
hue(#0a0)         //→ 50deg
saturation(#f00)  //→ 100%
lightness(#f00)   //→ 50%
luminosity(#f00)  //→ 0.2126
```

```stylus
hue(#0a0, 0deg)
saturation(#f00, 50%)
lightness(#f00)
```

```stylus
lighten(color, 10%)
darken(color, 10%)
saturate(color, 10%)
desaturate(color, 10%)
invert(color)
```

```stylus
tint(color, 50%)  // mix with white
shade(color, 50%) // mix with black
```

```stylus
unquote(string)
```

See: [Built-in functions](http://stylus-lang.com/docs/bifs.html)

### Image size

```stylus
width:  image-size('tux.png')[0]
height: image-size('tux.png')[1]
```

Returns the width and height of a given image.

See: [image-size](http://stylus-lang.com/docs/bifs.html#image-sizepath)

### Caching

```stylus
size($width)
  +cache('w' + $width)
    width: $width
.a { size: 10px }
.b { size: 10px }
```

```stylus
// yields: .a, b { width: 10px }
```

Applies its contents to the given selector on the first call, but would @extend the first call’s selector at the second call with the same params.

See: [cache](http://stylus-lang.com/docs/bifs.html#cachekeys)

### Add Property

```stylus
gradient(color)
  add-property('background-image', linear-gradient(top, color, darken(color, 20%)))
  color
```

```stylus
body
  background: gradient(red)
```

See: [add-property](http://stylus-lang.com/docs/bifs.html#add-propertyname-expr)

### sprintf

```stylus
'-webkit-gradient(%s, %s, %s)' % (linear (0 0) (0 100%))
// → -webkit-gradient(linear, 0 0, 0 100%)
```

```stylus
s("rgba(0, 0, 0, %s)", 0.3)
```

See: [s](http://stylus-lang.com/docs/bifs.html#sfmt-)

### Embed URL

```
background: embedurl('logo.png')
// → background: url("data:image/png;base64,…")
```

See: [embedurl](http://stylus-lang.com/docs/bifs.html#embedurlpath-encoding)

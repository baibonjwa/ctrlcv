---
title: Vue.js
category: JavaScript
layout: 2017/sheet
updated: 2019-12-26
weight: -10
intro: |
  [Vue.js](https://vuejs.org/) is an open-source Model–view–viewmodel JavaScript framework for building user interfaces and single-page applications.
---

表达式
----------
### 表达式

```html
<div id="app">
  <p>I have a {{ product }}</p>
  <p>{{ product + 's' }}</p>
  <p>{{ isWorking ? 'YES' : 'NO' }}</p>
  <p>{{ product.getSalePrice() }}</p>
</div>
```

查看: [Delimiters](https://cn.vuejs.org/v2/api/#delimiters)

### 绑定

```html
<a v-bind:href="url">...</a>
```

#### 简写语法
```html
<a :href="url">...</a>
```
#### `:disabled` 表达式返回的 true 或者 false 将影响此属性是否存在

```html
<button :disabled="isButtonDisabled">...
```

#### `:class` 设置类名，如果 isActive 返回 true，class="active"就会显示出来

```html
<div :class="{ active: isActive }">...
```

#### `:style` 设置CSS 样式，例如将颜色值设置成 activeColor表示的值
```html
<div :style="{ color: activeColor }">
```

查看: [v-bind](https://cn.vuejs.org/v2/api/#v-bind)

### 指令

#### v-if 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。v-if 也是**惰性的**：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块
```html
<p v-if="inStock">{{ product }}</p>
```
```html
<p v-else-if="onSale">...</p>
<p v-else>...</p>
```

#### v-show 切换元素，不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

```html
<p v-show="showProductDetails">...</p>
```

一般来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好。

#### 数据双向绑定

```html
<input v-model="firstName" >
```

| 方法                   | 描述                                                     |
| ---------------------- | -------------------------------------------------------- |
| `v-model.lazy="..."`   | 在 `change` 事件之后进行数据同步而非 ` input `事件触发后 |
| `v-model.number="..."` | 将输入字符串转为有效的数字                               |
| `v-model.trim="..."`   | 将输入首尾空格去除                                       |

查看: [Directives](https://cn.vuejs.org/v2/api/#Directives)

### 事件处理

#### 在元素里调用 addToCart 方法
```html
<button v-on:click="addToCart">...
```

#### v-on 简写
```html
<button @click="addToCart">...
```
#### 方法中参数的传递方式
```html
<button @click="addToCart(product)">...
```

#### 防止出现默认行为（例如重新加载页面）
```html
<form @submit.prevent="addProduct">...
```

#### 事件只触发一次
```html
<img @mouseover.once="showImage">...
```

| Method   | Description                      |
| -------- | -------------------------------- |
| `.stop`  | 停止所有事件传播                 |
| `.self ` | 仅在event.target是元素本身时触发 |

#### 键盘输入事件列子
```html
<input @keyup.enter="submit">
```

#### 当键盘输入 control-c 时调用 onCopy
```html
<input @keyup.ctrl.c="onCopy">
```

查看: [Events](https://cn.vuejs.org/v2/guide/events.html)

### 列表渲染

#### 列表渲染时候不能把 :key 属性忽略
```html
<li v-for="item in items"
    :key="item.id">
  {{ item }}
</li>
```
#### 获取数组位置
```html
<li v-for="(item, index) in items">...
```

#### 遍历对象
```html
<li v-for="(value, key) in object">...
```

####  在组件中使用 v-for
```html
<cart-product v-for="item in products"
              :product="item"
              :key="item.id">
```

查看: [List Rendering](https://cn.vuejs.org/v2/guide/list.html)


组件
--------

### 组件剖析

```js
Vue.component('my-component', {
  components: {
    // Components that can be used in the template
    ProductComponent,
    ReviewComponent
  },
  props: {
    // The parameters the component accepts
    message: String,
    product: Object,
    email: {
      type: String,
      required: true,
      default: "none"
      validator: function (value) {
        // Should return true if value is valid
      }
    }
  },
  data: function() {
    // `data` must be a function
    return {
      firstName: 'Vue',
      lastName: 'Mastery'
    }
  },
  computed: {
    // Return cached values until dependencies change
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  },
  watch: {
    // Called when firstName changes value
    firstName: function (value, oldValue) { ... }
  },
  methods: { ... },
  template: '<span>{{ message }}</span>',
  // Can also use backticks in `template` for multi-line
})
```
查看: [Components Basics](https://cn.vuejs.org/v2/guide/components.html)

### 生命周期 hooks

| 方法            | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| `beforeCreate`  | 实例初始化后 [#](https://vuejs.org/v2/api/#beforeCreate)     |
| `created`       | 实例创建后 [#](https://vuejs.org/v2/api/#created)            |
| `beforeMount`   | 第一次渲染前 [#](https://vuejs.org/v2/api/#beforeMount)      |
| `mounted`       | 实例挂载后 [#](https://vuejs.org/v2/api/#mounted)            |
| `beforeUpdate`  | 数据更新时调用，发生在虚拟 DOM 打补丁之前 [#](https://vuejs.org/v2/api/#beforeUpdate) |
| `updated`       | 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子 [#](https://vuejs.org/v2/api/#updated) |
| `beforeDestroy` | 实例销毁之前 [#](https://vuejs.org/v2/api/#beforeDestroy)    |
| `destroyed`     | Vue 实例被销毁之后 [#](https://vuejs.org/v2/api/#destroyed)  |

查看: [Lifecycle Hooks](https://cn.vuejs.org/v2/api/#Options-Lifecycle-Hooks)

### 自定义事件

#### 在其父级中的组件上设置侦听器
```html
<button-counter v-on:incrementBy="incWithVal">
```

#### 在父组件内部添加事件方法
```js
methods: {
  incWithVal: function (toAdd) { ... }
}
```

#### 在button-counter内部调用此方法
```js
this.$emit(
    'incrementBy', // Custom event name
    5 // Data sent up to parent
  )
```

查看: [Custom Events](https://cn.vuejs.org/v2/guide/components-custom-events.html)

单文件组件
--------

### 单文件
```html
<template>
  <p>{{ greeting }} World!</p>
</template>

<script>
module.exports = {
  data: function () {
    return {
      greeting: 'Hello'
    }
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
```

查看: [Single File Components](https://cn.vuejs.org/v2/guide/single-file-components.html)

### 关注点分离
```html
<template>
  <div>This will be pre-compiled</div>
</template>
<script src="./my-component.js"></script>
<style src="./my-component.css"></style>
```

查看: [What About Separation of Concerns?](https://cn.vuejs.org/v2/guide/single-file-components.html#What-About-Separation-of-Concerns)

插槽
--------

### 使用单个插槽

#### 组件模板
```html
<div>
  <h2>I'm a title</h2>
  <slot>
    Only displayed if no slot content
  </slot>
</div>
```
#### 组件中的内容会显示在插槽中
```html
<my-component>
  <p>This will go in the slot</p>
</my-component>
```
查看: [Slots](https://cn.vuejs.org/v2/guide/components-slots.html)

### 多个插槽

#### 组件模板
```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot>Default content</slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```
#### 组件中的内容会显示在对应的插槽中
```html
<app-layout>
  <h1 slot="header">Page title</h1>
  <p>the main content.</p>
  <p slot="footer">Contact info</p>
</app-layout>
```
查看: [Slots](https://cn.vuejs.org/v2/guide/components-slots.html)

另见
--------

* [Vue CLI](https://cli.vuejs.org/zh/) _(cli.vuejs.org)_
* [Vue Router](https://router.vuejs.org/zh/) _(router.vuejs.org)_
* [Vue DevTools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en) _(chrome.google.com)_
* [Nuxt.js](https://nuxtjs.org/) _(nuxtjs.org)_
* [Vue.js v1.0.28 cheatsheet](vue@1.0.28/) _Legacy version_

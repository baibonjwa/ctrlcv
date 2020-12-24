---
title: Backbone.js
categories:
  - JavaScript
  - Libraries
contributors:
  - BAI
---

## Backbone

### 事件绑定

```js
.on('event', callback)
.on('event', callback, context)
```

```js
.on({
  'event1': callback,
  'event2': callback
})
```

```js
.on('all', callback)
```

```js
.once('event', callback)   // 只触发一次
```

### 事件解绑

```js
object.off("change", onChange); // 只解绑 `onChange`
object.off("change"); // 解绑全部的 'change'
object.off(null, onChange); // 解绑所有事件的全部的 `onChange`
object.off(null, null, context); // 解绑 'context' 的全部事件的全部回调函数
object.off(); // 解绑全部的全部的全部
```

### 事件

```js
object.trigger("event");
```

```js
view.listenTo(object, event, callback);
view.stopListening();
```

### 事件列表

- Collection:

  - `add` (model, collection, options)
  - `remove` (model, collection, options)
  - `reset` (collection, options)
  - `sort` (collection, options)

- Model:

  - `change` (model, options)
  - `change:[attr]` (model, value, options)
  - `destroy` (model, collection, options)
  - `error` (model, xhr, options)

- Model and collection:

  - `request` (model, xhr, options)
  - `sync` (model, resp, options)

- Router:
  - `route:[name]` (params)
  - `route` (router, route, params)

## 视图（View）

### 定义

```js
var View = Backbone.View.extend({
  model: doc,
```

```js
  tagName: 'div',
  className: 'document-item',
  id: "document-" + doc.id,
  attributes: { href: '#' },
```

```js
  el: 'body',
```

```js
  events: {
    'click button.save': 'save',
    'click .cancel': function() { ··· },
    'click': 'onclick'
  },
```

```js
  constructor: function() { ··· },
  render: function() { ··· }
})
```

### 实例化

```js
view = new View()
view = new View({ el: ··· })
```

### 方法

```js
view.$el.show();
view.$("input");
```

```js
view.remove();
```

```js
view.delegateEvents();
view.undelegateEvents();
```

## 模型（Model）

### 定义

```js
var Model = Backbone.Model.extend({
  defaults: {
    'author': 'unknown'
  },
  idAttribute: '_id',
  parse: function() { ··· }
})
```

### 实例化

```js
var obj = new Model({ title: "Lolita", author: "Nabokov" });
```

```js
var obj = new Model({ collection: ··· })
```

### 方法

```js
obj.id;
obj.cid; // → 'c38' (客户端 ID)
```

```js
obj.clone();
```

```js
obj.hasChanged("title");
obj.changedAttributes();
obj.previousAttributes();
obj.previous("title");
```

```js
obj.isNew();
```

```js
obj.set({ title: "A Study in Pink" });
obj.set({ title: "A Study in Pink" }, { validate: true, silent: true });
obj.unset("title");
```

```js
obj.get("title");
obj.has("title");
obj.escape("title");
```

```js
obj.clear();
obj.clear({ silent: true });
```

```js
obj.save();
obj.save({ attributes });
obj.save(null, {
  silent: true,
  patch: true,
  wait: true,
  success: callback,
  error: callback,
});
```

```js
obj.destroy();
obj.destroy({
  wait: true,
  success: callback,
  error: callback,
});
```

```js
obj.toJSON();
```

```js
obj.fetch();
obj.fetch({ success: callback, error: callback });
```

### 验证

```js
var Model = Backbone.Model.extend({
  validate: function (attrs, options) {
    if (attrs.end < attrs.start) {
      return "Can't end before it starts";
    }
  },
});
```

```js
obj.validationError
obj.isValid()
obj.on('invalid', function (model, error) { ··· })
```

```js
obj.save()
obj.set({ ··· }, { validate: true })
```

### 自定义 URLs

```js
var Model = Backbone.Model.extend({
  url: '/account',
  url: function() { return '/account' },
```

```js
  // 固定值或回调函数都可以
  url: function() { return '/books/' + this.id }),
  urlRoot: '/books'
})
```

```js
var obj = new Model({ url: ··· })
var obj = new Model({ urlRoot: ··· })
```

## 参考

- [Backbone website](http://backbonejs.org/) _(backbonejs.org)_
- [Backbone patterns](http://ricostacruz.com/backbone-patterns/) _(ricostacruz.com)_

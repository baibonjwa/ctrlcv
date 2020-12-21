---
title: Angular.js
categories:
  - JavaScript
  - Libraries
---

## Angular.js

### HTML

```html
   
<html ng-app="nameApp"></html>
```

### 列表 (ng-repeat)

```html
<ul ng-controller="MyListCtrl">
  <li ng-repeat="phone in phones">{{phone.name}}</li>
     
</ul>
```

### 模型 (ng-model)

```html
<select ng-model="orderProp">
  <option value="name">Alphabetical</option>
  <option value="age">Newest</option>
     
</select>
```

### 定义一个模块

```js
    App = angular.module('myApp', []);

    App.controller('MyListCtrl', function ($scope) {
      $scope.phones = [ ... ];
    });
```

### 保护的 Controller

```js
    App.controller('Name', [
      '$scope',
      '$http',
      function ($scope, $http) {
      }
    ]);

    a.c 'name', [
      '$scope'
      '$http'
      ($scope, $http) ->
    ]
```

### 服务

```js
App.service("NameService", function ($http) {
  return {
    get: function () {
      return $http.get(url);
    },
  };
});
```

```js
App.controller("controllerName", function (NameService) {
  NameService.get().then(function () {});
});
```

### 指令（Directive）

```js
App.directive("name", function () {
  return {
    template: "<h1>Hello</h1>",
  };
});
```

在 HTML 中会用 `<name></name>` 来渲染模板 `<h1>Hello</h1>`

### HTTP

```js
App.controller("PhoneListCtrl", function ($scope, $http) {
  $http.get("/data.json").success(function (data) {
    $scope.phones = data;
  });
});
```

### 参考

- [https://github.com/angular/angular-seed](https://github.com/angular/angular-seed)
- [https://angularjs.org](https://angularjs.org/)

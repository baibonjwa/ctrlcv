---
title: Rails 表单
categories:
  - Rails
contributors:
  - BAI
---

## 表单构建器

```haml
- form_for @post do |f|
```

字段的命名会自动加上 `post` 前缀，值也会从这个对象中获取，例如 `f.text_field :name` 的值为 `@post.name`

### 选项（Option）

```haml
- form_for @post, |
  url: { method: 'put', action: 'create' }, |
  html: { class: 'nifty_form' } |
  do |f|
```

## 表单控件

### 文本框

```rb
f.text_field :title
f.text_area :body, size: '60x12'
```

### 复选框（Checkbox）

```rb
f.check_box :remember_me
f.label :remember_me, "Remember me"
```

### 单选框（Radio）

```rb
f.radio_button :gender, 'male'
f.label :gender_male, "Male"

f.radio_button :gender, 'female'
f.label :gender_female, "Female"
```

### 标签（Label）

```rb
f.label :title
f.label :title, "Title"
f.label :title, "Title", class: "title"
f.label(:post, :terms) { "Accept terms" }
```

### 提交按钮

```ruby
f.submit "Create"
```

### 隐藏区域（hidden field）

```ruby
f.hidden_field :id
```

## 其他

### Model

```ruby
f.object
```

### fields_for

```haml
= form_for @post do |f|
  = fields_for :author, @post.author do |ff|
    = ff.text_field :name
```

### 下拉框

```ruby
f.select :city_id, [['Lisbon',1], ['Madrid',2], ...], 4
# (4 = selected)

options_for_select [['Lisbon',1], ['Madrid',2], ...], 4
```

### 集合

```ruby
f.collection_radio_buttons :author_id, Author.all, :id, :name_with_initial
f.collection_select :city_id, City.all, :id, :name
# (field, collection, value_key, label_key)
```

### 时间选择框

```rb
f.time_zone_select :time_zone
f.date_select :birthday
```

### I18n

```yaml
helpers:
  submit:
    # helpers.submit.<action>
    create: "Create a %{model}"
    update: "Confirm changes to %{model}"

    # helpers.submit.<model>.<action>
    article:
      create: "Publish article"
      update: "Update article"

  # helpers.label.<model>.<field>
  label:
    post:
      body: "Your body text"
```

### 在 `f` 的外面使用方法

```rb
radio_button("post", "category", "rails")
radio_button("post", "category", "java")

# <input type="radio" id="post_category_rails" name="post[category]"
#  value="rails" checked="checked" />
```

### Select

```rb
select(method, choices = nil, options = {}, html_options = {}, &block)
  choices == [ ['label', id], ... ]

submit(value=nil, options={})
```

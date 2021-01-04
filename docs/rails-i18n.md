---
title: Rails - i18n
categories:
  - Rails
contributors:
  - BAI
---

## 常见用法

### 常规用法

```ruby
t('my.messages.hello')

# 和 'my.messages.hello' 一样
t(:hello, scope: 'my.messages')
t(:hello, scope: [:my, :messages])

t('my.messages.hello', default: "Hello")
```

```yml
en:
  my:
    messages:
      hello: "Hello"
```

### 插补字符

```ruby
t('hello', name: "John")
```

```yml
hello: "Hello %{name}"
```

### 懒查询机制

```ruby
# 在 'books/index' 页面中
t('.title')
```

```yml
en:
  books:
    index:
      title: "Título"
```

### 复数

```ruby
t(:inbox, count: 1)  #=> 'one message'
t(:inbox, count: 2)  #=> '2 messages'
```

```yml
inbox:
  one: 'one message',
  other: '%{count} messages'
```

## 本地化

### 时间

```ruby
l(Time.now)
l(Time.now, format: :short)
```

```yml
en:
  time:
    formats:
      default: "%a, %d %b %Y %H:%M:%S %z"
      long: "%B %d, %Y %H:%M"
      short: "%d %b %H:%M"
```

### 日期

```ruby
l(Date.today)
```

```yml
en:
  date:
    formats:
      default: "%Y-%m-%d" # 2015-06-25
      long: "%B %d, %Y" # June 25, 2015
      short: "%b %d" # Jun 25
```

## ActiveRecord

### 模型名称

```ruby
User.model_name.human            #=> "User"
Child.model_name.human(count: 2) #=> "Children"
```

```yml
en:
  activerecord:
    models:
      user: "User"
      child:
        one: "Child"
        other: "Children"
```

### 属性

```ruby
User.human_attribute_for :name   #=> "Name"
```

```yml
en:
  activerecord:
    attributes:
      user:
        # activerecord.attributes.<model>.<field>
        name: "Name"
        email: "Email"
```

### 错误信息

```ruby
error_messages_for(...)
```

```yml
activerecord:
  errors:
    models:
      venue:
        attributes:
          name:
            blank: "Please enter a name."
```

可能的查询路径(按下列顺序)

```yml
activerecord.errors.models.[model_name].attributes.[attribute_name].[error]
activerecord.errors.models.[model_name].[error]
activerecord.errors.messages.[error]
errors.attributes.[attribute_name].[error]
errors.messages.[error]
```

`[error]` 的值可能为:

```yml
validates
confirmation - :confirmation
acceptance   - :accepted
presence     - :blank
length       - :too_short (%{count})
length       - :too_long (%{count})
length       - :wrong_length (%{count})
uniqueness   - :taken
format       - :invalid
numericality - :not_a_number
```

### 表单标签

```ruby
form_for @post do
  f.label :body
```

```yml
helpers:
  # helpers.label.<model>.<field>
  label:
    post:
      body: "Your body text"
```

### 提交按钮

```ruby
form_for @post do
  f.submit
```

```yml
helpers:
  submit:
    # helpers.submit.<action>
    create: "Create a %{model}"
    update: "Confirm changes to %{model}"

    # helpers.submit.<model>.<action>
    article:
      create: "Publish article"
      update: "Update article"
```

## 数字

### 数字

```ruby
number_to_delimited(2000)             #=> "2,000"
number_to_currency(12.3)              #=> "$12.30"
number_to_percentage(0.3)             #=> "30%"
number_to_rounded(3.14, precision: 0) #=> "3"
number_to_human(12_000)               #=> "12 Thousand"
number_to_human_size(12345)           #=> "12.3 kb"
```

### 分隔符

```ruby
number_to_delimited(n)
```

```yml
number:
  format:
    separator: "."
    delimiter: ","
    precision: 3
    significant: false
    strip_insignificant_zeroes: false
```

### 货币

```ruby
number_to_currency(n)
```

```yml
number:
  currency:
    format:
      format: "%u%n" # %u = unit, %n = number
      unit: "$"
      separator: "."
      delimiter: ","
      precision: 3
      # (see number.format)
```

### 百分比

```ruby
number_to_percentage(n)
```

```yml
number:
  percentage:
    format:
      format: "%n%"
      # (see number.format)
```

## 一些设置

```ruby
I18n.backend.store_translations :en, ok: "Ok"
I18n.locale = :en
I18n.default_locale = :en

I18n.available_locales

I18n.translate :ok   # aka, I18n.t
I18n.localize date   # aka, I18n.l
```

## 参考

- [http://guides.rubyonrails.org/i18n.html](http://guides.rubyonrails.org/i18n.html)
- [http://rails-i18n.org/wiki](http://rails-i18n.org/wiki)
- [https://github.com/svenfuchs/i18n](https://github.com/svenfuchs/i18n)
- [https://github.com/svenfuchs/rails-i18n/blob/master/rails/locale/en.yml](https://github.com/svenfuchs/rails-i18n/blob/master/rails/locale/en.yml)

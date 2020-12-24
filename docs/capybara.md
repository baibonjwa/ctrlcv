---
title: Capybara
categories:
  - Ruby
  - libraries
contributors:
  - BAI
---

## Capybara

### 访问

```ruby
    visit articles_path
```

### 单击链接和按钮

```ruby
  click_on 'Link Text'
  click_button
  click_link
```

### Form 交互

```ruby
attach_file 'Image', '/path/to/image.jpg'
fill_in 'First Name', with: 'John'
```

```ruby
check 'A checkbox'
uncheck 'A checkbox'
```

```ruby
choose 'A radio button'
```

```ruby
select 'Option', from: 'Select box'
unselect
```

### 限制

```ruby
within '.classname' do
  click '...'
end
```

```ruby
within_fieldset :id do
  ...
end
```

## 查询

### 谓词

```ruby
page.has_css?('.button')
expect(page).to have_css('.button')
page.should have_css('.button')
```

| 正向                              | 反向                   |
| --------------------------------- | ---------------------- |
| `has_content?`                    | `has_no_content?`      |
| ---                               | ---                    |
| `has_css?` _(selector)_           | `has_no_css?`          |
| ---                               | ---                    |
| `has_xpath?` _(path)_             | `has_no_xpath?`        |
| ---                               | ---                    |
| `has_link?` _(selector)_          | `has_no_link?`         |
| ---                               | ---                    |
| `has_button?` _(selector)_        | `has_no_button?`       |
| ---                               | ---                    |
| `has_field?` _(selector)_         | `has_no_field?`        |
| ---                               | ---                    |
| `has_checked_field?` _(selector)_ | `has_unchecked_field?` |
| ---                               | ---                    |
| `has_table?` _(selector)_         | `has_no_table?`        |
| ---                               | ---                    |
| `has_select?` _(selector)_        | `has_no_select?`       |

在 Rspec 中也可以用下面这样的格式 `page.should have_content`.

### 选择器

```ruby
expect(page).to have_button('Save')
```

```ruby
expect(page).to have_button('#submit')
```

```ruby
expect(page).to have_button('//[@id="submit"]')
```

选择器 `selector` 参数可以是文本、CSS 或 XPath.

### RSpec 断言

```ruby
page.has_button?('Save')
```

```ruby
expect(page).to have_no_button('Save')
```

Rspec 中也可以用 `page.should` 断言.

### 反向用法

```ruby
expect(page).to have_no_button('Save')   # OK
```

```ruby
expect(page).not_to have_button('Save')  # Bad
```

## RSpec

### 匹配器

```ruby
expect(page).to \
```

```ruby
  have_selector '.blank-state'
  have_selector 'h1#hola', text: 'Welcome'
  have_button 'Save'
  have_checked_field '#field'
  have_unchecked_field
  have_css '.class'
  have_field '#field'
  have_table '#table'
  have_xpath '//div'
```

```ruby
  have_link 'Logout', href: logout_path
```

```ruby
  have_select 'Language',
    selected: 'German'
    options: ['Engish', 'German']
    with_options: ['Engish', 'German'] # 部分匹配
```

```ruby
  have_text 'Hello',
    type: :visible # or :all
    # 也可以用 have_content
```

### 常见的选项

所有匹配器都有下面这些选项：

```ruby
  text: 'welcome'
  text: /Hello/
  visible: true
  count: 4
  between: 2..5
  minimum: 2
  maximum: 5
  wait: 10
```

## 其他特性

### 查找

```ruby
find(selector)
find_button(selector)
find_by_id(id)
find_field(selector)
find_link(selector)
locate
```

### Scope

```ruby
within '#delivery' do
  fill_in 'Street', with: 'Hello'
end
```

```ruby
within :xpath, '//article'
within_fieldset
within_table
within_frame
scope_to
```

```ruby
find('#x').fill_in('Street', with: 'Hello')
# 和 within 一样
```

### 脚本

```ruby
execute_script('$("input").trigger("change")')
evaluate_script('window.ga')
```

执行 Javascipt

```ruby
save_and_open_page
```

### Page

```ruby
page
  .all('h3')
  .body
  .html
  .source
  .current_host
  .current_path
  .current_url
```

### AJAX

```ruby
using_wait_time 10 do
  ...
end
```

### 其他

```ruby
  drag
  field_labeled
```

### Page 对象

```ruby
page.status_code == 200
page.response_headers
```

详见: [Session](http://www.rubydoc.info/github/jnicklas/capybara/master/Capybara/Session)

### Poltergeist

```ruby
Capybara.register_driver :poltergeist do |app|
  Capybara::Poltergeist::Driver.new(app, :inspector => true)
end
Capybara.javascript_driver = :poltergeist
```

详见 [poltergeist](https://github.com/teampoltergeist/poltergeist) 集成 PhantomJS.

### 黑名单

```ruby
config.before :each, :js do
  page.driver.browser.url_blacklist = [
    'fonts.googleapis.com',
    'use.typekit.net',
    'f.vimeocdn.com',
    'player.vimeo.com',
    'www.googletagmanager.com'
  ].flat_map { |domain| [ "http://#{domain}", "https://#{domain}" ] }
end
```

### 调试

```ruby
page.driver.debug
```

```ruby
page.driver.pause
```

## Selenium

### 接收 confirm() 和 alert()

```ruby
accept_alert { ... }
dismiss_confirm { ... }
accept_prompt(with: 'hi') { ... }
```

也可写作

```ruby
page.driver.browser.switch_to.alert.accept
```

### 更新会话 session

```ruby
page.set_rack_session(foo: 'bar')
```

## 其他参考资料

- <http://rubydoc.info/github/jnicklas/capybara/Capybara/RSpecMatchers>
- <http://www.rubydoc.info/github/jnicklas/capybara/master/Capybara/Node/Matchers>

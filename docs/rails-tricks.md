---
title: Rails 小技巧
categories:
  - Rails
---

## Rails 小技巧

在 config/environments/development.rb:

```ruby
# Source maps for Sass
config.sass.debug_info = true
config.sass.line_comments = false

# Don't break apart
config.assets.debug = false
```

```ruby
<%= render 'article', full: true %>
<%= render 'article' %>

<% if local_assigns[:full] %>
  ...
<% end %>
```

i18n

```yml
en:
  read_more_html: "read <b>more</b>..."
```

错误处理:

```ruby
# config/application.rb
config.exceptions_app = self.routes

get '/404', to: 'errors#not_found'
get '/500', to: 'errors#server_error'

class ErrorsController
  def not_found
    render status: :not_found
  end
end
```

Rails 更新:

```shell
  rake rails:update
```

distinct/pluck:

```ruby
Article.distinct.pluck('author')
```

Relation#merge

```ruby
scope :with_drafts, -> {
  uniq.joins(:articles).merge(Article.draft)
}
```

order

```ruby
scope :recent, -> { order created_at: :desc }
```

按月分组

```ruby
.group("to_char(created_at, 'YYYY-MM')")
.group("to_char(created_at, 'YYYY-MM')").count
```

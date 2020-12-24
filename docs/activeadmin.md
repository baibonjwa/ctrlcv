---
title: ActiveAdmin
categories:
  - Ruby
contributors:
  - BAI
---

## ActiveAdmin

### 根据 Scope 过滤数据

```ruby
scope :draft
scope :for_approval
```

```ruby
scope :public, if: ->{ current_admin_user.can?(...) }
scope "Unapproved", :pending
scope("Published") { |books| books.where(:published: true) }
```

### 侧边栏过滤器

```ruby
filter :email
filter :username
```

### 自定义操作

```ruby
before_filter only: [:show, :edit, :publish] do
  @post = Post.find(params[:id])
end
```

#### 设置路由

```ruby
member_action :publish, method: :put do
  @post.publish!
  redirect_to admin_posts_path, notice: "The post '#{@post}' has been published!"
end
```

#### 在目录页添加链接

```ruby
index do
  column do |post|
    link_to 'Publish', publish_admin_post_path(post), method: :put
  end
end
```

#### 在详情/编辑页显示链接

```ruby
action_item only: [:edit, :show] do
  @post = Post.find(params[:id])
  link_to 'Publish', publish_admin_post_path(post), method: :put
end
```

### 列（Column）

```ruby
column :foo
```

```ruby
column :title, sortable: :name do |post|
  strong post.title
end
```

### 其他的帮助方法

```ruby
status_tag "Done"           # Gray
status_tag "Finished", :ok  # Green
status_tag "You", :warn     # Orange
status_tag "Failed", :error # Red
```

### 指定特定行为

```ruby
ActiveAdmin.register Post do
  actions :index, :edit
  # or: config.clear_action_items!
end
```

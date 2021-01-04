---
title: Rails
categories:
  - Rails
contributors:
  - BAI
---

## 帮助方法（Helper）

### Helper

```ruby
class ApplicationController
  helper_method :logged_in?

  def logged_in?
    "Something"
  end
end
```

### 表单

```ruby
# http://api.rubyonrails.org/classes/ActionView/Helpers/FormHelper.html

- form_for @person do |f|
  = f.label :first_name
  = f.label :first_name, "First name"
  = f.text_field :first_name

  = f.label :last_name>
  = f.text_field :last_name>

  - fields_for @person.permission do |fields|
    = fields.checkbox :admin

  -# name="person[admin]"
  - fields_for :person, @client do |fields|
    = fields.checkbox :admin

  = f.submit

# 还有: check_box, email_field, fields_for
# file_field, hidden_field, label, number_field, password_field
# radio_button, range_field, search_field, telephonen_field,
# text_area, text_field, url_field
```

### CSS/JS 包

```ruby
stylesheet_link_tag :monkey
javascript_link_tag :monkey
```

## 控制器（Controllers）

详见：[http://apidock.com/rails/ActionController/Base](http://apidock.com/rails/ActionController/Base)

### Layout

```ruby
class ProjectsController
  layout 'project'   # 默认 layout 名称与 project 名称相同

  def save
  end

  def edit
  end
end
```

### Before filter

```ruby
class ApplicationController < ActionController::Base
  before_filter :validate, only: [:save, :edit]
  before_filter :ensure_auth, except: [:logout]

  before_filter :require_login

  private

  def require_login
    unless logged_in?
      flash[:error] = "You must be logged in to access this section"
      redirect_to new_login_url
    end
  end
end
```

### 默认 URL 选项

```ruby
class ApplicationController < ActionController::Base
  def default_url_options(options)

  end
end
```

### Hash

```ruby
session[:what]
flash[:notice] = "Your session expired"
params[:id]
```

### XML 和 JSON

```ruby
class UsersController < ApplicationController
  def index
    @users = User.all
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @users}
      format.json { render :json => @users}
    end
  end
end
```

### Redirection

```ruby
redirect_to action: 'show', id: @entry.id
redirect_to root_url
```

### Render

```ruby
render nothing: true
render template: 'products/show'
render status: 500
render status: :forbidden
render text: '...'
render layout: 'special_layout'
render layout: false
render action: 'something'

render json: object
render xml: object

render location: photo_url(photo)
```

### 只返回 head 的响应

```ruby
head :bad_request
head :created, location: photo_path(@photo)
```

## Layout

```ruby
# app/views/layouts/application.html.erb
<%= content_for?(:content) ? yield :content : yield %>

# app/views/layouts/news.html.erb
<% content_for :content do %>
    ...
<% end %>
<% render template: :'layouts/application' %>
```

---
title: Rails Routes
categories:
  - Rails
contributors:
  - BAI
---

## 资源（Resource）

### Resources

```ruby
resources :photos

# PhotosController:
# index  =>    GET /photos
# new    =>    GET /photos/new
# create =>   POST /photos/new
# show   =>    GET /photos/:id
# edit   =>    GET /photos/:id/edit
# update =>    PUT /photos/:id
# delete => DELETE /photos/:id
#
# Helpers:
# new_photo_path
# photo_path(id)
# edit_photo_path(id)
```

### 自定义 action

```ruby
resources :photos do
  member { get 'preview' }       # /photo/1/preview
  collection { get 'search' }    # /photos/search

  get 'preview', on: :member     # 和第一个相同
end
```

### Options

```ruby
resources :photos,
  path_names: { new: 'brand_new' }    # /photos/1/brand_new
  path: 'postings'                    # /postings
  only: :index
  only: [:index, :show]
  except: :show
  except: [:index, :show]

  shallow: true                       # 会生成 shallow 路由
  shalow_path: 'secret'
  shallow_prefix: 'secret'
```

### 单独 resource (`resource`)

```ruby
resource :coder

# CodersController:
# new    =>    GET /coder/new
# create =>   POST /coder/new
# show   =>    GET /coder
# edit   =>    GET /coder/edit
# update =>    PUT /coder
# delete => DELETE /coder
```

## Match (`match`)

```ruby
match 'photo/:id' => 'photos#show'  # /photo/what-is-it
match 'photo/:id', id: /[0-9]+/     # /photo/0192
match 'photo/:id' => 'photos#show', constraints: { id: /[0-9]+/ }
match 'photo/:id', via: :get
match 'photo/:id', via: [:get, :post]

match 'photo/*path' => 'photos#unknown'    # /photo/what/ever

# params[:format] == 'jpg'
match 'photos/:id' => 'photos#show', :defaults => { :format => 'jpg' }
```

### Get/post

`get` 等同于 `match via: :get`.

```ruby
get 'photo/:id' => 'photos#show'
# 同 match 'photo/:id' => 'photos#show', via: :get

post 'photo/:id' => 'photos#update'
# 同 match 'photo/:id' => 'photos#show', via: :post
```

### 重定向

```ruby
match '/stories' => redirect('/posts')
match '/stories/:name' => redirect('/posts/%{name}')
```

### 命名

```ruby
# logout_path
match 'exit' => 'sessions#destroy', as: :logout
```

### 约束（Constraint）

```ruby
match '/', constraints: { subdomain: 'admin' }

# admin.site.com/admin/photos
namespace 'admin' do
  constraints subdomain: 'admin' do
    resources :photos
  end
end
```

### 自定义约束

```ruby
class BlacklistConstraint
  def initialize
    @ips = Blacklist.retrieve_ips
  end

  def matches?(request)
    @ips.include?(request.remote_ip)
  end
end

TwitterClone::Application.routes.draw do
  match "*path" => "blacklist#index",
    :constraints => BlacklistConstraint.new
end
```

### Scope

```ruby
scope 'admin', constraints: { subdomain: 'admin' } do
  resources ...
end
```

### Rack 中间件

```ruby
# Yes, Sprockets is middleware
match '/application.js' => Sprockets
```

### Route 帮助方法

```ruby
projects_path   # /projects
projects_url    # http://site.com/projects
```

### 完整示例

```ruby
# 路由的顺序也是下面路由创建的顺序
# 第一个创建的路由也有最高的优先级

# 标准路由
match 'products/:id' => 'catalog#view'

# :controller 和 :action 可以也换成其他的值

# 给路由命名
match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase

# 上面的路由可以通过 purchase_url(:id => product.id) 调用

resources :products

resources :products do
  member do
    get 'short'
    post 'toggle'
  end

  collection do
    get 'sold'
  end
end

# 子资源
resources :products do
  resources :comments, :sales
  resource :seller
end

# 更复杂的子资源
resources :products do
  resources :comments
  resources :sales do
    get 'recent', :on => :collection
  end
end

# 带命名空间
namespace :admin do
  # 路由为 /admin/products/* , 对应的 Controller 为 Admin::ProductsController
  # 文件为 (app/controllers/admin/products_controller.rb)
  resources :products
end

root :to => 'welcome#index'

# "rake routes" 可以查看全部路由信息
```

### 参考资料

- [Guides/Routing](http://guides.rubyonrails.org/routing.html)

- [ActionDispatch::Routing::Mapper](http://api.rubyonrails.org/classes/ActionDispatch/Routing/Mapper.html)

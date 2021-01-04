---
title: Rails - Controller
categories:
  - Rails
contributors:
  - BAI
---

## Rails - Controller

### 常见用法

```ruby
redirect_to root_url
redirect_to root_url, notice: "Good."
```

### 特殊的 Hash

```ruby
session[:user_id] = nil

flash[:notice] = "Hello"    # 下一次请求设置 flash 的内容
flash.keep                  # 保存 flash 的值
flash.now[:error] = "Boo"   # 只在当前的请求生效（下一个请求不生效）

cookies[:hello] = "Hi"

params[:page]

# params 由下面三种参数组成
query_parameters
path_parameters
request_parameters
```

### respond_to

```ruby
respond_to do |format|
  format.html
  format.xml  { render xml: @users }
  format.json { render json: @users }
  format.js    # 会被浏览器执行
end
```

### default_url_options

```ruby
# options 参数是传入给 url_for 的 hash
def default_url_options(options)

end
```

### Filter

```ruby
# callback 形式
before_filter :authenticate
before_filter :authenticate, except: [:login]
before_filter :authenticate, only: [:login]
def authenticate
  redirect_to login_url unless controller.logged_in?
end

# inline 形式
before_filter do |controller|
  redirect_to login_url unless controller.logged_in?
end

# 在类中形式
before_filter LoginFilter
class LoginFilter
  def self.filter(controller) ...; end
end

# Filter 设置例外
skip_before_filter :require_login, only: [:new, :create]

# 同时 before/after filters
around_filter :wrap_in_transaction
def wrap_in_transaction(&blk)
  ActiveRecord::Base.transaction { yield }
end
```

### HTTP 基本认证

```ruby
before_filter :authenticate

# HTTP 基本认证
def authenticate
  authenticate_or_request_with_http_basic { |u, p|
    u == "root" && p == "alpine"
  }
end

# Digest 认证:
def authenticate_by_digest
  realm = "Secret3000"
  users = {
    "rsc" => Digest::MD5.hexdigest("rsc:#{realm}:passwordhere")
  }

  authenticate_or_request_with_http_digest(realm) { |user|
    users[user]
  }
end

# 集成测试
def test_access
  auth = ActionController::HttpAuthentication::Basic.encode_credentials(user, pass)
  get "/notes/1.xml", nil, 'HTTP_AUTHORIZATION' => auth
end

# Token 验证
is_logged_in = authenticate_with_http_token do |token, options|
  token == our_secret_token
end

request_http_token_authentication  unless is_logged_in
```

### Request/Response

```ruby
request.host            #=> "www.example.com"
request.domain          #=> "www.example.com"
request.domain(n=2)     #=> "example.com"
request.port            #=> 80
request.protocol        #=> "http://"
request.query_string    #=> "q=duck+tales"
request.url             #=> "http://www.example.com/search?q=duck+tales"
request.fullpath        #=> "/search?q=duck+tales"

request.headers         # 返回 Header hash

request.format          #=> "text/html"
request.remote_ip       #=> "203.167.220.220"
request.local?

request.xhr?

request.method          #=> "POST"
request.method_symbol   #=> :post
request.get?
request.post?
request.put?
request.delete?
request.head?
```

### response

```ruby
response.body
response.status         #=> 404
response.location       # 跳转的 location
response.content_type
response.charset
response.headers

response.headers["Content-Type"] = "application/pdf"
```

### 流

```ruby
send_data pdfdata, filename: "foo.pdf", type: "application/pdf"
send_file Rails.root.join('public','filename.txt') [filename: '..', type: '..']
```

### 参考

- [Guide](http://guides.rubyonrails.org/action_controller_overview.html)
- [HttpAuthentication::Basic](http://api.rubyonrails.org/classes/ActionController/HttpAuthentication/Basic.html)
- [HttpAuthentication::Token](http://api.rubyonrails.org/classes/ActionController/HttpAuthentication/Token.html)

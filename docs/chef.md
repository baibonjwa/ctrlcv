---
title: Chef
categories:
  - Devops
contributors:
  - BAI
---

### 安装

```bash
  sudo apt-get install curl
```

```bash
$ curl -L https://omnitruck.chef.io/install.sh | sudo bash
Thank you for installing Chef!
```

```bash
$ chef-solo -v
...
Chef: 14.5.33
```

### 启动 Cookbook

```bash
  wget http://github.com/chef-cookbooks/chef-repo/tarball/master -O - | tar xzf - --strip-components=1
```

### Knife

```bash
  knife supermarket download mysql
```

### 调用 chef-solo

```bash
  chef-solo -c solo.rb -j web.json
```

## 示例

### 简单的编译源码

```ruby
execute "tar --no-same-owner -zxf hi.tar.gz" do
  cwd "/usr/local/src"
  creates "/usr/local/src/node-v#{version}"
end
```

```ruby
bash "compile" do
  cwd "/usr/local/src/node-v#{version}"
  code %[
    PATH=/usr/local/bin:$PATH
    ./configure
    make
  ]
  creates "/usr/local/src/node-v#{version}/node"
end
```

### 远程文件

```ruby
remote_file "/usr/local/src/hi.tar.gz" do
  source "http://..."
  checksum "ab83be..."
  mode 0644
  action :create_if_missing
end
```

### ruby_block

```ruby
ruby_block "name" do
  block { File.read ... }
  not_if { File.exists?(...) }
end
```

### 执行

```ruby
execute "name" do
  cwd "..."
  environment({ "PATH" => "..." })
  command "make install"
  creates "..."
end
```

### 条件判断

```ruby
  creates "/usr/local/src/node-v#{version}/node"
  not_if { File.exists?('...') }
```

## 其他资料

- [Learn Chef Rally](https://learn.chef.io) _(learn.chef.io)_
- [install_from_source.rb recipe](https://github.com/mdxp/nodejs-cookbook/blob/master/recipes/install_from_source.rb) _(github.com)_

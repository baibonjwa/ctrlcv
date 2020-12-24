---
title: Bundler
categories:
  - Ruby
contributors:
  - BAI
---

## Bundler {data-visible=false}

### 命令

```shell
bundle                  # 和 bundle install 一致
bundle install          # 安装 Gem
bundle install -j3      # 安装更快同时 3 个 Job
bundle update           # 更新全部 Gem
bundle update --source gemname  # 更新指定的 Gem

bundle outdated         # 显示过期的 Gem
cd `bundle show rails`  # 显示 Gem 的目录

bundle gem              # 创建新的 Gem 结构
```

### Gems

```Gemfile
gem 'hello'
gem 'hello', group: 'development'
```

### Github

```Gemfile
gem 'hello', github: 'rstacruz/hello'
gem 'hello', github: 'rstacruz/hello', 'branch: master'
```

### 分组

```Gemfile
group :development do
  gem 'hello'
end
```

### 部署

```shell
bundle install --without=test,development --deployment
```

### 本地 Gem 开发

先在 Gemfile 里定义一个 Git 源和分支

```Gemfile
gem 'hello', github: 'rstacruz/hello', branch: 'master'
```

然后

```shell
bundle config --global local.xxx ~/projects/xxx
```

### Rake 任务

```shell
# Rakefile
require 'bundler/gem_tasks'
```

```shell
rake release
rake build
```

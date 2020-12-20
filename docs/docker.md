---
title: Docker CLI
categories:
  - Devops
---

## 管理镜像

### `docker build`

```yml
docker build [options] .
  -t "app/container_name"    # name
  --build-arg APP_HOME=$APP_HOME    # 设置 build 参数
```

### `docker run`

```shell
docker run [options] IMAGE
# 具体参数参见 `docker create`
# 举例
docker run -it debian:buster /bin/bash
```

## 管理 Container

### `docker create`

```yml
docker create [options] IMAGE
  -a, --attach               # attach
  -i, --interactive          # attach 交互模式
  -t, --tty                  # pseudo-tty
      --name NAME            # 设置名称
  -p, --publish 5000:5000    # 端口映射
      --expose 5432          # 向已连接的 Container 暴露的端口
  -P, --publish-all          # 发布全部端口
      --link container:alias # 连接 Container
  -v, --volume `pwd`:/app    # 挂载（需要绝对路径）
  -e, --env NAME=hello       # 环境变量
```

```shell
$ docker create --name app_redis_1 \
  --expose 6379 \
  redis:3.0.2
```

### `docker exec`

```yml
docker exec [options] CONTAINER COMMAND
  -d, --detach        # 后台运行
  -i, --interactive
  -t, --tty
```

```shell
docker exec app_web_1 tail logs/development.log
docker exec -t -i app_web_1 rails c
```

### `docker start`

```yml
docker start [options] CONTAINER
-a, --attach
-i, --interactive

docker stop [options] CONTAINER
```

### `docker ps`

```shell
docker ps
docker ps -a
docker kill $ID
```

### `docker logs`

```shell
docker logs $ID
docker logs $ID 2>&1 | less
docker logs -f $ID
```

## 镜像

### `docker images`

```shell
docker images
  REPOSITORY   TAG        ID
  ubuntu       12.10      b750fe78269d
  me/myapp     latest     7b2431a8d968
```

```shell
docker images -a
```

### `docker rmi`

```yml
docker rmi b750fe78269d
```

Deletes `image`s.

## 清理

### 全部清理

```shell
docker system prune
```

清理挂载的镜像、Container、Volume、和网络

```shell
docker system prune -a
```

还会清理全部已停止的 Container 和所有未使用的镜像(不仅仅是已挂载的镜像)

### Containers

```sh
# 停止全部正在运行的 Container
docker stop $(docker ps -a -q)

# 删除已停止的 Container
docker container prune
```

### 镜像

```sh
# 删除全部镜像
docker image prune [-a]
```

### Volumes

```sh
# 删除全部 Volume
docker volume prune
```

## 参考资料

- [Getting Started](http://www.docker.io/gettingstarted/) _(docker.io)_

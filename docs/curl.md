---
title: Curl
categories:
  - CLI
contributors:
  - BAI
---

## 选项

### 选项

```bash
-o <file>    # --output: 写入文件
-u user:pass # --user: 验证
```

```bash
-v           # --verbose
-vv          # 更多的调试信息
-s           # --silent
```

```bash
-i           # --include: 输出内容包括 HTTP 头
-I           # --head: 只输出 HTTP 头
```

### 请求

```bash
-X POST          # --request
-L               # 如果链接跳转则请求跳转后的链接
```

### 数据

```bash
-d 'data'    # --data: HTTP 的 post 数据, URL 会被转码
-d @file     # --data 通过文件
-G           # --get: 通过 Get
```

### Header

```bash
-A <str>         # --user-agent
-b name=val      # --cookie
-b FILE          # --cookie
-H "X-Foo: y"    # --header
--compressed     # 使用 deflate/gzip
```

### SSL

```bash
    --cacert <file>
    --capath <dir>
```

```bash
-E, --cert <cert>     # --cert: 客户端证书文件
    --cert-type       # der/pem/eng
-k, --insecure        # 自签证的证书
```

## 示例

```bash
# Post 数据
curl -d password=x http://x.com/y
```

```bash
# 身份验证 + 数据
curl -u user:pass -d status="Hello" http://twitter.com/statuses/update.xml
```

```bash
# 文件上传
curl -v -include --form key1=value1 --form upload=@localfilename URL
```

```bash
# 使用 Curl 来检查是否远程资源可用
# 详见: https://matthewsetter.com/check-if-file-is-available-with-curl/
curl -o /dev/null --silent -Iw "%{http_code}" https://example.com/my.remote.tarball.gz
```

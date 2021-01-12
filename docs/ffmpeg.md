---
title: ffmpeg
categories:
  - CLI
---

### 常见的转换

```bash
-codecs          # list codecs
-c:v             # video codec (-vcodec) - 'copy' to copy stream
-c:a             # audio codec (-acodec)
```

```bash
-fs SIZE         # limit file size (bytes)
```

### 比率

```bash
-b:v 1M          # video bitrate (1M = 1Mbit/s)
-b:a 1M          # audio bitrate
```

### 视频

```bash
-aspect RATIO    # 比例 (4:3, 16:9, or 1.25)
-r RATE          # 帧率
-s WIDTHxHEIGHT  # 帧的尺寸
-vn              # 无视频
```

### 音频

```bash
-aq QUALITY      # 音频质量
-ar 44100        # 音频采样率（hz）
-ac 1            # 音频通道(1=mono, 2=stereo)
-an              # 没有音频
-vol N           # 音量(256=normal)
```

## 例子

### 转换铃声

```bash
ffmpeg -i foo.mp3 -ac 1 -ab 128000 -f mp4 -acodec libfaac -y target.m4r
```

### web 格式转换

```bash
# no audio
ffmpeg -i input.mov -vcodec h264   -an -strict -2 output.mp4
ffmpeg -i input.mov -vcodec libvpx -an output.webm
```

```bash
ffmpeg -i input.mov -vcodec h264 -acodec aac -strict -2 output.mp4
ffmpeg -i input.mov -vcodec libvpx -acodec libvorbis output.webm
```

```html
<video width="320" height="240" controls>
  <source src="movie.mp4" type='video/mp4'></source>
  <source src="movie.webm" type='video/ogg'></source>
</video>
```

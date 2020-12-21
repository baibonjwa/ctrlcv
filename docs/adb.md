---
title: adb (Android Debug Bridge)
categories:
  - CLI
author: BAI
---

## adb

### 设备相关

| 命令                    | 说明                        |
| ----------------------- | --------------------------- |
| `adb devices`           | 列出所有已连接的设备        |
| `adb devices -l`        | 列出所有已连接的设备和类型  |
| ---                     | ---                         |
| `adb root`              | 用 root 权限重启 adbd       |
| `adb start-server`      | 启动 adb server             |
| `adb kill-server`       | 杀死 adb server             |
| `adb remount`           | 以读/写权限重新挂载文件系统 |
| `adb reboot`            | 重启设备                    |
| `adb reboot bootloader` | 重启至 fastboot 模式        |
| `adb disable-verity`    | 关闭 DM-Verity              |

`adb` 命令后面可以添加 `wait-for-device` 来确保当设备连接后该命令会执行一次

`-s` 参数可以在有多设备时来指定其中某一个设备

```shell
$ adb wait-for-device devices
 List of devices attached
 somedevice-1234 device
 someotherdevice-1234 device
```

```shell
  adb -s somedevice-1234 root
```

### Logcat

| 命令                       | 说明                           |
| -------------------------- | ------------------------------ |
| `adb logcat`               | 向标准输出里打印日志           |
| `adb logcat -g`            | 显示当前的日志缓存长度         |
| `adb logcat -G <size>`     | 设置日志缓存长度               |
| `adb logcat -c`            | 清除日志缓存                   |
| `adb logcat *:V`           | 开启全部的日志信息（调试信息） |
| `adb logcat -f <filename>` | 日志输出到指定文件中           |

```shell
  adb logcat -G 16M
  adb logcat *:V > output.log
```

### 文件管理

| 命令                        | 说明                     |
| --------------------------- | ------------------------ |
| `adb push <local> <remote>` | 拷贝本地文件至远程的设备 |
| `adb pull <remote> <local>` | 拷贝远程设备的文件至本地 |

```shell
echo "This is a test" > test.txt
adb push  test.txt /sdcard/test.txt
adb pull /sdcard/test.txt pulledTest.txt
```

### 远程 Shell

| 命令                                   | 说明                                                 |
| -------------------------------------- | ---------------------------------------------------- |
| `adb shell <command>`                  | 在设备上运行指定的命令，大部分 Unix 的命令都可以执行 |
| `adb shell wm size`                    | 显示当前的屏幕分辨率                                 |
| `adb shell wm size WxH`                | 设置分辨率                                           |
| `adb shell pm list packages`           | 列出所有已安装的包                                   |
| `adb shell pm list packages -3`        | 列出所有已安装的第三方包                             |
| `adb shell monkey -p app.package.name` | 启动指定的包                                         |

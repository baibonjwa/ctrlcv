---
title: Bash scripting
categories:
  - CLI
keywords:
  - Variables
  - Functions
  - Interpolation
  - Brace expansions
  - Loops
  - Conditional execution
  - Command substitution
contributors:
  - BAI
---

## Bash

### 参考资料

- [Learn bash in y minutes](https://learnxinyminutes.com/docs/bash/) _(learnxinyminutes.com)_
- [Bash Guide](http://mywiki.wooledge.org/BashGuide) _(mywiki.wooledge.org)_

### 示例

```bash
#!/usr/bin/env bash

NAME="John"
echo "Hello $NAME!"
```

### 变量

```bash
NAME="John"
echo $NAME
echo "$NAME"
echo "${NAME}!"
```

### 字符串引用

```bash
NAME="John"
echo "Hi $NAME"  #=> Hi John
echo 'Hi $NAME'  #=> Hi $NAME
```

### Shell 命令执行

```bash
echo "I'm in $(pwd)"
echo "I'm in `pwd`"
# Same
```

详见 [Command substitution](http://wiki.bash-hackers.org/syntax/expansion/cmdsubst)

### 条件执行

```bash
git commit && git push
git commit || echo "Commit failed"
```

### 函数

```bash
get_name() {
  echo "John"
}

echo "You are $(get_name)"
```

详见: [Functions](#functions)

### 条件语句

```bash
if [[ -z "$string" ]]; then
  echo "String is empty"
elif [[ -n "$string" ]]; then
  echo "String is not empty"
fi
```

详见: [Conditionals](#conditionals)

### 严格模式

```bash
set -euo pipefail
IFS=$'\n\t'
```

详见: [非官方的 Bash 脚本严格模式](http://redsymbol.net/articles/unofficial-bash-strict-mode/)

### 括号用法

```bash
echo {A,B}.js
```

| 表达式     | 说明                |
| ---------- | ------------------- |
| `{A,B}`    | Same as `A B`       |
| `{A,B}.js` | Same as `A.js B.js` |
| `{1..5}`   | Same as `1 2 3 4 5` |

详见: [括号用法](http://wiki.bash-hackers.org/syntax/expansion/brace)

## 参数用法

### 基本用法

```bash
name="John"
echo ${name}
echo ${name/J/j}    #=> "john" (substitution)
echo ${name:0:2}    #=> "Jo" (slicing)
echo ${name::2}     #=> "Jo" (slicing)
echo ${name::-1}    #=> "Joh" (slicing)
echo ${name:(-1)}   #=> "n" (slicing from right)
echo ${name:(-2):1} #=> "h" (slicing from right)
echo ${food:-Cake}  #=> $food or "Cake"
```

```bash
length=2
echo ${name:0:length}  #=> "Jo"
```

详见: [参数用法](http://wiki.bash-hackers.org/syntax/pe)

```bash
STR="/path/to/foo.cpp"
echo ${STR%.cpp}    # /path/to/foo
echo ${STR%.cpp}.o  # /path/to/foo.o
echo ${STR%/*}      # /path/to

echo ${STR##*.}     # cpp (extension)
echo ${STR##*/}     # foo.cpp (basepath)

echo ${STR#*/}      # path/to/foo.cpp
echo ${STR##*/}     # foo.cpp

echo ${STR/foo/bar} # /path/to/bar.cpp
```

```bash
STR="Hello world"
echo ${STR:6:5}   # "world"
echo ${STR: -5:5}  # "world"
```

```bash
SRC="/path/to/foo.cpp"
BASE=${SRC##*/}   #=> "foo.cpp" (basepath)
DIR=${SRC%$BASE}  #=> "/path/to/" (dirpath)
```

### 替换符

| 表达式            | 说明           |
| ----------------- | -------------- |
| `${FOO%suffix}`   | 移除后缀       |
| `${FOO#prefix}`   | 移除前缀       |
| ---               | ---            |
| `${FOO%%suffix}`  | 移除长前缀     |
| `${FOO##prefix}`  | 移除长后缀     |
| ---               | ---            |
| `${FOO/from/to}`  | 替换第一个匹配 |
| `${FOO//from/to}` | 替换全部匹配   |
| ---               | ---            |
| `${FOO/%from/to}` | 替换后缀       |
| `${FOO/#from/to}` | 替换前缀       |

### 注释

```bash
# Single line comment
```

```bash
: '
This is a
multi line
comment
'
```

### 字符串剪裁（Substring）

| 表达式          | 说明                           |
| --------------- | ------------------------------ |
| `${FOO:0:3}`    | Substring _(position, length)_ |
| `${FOO:(-3):3}` | Substring from the right       |

### 长度

| 表达式    | 说明             |
| --------- | ---------------- |
| `${#FOO}` | Length of `$FOO` |

### 操作符

```bash
STR="HELLO WORLD!"
echo ${STR,}   #=> "hELLO WORLD!" (第一个字母小写)
echo ${STR,,}  #=> "hello world!" (全部)

STR="hello world!"
echo ${STR^}   #=> "Hello world!" (第一个字母大写)
echo ${STR^^}  #=> "HELLO WORLD!" (全部)
```

### 默认值

| 表达式            | 说明                             |
| ----------------- | -------------------------------- |
| `${FOO:-val}`     | `$FOO` 或者 `val` 的值           |
| `${FOO:=val}`     | 设置 `$FOO` 为 `val` 的值        |
| `${FOO:+val}`     | 如果 `$FOO` 有值则为 `val`       |
| `${FOO:?message}` | 如果 `$FOO` 未赋值则显示错误信息 |

省略`:` 可以不进行非空的检测 比如可以写作 `${FOO-val}`

## 循环

### 基本循环

```bash
for i in /etc/rc.*; do
  echo $i
done
```

### 类似 C 语言写法的循环

```bash
for ((i = 0 ; i < 100 ; i++)); do
  echo $i
done
```

### 范围

```bash
for i in {1..5}; do
    echo "Welcome $i"
done
```

### 每步的尺寸

```bash
for i in {5..50..5}; do
    echo "Welcome $i"
done
```

### 读取一行

```bash
cat file.txt | while read line; do
  echo $line
done
```

### 永久循环

```bash
while true; do
  ···
done
```

## 函数

### 定义函数

```bash
myfunc() {
    echo "hello $1"
}
```

```bash
# 效果和上面一样
function myfunc() {
    echo "hello $1"
}
```

```bash
myfunc "John"
```

### 返回值

```bash
myfunc() {
    local myresult='some value'
    echo $myresult
}
```

```bash
result="$(myfunc)"
```

### 抛出错误

```bash
myfunc() {
  return 1
}
```

```bash
if myfunc; then
  echo "success"
else
  echo "failure"
fi
```

### 参数

| 表达式 | 说明                     |
| ------ | ------------------------ |
| `$#`   | 参数的数量               |
| `$*`   | 全部参数                 |
| `$@`   | 全部参数（从第一个开始） |
| `$1`   | 第一个参数               |
| `$_`   | 前一条命令的最后一个参数 |

详见 [特殊参数](http://wiki.bash-hackers.org/syntax/shellvars#special_parameters_and_shell_variables).

## 条件

### 条件

注意： `[[` 实际上是一条可以返回 `0` (true) 或 `1` (false) 的命令。 任何命令都遵循同样的逻辑，比如 `grep(1)` or `ping(1)` 也可以用于条件

| Condition                | Description  |
| ------------------------ | ------------ |
| `[[ -z STRING ]]`        | 空字符串     |
| `[[ -n STRING ]]`        | 字符串不为空 |
| `[[ STRING == STRING ]]` | 相等         |
| `[[ STRING != STRING ]]` | 不相等       |
| ---                      | ---          |
| `[[ NUM -eq NUM ]]`      | 相等         |
| `[[ NUM -ne NUM ]]`      | 不相等       |
| `[[ NUM -lt NUM ]]`      | 小于         |
| `[[ NUM -le NUM ]]`      | 小于等于     |
| `[[ NUM -gt NUM ]]`      | 大于         |
| `[[ NUM -ge NUM ]]`      | 大于等于     |
| ---                      | ---          |
| `[[ STRING =~ STRING ]]` | 正则         |
| ---                      | ---          |
| `(( NUM < NUM ))`        | 数字比较     |

#### 更多的条件

| 条件                 | 说明 |
| -------------------- | ---- |
| `[[ -o noclobber ]]` |      |
| ---                  | ---  |
| `[[ ! EXPR ]]`       | 非   |
| `[[ X && Y ]]`       | 与   |
| `[[ X \|\| Y ]]`     | 或   |

### 文件条件

| 条件                    | 说明                   |
| ----------------------- | ---------------------- |
| `[[ -e FILE ]]`         | 文件是否存在           |
| `[[ -r FILE ]]`         | 文件是否可读           |
| `[[ -h FILE ]]`         | 是否为 Symbolic Link   |
| `[[ -d FILE ]]`         | 是否是目录             |
| `[[ -w FILE ]]`         | 文件是否可写           |
| `[[ -s FILE ]]`         | 文件尺寸是否 > 0       |
| `[[ -f FILE ]]`         | 是否是文件             |
| `[[ -x FILE ]]`         | 是否可执行             |
| ---                     | ---                    |
| `[[ FILE1 -nt FILE2 ]]` | 文件 1 是否比文件 2 新 |
| `[[ FILE1 -ot FILE2 ]]` | 文件 1 是否比文件 2 旧 |
| `[[ FILE1 -ef FILE2 ]]` | 是否是同一个文件       |

### 示例

```bash
# String
if [[ -z "$string" ]]; then
  echo "String is empty"
elif [[ -n "$string" ]]; then
  echo "String is not empty"
else
  echo "This never happens"
fi
```

```bash
if [[ X && Y ]]; then
  ...
fi
```

```bash
if [[ "$A" == "$B" ]]
```

```bash
if [[ "A" =~ . ]]
```

```bash
if (( $a < $b )); then
   echo "$a is smaller than $b"
fi
```

```bash
if [[ -e "file.txt" ]]; then
  echo "file exists"
fi
```

## 数组

### 定义数组

```bash
Fruits=('Apple' 'Banana' 'Orange')
```

```bash
Fruits[0]="Apple"
Fruits[1]="Banana"
Fruits[2]="Orange"
```

### 使用数组

```bash
echo ${Fruits[0]}           # 第一个元素
echo ${Fruits[-1]}          # 最后一个元素
echo ${Fruits[@]}           # 全部元素，以空格分隔
echo ${#Fruits[@]}          # 数组元素的数量
echo ${#Fruits}             # 第一个元素的字符串长度
echo ${#Fruits[3]}          # 第N个元素的字符串长
echo ${Fruits[@]:3:2}       # 范围(从第三个开始长度 2)
echo ${!Fruits[@]}          # 所有元素的 Key ，空格分隔
```

### 操作

```bash
Fruits=("${Fruits[@]}" "Watermelon")    # Push
Fruits+=('Watermelon')                  # 也是 Push
Fruits=( ${Fruits[@]/Ap*/} )            # 根据正则移除元素
unset Fruits[2]                         # 移除一个元素
Fruits=("${Fruits[@]}")                 # 复制一份
Fruits=("${Fruits[@]}" "${Veggies[@]}") # 连接两个数组
lines=(`cat "logfile"`)                 # 从文件中读取
```

### 迭代

```bash
for i in "${arrayName[@]}"; do
  echo $i
done
```

## 字典结构

### 定义

```bash
declare -A sounds
```

```bash
sounds[dog]="bark"
sounds[cow]="moo"
sounds[bird]="tweet"
sounds[wolf]="howl"
```

声明 `sound` 为一个字典对象(也叫做关联数组).

### 使用字典

```bash
echo ${sounds[dog]} # Key-Value
echo ${sounds[@]}   # 全部的值
echo ${!sounds[@]}  # 全部的键
echo ${#sounds[@]}  # 元素的数量
unset sounds[dog]   # 删除 dog 值
```

### 迭代

#### 值的迭代

```bash
for val in "${sounds[@]}"; do
  echo $val
done
```

#### 键的迭代

```bash
for key in "${!sounds[@]}"; do
  echo $key
done
```

## 选项（Options）

### 选项

```bash
set -o noclobber  # 阻止你覆盖文件
set -o errexit    # 遇到错误即退出
set -o pipefail   # 显示隐藏的错误
set -o nounset    # 显示未设置的变量
```

### Glob 选项

```bash
shopt -s nullglob    # 无匹配时输出空字符串
shopt -s failglob    # 无匹配时弹出错误
shopt -s nocaseglob  # 大小写敏感的 Glob
shopt -s dotglob     # 通配符匹配 .xxx.xx 隐藏文件 ("*.sh" => ".foo.sh")
shopt -s globstar    # 允许递归的匹配('lib/**/*.rb' => 'lib/a/b/c.rb')
```

## 历史记录

### 命令

| 命令                  | 说明               |
| --------------------- | ------------------ |
| `history`             | 显示历史           |
| `shopt -s histverify` | 不立即显示全部内容 |

### 扩展用法

| 表达式       | 说明                            |
| ------------ | ------------------------------- |
| `!$`         | 显示最近的命令中最后的参数      |
| `!*`         | 显示最近的命令中全部参数        |
| `!-n`        | 显示 n 条最近的命令             |
| `!n`         | 在历史中显示 n 条命令           |
| `!<command>` | 显示最近使用 `<command>` 的信息 |

### 操作

| 操作                 | 说明                                                  |
| -------------------- | ----------------------------------------------------- |
| `!!`                 | 再次执行上一条命令                                    |
| `!!:s/<FROM>/<TO>/`  | 在最近的命令中替换掉 `<FROM>` 和 `<TO>`之间的内容     |
| `!!:gs/<FROM>/<TO>/` | 在最近的命令中替换掉全部 `<FROM>` 和 `<TO>`之间的内容 |
| `!$:t`               | 只展开最近的命令最后一个参数的参数名                  |
| `!$:h`               | 只展开最近的命令最后一个参数的目录                    |

`!!` 和 `!$` 也可以被任何有效的表达式替换

### Slices

| 代码     | 说明                                        |
| -------- | ------------------------------------------- |
| `!!:n`   | 只展开第 n 中内容，命令为 0，第一个参数为 1 |
| `!^`     | 从最近的命令中展开第一个参数                |
| `!$`     | 从最近的命令中展开最后一段                  |
| `!!:n-m` | 从最近的命令中展开 n-m 的范围               |
| `!!:n-$` | 从最近的命令中展开 n-最后                   |

`!!` 也可以被其他操作替换，例如 `!cat`, `!-2`, `!42` 等。

## 一些零散的

### 数字计算

```bash
$((a + 200))      # a 加 200
```

```bash
$(($RANDOM%200))  # 随机数 0..199
```

### 子 Shell 语句[[:w

]]

```bash
(cd somedir; echo "I'm now in $PWD")
pwd # 还在最开始的目录
```

### 重定向（Redirection）

```bash
python hello.py > output.txt   # 标准输出至文件
python hello.py >> output.txt  # 标准输出至文件（Append 模式）
python hello.py 2> error.log   # 标准错误输出值文件
python hello.py 2>&1           # 标准错误输出至标准输出中
python hello.py 2>/dev/null    # 不输出标准错误
python hello.py &>/dev/null    # 什么也输出
```

```bash
python hello.py < foo.txt      # foo.txt 的内容作为标准输入至 Python 脚本中
```

### 查看命令

```bash
command -V cd
#=> "cd is a function/alias/whatever"
```

### Trap 错误

```bash
trap 'echo Error at about $LINENO' ERR
```

or

```bash
traperr() {
  echo "ERROR: ${BASH_SOURCE[1]} at about ${BASH_LINENO[0]}"
}

set -o errtrace
trap traperr ERR
```

### Case/switch

```bash
case "$1" in
  start | up)
    vagrant up
    ;;

  *)
    echo "Usage: $0 {start|stop|ssh}"
    ;;
esac
```

### Source 相对路径

```bash
source "${0%/*}/../share/foo.sh"
```

### printf

```bash
printf "Hello %s, I'm %s" Sven Olga
#=> "Hello Sven, I'm Olga

printf "1 + 1 = %d" 2
#=> "1 + 1 = 2"

printf "This is how you print a float: %f" 2
#=> "This is how you print a float: 2.000000"
```

### 脚本字典

```bash
DIR="${0%/*}"
```

### 获取选项（options）

```bash
while [[ "$1" =~ ^- && ! "$1" == "--" ]]; do case $1 in
  -V | --version )
    echo $version
    exit
    ;;
  -s | --string )
    shift; string=$1
    ;;
  -f | --flag )
    flag=1
    ;;
esac; shift; done
if [[ "$1" == '--' ]]; then shift; fi
```

### Heredoc

```sh
cat <<END
hello world
END
```

### Reading input

```bash
echo -n "Proceed? [y/n]: "
read ans
echo $ans
```

```bash
read -n 1 ans    # Just one character
```

### 特殊变量

| 表达式 | 说明                   |
| ------ | ---------------------- |
| `$?`   | 最后一个任务的退出状态 |
| `$!`   | 最后一个背景任务的 PID |
| `$$`   | Shell 的 PID           |
| `$0`   | Shell 脚本的文件名     |

详见 [Special parameters](http://wiki.bash-hackers.org/syntax/shellvars#special_parameters_and_shell_variables).

### 跳转至上一个目录

```bash
pwd # /home/user/foo
cd bar/
pwd # /home/user/foo/bar
cd -
pwd # /home/user/foo
```

### 检查命令结果

```bash
if ping -c 1 google.com; then
  echo "It appears you have a working internet connection"
fi
```

### Grep 检查

```bash
if grep -q 'foo' ~/.bash_history; then
  echo "You appear to have typed 'foo' in the past"
fi
```

## 其他资料

- [Bash-hackers wiki](http://wiki.bash-hackers.org/) _(bash-hackers.org)_
- [Shell vars](http://wiki.bash-hackers.org/syntax/shellvars) _(bash-hackers.org)_
- [Learn bash in y minutes](https://learnxinyminutes.com/docs/bash/) _(learnxinyminutes.com)_
- [Bash Guide](http://mywiki.wooledge.org/BashGuide) _(mywiki.wooledge.org)_
- [ShellCheck](https://www.shellcheck.net/) _(shellcheck.net)_

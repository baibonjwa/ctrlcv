---
title: Vim
categories:
  - Vim
intro: |
  [Vim](http://www.vim.org/) 是一款非常有效率的文本编辑器，这篇文档参考 Vim 8.0，`:help key-notation` 命令可以查看简单的命令列表.
---

## Vim

### 退出

| 快捷键         | 说明                     |
| -------------- | ------------------------ |
| `:qa`          | 关闭所有文件             |
| `:qa!`         | 关闭所有文件，不提示保存 |
| ---            | ---                      |
| `:w`           | 保存                     |
| `:wq` _/_ `:x` | 保存并关闭文件           |
| ---            | ---                      |
| `:q`           | 关闭文件                 |
| `:q!`          | 关闭保存，不提示保存     |
| ---            | ---                      |
| `ZZ`           | 保存并退出               |
| `ZQ`           | 不检查内容变化并退出     |

### 定位

| 快捷键              | 说明         |
| ------------------- | ------------ |
| `h` `j` `k` `l`     | 上下左右移动 |
| `<C-U>` _/_ `<C-D>` | 半页翻页     |
| `<C-B>` _/_ `<C-F>` | 整页翻页     |

#### 单词

| 快捷键       | 说明                    |
| ------------ | ----------------------- |
| `b` _/_ `w`  | 上一个/下一个单词       |
| `ge` _/_ `e` | 上一个/下一个单词的末尾 |

#### 行

| 快捷键       | 说明             |
| ------------ | ---------------- |
| `0` _(zero)_ | 行首             |
| `^`          | 行首（不计空格） |
| `$`          | 行尾             |

#### 字符

| `fc` | 向前查找字符 `c` |
| `Fc` | 向后查找字符 `c` |

#### 文档

| 快捷键 | 说明               |
| ------ | ------------------ |
| `gg`   | 第一行 First line  |
| `G`    | 最后一行 Last line |
| `:n`   | 跳转至第 n 行      |
| `nG`   | 同上               |

#### 窗口

| 快捷键 | 说明                 |
| ------ | -------------------- |
| `zz`   | 将当前行移至窗口中心 |
| `zt`   | 将当前行移至顶部     |
| `zb`   | 将当前行移至底部     |
| `H`    | 光标移动至屏幕顶部   |
| `M`    | 光标移动至屏幕中心   |
| `L`    | 光标移动至屏幕底部   |

#### 搜索

| 快捷键 | 说明                 |
| ------ | -------------------- |
| `n`    | 下一个匹配的搜索结果 |
| `N`    | 上一个匹配的搜索结果 |
| `*`    | 下一个匹配的整个单词 |
| `#`    | 上一个匹配的整个单词 |

#### Tab 页

| 快捷键            | 说明                  |
| ----------------- | --------------------- |
| `:tabedit [file]` | 在新的 Tab 中编辑文件 |
| `:tabfind [file]` | 在新的 Tab 中打开文件 |
| `:tabclose`       | 关闭当前 Tab          |
| `:tabs`           | 列出全部 Tab          |
| `:tabfirst`       | 跳转至第一个 Tab      |
| `:tablast`        | 跳转至最后一个 Tab    |
| `:tabn`           | 跳转至下一个 Tab      |
| `:tabp`           | 跳转至前一个 Tab      |

### 编辑

| 快捷键  | 说明                       |
| ------- | -------------------------- |
| `a`     | 在当前字符后插入           |
| `A`     | 在该行的最后插入           |
| `i`     | 在当前光标处插入           |
| `o`     | 在下一行插入               |
| `O`     | 在前一行插入               |
| ---     | ---                        |
| `s`     | 删除字符并插入             |
| `S`     | 删除行并插入               |
| `C`     | 删除至该行末尾的字符并插入 |
| ---     | ---                        |
| `r`     | 替换一个字符               |
| `R`     | 进入替换模式               |
| ---     | ---                        |
| `u`     | 撤销改变                   |
| `<C-R>` | 重做改变                   |

### 退出插入模式

| 快捷键            | 说明                       |
| ----------------- | -------------------------- |
| `Esc` _/_ `<C-[>` | 退出插入模式               |
| `<C-C>`           | 退出插入模式并终止当前命令 |

### 剪贴板

| 快捷键          | 说明                        |
| --------------- | --------------------------- |
| `x`             | 删除字符                    |
| ---             | ---                         |
| `dd`            | 删除行 _(剪切)_             |
| `yy`            | 复制行                      |
| ---             | ---                         |
| `p`             | 粘贴                        |
| `P`             | 在光标前粘贴                |
| ---             | ---                         |
| `"*p` _/_ `"+p` | Paste from system clipboard |
| `"*y` _/_ `"+y` | Paste to system clipboard   |

### Visual mode

| Shortcut | Description             |
| -------- | ----------------------- |
| `v`      | Enter visual mode       |
| `V`      | Enter visual line mode  |
| `<C-V>`  | Enter visual block mode |

#### In visual mode

| Shortcut    | Description             |
| ----------- | ----------------------- |
| `d` _/_ `x` | Delete selection        |
| `s`         | Replace selection       |
| `y`         | Yank selection _(Copy)_ |

See [Operators](#operators) for other things you can do.

## Operators

### Usage

Operators let you operate in a range of text (defined by _motion_). These are performed in normal mode.

| `d` | `w` |
| Operator | Motion |

### Operators list

| Shortcut | Description                     |
| -------- | ------------------------------- |
| `d`      | Delete                          |
| `y`      | Yank _(copy)_                   |
| `c`      | Change _(delete then insert)_   |
| ---      | ---                             |
| `>`      | Indent right                    |
| `<`      | Indent left                     |
| `=`      | Autoindent                      |
| ---      | ---                             |
| `g~`     | Swap case                       |
| `gU`     | Uppercase                       |
| `gu`     | Lowercase                       |
| ---      | ---                             |
| `!`      | Filter through external program |

See `:help operator`

### Examples

Combine operators with _motions_ to use them.

| Shortcut               | Description                               |
| ---------------------- | ----------------------------------------- |
| `d`_d_                 | _(repeat the letter)_ Delete current line |
| `d`_w_                 | Delete to next word                       |
| `d`_b_                 | Delete to beginning of word               |
| _2_`dd`                | Delete 2 lines                            |
| `d`_ip_                | Delete a text object _(inside paragraph)_ |
| _(in visual mode)_ `d` | Delete selection                          |

See: `:help motion.txt`

## Text objects

### Usage

Text objects let you operate (with an _operator_) in or around text blocks (_objects_).

| `v` | `i` | `p` |
| Operator | [i]nside or [a]round | Text object |

### Text objects

| Shortcut               | Description           |
| ---------------------- | --------------------- |
| `p`                    | Paragraph             |
| `w`                    | Word                  |
| `s`                    | Sentence              |
| ---                    | ---                   |
| `[` `(` `{` `<`        | A [], (), or {} block |
| `'` `"` <code>`</code> | A quoted string       |
| ---                    | ---                   |
| `b`                    | A block [(            |
| `B`                    | A block in [{         |
| `t`                    | A XML tag block       |

### Examples

| Shortcut    | Description                        |
| ----------- | ---------------------------------- |
| `vip`       | Select paragraph                   |
| `vipipipip` | Select more                        |
| ---         | ---                                |
| `yip`       | Yank inner paragraph               |
| `yap`       | Yank paragraph (including newline) |
| ---         | ---                                |
| `dip`       | Delete inner paragraph             |
| `cip`       | Change inner paragraph             |

See [Operators](#operators) for other things you can do.

### Diff

| Shortcut                       | Description                           |
| ------------------------------ | ------------------------------------- |
| `gvimdiff file1 file2 [file3]` | See differences between files, in HMI |

## Misc

### Folds

| Shortcut      | Description                  |
| ------------- | ---------------------------- |
| `zo` _/_ `zO` | Open                         |
| `zc` _/_ `zC` | Close                        |
| `za` _/_ `zA` | Toggle                       |
| ---           | ---                          |
| `zv`          | Open folds for this line     |
| ---           | ---                          |
| `zM`          | Close all                    |
| `zR`          | Open all                     |
| ---           | ---                          |
| `zm`          | Fold more _(foldlevel += 1)_ |
| `zr`          | Fold less _(foldlevel -= 1)_ |
| ---           | ---                          |
| `zx`          | Update folds                 |

Uppercase ones are recursive (eg, `zO` is open recursively).

### Navigation

| Shortcut       | Description                |
| -------------- | -------------------------- |
| `%`            | Nearest/matching `{[()]}`  |
| `[(` `[{` `[<` | Previous `(` or `{` or `<` |
| `])`           | Next                       |
| ---            | ---                        |
| `[m`           | Previous method start      |
| `[M`           | Previous method end        |

### Jumping

| Shortcut | Description                  |
| -------- | ---------------------------- |
| `<C-O>`  | Go back to previous location |
| `<C-I>`  | Go forward                   |
| ---      | ---                          |
| `gf`     | Go to file in cursor         |

### Counters

| Shortcut | Description      |
| -------- | ---------------- |
| `<C-A>`  | Increment number |
| `<C-X>`  | Decrement        |

### Windows

| `z{height}<Cr>` | Resize pane to `{height}` lines tall |

### Tags

| Shortcut             | Description                                     |
| -------------------- | ----------------------------------------------- |
| `:tag Classname`     | Jump to first definition of Classname           |
| ---                  | ---                                             |
| `<C-]>`              | Jump to definition                              |
| `g]`                 | See all definitions                             |
| `<C-T>`              | Go back to last tag                             |
| `<C-O> <C-I>`        | Back/forward                                    |
| ---                  | ---                                             |
| `:tselect Classname` | Find definitions of Classname                   |
| `:tjump Classname`   | Find definitions of Classname (auto-select 1st) |

### Case

| Shortcut | Description                          |
| -------- | ------------------------------------ |
| `~`      | Toggle case (Case => cASE)           |
| `gU`     | Uppercase                            |
| `gu`     | Lowercase                            |
| ---      | ---                                  |
| `gUU`    | Uppercase current line (also `gUgU`) |
| `guu`    | Lowercase current line (also `gugu`) |

Do these in visual or normal mode.

### Marks

| Shortcut           | Description                                          |
| ------------------ | ---------------------------------------------------- |
| <code>`^</code>    | Last position of cursor in insert mode               |
| <code>`.</code>    | Last change in current buffer                        |
| <code>`"</code>    | Last exited current buffer                           |
| <code>`0</code>    | In last file edited                                  |
| <code>''</code>    | Back to line in current buffer where jumped from     |
| <code>``</code>    | Back to position in current buffer where jumped from |
| <code>`[</code>    | To beginning of previously changed or yanked text    |
| <code>`]</code>    | To end of previously changed or yanked text          |
| <code>`&lt;</code> | To beginning of last visual selection                |
| <code>`&gt;</code> | To end of last visual selection                      |
| ---                | ---                                                  |
| `ma`               | Mark this cursor position as `a`                     |
| <code>`a</code>    | Jump to the cursor position `a`                      |
| `'a`               | Jump to the beginning of the line with position `a`  |
| <code>d'a</code>   | Delete from current line to line of mark `a`         |
| <code>d`a</code>   | Delete from current position to position of mark `a` |
| <code>c'a</code>   | Change text from current line to line of `a`         |
| <code>y`a</code>   | Yank text from current position to position of `a`   |
| ---                | ---                                                  |
| `:marks`           | List all current marks                               |
| `:delm a`          | Delete mark `a`                                      |
| `:delm a-d`        | Delete marks `a`, `b`, `c`, `d`                      |
| `:delm abc`        | Delete marks `a`, `b`, `c`                           |

### Misc

| Shortcut       | Description                                       |
| -------------- | ------------------------------------------------- |
| `.`            | Repeat last command                               |
| `]p`           | Paste under the current indentation level         |
| ---            | ---                                               |
| `:set ff=unix` | Convert Windows line endings to Unix line endings |

### Command line

| Shortcut     | Description                               |
| ------------ | ----------------------------------------- |
| `<C-R><C-W>` | Insert current word into the command line |
| `<C-R>"`     | Paste from " register                     |
| `<C-X><C-F>` | Auto-completion of path in insert mode    |

### Text alignment

    :center [width]
    :right [width]
    :left

See `:help formatting`

### Calculator

| Shortcut      | Description                             |
| ------------- | --------------------------------------- |
| `<C-R>=128/2` | Shows the result of the division : '64' |

Do this in insert mode.

### Exiting with an error

    :cq
    :cquit

Works like `:qa`, but throws an error. Great for aborting Git commands.

### Spell checking

| Shortcut                     | Description                                            |
| ---------------------------- | ------------------------------------------------------ |
| `:set spell spelllang=en_us` | Turn on US English spell checking                      |
| `]s`                         | Move to next misspelled word after the cursor          |
| `[s`                         | Move to previous misspelled word before the cursor     |
| `z=`                         | Suggest spellings for the word under/after the cursor  |
| `zg`                         | Add word to spell list                                 |
| `zw`                         | Mark word as bad/mispelling                            |
| `zu` / `C-X (Insert Mode)`   | Suggest words for bad word under cursor from spellfile |

See `:help spell`

## Also see

- [Vim cheatsheet](https://vim.rtorr.com/) _(vim.rotrr.com)_
- [Vim documentation](http://vimdoc.sourceforge.net/htmldoc/) _(vimdoc.sourceforge.net)_
- [Interactive Vim tutorial](http://openvim.com/) _(openvim.com)_

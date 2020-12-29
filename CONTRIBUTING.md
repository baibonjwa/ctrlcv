# 如何贡献

无论您是想贡献一篇文档，还是找到了实用的资料但没时间整理，或者发现某篇文章过时了，又或哪怕是仅仅发现了个错别字，都是对这个项目很大的帮助。
无论有任何小的想法、意见、建议，我们都鼓励您 [新建一个 issue](https://github.com/BAI-Bonjwa/ctrlcv/issues/new)。

## 项目本地搭建

本项目基于 [Gatsby](https://www.gatsbyjs.com/) 框架

```shell
  # 下载源代码
  git clone git@github.com:BAI-Bonjwa/ctrlcv.git
  cd ctrlcv
  yarn install
  # 启动项目
  yarn start
```

## 文档

本项目的所有的文档均在 [docs](https://github.com/BAI-Bonjwa/ctrlcv/tree/main/docs) 目录下
利用 Markdown 的 Frontmatter 特性来对文章进行归类
本项目支持的 Frontmatter 属性有：

| frontmatter  | 类型   | 是否必需 | 说明                                             |
| ------------ | ------ | -------- | ------------------------------------------------ |
| title        | String | 是       | 文档标题(必填)                                   |
| categories   | Array  | 是       | 文章分类，数组格式，可以填多个分类(至少一个分类) |
| path         | String | 否       | 自定义路径（默认值为文件名无后缀）               |
| contributors | Array  | 否       | 文章贡献者                                       |
| verification | String | 否       | 文章校验人                                       |
| updated      | String | 否       | 文章更新时间                                     |
| keywords     | String | 否       | 文章关键字，用于搜索                             |
| intro        | String | 否       | 文章介绍                                         |

## 特殊属性

文档默认会自动将 h2（## 二级标题) 标题下的内容分成两列展示，但也可通过特殊的属性分为三列或一列

例如
`## 其它组件 {data-columns="3"}` 该标题下的内容会被分为三列展示

注：若通篇没有二级标题，则默认一列显示

注二：若不想显示二级标题但还想自定义布局可以通过 `{data-visible=false}` 来隐藏掉二级标题的显示，例如：`## React {data-visible=false}`

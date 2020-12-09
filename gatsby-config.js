module.exports = {
  siteMetadata: {
    title: "CtrlCV",
    description: "CtrlCV",
  },
  plugins: [
    `gatsby-plugin-postcss`,
    "gatsby-plugin-styled-components",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [`.mdx`, `.md`],
        remarkPlugins: [require(`remark-sectionize`)],
        gatsbyRemarkPlugins: [
          "gatsby-remark-attr",
          "gatsby-remark-autolink-headers",
          // {
          // resolve: `gatsby-remark-prismjs`,
          // options: {
          //   copy: true,
          // },
          // },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "docs",
        path: "./docs/",
      },
      __key: "docs",
    },
  ],
};

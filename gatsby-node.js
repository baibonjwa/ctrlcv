const path = require("path");
const _ = require("lodash");

const remarkParse = require(`remark-parse`);
const html = require(`remark-html`);
const remark = require(`remark`);

exports.onCreateNode = ({ node }) => {
  if (node.frontmatter && node.frontmatter.intro) {
    const mdx = node.frontmatter.intro;
    // console.log("before", mdx);
    // console.log("after", content);
    node.frontmatter.intro = remark()
      .use(remarkParse)
      .use(html)
      .processSync(mdx)
      .toString();
    return node;
  }
};

exports.onCreatePage = ({ page, actions }) => {
  // console.log(page);
  // console.log(actions);
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  // Destructure the createPage function from the actions object
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            slug
            frontmatter {
              path
              title
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }
  // Create blog post pages.
  const pages = result.data.allMdx.edges;
  // console.log(result);

  // you'll call `createPage` for each result
  pages.forEach(({ node }, index) => {
    const { frontmatter, slug } = node;
    const layout = frontmatter.layout || "cheatsheet";
    if (!frontmatter) return;
    createPage({
      // This is the slug you created before
      // (or `node.frontmatter.slug`)
      path: frontmatter.path || slug,
      // This component will wrap our MDX content
      component: path.resolve(`./src/components/${layout}.js`),
      // You can use the values in this context in
      // our page layout component
      context: { id: node.id },
    });
  });
};

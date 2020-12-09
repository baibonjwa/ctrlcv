const path = require("path");
const _ = require("lodash");

exports.onCreateNode = ({ node, getNode, actions }) => {
  // console.log(node);
  // const { createNodeField } = actions;
  // if (node.internal.type === `MarkdownRemark`) {
  //   const parent = getNode(node.parent);
  //   let collection = parent.sourceInstanceName;
  //   createNodeField({
  //     node,
  //     name: "collection",
  //     value: collection,
  //   });
  // }
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
              category
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

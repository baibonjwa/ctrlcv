import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { graphql } from "gatsby";

export default function Layout({ children, data: { mdx }, ...props }) {
  console.log(mdx);
  return (
    <MDXProvider
      components={
        {
          // h1: (props) => <h1 {...props} style={{ color: "red" }} />,
          // p: (props) => <p {...props} style={{ color: "rebeccapurple" }} />,
        }
      }>
      {/* <h1>{mdx.frontmatter.title}</h1> */}
      <div style={{ margin: `0 auto`, maxWidth: 650, padding: `0 1rem` }}>
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </div>
    </MDXProvider>
  );
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
      }
    }
  }
`;

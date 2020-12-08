import React, { useEffect } from "react";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { graphql } from "gatsby";
import Macy from "macy";

export default function Layout({ children, data: { mdx }, ...props }) {
  console.log(mdx.body);
  console.log(mdx.rawBody);
  useEffect(() => {
    const doms = document.querySelectorAll(".section-container");
    doms.forEach((dom, index) => {
      dom.id = `section-container-${index}`;
      const macy = Macy({
        container: `#${dom.id}`,
        trueOrder: false,
        waitForImages: false,
        margin: 24,
        columns: dom.previousSibling.dataset.columns || 2,
      });
    });
  }, []);
  return (
    <MDXProvider
      components={{
        section: ({ children, ...props }) => {
          console.log(props["data-section-depth"]);
          if (props["data-section-depth"] >= 3) {
            return <section {...props}>{children}</section>;
          } else {
            return (
              <section className="section-container" {...props}>
                {children}
              </section>
            );
          }
        },
        // h3: (props) => (
        //   <div>
        //     <h3 {...props} style={{ color: "red" }} />
        //   </div>
        // ),
        // p: (props) => <p {...props} style={{ color: "rebeccapurple" }} />,
      }}>
      {/* <h1>{mdx.frontmatter.title}</h1> */}
      <div style={{ margin: `0 auto`, padding: `0 1rem` }}>
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
      rawBody
      mdxAST
      frontmatter {
        title
      }
    }
  }
`;

import React, { useEffect } from "react";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { graphql } from "gatsby";
import CodeBlock from "./code-block/index.js";
import Macy from "macy";

import "../styles/cheatsheet.css";

export default function Layout({ children, data: { mdx }, ...props }) {
  useEffect(() => {
    const doms = document.querySelectorAll(".section-container");
    doms.forEach((dom, index) => {
      dom.id = `section-container-${index}`;
      const columns = dom.previousSibling.dataset.columns || 2;
      const macy = Macy({
        container: `#${dom.id}`,
        trueOrder: false,
        waitForImages: false,
        margin: 24,
        columns,
        breakAt: {
          1200: columns,
          940: columns >= 2 ? 2 : columns,
          720: 1,
          400: 1,
        },
      });
    });
  }, []);
  return (
    <MDXProvider
      components={{
        h2: (props) => (
          <h2 className="text-2xl mb-2 text-gray-600" {...props} />
        ),
        h3: (props) => (
          <h3 className="text-lg mb-3 text-yellow-600" {...props} />
        ),
        section: ({ children, ...props }) => {
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
        p: (props) => <p className="text-sm" {...props} />,
        pre: (props) => <div {...props} />,
        code: CodeBlock,
      }}>
      <main className="container mx-auto mt-10 text-gray-500">
        <section className="mb-8">
          <h1 className="text-xl md:text-3xl lg:text-5xl font-extralight text-gray-600 mb-4">
            {mdx.frontmatter.title}
            <span className="ml-3 text-gray-300">cheatsheet</span>
          </h1>
          {mdx.frontmatter.intro && (
            <p className="text-gray-600">{mdx.frontmatter.intro}</p>
          )}
        </section>

        <MDXRenderer>{mdx.body}</MDXRenderer>
      </main>
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
        intro
      }
    }
  }
`;

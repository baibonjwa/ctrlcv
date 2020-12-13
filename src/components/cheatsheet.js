import React, { useLayoutEffect } from "react";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { graphql } from "gatsby";
import CodeBlock from "./code-block/index.js";

import "../styles/cheatsheet.css";

export default function Layout({ children, data: { mdx }, ...props }) {
  useLayoutEffect(() => {
    // TODO: https://malcolmkee.com/blog/gatsby-non-js-fallback/
    // https://stackoverflow.com/questions/61662809/gatsby-react-hook-masonry-breaks-on-build-because-there-is-no-window
    if (typeof window !== `undefined`) {
      const Macy = require("macy");
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
    }
  }, []);
  return (
    <MDXProvider
      components={{
        h2: (props) => (
          <h2 className="text-2xl mb-2 mt-4 text-gray-500" {...props} />
        ),
        h3: (props) => (
          <h3 className="text-lg mb-3 text-yellow-500" {...props} />
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
        p: (props) => <p className="text-xs" {...props} />,
        pre: (props) => <div {...props} />,
        code: CodeBlock,
        table: (props) => (
          <table className="table-auto  ctrlcv-cheatsheet-table" {...props} />
        ),
      }}>
      <main className="container mx-auto mt-10 p-2 text-gray-500">
        <section className="mb-8">
          <h1 className="text-xl md:text-3xl lg:text-5xl font-extralight text-gray-600 mb-4">
            {mdx.frontmatter.title}
            <span className="ml-3 text-gray-300">cheatsheet</span>
          </h1>
          {mdx.frontmatter.intro && (
            <span className="text-gray-600">{mdx.frontmatter.intro}</span>
          )}
          {mdx.frontmatter.author && (
            <p className="text-gray-400 text-xs">
              文章贡献者：{mdx.frontmatter.author}
            </p>
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
        ...frontmatterFields
      }
    }
  }
`;

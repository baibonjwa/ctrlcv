import React, { useLayoutEffect } from "react";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { graphql } from "gatsby";
// import CodeBlock from "./code-block/index.js";
import MDXComponents from "./mdx-components";
import Header from "./header";
import { Helmet } from "react-helmet";
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
        Macy({
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
  });
  const fileName = mdx.fileAbsolutePath.split("/").pop();
  return (
    <MDXProvider components={MDXComponents}>
      <Helmet>
        <title>CTRLCV - {mdx.frontmatter.title}</title>
      </Helmet>
      <Header
        url={`https://github.com/BAI-Bonjwa/ctrlcv/tree/main/docs/${fileName}`}
      />
      <main className="container mx-auto mt-4 p-2 text-gray-500">
        <section className="mb-8">
          <h1 className="text-3xl md:text-3xl lg:text-5xl font-extralight text-gray-600 mb-4">
            {mdx.frontmatter.title}
            <span className="ml-3 text-gray-300">cheatsheet</span>
          </h1>
          {mdx.frontmatter.intro && (
            <span className="text-gray-600">{mdx.frontmatter.intro}</span>
          )}
          {mdx.frontmatter.contributors && (
            <p className="text-gray-400 text-xs">
              <span>贡献者：{mdx.frontmatter.contributors.join(",")}</span>
              {mdx.frontmatter.verification && (
                <span>, 校对: {mdx.frontmatter.verification}</span>
              )}
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
      fileAbsolutePath
      body
      rawBody
      mdxAST
      frontmatter {
        ...frontmatterFields
      }
    }
  }
`;

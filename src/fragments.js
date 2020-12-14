import { graphql } from "gatsby";

export const frontmatterFields = graphql`
  fragment frontmatterFields on MdxFrontmatter {
    title
    path
    author
    lang
    category
    layout
    updated
    keywords
    intro
  }
`;

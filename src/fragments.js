import { graphql } from "gatsby";

export const frontmatterFields = graphql`
  fragment frontmatterFields on MdxFrontmatter {
    title
    path
    author
    lang
    category
    layout
    tags
    updated
    keywords
    intro
  }
`;

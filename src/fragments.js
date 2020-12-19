import { graphql } from "gatsby";

export const frontmatterFields = graphql`
  fragment frontmatterFields on MdxFrontmatter {
    title
    path
    author
    verification
    lang
    categories
    layout
    updated
    keywords
    intro
  }
`;

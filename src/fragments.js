import { graphql } from "gatsby";

export const frontmatterFields = graphql`
  fragment frontmatterFields on MdxFrontmatter {
    title
    path
    author
    verification
    lang
    category
    layout
    updated
    keywords
    intro
  }
`;

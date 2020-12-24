import { graphql } from "gatsby";

export const frontmatterFields = graphql`
  fragment frontmatterFields on MdxFrontmatter {
    title
    path
    contributors
    verification
    lang
    categories
    layout
    updated
    keywords
    intro
  }
`;

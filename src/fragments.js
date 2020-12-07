import { graphql } from "gatsby";

export const frontmatterFields = graphql`
  fragment frontmatterFields on MdxFrontmatter {
    title
    path
    author
    language
    category
    layout
    ads
    tags
    updated
    keywords
    intro
  }
`;

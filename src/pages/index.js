import * as React from "react";
import { graphql, Link } from "gatsby";

// markup
const IndexPage = ({ data }) => {
  return (
    <main>
      <ul>
        {data.allMdx.edges.map(({ node }) => {
          console.log(node.frontmatter);
          return (
            <Link to={node.frontmatter.path || node.slug}>
              <li>{node.frontmatter.title}</li>
            </Link>
          );
        })}
      </ul>
    </main>
  );
};

export const query = graphql`
  query {
    allMdx {
      edges {
        node {
          id
          slug
          frontmatter {
            ...frontmatterFields
          }
        }
      }
    }
  }
`;

export default IndexPage;

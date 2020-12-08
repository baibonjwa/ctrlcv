import * as React from "react";
import { graphql, Link } from "gatsby";
import mainLogo from "../../public/static/logo.png";
import searchIcon from "../../public/static/search-icon.png";
import toTopIcon from "../../public/static/to-top.png";
import newIcon from "../../public/static/new.png";

// markup
const IndexPage = ({ data }) => {
  return (
    <main>
      <div className="wrapper">
        <img className="logo" src={mainLogo}></img>
        <div className="input-wrapper">
          <input type="text" placeholder="搜索..." />
          <img className="search-icon" src={searchIcon} />
        </div>
        <div class="doc-list-wrapper">
          <div className="classification-title">JavaScript</div>
          <div className="line"></div>
          <div className="list">
            {data.allMdx.edges.map(({ node }) => {
              console.log(node.frontmatter);
              return (
                <Link
                  to={node.frontmatter.path || node.slug}
                  style={{ textDecoration: "none", color: "#777" }}
                >
                  <div>
                    {node.frontmatter.title}
                    <img className="new-icon" src={newIcon} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <img className="to-top" src={toTopIcon} />
      </div>
      <style jsx>{`
        .wrapper {
          padding-top: 90px;
          padding-left: 290px;
        }
        .wrapper .logo {
          vertical-align: middle;
          height: 58px;
        }
        .input-wrapper {
          display: inline-block;
          position: relative;
          vertical-align: middle;
          width: 617px;
          height: 51px;
          border: 1px solid #acacac;
        }
        .input-wrapper .search-icon {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          width: 39px;
          height: 39px;
        }
        .input-wrapper input {
          width: 617px;
          height: 51px;
          font-size: 19.5px;
          border: 0;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          padding-left: 20px;
          color: #777;
        }
        input:focus,
        textarea:focus,
        select:focus {
          outline: none;
        }
        ::placeholder {
          color: #ccc8c8;
        }
        .classification-title {
          font-size: 23.5px;
          color: #292828;
          font-family: "AppleSymbols";
          margin-top: 33px;
        }
        .line {
          width: 812px;
          height: 1px;
          background-color: #b7b7b7;
          margin-top: 11px;
        }
        .doc-list-wrapper {
          margin-top: 80px;
        }
        .list {
          width: 750px;
          display: flex;
          font-size: 21px;
          font-family: "AppleSymbols";
          color: #777;
          margin-left: 150px;
          flex-wrap: wrap;
        }
        .list div {
          text-align: left;
          width: 250px;
          margin-top: 20px;
          position: relative;
        }
        .list div .new-icon {
          width: 14px;
        }
        .to-top {
          position: fixed;
          bottom: 20px;
          right: 30px;
          width: 50px;
        }
      `}</style>
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

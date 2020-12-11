import React, { useState, useEffect } from "react";
import { graphql, Link } from "gatsby";
import mainLogo from "../assets/images/logo.png";
import searchIcon from "../assets/images/search-icon.png";
import toTopIcon from "../assets/images/to-top.png";
import newIcon from "../assets/images/new.png";
import Fuse from "fuse.js";

const options = {
  // isCaseSensitive: false,
  includeScore: true,
  // shouldSort: true,
  includeMatches: true,
  findAllMatches: true,
  // minMatchCharLength: 1,
  // location: 0,
  // threshold: 0.6,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  include: ["score", "matches"],
  keys: [
    "frontmatter.title",
    "frontmatter.author",
    "frontmatter.keywords",
    "rawBody",
    "slug",
  ],
};

const IndexPage = ({ data }) => {
  // console.log(data.allMdx.edges);
  const [pattern, setPattern] = useState();
  const [results, setResults] = useState([]);
  console.log("pattern", pattern);

  useEffect(() => {
    const nodes = data.allMdx.edges.map((o) => o.node);
    const fuse = new Fuse(nodes, options);
    const results = fuse.search("");
    setResults(results);
  }, []);

  const handleSearch = () => {
    const nodes = data.allMdx.edges.map((o) => o.node);
    const fuse = new Fuse(nodes, options);
    const results = fuse.search(pattern);
    console.log("results", results);
    setResults(results);
  };

  return (
    <main>
      <div className="wrapper">
        <img className="logo" src={mainLogo}></img>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="搜索..."
            value={pattern}
            onChange={(e) => {
              setPattern(e.target.value);
            }}
          />
          <img
            className="search-icon"
            src={searchIcon}
            onClick={handleSearch}
          />
        </div>
        <div class="doc-list-wrapper">
          <div className="classification-title">JavaScript</div>
          <div className="line"></div>
          <div className="list">
            {data.allMdx.edges.map(({ node }) => {
              // console.log(node.frontmatter);
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
          <h2>搜索结果</h2>
          <div className="list">
            {results.map(({ item }) => {
              // console.log(node.frontmatter);
              return (
                <Link
                  to={item.frontmatter.path || item.slug}
                  style={{ textDecoration: "none", color: "#777" }}
                >
                  <div>
                    {item.frontmatter.title}
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
        body {
          padding: 0;
          margin: 0;
        }
        .wrapper {
          padding-top: 90px;
          text-align: center;
        }
        .wrapper .logo {
          vertical-align: middle;
          height: 48px;
          display: inline-block;
        }
        .search-wrapper {
          width: 812px;
          text-align: left;
          margin: 0 auto;
        }
        .input-wrapper {
          display: inline-block;
          position: relative;
          vertical-align: middle;
          width: 620px;
          height: 53px;
          border: 1px solid #acacac;
          margin-left: 15px;
          box-sizing: border-box !important;
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
          text-align: left;
        }
        .line {
          width: 812px;
          height: 1px;
          background-color: #b7b7b7;
          margin-top: 11px;
          margin-bottom: 15px;
        }
        .doc-list-wrapper {
          margin: 80px auto;
          margin-top: 80px;
          width: 812px;
        }
        .list {
          width: 750px;
          display: flex;
          font-size: 21px;
          font-family: "AppleSymbols";
          color: #777;
          flex-wrap: wrap;
          margin: 0 auto;
          justify-content: space-between;
        }
        .list div {
          text-align: left;
          width: 250px;
          margin-top: 5px;
          position: relative;
        }
        .list div .new-icon {
          width: 14px;
          display: inline-block;
          marign-left: 5px;
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
          rawBody
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

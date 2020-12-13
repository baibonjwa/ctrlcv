import React, { useState, useEffect } from "react";
import _ from "lodash";
import { graphql, Link } from "gatsby";
import mainLogo from "../assets/images/logo.png";
import searchIcon from "../assets/images/search-icon.png";
import toTopIcon from "../assets/images/to-top.png";
import newIcon from "../assets/images/new.png";
import Fuse from "fuse.js";

const AVAIL_LANGS = ["en"];
const DEFAULT_LANG = "zh-CN";

const options = {
  // isCaseSensitive: false,
  includeScore: true,
  // shouldSort: true,
  includeMatches: true,
  findAllMatches: false,
  minMatchCharLength: 2,
  // location: 0,
  // threshold: 0.6,
  threshold: 0.6,
  // distance: 10000,
  useExtendedSearch: true,
  ignoreLocation: true,
  // ignoreFieldNorm: false,
  include: ["score", "matches"],
  keys: [
    // "frontmatter.title",
    // "frontmatter.author",
    // "frontmatter.keywords",
    "rawBody",
    // "slug",
  ],
};

const IndexPage = ({ data }) => {
  // console.log(data.allMdx.edges);
  const [pattern, setPattern] = useState();
  const [results, setResults] = useState([]);
  const [indexes, setIndexes] = useState();

  useEffect(() => {
    const nodes = data.allMdx.edges.map((o) => o.node);
    const fuse = new Fuse(nodes, options);
    const results = fuse.search("");
    setResults(results);

    const indexMap = new Map();
    indexMap.set("zh-CN", { Other: [] });
    AVAIL_LANGS.forEach((lang) => {
      indexMap.set(lang, { Other: [] });
    });

    nodes.forEach((node) => {
      const category = node.frontmatter.category || "Other";
      console.log(category);
      AVAIL_LANGS.forEach((lang) => {
        const key = node.fileAbsolutePath.includes(`/${lang}/`)
          ? lang
          : "zh-CN";
        indexMap.get(key)[category] = (
          indexMap.get(key)[category] || []
        ).concat(node);
      });
    });
    // console.log(initIndexes);
    setIndexes(indexMap);
  }, []);

  const handleSearch = (e) => {
    const nodes = data.allMdx.edges.map((o) => o.node);
    const fuse = new Fuse(nodes, options);
    const results = fuse.search(pattern);
    console.log("pattern: ", pattern);
    console.log("results: ", results);
    setResults(results);
  };

  const getIndexList = () => {
    if (!indexes) return [];
    const results = [];
    console.log(indexes.get("zh-CN"));
    const sortable = Object.entries(indexes.get("zh-CN"))
      .sort(([, a], [, b]) => {
        if (a === "Other") return -1;
        return b.length - a.length;
      })
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
    for (const [key, value] of Object.entries(sortable)) {
      results.push(
        <>
          <div className="classification-title">{key}</div>
          <div className="line"></div>
          <div className="list">
            {value.map((item) => (
              <Link
                to={item.frontmatter.path || item.slug}
                style={{ textDecoration: "none", color: "#777" }}>
                <div>
                  {item.frontmatter.title}
                  <img className="new-icon" src={newIcon} />
                </div>
              </Link>
            ))}
          </div>
        </>
      );
    }
    console.log(results);
    return results;
  };

  return (
    <main>
      <div className="container mx-auto">
        {/* <img className="logo" src={mainLogo}></img> */}
        <div className="pt-2 relative mx-auto text-gray-600 w-8/12">
          <input
            className="border-2 border-gray-300 bg-white h-14 w-full px-5 pr-16 rounded-lg text-lg focus:outline-none"
            type="search"
            name="search"
            // value={pattern}
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="Search"
          />
          <button
            type="submit"
            className="absolute right-0 top-0 mt-6 mr-5"
            onClick={handleSearch}>
            <svg
              class="text-gray-600 h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              style={{ enableBackground: "new 0 0 56.966 56.966" }}
              xmlSpace="preserve"
              width="512px"
              height="512px">
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
        </div>
      </div>
      {results && (
        <div className="doc-list-wrapper w-8/12 mx-auto">
          <h2>搜索结果</h2>
          <div className="list">
            {results.length === 0 && <div>没有找到匹配的结果</div>}
            {results.map(({ item }) => {
              return (
                <Link
                  to={item.frontmatter.path || item.slug}
                  style={{ textDecoration: "none", color: "#777" }}>
                  <div>
                    {item.frontmatter.title}
                    <img className="new-icon" src={newIcon} />
                  </div>
                </Link>
              );
            })}
          </div>
          {results.length === 0 && getIndexList()}
        </div>
      )}
      <img className="to-top" src={toTopIcon} />
      <style jsx>{`
        body {
          padding: 0;
          margin: 0;
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
          margin-top: 4px;
          margin-bottom: 15px;
        }
        .doc-list-wrapper {
          margin-top: 10px;
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
          fileAbsolutePath
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

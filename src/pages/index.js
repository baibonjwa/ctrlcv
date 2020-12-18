import React, { useState, useEffect } from "react";
import _ from "lodash";
import { graphql, Link } from "gatsby";
// import toTopIcon from "../assets/images/to-top.png";
import Header from "../components/header";
import { Helmet } from "react-helmet";

import Fuse from "fuse.js";

const AVAIL_LANGS = ["en"];
const DEFAULT_LANG = "zh-CN";

const options = {
  // isCaseSensitive: false,
  includeScore: true,
  shouldSort: true,
  includeMatches: true,
  // findAllMatches: false,
  minMatchCharLength: 2,
  location: 0.6,
  // threshold: 0.6,
  threshold: 1,
  // distance: 10000,
  useExtendedSearch: true,
  ignoreLocation: true,
  // ignoreFieldNorm: false,
  keys: [
    // { name: "frontmatter.title", weight: 1 },
    // { name: "frontmatter.author", weight: 1 },
    // { name: "frontmatter.keywords", weight: 1 },
    "frontmatter.title",
    "frontmatter.author",
    "frontmatter.keywords",
    "rawBody",
    // "slug",
  ],
};

const IndexPage = ({ data }) => {
  // console.log(data.allMdx.edges);
  const [pattern, setPattern] = useState();
  const [results, setResults] = useState();
  const [indexes, setIndexes] = useState();

  useEffect(() => {
    const nodes = data.allMdx.edges.map((o) => o.node);

    const indexMap = new Map();
    indexMap.set(DEFAULT_LANG, { Other: [] });
    AVAIL_LANGS.forEach((lang) => {
      indexMap.set(lang, { Other: [] });
    });

    nodes.forEach((node) => {
      const category = node.frontmatter.category || "Other";
      AVAIL_LANGS.forEach((lang) => {
        const key = node.fileAbsolutePath.includes(`/${lang}/`)
          ? lang
          : DEFAULT_LANG;
        indexMap.get(key)[category] = (
          indexMap.get(key)[category] || []
        ).concat(node);
      });
    });
    // console.log(initIndexes);
    setIndexes(indexMap);
  }, [data]);

  const handleSearch = (e) => {
    console.log("pattern", pattern);
    if (!pattern) {
      setResults();
      return;
    }
    const nodes = data.allMdx.edges.map((o) => o.node);
    const fuse = new Fuse(nodes, options);
    const results = fuse.search(`'${pattern}`);
    setResults(results);
  };

  const getIndexList = () => {
    if (!indexes) return [];
    const results = [];
    const sortable = Object.entries(indexes.get("zh-CN"))
      .sort(([, a], [, b]) => {
        if (a === "Other") return -1;
        return b.length - a.length;
      })
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
    for (const [key, value] of Object.entries(sortable)) {
      results.push(
        <div className="mt-2">
          <div className="text-yellow-500 text-xl divide-y-0">{key}</div>
          <hr className="border-yellow-500 opacity-50"></hr>
          <div className="flex flex-wrap">
            {value.map((item) => (
              <Link
                className="text-gray-500 w-4/12 pt-1 pb-1 pl-2 pr-2"
                title={item.frontmatter.intro}
                to={item.frontmatter.path || item.slug}>
                <span>{item.frontmatter.title}</span>
                {/* <img className="new-icon" src={newIcon} /> */}
              </Link>
            ))}
          </div>
        </div>
      );
    }
    return results;
  };

  const highlightText = (text, originIndices = []) => {
    if (originIndices.length < 0) return;
    const indices = _.cloneDeep(originIndices);
    let result = [];
    let pair = indices.shift();
    for (var i = 0; i < text.length; i++) {
      var char = text.charAt(i);
      if (pair && i === pair[0]) {
        result.push(`<span class="bg-yellow-300">`);
      }
      result.push(char);
      if (pair && i === pair[1]) {
        result.push("</span>");
        pair = indices.shift();
      }
    }
    return result.join("");
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="开发者代码片段整理及查询工具，复制粘贴拯救世界！"
        />
        <meta
          name="keywords"
          content="CTRLCV 复制粘贴 代码片段 Cheatsheet 开发者 拯救世界"
        />
        <title>CTRLCV - 复制粘贴拯救世界</title>
      </Helmet>
      <main>
        <Header />
        <div className="container mx-auto p-3">
          <div className="text-center">
            <h1 className="text-6xl mt-4 text-yellow-700 font-bold">
              CTRL<span className="text-yellow-500">CV</span>
            </h1>
            <p className="mt-2 text-gray-500">复制粘贴拯救世界</p>
          </div>
          {/* <img className="logo" src={mainLogo}></img> */}
          <div className="mt-4 mb-6 relative mx-auto text-gray-600 w-12/12 lg:w-8/12">
            <input
              className="border-2 border-gray-300 bg-white h-14 w-full px-5 pr-16 rounded-lg text-lg focus:outline-none"
              type="search"
              name="search"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch(e);
                }
              }}
              placeholder="请输入关键字"
            />
            <button
              type="submit"
              autofocus
              className="absolute right-0 top-0 mt-4 mr-5"
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
          {/* <div className="">广告位</div> */}
          <div className="doc-list-wrapper w-12/12 lg:w-8/12 mx-auto">
            {results && (
              <>
                <h2 className="text-xl text-yellow-500">搜索结果</h2>
                <hr className="border-yellow-500 opacity-50 mt-1 mb-5"></hr>
                <div className="list">
                  {results.length === 0 && <div>没有找到匹配的结果</div>}
                  {results.map(({ item, matches, ...params }) => {
                    const { path, title, keywords } = item.frontmatter;

                    let hlTitle = title;
                    let hlKeywords = keywords;
                    let hlRawBody = item.rawBody;

                    console.log(matches);
                    console.log(params);
                    matches.forEach((match) => {
                      const indices = match.indices;
                      if (match.key === "frontmatter.title") {
                        hlTitle = highlightText(title, indices);
                      }
                      if (match.key === "frontmatter.keywords") {
                        hlKeywords = highlightText(keywords.join(","), indices);
                      }
                      if (match.key === "rawBody") {
                        hlRawBody = highlightText(item.rawBody, indices);
                      }
                    });

                    return (
                      <Link
                        to={path || item.slug}
                        style={{ textDecoration: "none", color: "#777" }}>
                        <div
                          className="text-lg text-yellow-500"
                          dangerouslySetInnerHTML={{ __html: hlTitle }}
                        />
                        {keywords && (
                          <>
                            <p className="text-yellow-500 mt-1">关键字：</p>
                            <div
                              dangerouslySetInnerHTML={{ __html: hlKeywords }}
                            />
                          </>
                        )}
                        <p className="text-yellow-500 mt-1">内容：</p>

                        <div
                          className=""
                          dangerouslySetInnerHTML={{ __html: hlRawBody }}
                        />
                        <hr className="border-yellow-500 opacity-50 mt-5 mb-5"></hr>
                      </Link>
                    );
                  })}
                </div>
              </>
            )}
            {!results && getIndexList()}
          </div>
          <footer className="text-gray-500 mx-auto text-center">
            商务合作: bd@iantech.io
          </footer>
        </div>
        {/* <img
        className="fixed to-top w-12 h-12 bottom-10 right-10"
        src={toTopIcon}
      /> */}
      </main>
    </>
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

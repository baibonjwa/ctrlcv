import React, { useState, useEffect } from "react";
import _ from "lodash";
import { graphql, Link } from "gatsby";
// import { MDXRenderer } from "gatsby-plugin-mdx";
// import toTopIcon from "../assets/images/to-top.png";
import Header from "../components/header";
import { Helmet } from "react-helmet";

import Fuse from "fuse.js";
import Footer from "../components/footer";

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
      const categories = node.frontmatter.categories || ["Other"];
      AVAIL_LANGS.forEach((lang) => {
        const key = node.fileAbsolutePath.includes(`/${lang}/`)
          ? lang
          : DEFAULT_LANG;

        categories.forEach((category) => {
          indexMap.get(key)[category] = (
            indexMap.get(key)[category] || []
          ).concat(node);
        });
      });
    });
    setIndexes(indexMap);
  }, [data]);

  const handleSearch = (e) => {
    if (!pattern) {
      setResults();
      return;
    }
    const nodes = data.allMdx.edges
      .map((o) => o.node)
      // TODO: Not searching english document for now.
      .filter((n) => !n.fileAbsolutePath.includes("/en/"));

    const escapedNodes = nodes.map((n) => ({
      ...n,
      rawBody: _.escape(n.rawBody),
    }));
    const fuse = new Fuse(escapedNodes, options);
    const results = fuse.search(`'"${pattern}"`);
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
        <div key={key} className="mt-2">
          <div className="text-primary-500 text-xl divide-y-0">{key}</div>
          <hr className="border-primary-500 opacity-50 mb-2 mt-1"></hr>
          <div className="flex flex-wrap">
            {value.map((item) => (
              <Link
                key={item.id}
                className="text-neutral-500 w-6/12 pt-1 pb-1 pl-2 pr-2 lg:w-4/12"
                title={item.frontmatter.intro}
                to={item.frontmatter.path || item.slug}>
                <span>{item.frontmatter.title}</span>
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
    const indices = _.cloneDeep(originIndices).slice(0, 10);
    let result = [];
    let pair = indices.shift();
    const threshold = 30;
    for (let i = 0; i < text.length; i++) {
      let char = text.charAt(i);
      if (pair && i >= pair[0] - threshold && i <= pair[1] + threshold) {
        if (pair && i === Math.max(pair[0] - threshold, 0)) {
        }

        if (pair && i === pair[0]) {
          result.push(`<span class="bg-primary-300">`);
        }
        result.push(char);
        if (pair && i === pair[1]) {
          result.push("</span>");
        }

        if (pair && i === Math.min(pair[1] + threshold, text.length)) {
          result.push(`<span class="text-primary-600"> ...... </span>`);
          pair = indices.shift();
        }
      } else {
        result.push("");
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
          content="常用代码/指令集/速查表整理及查询工具，复制粘贴拯救世界！"
        />
        <meta
          name="keywords"
          content="CTRLCV 复制粘贴 代码片段 速查表 指令集 Cheatsheet 开发者 拯救世界"
        />
        <title>CTRLCV - 复制粘贴拯救世界</title>
        <script>
          {`var _hmt = _hmt || [];
          (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?7b248a30fa6e09af8a22b05183b180f5";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
          })();`}
        </script>
      </Helmet>
      <main>
        <Header />
        <div className="container mx-auto p-3">
          <div className="text-center">
            <h1 className="text-5xl mt-4 text-primary-700 font-medium lg:text-6xl">
              CTRL<span className="text-primary-500">CV</span>
            </h1>
            <p className="mt-3 text-neutral-500">
              常用代码/指令集/速查表整理及查询工具
            </p>
          </div>
          {/* <img className="logo" src={mainLogo}></img> */}
          <div className="mt-10 mb-6 relative mx-auto text-neutral-600 w-12/12 lg:w-9/12">
            <input
              className="border-2 border-primary-300 bg-white h-14 w-full px-5 pr-16 rounded-lg text-lg focus:outline-none"
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
              className="absolute right-0 top-0 mt-4 mr-5"
              onClick={handleSearch}>
              <svg
                className="text-neutral-600 h-4 w-4 fill-current"
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
          <div className="doc-list-wrapper w-12/12 lg:w-9/12 mx-auto">
            {results && (
              <>
                <h2 className="text-xl text-primary-500">搜索结果</h2>
                <hr className="border-primary-500 opacity-50 mt-1 mb-5"></hr>
                <div className="list">
                  {results.length === 0 && <div>没有找到匹配的结果</div>}
                  {results.map(({ item, matches, ...params }) => {
                    const { id, path, title, keywords } = item.frontmatter;

                    let hlTitle = title;
                    let hlKeywords = keywords;
                    let hlRawBody = item.rawBody;

                    // console.log(matches);
                    // console.log(params);
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
                        key={id}
                        to={path || item.slug}
                        style={{ textDecoration: "none", color: "#777" }}>
                        <div
                          className="text-lg text-primray-500"
                          dangerouslySetInnerHTML={{ __html: hlTitle }}
                        />
                        {keywords && (
                          <>
                            <p className="text-primary-500 mt-1">关键字：</p>
                            <div
                              dangerouslySetInnerHTML={{ __html: hlKeywords }}
                            />
                          </>
                        )}
                        <p className="text-primray-500 mt-1">内容：</p>
                        <div
                          className=""
                          dangerouslySetInnerHTML={{ __html: hlRawBody }}
                        />
                        <hr className="border-primary-500 opacity-50 mt-5 mb-5"></hr>
                      </Link>
                    );
                  })}
                </div>
              </>
            )}
            {!results && getIndexList()}
          </div>
          <Footer />
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

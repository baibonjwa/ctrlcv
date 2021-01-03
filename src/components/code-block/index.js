import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import Prism from "prism-react-renderer/prism";

import Copy from "./copy";
import normalize from "./normalize";

(typeof global !== "undefined" ? global : window).Prism = Prism;

require("prismjs/components/prism-ruby");
require("prismjs/components/prism-elixir");
require("prismjs/components/prism-haml");

const getParams = (name = ``) => {
  const [lang, params = ``] = name.split(`:`);
  return [lang.split(`language-`).pop().split(`{`).shift()].concat(
    params.split(`&`).reduce((merged, param) => {
      const [key, value] = param.split(`=`);
      merged[key] = value;
      return merged;
    }, {})
  );
};

/*
 * MDX passes the code block as JSX
 * we un-wind it a bit to get the string content
 * but keep it extensible so it can be used with just children (string) and className
 */
export default ({
  children,
  title,
  className = children.props ? children.props.className : ``,
  ...props
}) => {
  const [language] = getParams(className);
  const params = getParams(className);
  const [content, highlights] = normalize(
    children.props && children.props.children
      ? children.props.children
      : children,
    className
  );

  return (
    <Highlight
      {...defaultProps}
      Prise={Prism}
      code={content}
      language={language}
      theme={undefined}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <div className="gatsby-highlight">
          {title && (
            <div className="ctrlcv-cheatsheet-code-title ">{title}</div>
          )}
          <pre className={`language-${language} relative mt-0`}>
            {language && (
              <div className="absolute bottom-0.5 right-1 opacity-20 text-xs">
                {language.toUpperCase()}
              </div>
            )}
            <Copy
              fileName={title}
              className="absolute top-0.5 right-1"
              content={content}
            />
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line, key: i });
              const className = [lineProps.className]
                .concat(highlights[i] && `gatsby-highlight-code-line`)
                .filter(Boolean)
                .join(` `);
              return (
                <div
                  key={i}
                  {...Object.assign({}, lineProps, {
                    className,
                  })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              );
            })}
          </pre>
        </div>
      )}
    </Highlight>
  );
};

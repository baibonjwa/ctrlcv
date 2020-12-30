import React from "react";
import CodeBlock from "./code-block";

const MDXComponents = {
  h2: (props) => {
    if (props["data-visible"] === "false") return null;
    return (
      <h2 className="text-2xl mb-2 mt-4 text-gray-500" {...props}>
        {props.children}
      </h2>
    );
  },
  h3: (props) => (
    <h3 className="text-lg mb-3 text-primary-500" {...props}>
      {props.children}
    </h3>
  ),
  section: ({ children, ...props }) => {
    if (props["data-section-depth"] >= 3) {
      return <section {...props}>{children}</section>;
    } else {
      return (
        <section className="section-container" {...props}>
          {children}
        </section>
      );
    }
  },
  p: (props) => <p className="text-xs" {...props} />,
  a: (props) => (
    <a className="underline" {...props}>
      {props.children}
    </a>
  ),
  pre: (props) => <div {...props} />,
  code: CodeBlock,
  table: (props) => (
    <table className="table-auto  ctrlcv-cheatsheet-table" {...props} />
  ),
};

export default MDXComponents;

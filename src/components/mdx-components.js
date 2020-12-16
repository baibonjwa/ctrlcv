import React, { useLayoutEffect } from "react";
import CodeBlock from "./code-block";

const MDXComponents = {
  h2: (props) => <h2 className="text-2xl mb-2 mt-4 text-gray-500" {...props} />,
  h3: (props) => <h3 className="text-lg mb-3 text-yellow-500" {...props} />,
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
  pre: (props) => <div {...props} />,
  code: CodeBlock,
  table: (props) => (
    <table className="table-auto  ctrlcv-cheatsheet-table" {...props} />
  ),
};

export default MDXComponents;

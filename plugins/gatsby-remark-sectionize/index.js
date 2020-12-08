const sectionize = require("remark-sectionize");

const transform = sectionize();

module.exports = function ({ markdownAST }) {
  transform(markdownAST);
};

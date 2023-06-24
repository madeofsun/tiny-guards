/**
 *
 * @param {babel} babel
 * @param {{extension: string}} options
 * @returns {{name: string, visitor: import("@babel/core").Visitor }}
 */
module.exports = function useDistPlugin({ types: t }, { extension }) {
  return {
    name: useDistPlugin.name,
    visitor: {
      ImportDeclaration(path) {
        if (path.node.source.value.startsWith("../src")) {
          path.node.source.value = `../dist/index.${extension}`;
        }
      },
    },
  };
};

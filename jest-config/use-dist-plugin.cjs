/**
 *
 * @param {babel} babel
 * @param {{dist: string}} options
 * @returns {{name: string, visitor: import("@babel/core").Visitor }}
 */
module.exports = function useDistPlugin(babel, { dist }) {
  return {
    name: useDistPlugin.name,
    visitor: {
      ImportDeclaration(path) {
        if (path.node.source.value.startsWith("../src")) {
          path.node.source.value = `../${dist}/${path.node.source.value.slice(
            "../src".length
          )}`;
        }
      },
    },
  };
};

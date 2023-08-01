/**
 *
 * @param {babel} babel
 * @returns {{name: string, visitor: import("@babel/core").Visitor }}
 */
module.exports = function removeDevPlugin({ types: t }) {
  return {
    name: removeDevPlugin.name,
    visitor: {
      FunctionDeclaration(path) {
        if (path.node.id?.name.startsWith("dev_")) {
          path.node.body = t.blockStatement([]);
        }
      },
    },
  };
};

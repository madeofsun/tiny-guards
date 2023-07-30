import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";

import ts from "typescript";

import {
  COMMON_DIR,
  COMMON_EXT,
  ESM_DIR,
  ESM_EXT,
  OUT_DIR,
  TYPES_DIR,
} from "./constants.js";

/**
 * @param {string} tsConfigPath
 * @param {string} tsConfig
 * @returns {Promise<void>}
 */
export async function generateFiles(tsConfigPath, tsConfig) {
  await Promise.all([
    build(prepareConfig(tsConfigPath, tsConfig, { type: "common" })),
    build(prepareConfig(tsConfigPath, tsConfig, { type: "esm" })),
  ]);
}

/**
 * @param {string} tsConfigPath
 * @param {string} tsConfig
 * @param {{ type: "common" | "esm" }} options
 * @returns {ts.ParsedCommandLine}
 */
function prepareConfig(tsConfigPath, tsConfig, { type }) {
  const parsed = ts.parseConfigFileTextToJson(tsConfigPath, tsConfig);

  const result = ts.parseJsonConfigFileContent(
    {
      ...parsed.config,
      compilerOptions: {
        ...parsed.config.compilerOptions,
        noEmit: false,
        declaration: type === "common",
        declarationDir: `${OUT_DIR}/${TYPES_DIR}`,
        module: type === "common" ? "CommonJS" : undefined,
        outDir:
          type === "common"
            ? `${OUT_DIR}/${COMMON_DIR}`
            : `${OUT_DIR}/${ESM_DIR}`,
      },
    },
    ts.sys,
    ""
  );

  return result;
}

/**
 * @param {ts.ParsedCommandLine} config
 * @returns {Promise<void>}
 */
async function build(config) {
  const program = ts.createProgram(config.fileNames, config.options);
  const isCommon = config.options.module === ts.ModuleKind.CommonJS;

  /** @type {Promise<void>[]} */
  const writeFilePromises = [];

  const transformers = [debugTransformerFactory];

  program.emit(
    undefined,
    (fileName, text) => {
      if (fileName.endsWith(".js")) {
        if (isCommon) {
          fileName = changeExtension(fileName, "js", COMMON_EXT);
          text = text.replace(
            /require\("\.(.*)"\)/g,
            `require(".$1.${COMMON_EXT}")`
          );
        } else {
          text = text.replace(/from "\.(.*)"/g, `from ".$1.${ESM_EXT}"`);
        }
      }

      writeFilePromises.push(
        fsp
          .access(path.dirname(fileName), fs.constants.W_OK | fs.constants.X_OK)
          .catch(() => fsp.mkdir(path.dirname(fileName), { recursive: true }))
          .then(() => fsp.writeFile(fileName, text))
      );
    },
    undefined,
    undefined,
    { before: transformers }
  );

  await Promise.all(writeFilePromises);
}

/**
 * @type {ts.TransformerFactory<ts.SourceFile>}
 */
const debugTransformerFactory = (context) => {
  const shouldRemoveDev = process.env.NODE_ENV === "test";
  // @ts-expect-error suppress
  return (sourceFile) => {
    /**
     * @type {ts.Visitor}
     */
    const visitor = (node) => {
      if (
        shouldRemoveDev &&
        ts.isImportDeclaration(node) &&
        ts.isStringLiteral(node.moduleSpecifier) &&
        node.moduleSpecifier.text.includes("internal/debug")
      ) {
        return undefined;
      } else if (
        ts.isExpressionStatement(node) &&
        ((ts.isCallExpression(node.expression) &&
          ts.isIdentifier(node.expression.expression) &&
          node.expression.expression.text.startsWith("dev_")) ||
          (ts.isTaggedTemplateExpression(node.expression) &&
            ts.isIdentifier(node.expression.tag) &&
            node.expression.tag.text.startsWith("dev_")))
      ) {
        if (shouldRemoveDev) return undefined;

        const condition = ts.factory.createBinaryExpression(
          ts.factory.createPropertyAccessExpression(
            ts.factory.createPropertyAccessExpression(
              ts.factory.createIdentifier("process"),
              ts.factory.createIdentifier("env")
            ),
            ts.factory.createIdentifier("NODE_ENV")
          ),
          ts.SyntaxKind.EqualsEqualsEqualsToken,
          ts.factory.createStringLiteral("development")
        );

        const then = ts.factory.createBlock([
          ts.factory.createExpressionStatement(node.expression),
        ]);

        return ts.factory.createIfStatement(condition, then);
      }

      return ts.visitEachChild(node, visitor, context);
    };

    return ts.visitNode(sourceFile, visitor);
  };
};

/**
 * @param {string} original
 * @param {string} ext
 * @param {string} extNew
 */
function changeExtension(original, ext, extNew) {
  return `${original.slice(0, -ext.length)}${extNew}`;
}

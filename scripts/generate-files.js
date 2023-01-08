import fs from "node:fs/promises";
import ts from "typescript";

import { COMMON_PATH, ESM_PATH, OUT_DIR, TYPES_PATH } from "./constants.js";

/**
 * @param {string} tsConfigFileName
 * @param {string} tsConfig
 * @returns {Promise<void>}
 */
export async function generateFiles(tsConfigFileName, tsConfig) {
  await Promise.all([
    build(prepareConfig(tsConfigFileName, tsConfig, { type: "common" })),
    build(prepareConfig(tsConfigFileName, tsConfig, { type: "esm" })),
  ]);
}

/**
 * @param {string} tsConfigFileName
 * @param {string} tsConfig
 * @param {{ type: "common" | "esm" }} options
 * @returns {ts.ParsedCommandLine}
 */
function prepareConfig(tsConfigFileName, tsConfig, { type }) {
  const parsed = ts.parseConfigFileTextToJson(tsConfigFileName, tsConfig);

  const result = ts.parseJsonConfigFileContent(
    {
      ...parsed.config,
      compilerOptions: {
        ...parsed.config.compilerOptions,
        noEmit: false,
        declaration: type !== "common",
        declarationDir: `${OUT_DIR}/${TYPES_PATH}`,
        module: type === "common" ? "CommonJS" : "ES6",
        outDir:
          type === "common"
            ? `${OUT_DIR}/${COMMON_PATH}`
            : `${OUT_DIR}/${ESM_PATH}`,
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
  const promises = [];

  program.emit(
    undefined,
    (fileName, text) => {
      if (isCommon && fileName.endsWith(".js")) {
        fileName = changeExtension(fileName, "js", "cjs");
      }
      promises.push(fs.writeFile(fileName, text));
    },
    undefined,
    undefined,
    isCommon ? { before: [commonTransformerFactory] } : undefined
  );

  await Promise.all(promises);
}

/**
 * @type {ts.TransformerFactory<ts.SourceFile>}
 */
const commonTransformerFactory = () => {
  return commonTransformer;
};

/**
 * @type {ts.Transformer<ts.SourceFile>}
 */
const commonTransformer = (node) => {
  for (const statement of node.statements) {
    if (
      ts.isImportDeclaration(statement) &&
      ts.isStringLiteral(statement.moduleSpecifier) &&
      statement.moduleSpecifier.text.startsWith("./") &&
      statement.moduleSpecifier.text.endsWith(".js")
    ) {
      statement.moduleSpecifier.text = changeExtension(
        statement.moduleSpecifier.text,
        "js",
        "cjs"
      );
    }
  }
  return node;
};

/**
 * @param {string} original
 * @param {string} ext
 * @param {string} extNew
 */
function changeExtension(original, ext, extNew) {
  return `${original.slice(0, -ext.length)}${extNew}`;
}

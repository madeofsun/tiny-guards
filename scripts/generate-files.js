import ts from "typescript";

import { COMMON_PATH, ESM_PATH, TYPES_PATH } from "./constants.js";

/**
 *
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
 *
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
        declaration: true,
        declarationDir: TYPES_PATH,
        module: type === "common" ? "CommonJS" : "ES6",
        outDir: type === "common" ? COMMON_PATH : ESM_PATH,
      },
    },
    ts.sys,
    ""
  );

  return result;
}

/**
 *
 * @param {ts.ParsedCommandLine} config
 * @returns {void}
 */
async function build(config) {
  const program = ts.createProgram(config.fileNames, config.options);
  program.emit();
}

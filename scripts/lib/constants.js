import pkg from "../../package.json" assert { type: "json" };

export const PKG_NAME = pkg.name;
export const TEST_PKG_JS_PATH = "test-pkg/esm/index.js";
export const TEST_PKG_TS_PATH = "test-pkg/ts/index.ts";

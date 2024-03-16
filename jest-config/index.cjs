const plugins = [[require.resolve("./remove-dev-plugin.cjs"), {}]];

if (process.env.DIST) {
  plugins.push([
    require.resolve("./use-dist-plugin.cjs"),
    { dist: process.env.DIST },
  ]);
}

/** @type {import('jest').Config} */
module.exports = {
  maxWorkers: 4,
  transform: {
    "\\.[jt]sx?$": [
      "babel-jest",
      {
        presets: [
          ["@babel/preset-env", { targets: { node: "current" } }],
          "@babel/preset-typescript",
        ],
        plugins,
      },
    ],
  },
  moduleNameMapper: {
    "(.*)\\.js$": ["$1.js", "$1.ts"],
  },
  extensionsToTreatAsEsm: [".ts"],
  coveragePathIgnorePatterns: ["internal/dev_*", "index.ts", "types.ts"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};

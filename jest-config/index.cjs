const plugins = [[require.resolve("./remove-dev-plugin.cjs"), {}]];

if (process.env.DIST_EXT) {
  plugins.push([
    require.resolve("./use-dist-plugin.cjs"),
    { extension: process.env.DIST_EXT },
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
  extensionsToTreatAsEsm: [".ts"],
  coveragePathIgnorePatterns: ["internal/dev_*"],
};

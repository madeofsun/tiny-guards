---
"tiny-guards": major
---

Breaking changes:

- non-index modules now use `default` export
- members of `guards` and `refinement` modules are now split in separate modules
- `TypeOfGuard` is removed, use `Guard.Infer` instead
- `Narrow` type is renamed to `Narrowing`
- `ShapeDescription` type is renamed to `Shape`

Features:

- added a new `record` guard factory for `Record` type guarding
- added a new `strict` option for `shape` guard factory
- added some useful "out of the box" narrowings that can be use with `narrow` guard factory
- added logging of debug info only in `development` mode
  - enabled by NODE_ENV="development"
  - extra code is removed by bundlers when build for "production"
  - can be disabled/enabled with `devLogDisable`/`devLogEnable`

Fixes:

- code coverage increased up to 100%
- fixed named exports for `index.cjs` module

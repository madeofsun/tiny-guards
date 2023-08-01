# Changelog

## 2.0.0

- [#4](https://github.com/madeofsun/tiny-guards/pull/4) [`2001715`](https://github.com/madeofsun/tiny-guards/commit/2001715baa4dc810b8c23f9c9f9dff8ef6dcc424)

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
    - enabled by `NODE_ENV="development"`
    - extra code is removed by bundlers when build for `production`
    - can be disabled/enabled with `devLogDisable`/`devLogEnable`

  Fixes:

  - code coverage increased up to 100%
  - fixed named exports for `index.cjs` module

## [1.0.2](https://github.com/madeofsun/tiny-guards/compare/v1.0.1...v1.0.2) (2023-01-31)

### Bug Fixes

- publish ([fd063c5](https://github.com/madeofsun/tiny-guards/commit/fd063c58c99432a91b628b7940b585d0eb54e020))

## [1.0.1](https://github.com/madeofsun/tiny-guards/compare/v1.0.0...v1.0.1) (2023-01-30)

### Bug Fixes

- commonjs index ([d417b87](https://github.com/madeofsun/tiny-guards/commit/d417b8798ff6c469cd54ec674d3f541953f4da15))

## 1.0.0 (2023-01-08)

### Features

- prepare release ([d7405a3](https://github.com/madeofsun/tiny-guards/commit/d7405a3d5be58b8d1e29cd7398fe64155ae0fb2f))

# tiny-guards 💂

A tiny library for advanced typescript guarding

- 🪶 lightweight

- 🍃 tree-shakable

- 🧱 composable

- 👮 type-safe

- 🔗 zero dependencies

- 🌚 dead simple

<p>
  <a href="https://npmjs.com/package/tiny-guards"><img src="https://badgen.net/npm/v/tiny-guards" alt="npm package"></a>
  <a href="https://github.com/madeofsun/tiny-guards/actions/workflows/ci.yml"><img src="https://github.com/madeofsun/tiny-guards/actions/workflows/ci.yml/badge.svg" alt="build status"></a>
  <a href="https://github.com/madeofsun/tiny-guards/blob/main/jest-config/index.cjs#L30"><img src="https://img.shields.io/badge/coverage-100%25-brightgreen?labelColor=coverage" alt="coverage"/></a>
</p>

```bash
npm install tiny-guards
```

### Usage example

```typescript
import {
  asserts,
  gt,
  isNumber,
  isString,
  maxLen,
  oneOf,
  optional,
  refine,
  shape,
  Guard,
  tinyGuards,
} from "tiny-guards";

const isNaturalNumber = refine(isNumber, gt(0), Number.isSafeInteger);
const isShortString = refine(isString, maxLen(16));
const isAccountType = oneOf(["reader", "publisher", "moderator"]);

const isUser = shape({
  id: isNaturalNumber,
  username: isShortString,
  accountType: isAccountType,
  firstName: optional(isString),
  lastName: optional(isString),
});

type User = GuardInfer<typeof isUser>;

function doSomething(v: unknown) {
  try {
    asserts(v, isUser);

    v.id; // ✅
    v.username; // ✅
  } catch (error) {
    console.error(error);
    // TinyGuardsError: validation failed
    // [shape]: value at key "id" is blocked by guard "refine"
    // [refine]: value is blocked by refinement "gt" (index "0")
  }
}

function doSomething(v: unknown) {
  if (isUser(v)) {
    v.id; // ✅
    v.username; // ✅
  } else {
    isUser.error;
    // TinyGuardsError: validation failed
    // [shape]: value at key "id" is blocked by guard "refine"
    // [refine]: value is blocked by refinement "gt" (index "0")
  }
}
```

# tiny-guards 💂

A tiny library for advanced typescript guarding

- 🪶 lightweight

- 🍃 tree-shakable

- 🧱 composable

- 👮 type-safe

- 🔗 zero dependencies

- 🌚 dead simple

<object alt="npm" src="https://img.shields.io/npm/v/tiny-guards?logo=npm&color=brightgreen&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Ftiny-guards>

![coverage](https://img.shields.io/badge/coverage-100%25-brightgreen?labelColor=coverage)

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

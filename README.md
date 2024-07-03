# tiny-guards 💂

A tiny library for advanced typescript guarding

- 🪶 lightweight

- 🍃 tree-shakable

- 🧱 composable

- 👮 type-safe

- 🔗 zero dependencies

- 🌚 dead simple

![npm](https://img.shields.io/npm/v/tiny-guards?logo=npm&color=brightgreen&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Ftiny-guards)
![coverage](https://img.shields.io/badge/coverage-100%25-brightgreen?labelColor=coverage)

```bash
npm install tiny-guards
```

### Usage example

```typescript
import {
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
  if (isUser(v)) {
    v.id; // ✅
    v.username; // ✅
  } else {
    // if you need details
    isUser.error;
    // TinyGuardsError: validation failed
    // [isShape]: value at key "id" is blocked by guard "isRefinement"
    // [isRefinement]: value is blocked by refinement "isGt" (index "0")
  }
}
```

# tiny-guards 💂

![npm](https://img.shields.io/npm/v/tiny-guards?logo=npm&color=brightgreen&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Ftiny-guards)
![coverage](https://img.shields.io/badge/coverage-100%25-brightgreen?labelColor=coverage)

A tiny library for advanced typescript guarding

- 🪶 lightweight

- 🍃 tree-shakable

- 🧱 composable

- 👮 type-safe

- 🔗 zero dependencies

- 🌚 dead simple

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
  TypeOfGuard,
} from "tiny-guards";

const isNaturalNumber = refine(isNumber, Number.isSafeInteger, gt(0));
const isShortString = refine(isString, maxLen(16));
const isAccountType = oneOf(["reader", "publisher", "moderator"]);

const isUser = shape({
  id: isNaturalNumber,
  username: isShortString,
  accountType: isAccountType,
  firstName: optional(isString),
  lastName: optional(isString),
});

type User = TypeOfGuard<typeof isUser>;

function doSomething(v: unknown) {
  if (isUser(v)) {
    v.id; // ✅
    v.username; // ✅
  }
}
```

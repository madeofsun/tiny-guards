# tiny-guards ð

A tiny library for advanced typescript guarding

- ðŠķ lightweight

- ð tree-shakable

- ð§ą composable

- ðŪ type-safe

- ð zero dependencies

- ð dead simple

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
    v.id; // â
    v.username; // â
  }
}
```

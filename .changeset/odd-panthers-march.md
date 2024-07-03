---
"tiny-guards": major
---

`Dev log` feature is replaced with `ComplexGuard` feature

Example:

```ts
import { array, shape, isString, tinyGuards } from "tiny-guards";

const isData = shape({
  values: array(isString),
});

if (isData(v)) {
  v.values; // ✅
} else {
  // if you need details
  isData.error;
  // TinyGuardsError: validation failed
  // [isShape]: value at key "values" is blocked by guard "isArray"
  // [isArray]: item at index "1" is blocked by guard "isString"
}
```

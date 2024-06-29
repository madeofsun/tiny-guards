---
"tiny-guards": major
---

`Dev log` feature is replaced with `tinyGuards.error`

Example:

```ts
import { array, shape, isString, tinyGuards } from "tiny-guards";

const isData = shape({
  values: array(isString),
});

if (
  !isData({
    values: ["name", 1],
  })
) {
  throw tinyGuards.error;
  // TinyGuardsError: validation failed
  // [isShape]: value at key "values" is blocked by guard "isArray"
  // [isArray]: item at index "1" is blocked by guard "isString"
}
```

import type { Guard, ShapeDescription } from "./types.js";

export function shape<T extends {}>(
  description: ShapeDescription<T>
): Guard<T> & { description: ShapeDescription<T> } {
  const guard = (v: unknown): v is T => {
    if (v === null || typeof v !== "object") {
      return false;
    }
    for (const key in description) {
      if (!description[key]((v as T)[key])) {
        return false;
      }
    }
    return true;
  };

  guard.description = description;

  return guard;
}

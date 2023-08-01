import fsp from "node:fs/promises";
import path from "node:path";

import { IN_INDEX, IN_TYPES } from "./constants.js";

export async function collectModules() {
  const files = await fsp.readdir(path.resolve("src"), null);
  return files
    .filter(
      (file) => file.endsWith(".ts") && file !== IN_INDEX && file !== IN_TYPES
    )
    .map((file) => path.basename(file, ".ts"));
}

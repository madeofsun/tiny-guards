import fs from "node:fs/promises";
import path from "node:path";

export async function collectModules() {
  const files = await fs.readdir(path.resolve("src"), null);
  return files
    .filter((file) => !file.startsWith("_") && file.endsWith(".ts"))
    .map((file) => path.basename(file, ".ts"));
}

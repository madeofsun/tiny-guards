import fsp from "node:fs/promises";
import path from "node:path";

export async function collectModules() {
  const files = await fsp.readdir(path.resolve("src"), null);
  return files
    .filter((file) => file.endsWith(".ts") && file !== "index.ts")
    .map((file) => path.basename(file, ".ts"));
}

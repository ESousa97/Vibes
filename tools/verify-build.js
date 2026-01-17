import { existsSync } from "node:fs";
import { join } from "node:path";

const requiredPaths = [
  "index.html",
  "Assets/nature1.png",
  "Assets/nature2.png",
  "Assets/nature3.png",
  "Assets/nature4.png",
  "public/vibe.gif",
  "vercel.json"
];

const missing = requiredPaths.filter((filePath) => !existsSync(join(process.cwd(), filePath)));

if (missing.length > 0) {
  console.error("Build verification failed. Missing files:");
  missing.forEach((filePath) => console.error(`- ${filePath}`));
  process.exit(1);
}

console.log("Build verification passed.");

import { run } from "@/server/entry-point";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const fileName = fileURLToPath(import.meta.url);
const root = dirname(fileName);
await run(root);

import { main } from "@/server/entry-point/entry-point";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const fileName = fileURLToPath(import.meta.url);
const root = dirname(fileName);
await main(root);

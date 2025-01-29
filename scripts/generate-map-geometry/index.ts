// Script to regenerate the map geometry. Should be run anytime the contents of
// this directory is changed.
//
// Usage:
// npx tsx scripts/generate-map-geometry/index.ts

/* eslint-disable no-console */
import fsp, { rm } from "fs/promises";
import path from "path";
import example from "./example";

const outDir = "./components/map/geometry";

const geometry = {
  example,
};

async function run() {
  await rm(outDir, { recursive: true });
  await fsp.mkdir(outDir, { recursive: true });

  for (const [name, data] of Object.entries(geometry)) {
    const fileName = path.join(outDir, `${name}.json`);

    console.log(`Generating ${fileName}...`);

    const json = JSON.stringify(data.toJSON(), null, 2);
    await fsp.writeFile(fileName, json);
  }

  console.log("✅ Done.");
}

run();

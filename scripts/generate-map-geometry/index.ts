// Script to regenerate the map geometry. Should be run anytime the contents of
// this directory is changed.
//
// Usage:
// npx tsx scripts/generate-map-geometry/index.ts

import fsp, { rm } from "fs/promises";
import path from "path";
import ptv from "./ptv";

const outDir = "./components/map/geometry";

const geometry = {
  ptv,
};

async function run() {
  await rm(outDir, { recursive: true });
  await fsp.mkdir(outDir, { recursive: true });

  for (const [name, data] of Object.entries(geometry)) {
    const fileName = `${name}.json`;
    const json = JSON.stringify(data.toJSON(), null, 2);
    await fsp.writeFile(path.join(outDir, fileName), json);
  }
}

run();

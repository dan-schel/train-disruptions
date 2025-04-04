import { GeometryBuilder } from "@/scripts/generate-map-geometry/lib/builder/geometry-builder";
import { burnley } from "@/scripts/generate-map-geometry/ptv/lines/burnley";
import { cliftonHill } from "@/scripts/generate-map-geometry/ptv/lines/clifton-hill";
import { dandenong } from "@/scripts/generate-map-geometry/ptv/lines/dandenong";
import { frankston } from "@/scripts/generate-map-geometry/ptv/lines/frankston";
import { gippsland } from "@/scripts/generate-map-geometry/ptv/lines/gippsland";
import { newport } from "@/scripts/generate-map-geometry/ptv/lines/newport";
import { northern } from "@/scripts/generate-map-geometry/ptv/lines/northern";
import { regionalWestern } from "@/scripts/generate-map-geometry/ptv/lines/regional-western";
import { sandringham } from "@/scripts/generate-map-geometry/ptv/lines/sandringham";
import { stonyPoint } from "@/scripts/generate-map-geometry/ptv/lines/stony_point";
import * as interchange from "@/scripts/generate-map-geometry/ptv/interchanges";

const geometry = new GeometryBuilder().build(
  [
    // In render (z-index) order.
    gippsland,
    regionalWestern,
    cliftonHill,
    dandenong,
    burnley,
    northern,
    newport,
    frankston,
    sandringham,
    stonyPoint,
  ],
  [
    interchange.flindersStreet,
    interchange.southernCross,
    interchange.flagstaff,
    interchange.melbourneCentral,
    interchange.parliament,
    interchange.richmond,
    interchange.northMelbourne,
    interchange.cliftonHill,
    interchange.burnley,
    interchange.camberwell,
    interchange.ringwood,
    interchange.southYarra,
    interchange.caulfield,
    interchange.clayton,
    interchange.dandenong,
    interchange.pakenham,
    interchange.footscray,
    interchange.frankston,
    interchange.broadmeadows,
    interchange.craigieburn,
    interchange.seymour,
    interchange.newport,
    interchange.laverton,
    interchange.sunshine,
    interchange.watergardens,
    interchange.sunbury,
    interchange.bendigo,
    interchange.ballarat,
    interchange.deerPark,
  ],
);

export default geometry;

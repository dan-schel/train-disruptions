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

const geometry = new GeometryBuilder().build([
  burnley,
  cliftonHill,
  dandenong,
  frankston,
  gippsland,
  newport,
  northern,
  regionalWestern,
  sandringham,
  stonyPoint,
]);

export default geometry;

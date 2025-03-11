import { burnley } from "@/scripts/generate-map-geometry/ptv/lines/burnley";
import { cliftonHill } from "@/scripts/generate-map-geometry/ptv/lines/clifton-hill";
import {
  frankston,
  stonyPoint,
} from "@/scripts/generate-map-geometry/ptv/lines/frankston-and-stony-point";
import { dandenong } from "@/scripts/generate-map-geometry/ptv/lines/dandenong";
import { northern } from "@/scripts/generate-map-geometry/ptv/lines/northern";
import { regionalWestern } from "@/scripts/generate-map-geometry/ptv/lines/regional-western";
import { sandringham } from "@/scripts/generate-map-geometry/ptv/lines/sandringham";
import { newport } from "@/scripts/generate-map-geometry/ptv/lines/newport";
import { gippsland } from "@/scripts/generate-map-geometry/ptv/lines/gippsland";
import { GeometryBuilder } from "@/scripts/generate-map-geometry/lib/builder/geometry-builder";

const geometry = new GeometryBuilder().build([
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
]);

export default geometry;

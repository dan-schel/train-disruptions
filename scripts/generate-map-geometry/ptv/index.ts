import { burnley } from "./lines/burnley";
import { cliftonHill } from "./lines/clifton-hill";
import { frankston, stonyPoint } from "./lines/frankston-and-stony-point";
import { dandenong } from "./lines/dandenong";
import { northern } from "./lines/northern";
import { regionalWestern } from "./lines/regional-western";
import { sandringham } from "./lines/sandringham";
import { newport } from "./lines/newport";
import { gippsland } from "./lines/gippsland";
import { GeometryBuilder } from "../lib/builder/geometry-builder";

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

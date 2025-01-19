import { BakedGeometry } from "../lib/baked/baked-geometry";
import { burnley } from "./lines/burnley";
import { cliftonHill } from "./lines/clifton-hill";
import { crossCityEastern, crossCityWestern } from "./lines/cross-city";
import { dandenong } from "./lines/dandenong";
import { northern } from "./lines/northern";
import { regionalEastern, regionalWestern } from "./lines/regional";
import { sandringham } from "./lines/sandringham";

export const geometry = BakedGeometry.bake([
  regionalEastern,
  regionalWestern,
  cliftonHill,
  dandenong,
  burnley,
  northern,
  crossCityWestern,
  crossCityEastern,
  sandringham,
]);

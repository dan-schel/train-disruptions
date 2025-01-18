import { bake } from "../lib/bake";
import { Geometry } from "../lib/geometry";
import { burnley } from "./lines/burnley";
import { cliftonHill } from "./lines/clifton-hill";
import { crossCityEastern, crossCityWestern } from "./lines/cross-city";
import { dandenong } from "./lines/dandenong";
import { northern } from "./lines/northern";
import { regionalEastern, regionalWestern } from "./lines/regional";
import { sandringham } from "./lines/sandringham";

const raw: Geometry = [
  regionalEastern,
  regionalWestern,
  cliftonHill,
  dandenong,
  burnley,
  northern,
  crossCityWestern,
  crossCityEastern,
  sandringham,
];

export const geometry = bake(raw);

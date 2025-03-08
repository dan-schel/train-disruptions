import { PageContext } from "vike/types";

export { data };

export const filterableDisruptionCategories = [
  "station-closure",
  "cancellations",
  "delays",
  "car-park-closures",
  "accessibility",
] as const;

export type FilterableDisruptionCategory =
  (typeof filterableDisruptionCategories)[number];

export type Data = {
  commute: CommuteData;
  hiddenCategories: readonly FilterableDisruptionCategory[];
};

export type CommuteData = { a: number; b: number } | null;

export type HiddenCategoriesData =
  | string[]
  | readonly FilterableDisruptionCategory[];

function data(pageContext: PageContext): Data {
  const { settings } = pageContext.custom;

  if (settings.commute === null && settings.hiddenCategories.length === 0) {
    return {
      commute: null,
      hiddenCategories: [],
    };
  } else {
    return {
      commute: settings.commute,
      hiddenCategories: settings.hiddenCategories,
    };
  }
}

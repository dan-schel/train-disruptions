import { PageContext } from "vike/types";

export { data };

export type Data = {
  commute: CommuteData;
  hiddenCategories: HiddenCategoriesData;
};

export type CommuteData = {
  commute: null | { StationA: number; StationB: number };
};

export type HiddenCategoriesData = {
  hiddenCategories: [string];
};

async function data(pageContext: PageContext) {
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

import { PageContext } from "vike/types";

export type Data = {
  commute: {
    stationAName: string;
    stationBName: string;
  } | null;
};

export function data(pageContext: PageContext): Data {
  const { app, settings } = pageContext.custom;

  if (settings.commute == null) {
    return {
      commute: null,
    };
  }

  return {
    commute: {
      stationAName: app.stations.require(settings.commute.a).name,
      stationBName: app.stations.require(settings.commute.b).name,
    },
  };
}

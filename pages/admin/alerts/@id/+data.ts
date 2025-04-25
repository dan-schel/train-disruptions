import { PageContext } from "vike/types";
import { ALERTS } from "@/server/database/models/models";
import { JsonSerializable } from "@/shared/json-serializable";
import { AlertData } from "@/server/data/alert";
import { App } from "@/server/app";
import { nonNull, unique } from "@dan-schel/js-utils";
import { DetailsError } from "@/server/alert-source/alert-source";

type UrlPreview = { html: string } | { error: string };

export type Data = {
  alert: {
    data: {
      title: string;
      description: string;
      url: string;
      startsAt: Date | null;
      endsAt: Date | null;
      affectedLines: {
        name: string;
      }[];
      affectedStations: {
        name: string;
      }[];
      urlPreview: UrlPreview;
    };
  } | null;
};

export async function data(
  pageContext: PageContext,
): Promise<Data & JsonSerializable> {
  const {
    routeParams,
    custom: { app },
  } = pageContext;

  const id = routeParams.id;
  const alert = await app.database.of(ALERTS).get(id);

  if (alert == null) {
    return { alert: null };
  }

  const urlPreview = await generateUrlPreview(app, alert.data.url);

  return {
    alert: {
      data: serializeData(alert.updatedData ?? alert.data, app, urlPreview),
    },
  };
}

function serializeData(data: AlertData, app: App, urlPreview: UrlPreview) {
  const affectedLines = unique(
    data.affectedLinePtvIds
      .map((id) => app.lines.findByPtvId(id))
      .filter(nonNull),
  ).map((x) => ({ name: x.name }));

  const affectedStations = unique(
    data.affectedStationPtvIds
      .map((id) => app.stations.findByPtvId(id))
      .filter(nonNull),
  ).map((x) => ({ name: x.name }));

  return {
    title: data.title,
    description: data.description,
    url: data.url,
    startsAt: data.startsAt,
    endsAt: data.endsAt,
    affectedLines,
    affectedStations,
    urlPreview,
  };
}

const errorMapping: Record<DetailsError, string> = {
  "invalid-request": "Unknown error while generating the preview.",
  "unknown-error": "Unknown error while generating the preview.",
  "not-found": "Page no longer exists on PTV's website.",
  "unsupported-url": "Previews are only generated for PTV disruption articles.",
  "rate-limited":
    "Preview generation skipped to avoid spamming PTV - try again later.",
};

async function generateUrlPreview(app: App, url: string): Promise<UrlPreview> {
  const details = await app.alertSource.fetchDetails(url);

  if ("error" in details) {
    return { error: errorMapping[details.error] };
  }

  // TODO: [DS] Sanitize the HTML.
  //
  // (Don't let me merge this PR if this comment is still here!)
  return { html: details.details };
}

import { PageContext } from "vike/types";
import { ALERTS } from "@/server/database/models/models";
import { JsonSerializable } from "@/shared/json-serializable";
import { AlertData } from "@/server/data/alert";
import { App } from "@/server/app";
import { nonNull, unique } from "@dan-schel/js-utils";
import { DetailsError } from "@/server/alert-source/alert-source";
import sanitizeHtml from "sanitize-html";
import { formatDate } from "@/server/data/disruption/period/utils/utils";

type UrlPreview = { html: string } | { error: string };

export type Data = {
  alert: {
    data: {
      title: string;
      description: string;
      url: string;
      startsAt: string | null;
      endsAt: string | null;
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

const sanitizeOptions: sanitizeHtml.IOptions = {
  allowedTags: [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p",
    "a",
    "ul",
    "ol",
    "li",
    "span",
    "strong",
    "b",
    "i",
    "em",
    "img",
    "table",
    "tbody",
    "thead",
    "tr",
    "th",
    "td",
  ],
  disallowedTagsMode: "recursiveEscape",
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
    startsAt:
      data.startsAt != null ? formatDate(data.startsAt, app.time.now()) : null,
    endsAt:
      data.endsAt != null ? formatDate(data.endsAt, app.time.now()) : null,
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
  try {
    const details = await app.alertSource.fetchDetails(url);

    if ("error" in details) {
      return { error: errorMapping[details.error] };
    }

    return { html: sanitizeHtml(details.details, sanitizeOptions) };
  } catch {
    return { error: errorMapping["unknown-error"] };
  }
}

import { z } from "zod";

const directionJson = z
  .object({
    route_direction_id: z.number(),
    direction_id: z.number(),
    direction_name: z.string(),
    service_time: z.string(),
  })
  .transform((x) => ({
    routeDirectionId: x.route_direction_id,
    directionId: x.direction_id,
    directionName: x.direction_name,
    serviceTime: x.service_time,
  }));

const routeJson = z
  .object({
    route_type: z.number(),
    route_id: z.number(),
    route_name: z.string().trim(),
    route_number: z.string(),
    route_gtfs_id: z.string(),
    direction: directionJson.nullable(),
  })
  .transform((x) => ({
    routeType: x.route_type,
    routeId: x.route_id,
    routeName: x.route_name,
    routeNumber: x.route_number,
    routeGtfsId: x.route_gtfs_id,
    direction: x.direction,
  }));

const stopJson = z
  .object({
    stop_id: z.number(),
    stop_name: z.string().trim(),
  })
  .transform((x) => ({
    stopId: x.stop_id,
    stopName: x.stop_name,
  }));

export const ptvAlertJson = z
  .object({
    disruption_id: z.number(),
    title: z.string(),
    url: z.url(),
    description: z.string(),
    disruption_status: z.enum(["Planned", "Current"]),
    disruption_type: z.string(),
    published_on: z.iso.datetime(),
    last_updated: z.iso.datetime(),
    from_date: z.iso.datetime(),
    to_date: z.iso.datetime().nullable(),
    routes: routeJson.array(),
    stops: stopJson.array(),
    colour: z.string().nullable(),
    display_on_board: z.boolean(),
    display_status: z.boolean(),
  })
  .transform((x) => ({
    id: x.disruption_id,
    title: x.title,
    url: x.url,
    description: x.description,
    disruptionStatus: x.disruption_status,
    disruptionType: x.disruption_type,
    publishedOn: x.published_on,
    lastUpdated: x.last_updated,
    fromDate: x.from_date,
    toDate: x.to_date,
    routes: x.routes,
    stops: x.stops,
    color: x.colour,
    displayOnBoard: x.display_on_board,
    displayStatus: x.display_status,
  }));

export type PtvAlert = z.infer<typeof ptvAlertJson>;

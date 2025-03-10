import { z } from "zod";

const directionSchema = z.object({
  route_direction_id: z.number(),
  direction_id: z.number(),
  direction_name: z.string(),
  service_time: z.string(),
});

const stopSchema = z.object({
  stop_id: z.number(),
  stop_name: z.string().trim(),
});

const routeSchema = z.object({
  route_type: z.number(),
  route_id: z.number(),
  route_name: z.string().trim(),
  route_number: z.string(),
  route_gtfs_id: z.string(),
  direction: directionSchema.nullable(),
});

export const disruptionSchema = z.object({
  disruption_id: z.number(),
  title: z.string(),
  url: z.string().url(),
  description: z.string(),
  disruption_status: z.enum(["Planned", "Current"]),
  disruption_type: z.string(),
  published_on: z.string().datetime(),
  last_updated: z.string().datetime(),
  from_date: z.string().datetime(),
  to_date: z.string().datetime().nullable(),
  routes: routeSchema.array(),
  stops: stopSchema.array(),
  colour: z.string().nullable(),
  display_on_board: z.boolean(),
  display_status: z.boolean(),
});

export type Disruption = z.infer<typeof disruptionSchema>;

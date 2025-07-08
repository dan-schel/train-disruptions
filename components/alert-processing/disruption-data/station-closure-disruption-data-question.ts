import { q } from "@/components/question";

export const stationClosureDisruptionDataQuestion = q.object({
  stationId: q.station({
    label: "The station which is closed",
  }),
});

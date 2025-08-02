import { q } from "@/components/question";
import { AnyField } from "@/components/question/common/field";
import { StationClosureDisruptionDataInput } from "@/shared/schemas/common/disruption-data-input";

export const stationClosureDisruptionDataQuestion = q.object({
  stationId: q.station({
    label: "The station which is closed",
  }),
}) satisfies AnyField<StationClosureDisruptionDataInput>;

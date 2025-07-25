import { q } from "@/components/question";
import { AnyField } from "@/components/question/common/field";
import { BusReplacementsDisruptionDataInput } from "@/shared/schemas/alert-processing/disruption-data-input";

export const busReplacementsDisruptionDataQuestion = q.object({
  sections: q.array(q.lineSection({ label: "The line section" }), {
    label: "Which section(s) of the network are replaced by buses?",
    min: 1,
  }),
}) satisfies AnyField<BusReplacementsDisruptionDataInput>;

import { q } from "@/components/question";
import { AnyField } from "@/components/question/common/field";
import { NoTrainsRunningDisruptionDataInput } from "@/shared/schemas/common/disruption-data-input";

export const noTrainsRunningDisruptionDataQuestion = q.object({
  sections: q.array(q.lineSection({ label: "The line section" }), {
    label: "Which section(s) of the network are trains not running on?",
    min: 1,
  }),
}) satisfies AnyField<NoTrainsRunningDisruptionDataInput>;

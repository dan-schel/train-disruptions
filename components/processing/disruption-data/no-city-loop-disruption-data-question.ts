import { q } from "@/components/question";
import { AnyField } from "@/components/question/common/field";
import { NoCityLoopDisruptionDataInput } from "@/shared/schemas/common/disruption-data-input";

export const noCityLoopDisruptionDataQuestion = q.object({
  lineIds: q.array(
    q.line({
      label: "The line which is not running through the City Loop",
    }),
    {
      label: "Which lines are not running through the City Loop?",
      min: 1,
    },
  ),
}) satisfies AnyField<NoCityLoopDisruptionDataInput>;

import { endsQuestion } from "@/components/alert-processing/disruption-period/ends-question";
import { q } from "@/components/question";
import { AnyField } from "@/components/question/common/field";
import { StandardDisruptionPeriodInput } from "@/shared/schemas/alert-processing/disruption-period-input";

export const standardDisruptionPeriodQuestion = q.object({
  start: q.date({ label: "Starting" }),
  end: endsQuestion,
}) satisfies AnyField<StandardDisruptionPeriodInput>;

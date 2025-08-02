import { disruptionDataQuestion } from "@/components/processing/disruption-data/disruption-data-question";
import { disruptionPeriodQuestion } from "@/components/processing/disruption-period/disruption-period-question";
import { q } from "@/components/question";
import { AnyField } from "@/components/question/common/field";
import { DisruptionProcessingInput } from "@/shared/schemas/disruption-processing/disruption-processing-input";

export const disruptionProcessingQuestion = q.object({
  data: disruptionDataQuestion,
  period: disruptionPeriodQuestion,
}) satisfies AnyField<DisruptionProcessingInput>;

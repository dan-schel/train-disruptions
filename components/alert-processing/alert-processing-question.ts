import { disruptionDataQuestion } from "@/components/alert-processing/disruption-data/disruption-data-question";
import { disruptionPeriodQuestion } from "@/components/alert-processing/disruption-period/disruption-period-question";
import { q } from "@/components/question";
import { AnyField } from "@/components/question/common/field";
import { AlertProcessingInput } from "@/shared/schemas/alert-processing/alert-processing-input";

export const alertProcessingQuestion = q.array(
  q.object({
    data: disruptionDataQuestion,
    period: disruptionPeriodQuestion,
  }),
  {
    label: "Disruptions from this alert",
    min: 1,
  },
) satisfies AnyField<AlertProcessingInput>;

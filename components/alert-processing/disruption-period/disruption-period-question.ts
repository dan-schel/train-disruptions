import { eveningsOnlyDisruptionPeriodQuestion } from "@/components/alert-processing/disruption-period/evenings-only-disruption-period-question";
import { standardDisruptionPeriodQuestion } from "@/components/alert-processing/disruption-period/standard-disruption-period-question";
import { q } from "@/components/question";
import { AnyField } from "@/components/question/common/field";
import { DisruptionPeriodInput } from "@/shared/schemas/alert-processing/disruption-period-input";

export const disruptionPeriodQuestion = q.discriminatedUnion(
  "type",
  "The disruption occurs...",
  {
    standard: standardDisruptionPeriodQuestion,
    "evenings-only": eveningsOnlyDisruptionPeriodQuestion,
  },
  {
    standard: "Continuously",
    "evenings-only": "During the evenings only",
  },
) satisfies AnyField<DisruptionPeriodInput>;

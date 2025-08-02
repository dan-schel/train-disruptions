import { eveningsOnlyDisruptionPeriodQuestion } from "@/components/processing/disruption-period/evenings-only-disruption-period-question";
import { standardDisruptionPeriodQuestion } from "@/components/processing/disruption-period/standard-disruption-period-question";
import { q } from "@/components/question";
import { AnyField } from "@/components/question/common/field";
import { DisruptionPeriodInput } from "@/shared/schemas/common/disruption-period-input";

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

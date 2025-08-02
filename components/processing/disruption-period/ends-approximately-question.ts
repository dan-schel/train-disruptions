import { isAfter } from "date-fns";
import { q } from "@/components/question";
import { EndsApproximatelyInput } from "@/shared/schemas/common/disruption-period-input";
import { AnyField } from "@/components/question/common/field";

function validate(input: EndsApproximatelyInput) {
  if (!isAfter(input.latest, input.earliest)) {
    return {
      error: "Latest date must be after earliest date",
      questionsToInvalidate: ["latest" as const],
    };
  }
  return null;
}

export const endsApproximatelyQuestion = q.object(
  {
    displayText: q.string({
      label: "Text describing when the disruption ends",
      description: 'e.g. "late May", "2026", etc.',
    }),
    earliest: q.date({
      label: "Earliest interpretable date",
    }),
    latest: q.date({
      label: "Latest interpretable date",
    }),
  },
  validate,
) satisfies AnyField<EndsApproximatelyInput>;

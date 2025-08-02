import { q } from "@/components/question";
import { AnyField } from "@/components/question/common/field";
import { EndsAfterLastServiceInput } from "@/shared/schemas/common/disruption-period-input";
import { isValid, parse } from "date-fns";

function validate(input: EndsAfterLastServiceInput) {
  const isoishString = `${input.year}-${input.month}-${input.day}`;
  const a = parse(isoishString, "yyyy-MM-dd", new Date());
  if (!isValid(a)) {
    return {
      error: "Not a valid date",
      questionsToInvalidate: ["day" as const],
    };
  }
  return null;
}

export const endsAfterLastServiceQuestion = q.object(
  {
    year: q.integer({
      label: "Year",
      min: 1900,
      max: 2200,
    }),
    month: q.integer({
      label: "Month",
      min: 1,
      max: 12,
    }),
    day: q.integer({
      label: "Day",
      min: 1,
      max: 31,
    }),
  },
  validate,
) satisfies AnyField<EndsAfterLastServiceInput>;

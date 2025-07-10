import { q } from "@/components/question";
import { AnyField } from "@/components/question/common/field";
import { EndsExactlyInput } from "@/shared/schemas/alert-processing/disruption-period-input";

export const endsExactlyQuestion = q.object({
  date: q.date({
    label: "The date/time that the disruption ends",
  }),
}) satisfies AnyField<EndsExactlyInput>;

import { q } from "@/components/question";
import { AnyField } from "@/components/question/common/field";
import { LineSectionInput } from "@/shared/schemas/alert-processing/disruption-data-input";

export const lineSectionQuestion = q.object({
  line: q.line({
    label: "Which line the section occurs on",
  }),
  a: q.lineShapeNode({
    label: "Starting at",
  }),
  b: q.lineShapeNode({
    label: "Ending at",
  }),
}) satisfies AnyField<LineSectionInput>;

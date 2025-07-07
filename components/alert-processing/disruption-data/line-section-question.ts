import { q } from "@/components/question";

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
});

import { q } from "@/components/question";

export const noCityLoopDisruptionDataQuestion = q.object({
  lineIds: q.array(
    q.line({
      label: "The line which is not running through the City Loop",
    }),
    {
      label: "Which lines are not running through the City Loop?",
      min: 1,
    },
  ),
});

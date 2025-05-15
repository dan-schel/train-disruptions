import React from "react";
import { DateQuestion } from "@/components/alert-processing/question/type/DateQuestion";
import { StringQuestion } from "@/components/alert-processing/question/type/StringQuestion";
import { useQuestions } from "@/components/alert-processing/question/lib/question";

export function EndsApproximatelyQuestions() {
  const { activeQuestionIndex, createSubmitHandlerForIndex } = useQuestions();

  const [displayString, setDisplayString] = React.useState<string | null>(null);
  const [earliestDate, setEarliestDate] = React.useState<string | null>(null);
  const [latestDate, setLatestDate] = React.useState<string | null>(null);

  return (
    <>
      {activeQuestionIndex >= 0 && (
        <StringQuestion
          label="The disruption ends in..."
          value={displayString}
          onSubmit={createSubmitHandlerForIndex(0, setDisplayString)}
        />
      )}
      {activeQuestionIndex >= 1 && (
        <DateQuestion
          label="Earliest interpretable date/time"
          value={earliestDate}
          onSubmit={createSubmitHandlerForIndex(1, setEarliestDate)}
        />
      )}
      {activeQuestionIndex >= 2 && (
        <DateQuestion
          label="Latest interpretable date/time"
          value={latestDate}
          onSubmit={createSubmitHandlerForIndex(2, setLatestDate)}
        />
      )}
    </>
  );
}

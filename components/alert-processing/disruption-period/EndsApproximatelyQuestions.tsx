import React from "react";
import { DateQuestion } from "@/components/alert-processing/question/type/DateQuestion";
import { StringQuestion } from "@/components/alert-processing/question/type/StringQuestion";
import { QuestionProps } from "@/components/alert-processing/question/lib/question";
import { EndsApproximatelyInput } from "@/shared/types/alert-processing/disruption-period-input";

export type EndsApproximatelyQuestionsProps =
  QuestionProps<EndsApproximatelyInput>;

export function EndsApproximatelyQuestions(
  props: EndsApproximatelyQuestionsProps,
) {
  const [displayText, setDisplayText] = React.useState<string | null>(null);
  const [earliest, setEarliest] = React.useState<Date | null>(null);
  const [latest, setLatest] = React.useState<Date | null>(null);

  function handleChildSubmitted<T>(setter: (value: T) => void) {
    return (value: T) => {
      setter(value);

      // TODO: [DS] Will never work because whichever value is modified by
      // setter will not be updated yet when this runs.
      if (displayText != null && earliest != null && latest != null) {
        props.onSubmit({
          displayText,
          earliest,
          latest,
        });
      }
    };
  }

  return (
    <>
      <StringQuestion
        label="The disruption ends in..."
        value={displayText}
        onSubmit={handleChildSubmitted(setDisplayText)}
      />
      {displayText != null && (
        <DateQuestion
          label="Earliest interpretable date/time"
          value={earliest}
          onSubmit={handleChildSubmitted(setEarliest)}
        />
      )}
      {earliest != null && (
        <DateQuestion
          label="Latest interpretable date/time"
          value={latest}
          onSubmit={handleChildSubmitted(setLatest)}
        />
      )}
    </>
  );
}

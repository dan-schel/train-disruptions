import React, { useEffect, useState } from "react";
import { EndsApproximatelyInput } from "@/shared/types/alert-processing/disruption-period-input";
import { Column } from "@/components/core/Column";
import { Text } from "@/components/core/Text";
import { DateInput } from "@/components/common/DateInput";
import { Input } from "@/components/core/Input";

export type EndsApproximatelyEditorProps = {
  initialValue: EndsApproximatelyInput | null;
  onChange: (value: EndsApproximatelyInput | null) => void;
};

export function EndsApproximatelyEditor(props: EndsApproximatelyEditorProps) {
  const [displayText, setDisplayText] = useState(
    props.initialValue?.displayText ?? "",
  );
  const [earliest, setEarliest] = useState(
    props.initialValue?.earliest ?? null,
  );
  const [latest, setLatest] = useState(props.initialValue?.latest ?? null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const parsed = parse(displayText, earliest, latest);
    props.onChange("value" in parsed ? parsed.value : null);
    setError("error" in parsed ? parsed.error : null);
  }, [props, displayText, earliest, latest]);

  return (
    <Column className="gap-4">
      <Text>In:</Text>
      <Input value={displayText} onChange={setDisplayText} />
      <Text style="tiny-weak">
        e.g. &quot;late May&quot;, &quot;this afternoon&quot;, etc.
      </Text>
      <Text>Earliest interpretable date/time:</Text>
      <DateInput value={earliest} onChange={setEarliest} />
      <Text>Latest interpretable date/time:</Text>
      <DateInput value={latest} onChange={setLatest} />
      {error != null && <Text style="small-red">{error}</Text>}
    </Column>
  );
}

function parse(
  displayText: string,
  earliest: Date | null,
  latest: Date | null,
): { value: EndsApproximatelyInput } | { error: string } {
  if (displayText.trim().length === 0) {
    return { error: "Display text cannot be blank." };
  }
  if (earliest == null) {
    return { error: "Earliest date must be selected." };
  }
  if (latest == null) {
    return { error: "Latest date must be selected." };
  }

  return { value: { displayText, earliest, latest } };
}

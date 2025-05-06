import React, { useEffect, useState } from "react";
import { EndsExactlyInput } from "@/shared/types/alert-processing/disruption-period-input";
import { Column } from "@/components/core/Column";
import { Text } from "@/components/core/Text";
import { DateInput } from "@/components/common/DateInput";

export type EndsExactlyEditorProps = {
  initialValue: EndsExactlyInput | null;
  onChange: (value: EndsExactlyInput | null) => void;
};

export function EndsExactlyEditor(props: EndsExactlyEditorProps) {
  const [date, setDate] = useState(props.initialValue?.date ?? null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const parsed = parse(date);
    props.onChange("value" in parsed ? parsed.value : null);
    setError("error" in parsed ? parsed.error : null);
  }, [props, date]);

  return (
    <Column className="gap-4">
      <Text>At:</Text>
      <DateInput value={date} onChange={setDate} />
      {error != null && <Text style="small-red">{error}</Text>}
    </Column>
  );
}

function parse(
  date: Date | null,
): { value: EndsExactlyInput } | { error: string } {
  if (date == null) {
    return { error: "Date must be selected." };
  }

  return { value: { date } };
}

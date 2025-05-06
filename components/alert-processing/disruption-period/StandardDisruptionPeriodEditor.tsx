import React, { useEffect, useState } from "react";
import {
  EndsInput,
  StandardDisruptionPeriodInput,
} from "@/shared/types/alert-processing/disruption-period-input";
import { Column } from "@/components/core/Column";
import { Text } from "@/components/core/Text";
import { DateInput } from "@/components/common/DateInput";
import { EndsEditor } from "@/components/alert-processing/disruption-period/EndsEditor";

export type StandardDisruptionPeriodEditorProps = {
  initialValue: StandardDisruptionPeriodInput | null;
  onChange: (value: StandardDisruptionPeriodInput | null) => void;
};

export function StandardDisruptionPeriodEditor(
  props: StandardDisruptionPeriodEditorProps,
) {
  const [start, setStart] = useState(props.initialValue?.start ?? null);
  const [end, setEnd] = useState(props.initialValue?.end ?? null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const parsed = parse(start, end);
    props.onChange("value" in parsed ? parsed.value : null);
    setError("error" in parsed ? parsed.error : null);
  }, [props, start, end]);

  return (
    <Column>
      <DateInput value={start} onChange={setStart} />
      <EndsEditor initialValue={end} onChange={setEnd} />
      {error != null && <Text style="small-red">{error}</Text>}
    </Column>
  );
}

function parse(
  start: Date | null,
  end: EndsInput | null,
): { value: StandardDisruptionPeriodInput } | { error: string | null } {
  if (start == null) {
    return { error: "Start date must be selected." };
  }
  if (end == null) {
    return { error: null };
  }

  return { value: { start, end } };
}

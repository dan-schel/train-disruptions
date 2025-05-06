import React, { useEffect, useState } from "react";
import {
  EndsInput,
  EveningsOnlyDisruptionPeriodInput,
} from "@/shared/types/alert-processing/disruption-period-input";
import { Column } from "@/components/core/Column";
import { Text } from "@/components/core/Text";
import { DateInput } from "@/components/common/DateInput";
import { EndsEditor } from "@/components/alert-processing/disruption-period/EndsEditor";
import { Input } from "@/components/core/Input";
import { parseIntNull } from "@dan-schel/js-utils";

export type EveningsOnlyDisruptionPeriodEditorProps = {
  initialValue: EveningsOnlyDisruptionPeriodInput | null;
  onChange: (value: EveningsOnlyDisruptionPeriodInput | null) => void;
};

export function EveningsOnlyDisruptionPeriodEditor(
  props: EveningsOnlyDisruptionPeriodEditorProps,
) {
  const [start, setStart] = useState(props.initialValue?.start ?? null);
  const [end, setEnd] = useState(props.initialValue?.end ?? null);
  const [startHourEachDay, setStartHourEachDay] = useState(
    props.initialValue?.startHourEachDay.toFixed() ?? "",
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const parsed = parse(start, end, startHourEachDay);
    props.onChange("value" in parsed ? parsed.value : null);
    setError("error" in parsed ? parsed.error : null);
  }, [props, start, end, startHourEachDay]);

  return (
    <Column>
      <DateInput value={start} onChange={setStart} />
      <EndsEditor initialValue={end} onChange={setEnd} />
      <Input value={startHourEachDay} onChange={setStartHourEachDay} />
      {error != null && <Text>{error}</Text>}
    </Column>
  );
}

function parse(
  start: Date | null,
  end: EndsInput | null,
  startHourEachDayStr: string,
): { value: EveningsOnlyDisruptionPeriodInput } | { error: string | null } {
  if (start == null) {
    return { error: "Start date must be selected." };
  }
  if (end == null) {
    return { error: null };
  }

  const startHourEachDay = parseIntNull(startHourEachDayStr);
  if (
    startHourEachDay == null ||
    startHourEachDay < 18 ||
    startHourEachDay >= 24
  ) {
    return { error: "Start hour each day must be an integer from 18 to 23." };
  }

  return { value: { start, end, startHourEachDay } };
}

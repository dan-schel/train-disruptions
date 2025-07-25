import React from "react";

import { Column } from "@/components/core/Column";
import { Text } from "@/components/core/Text";
import { DateInput } from "@/components/common/DateInput";

type PeriodFilterProps = {
  start: Date | null;
  end: Date | null;
  onChange: (field: "start" | "end", date: Date | null) => void;
};

export function PeriodFilter(props: PeriodFilterProps) {
  const { start, onChange, end } = props;

  return (
    <Column className="gap-4">
      <Text style="subtitle">Period</Text>

      <div className="grid gap-3 sm:grid-cols-2">
        <Column className="gap-2">
          <Text style="small">Start</Text>
          <DateInput value={start} onChange={(v) => onChange("start", v)} />
        </Column>
        <Column className="gap-2">
          <Text style="small">End</Text>
          <DateInput value={end} onChange={(v) => onChange("end", v)} />
        </Column>
      </div>
    </Column>
  );
}

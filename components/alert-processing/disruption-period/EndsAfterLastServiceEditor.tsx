import React, { useEffect, useState } from "react";
import { EndsAfterLastServiceInput } from "@/shared/types/alert-processing/disruption-period-input";
import { Row } from "@/components/core/Row";
import { Input } from "@/components/core/Input";
import { parseIntNull } from "@dan-schel/js-utils";
import { getDaysInMonth } from "date-fns";
import { Column } from "@/components/core/Column";
import { Text } from "@/components/core/Text";

export type EndsAfterLastServiceEditorProps = {
  initialValue: EndsAfterLastServiceInput | null;
  onChange: (value: EndsAfterLastServiceInput | null) => void;
};

export function EndsAfterLastServiceEditor(
  props: EndsAfterLastServiceEditorProps,
) {
  const [year, setYear] = useState(props.initialValue?.year.toFixed() ?? "");
  const [month, setMonth] = useState(props.initialValue?.month.toFixed() ?? "");
  const [day, setDay] = useState(props.initialValue?.day.toFixed() ?? "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const parsed = parse(year, month, day);
    props.onChange("value" in parsed ? parsed.value : null);
    setError("error" in parsed ? parsed.error : null);
  }, [props, year, month, day]);

  return (
    <Column className="gap-2">
      <Text>On:</Text>
      <Row className="gap-2">
        <Input value={year} onChange={setYear} />
        <Input value={month} onChange={setMonth} />
        <Input value={day} onChange={setDay} />
      </Row>
      {error != null && <Text style="small-red">{error}</Text>}
    </Column>
  );
}

function parse(
  yearStr: string,
  monthStr: string,
  dayStr: string,
): { value: EndsAfterLastServiceInput } | { error: string } {
  const year = parseIntNull(yearStr);
  if (year == null || year <= 0 || year >= 3000) {
    return { error: "Year must be an integer from 1 to 2999." };
  }

  const month = parseIntNull(monthStr);
  if (month == null || month <= 0 || month >= 13) {
    return { error: "Month must be an integer from 1 to 12." };
  }

  const day = parseIntNull(dayStr);
  const daysThisMonth = getDaysInMonth(new Date(year, month - 1, 1));
  if (day == null || day <= 0 || day > daysThisMonth) {
    return { error: `Day must be an integer from 1 to ${daysThisMonth}.` };
  }

  return { value: { year, month, day } };
}

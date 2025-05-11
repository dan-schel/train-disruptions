import React, { useEffect, useState } from "react";
import { Column } from "@/components/core/Column";
import { Text } from "@/components/core/Text";
import { RadioButton } from "@/components/common/RadioButton";
import { uuid } from "@dan-schel/js-utils";
import {
  DisruptionPeriodInput,
  EveningsOnlyDisruptionPeriodInput,
  StandardDisruptionPeriodInput,
} from "@/shared/types/alert-processing/disruption-period-input";
import { StandardDisruptionPeriodEditor } from "@/components/alert-processing/disruption-period/StandardDisruptionPeriodEditor";
import { EveningsOnlyDisruptionPeriodEditor } from "@/components/alert-processing/disruption-period/EveningsOnlyDisruptionPeriodEditor";

export type DisruptionPeriodEditorProps = {
  initialValue: DisruptionPeriodInput | null;
  onChange: (value: DisruptionPeriodInput | null) => void;
};

const periodTypes: DisruptionPeriodInput["type"][] = [
  "standard",
  "evenings-only",
];

const formattedDisruptionPeriodTypes: Record<
  DisruptionPeriodInput["type"],
  string
> = {
  standard: "Continuously",
  "evenings-only": "During the evenings only",
};

export function DisruptionPeriodEditor(props: DisruptionPeriodEditorProps) {
  const [group] = useState(uuid());
  const [type, setType] = useState(props.initialValue?.type ?? null);
  const [error, setError] = useState<string | null>(null);

  const [standard, setStandard] =
    useState<StandardDisruptionPeriodInput | null>(
      props.initialValue?.type === "standard" ? props.initialValue : null,
    );

  const [eveningsOnly, setEveningsOnly] =
    useState<EveningsOnlyDisruptionPeriodInput | null>(
      props.initialValue?.type === "evenings-only" ? props.initialValue : null,
    );

  useEffect(() => {
    const parsed = parse(type, standard, eveningsOnly);
    props.onChange("value" in parsed ? parsed.value : null);
    setError("error" in parsed ? parsed.error : null);
  }, [props, type, standard, eveningsOnly]);

  return (
    <Column className="gap-8">
      <Column className="gap-4">
        <Text>Disruption occurs:</Text>
        {periodTypes.map((x) => (
          <RadioButton
            key={x}
            group={group}
            checked={type === x}
            onChange={() => setType(x)}
          >
            <Text>{formattedDisruptionPeriodTypes[x]}</Text>
          </RadioButton>
        ))}
      </Column>
      {type === "standard" && (
        <StandardDisruptionPeriodEditor
          initialValue={standard}
          onChange={setStandard}
        />
      )}
      {type === "evenings-only" && (
        <EveningsOnlyDisruptionPeriodEditor
          initialValue={eveningsOnly}
          onChange={setEveningsOnly}
        />
      )}
      {error != null && <Text style="small-red">{error}</Text>}
    </Column>
  );
}

// TODO: [DS] Remove this comment.
// No need for { value } | { error } as this component doesn't need to display
// errors. There is no state of error this component can be in, except when a
// child component is in error. As the child component displays it's own errors,
// this component doesn't need to. Maybe this changes if we don't select a type
// by default.
function parse(
  type: DisruptionPeriodInput["type"] | null,
  standard: StandardDisruptionPeriodInput | null,
  eveningsOnly: EveningsOnlyDisruptionPeriodInput | null,
): { value: DisruptionPeriodInput } | { error: string | null } {
  if (type === "standard") {
    if (standard == null) return { error: null };
    return { value: { type, ...standard } };
  } else if (type === "evenings-only") {
    if (eveningsOnly == null) return { error: null };
    return { value: { type, ...eveningsOnly } };
  } else {
    return { error: "Choose an option." };
  }
}

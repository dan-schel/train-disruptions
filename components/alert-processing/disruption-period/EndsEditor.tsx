import React, { useEffect, useState } from "react";
import {
  EndsAfterLastServiceInput,
  EndsApproximatelyInput,
  EndsExactlyInput,
  EndsInput,
} from "@/shared/types/alert-processing/disruption-period-input";
import { Column } from "@/components/core/Column";
import { Text } from "@/components/core/Text";
import { RadioButton } from "@/components/common/RadioButton";
import { uuid } from "@dan-schel/js-utils";
import { EndsAfterLastServiceEditor } from "@/components/alert-processing/disruption-period/EndsAfterLastServiceEditor";
import { EndsApproximatelyEditor } from "@/components/alert-processing/disruption-period/EndsApproximatelyEditor";
import { EndsExactlyEditor } from "@/components/alert-processing/disruption-period/EndsExactlyEditor";

export type EndsEditorProps = {
  initialValue: EndsInput | null;
  onChange: (value: EndsInput | null) => void;
};

const endsTypes: EndsInput["type"][] = [
  "ends-exactly",
  "ends-after-last-service",
  "ends-approximately",
  "ends-never",
  "ends-when-alert-ends",
];

const formattedEndsTypes: Record<EndsInput["type"], string> = {
  "ends-after-last-service": "After last service",
  "ends-approximately": "Approximately",
  "ends-exactly": "Exactly",
  "ends-never": "Never (unknown)",
  "ends-when-alert-ends": "When alert ends (automatic)",
};

export function EndsEditor(props: EndsEditorProps) {
  const [group] = useState(uuid());
  const [type, setType] = useState<EndsInput["type"]>(
    props.initialValue?.type ?? "ends-exactly",
  );

  const [afterLastService, setAfterLastService] =
    useState<EndsAfterLastServiceInput | null>(
      props.initialValue?.type === "ends-after-last-service"
        ? props.initialValue
        : null,
    );

  const [approximately, setApproximately] =
    useState<EndsApproximatelyInput | null>(
      props.initialValue?.type === "ends-approximately"
        ? props.initialValue
        : null,
    );

  const [exactly, setExactly] = useState<EndsExactlyInput | null>(
    props.initialValue?.type === "ends-exactly" ? props.initialValue : null,
  );

  useEffect(() => {
    const parsed = parse(type, afterLastService, approximately, exactly);
    props.onChange(parsed);
  }, [props, type, afterLastService, approximately, exactly]);

  return (
    <Column className="gap-4">
      {endsTypes.map((x) => (
        <RadioButton
          key={x}
          group={group}
          checked={type === x}
          onChange={() => setType(x)}
        >
          <Text>{formattedEndsTypes[x]}</Text>
        </RadioButton>
      ))}
      {type === "ends-after-last-service" && (
        <EndsAfterLastServiceEditor
          initialValue={afterLastService}
          onChange={setAfterLastService}
        />
      )}
      {type === "ends-approximately" && (
        <EndsApproximatelyEditor
          initialValue={approximately}
          onChange={setApproximately}
        />
      )}
      {type === "ends-exactly" && (
        <EndsExactlyEditor initialValue={exactly} onChange={setExactly} />
      )}
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
  type: EndsInput["type"],
  afterLastService: EndsAfterLastServiceInput | null,
  approximately: EndsApproximatelyInput | null,
  exactly: EndsExactlyInput | null,
): EndsInput | null {
  if (type === "ends-after-last-service") {
    if (afterLastService == null) return null;
    return { type, ...afterLastService };
  } else if (type === "ends-approximately") {
    if (approximately == null) return null;
    return { type, ...approximately };
  } else if (type === "ends-exactly") {
    if (exactly == null) return null;
    return { type, ...exactly };
  } else {
    return { type };
  }
}

import React from "react";

import { RadioButton } from "@/components/common/RadioButton";
import { Row } from "@/components/core/Row";
import { Text } from "@/components/core/Text";
import { Column } from "@/components/core/Column";

export const ValidityOptions = ["all", "valid", "invalid"] as const;

interface ValidityFilterProps {
  checked: (typeof ValidityOptions)[number];
  setChecked: (option: (typeof ValidityOptions)[number]) => void;
}

export function ValidityFilter({ checked, setChecked }: ValidityFilterProps) {
  return (
    <Column className="w-full gap-4" wrap>
      <Text style="subtitle">Validity</Text>

      <Row className="gap-4">
        {ValidityOptions.map((option) => (
          <RadioButton
            key={option}
            group="validity-filter"
            checked={option === checked}
            onChange={() => setChecked(option)}
          >
            <Text style="small">{option}</Text>
          </RadioButton>
        ))}
      </Row>
    </Column>
  );
}

import React from "react";

import { With } from "@/components/core/With";
import { Text } from "@/components/core/Text";

export function DaysOfTheWeek() {
  return ["M", "T", "W", "T", "F", "S", "S"].map((x, i) => (
    <With gridColumn={i + 1} key={i}>
      <Text style="small" align="center">
        {x}
      </Text>
    </With>
  ));
}

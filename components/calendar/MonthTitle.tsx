import React from "react";

import { format } from "date-fns";
import { Text } from "@/components/core/Text";

type MonthTitleProps = {
  year: number;
  month: number;
};

export function MonthTitle({ year, month }: MonthTitleProps) {
  return (
    <Text align="center" style="custom" className="text-sm md:text-base">
      {format(new Date(year, month - 1, 1), "MMMM yyyy")}
    </Text>
  );
}

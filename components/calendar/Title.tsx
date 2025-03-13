import React from "react";
import { format } from "date-fns";

import { Text } from "@/components/core/Text";

type Props = {
  date: Date;
};

export const MonthTitle = ({ date }: Props) => {
  return (
    <Text align="center" style="custom" className="text-sm md:text-base">
      {format(date, "MMMM yyyy")}
    </Text>
  );
};

import React from "react";

import { Text } from "../../../components/core/Text";
import { Column } from "../../../components/core/Column";

export function NotFound() {
  return (
    <Column align="center" justify="center" className="h-full gap-4">
      <Text style="custom" align="center" className="md:text-2xl">
        {
          "It looks like the train left without you because we couldn't find the disruption you were looking for."
        }
      </Text>
    </Column>
  );
}

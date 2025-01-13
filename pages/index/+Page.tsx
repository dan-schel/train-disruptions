import React from "react";
import { Column } from "../../components/core/Column";
import { Text } from "../../components/core/Text";
import { PtvMap } from "../../components/ptv-map/PtvMap";

export default function Page() {
  return (
    <Column className="gap-4 p-16" align="center">
      <Text style="title">Is It Buses?</Text>
      <Text style="custom" className="font-bold text-orange-700">
        Maybe.
      </Text>
      <PtvMap amplification={0} />
    </Column>
  );
}

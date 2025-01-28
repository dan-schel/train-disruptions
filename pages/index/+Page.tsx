import React from "react";

import { Text } from "../../components/core/Text";
import { Spacer } from "../../components/core/Spacer";
import { Column } from "../../components/core/Column";
import { SimpleButton } from "../../components/common/SimpleButton";

export default function Page() {
  return (
    <Column className="gap-4 p-16" align="center">
      <Text style="title">Is It Buses?</Text>
      <Text style="custom" className="font-bold text-orange-700">
        Maybe.
      </Text>
      <Spacer h="96" />
      <SimpleButton href="/disruption/1" text="View a disruption" />
      <SimpleButton href="/line/17" text="Sunbury line" />
    </Column>
  );
}

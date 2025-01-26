import React from "react";

import { Text } from "../../components/core/Text";
import { With } from "../../components/core/With";
import { Button } from "../../components/core/Button";
import { Spacer } from "../../components/core/Spacer";
import { Column } from "../../components/core/Column";

export default function Page() {
  return (
    <Column className="gap-4 p-16" align="center">
      <Text style="title">Is It Buses?</Text>
      <Text style="custom" className="font-bold text-orange-700">
        Maybe.
      </Text>
      <Spacer h="96" />
      <Button href="/disruption/1">
        <With className="border border-black p-4">
          <Text>View A Disruption</Text>
        </With>
      </Button>
      <Button href="/line/17">
        <With className="border border-black p-4">
          <Text>Sunbury Line</Text>
        </With>
      </Button>
    </Column>
  );
}

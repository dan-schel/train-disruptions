import React from "react";

import { Text } from "../../components/core/Text";
import { With } from "../../components/core/With";
import { Button } from "../../components/core/Button";
import { Column } from "../../components/core/Column";
import { Map } from "../../components/map/Map";
import { PageCenterer } from "../../components/common/PageCenterer";

export default function Page() {
  return (
    <PageCenterer>
      <Column className="gap-8 px-4 py-8">
        <Column className="gap-4" align="center">
          <Text style="title">Is It Buses?</Text>
          <Text style="custom" className="font-bold text-orange-700">
            Maybe.
          </Text>
        </Column>
        <Map />
        <Column className="gap-4" align="center">
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
      </Column>
    </PageCenterer>
  );
}

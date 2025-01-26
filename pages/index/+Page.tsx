import React from "react";
import { Column } from "../../components/core/Column";
import { Text } from "../../components/core/Text";
import { Map } from "../../components/map/Map";
import { PageCenterer } from "../../components/common/PageCenterer";
import { Spacer } from "../../components/core/Spacer";

export default function Page() {
  return (
    <PageCenterer>
      <Column className="px-4 py-8">
        <Text style="title" align="center">
          Is It Buses?
        </Text>
        <Spacer h="4" />
        <Text
          style="custom"
          align="center"
          className="font-bold text-orange-700"
        >
          Maybe.
        </Text>
        <Spacer h="8" />
        <Map />
      </Column>
    </PageCenterer>
  );
}

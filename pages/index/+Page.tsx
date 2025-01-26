import React from "react";
import { Column } from "../../components/core/Column";
import { Text } from "../../components/core/Text";
import { Map } from "../../components/map/Map";
import { PageCenterer } from "../../components/common/PageCenterer";

export default function Page() {
  return (
    <PageCenterer>
      <Column className="gap-4 px-4 py-8">
        <Text style="title">Is It Buses?</Text>
        <Text style="custom" className="font-bold text-orange-700">
          Maybe.
        </Text>
        <Map />
      </Column>
    </PageCenterer>
  );
}

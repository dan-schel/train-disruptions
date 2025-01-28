import React from "react";

import { Text } from "../../components/core/Text";
import { Column } from "../../components/core/Column";
import { PageCenterer } from "../../components/common/PageCenterer";
import { SimpleButton } from "../../components/common/SimpleButton";

export default function Page() {
  return (
    <PageCenterer>
      <Column className="gap-4 p-4" align="left">
        <Text>Commute</Text>
        <SimpleButton href="/trip" text="Click here to go to Trips" />
      </Column>
    </PageCenterer>
  );
}

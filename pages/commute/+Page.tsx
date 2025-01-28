import React from "react";

import { Text } from "../../components/core/Text";
import { Column } from "../../components/core/Column";
import { PageCenterer } from "../../components/common/PageCenterer";
import { SimpleButton } from "../../components/common/SimpleButton";
import { PagePadding } from "../../components/common/PagePadding";

export default function Page() {
  return (
    <PageCenterer>
      <PagePadding>
        <Column className="gap-4" align="left">
          <Text style="title">Commute</Text>
          <SimpleButton href="/trip" text="Click here to go to Trips" />
        </Column>
      </PagePadding>
    </PageCenterer>
  );
}

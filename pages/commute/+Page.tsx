import React from "react";

import { Text } from "../../components/core/Text";
import { With } from "../../components/core/With";
import { Button } from "../../components/core/Button";
import { Column } from "../../components/core/Column";
import { PageCenterer } from "../../components/common/PageCenterer";

export default function Page() {
  return (
    <PageCenterer>
      <Column className="gap-4 p-4">
        <Text>Commute</Text>

        <Button href="/trip">
          <With className="border border-black p-4">
            <Text>Click here to go to Trips</Text>
          </With>
        </Button>
      </Column>
    </PageCenterer>
  );
}

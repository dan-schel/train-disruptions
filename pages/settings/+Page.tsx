import React from "react";

import { Text } from "../../components/core/Text";
import { Column } from "../../components/core/Column";
import { PageCenterer } from "../../components/common/PageCenterer";

export default function Page() {
  return (
    <PageCenterer>
      <Column className="p-4">
        <Text>Settings</Text>
      </Column>
    </PageCenterer>
  );
}

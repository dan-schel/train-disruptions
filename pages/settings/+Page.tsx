import React from "react";

import { Text } from "@/components/core/Text";
import { Column } from "@/components/core/Column";
import { PageCenterer } from "@/components/common/PageCenterer";
import { PagePadding } from "@/components/common/PagePadding";

export default function Page() {
  return (
    <PageCenterer>
      <PagePadding>
        <Column>
          <Text style="title">Settings</Text>
        </Column>
      </PagePadding>
    </PageCenterer>
  );
}

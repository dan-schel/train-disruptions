import React from "react";
import { Text } from "../../components/core/Text";
import { Column } from "../../components/core/Column";
import { SimpleButton } from "../../components/common/SimpleButton";
import { PagePadding } from "../../components/common/PagePadding";
import { PageCenterer } from "../../components/common/PageCenterer";
import { Map } from "../../components/map/Map";
import { With } from "../../components/core/With";
import { Spacer } from "../../components/core/Spacer";

export default function Page() {
  return (
    <PageCenterer>
      <PagePadding>
        <Column>
          <Text style="title">Is it buses?</Text>
          <Spacer h="4" />
          <Text>Maybe. 🤷</Text>
          <Spacer h="8" />
          <With className="rounded-md border border-slate-200">
            <Map />
          </With>
          <Spacer h="4" />
          <Column className="gap-4" align="left">
            <SimpleButton href="/disruption/1" text="View a disruption" />
            <SimpleButton href="/line/17" text="Sunbury line" />
          </Column>
        </Column>
      </PagePadding>
    </PageCenterer>
  );
}

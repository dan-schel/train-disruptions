import React from "react";
import { useData } from "vike-react/useData";

import { Data } from "./+data";

import { Map } from "../../components/map/Map";
import { With } from "../../components/core/With";
import { Text } from "../../components/core/Text";
import { Column } from "../../components/core/Column";
import { Spacer } from "../../components/core/Spacer";
import { LineButton } from "../../components/common/LineButton";
import { PagePadding } from "../../components/common/PagePadding";
import { PageCenterer } from "../../components/common/PageCenterer";
import { SimpleButton } from "../../components/common/SimpleButton";

export default function Page() {
  const { suburban, regional } = useData<Data>();

  return (
    <PageCenterer>
      <PagePadding>
        <Column>
          <Text style="title">Is it buses?</Text>
          <Spacer h="4" />
          <Text>Melbourne&apos;s train disruptions, visualised</Text>
          <Spacer h="8" />
          <With className="rounded-md border border-slate-200">
            <Map />
          </With>
          <Spacer h="8" />
          <Column className="gap-4" align="left">
            <SimpleButton href="/disruption/1" text="View a disruption" />
          </Column>
          <Spacer h="8" />

          <Column className="gap-2">
            <Text style="custom" className="text-lg font-bold">
              Suburban lines
            </Text>
            <Column className="divide-y-1 divide-slate-200">
              {suburban.map((line) => (
                <LineButton key={line.id} line={line} />
              ))}
            </Column>
          </Column>
          <Spacer h="4" />
          <Column className="gap-2">
            <Text style="custom" className="text-lg font-bold">
              Regional lines
            </Text>
            <Column className="divide-y-1 divide-slate-200">
              {regional.map((line) => (
                <LineButton key={line.id} line={line} />
              ))}
            </Column>
          </Column>
        </Column>
      </PagePadding>
    </PageCenterer>
  );
}

import React from "react";
import { useData } from "vike-react/useData";

import { Data } from "@/pages/index/+data";

import { Lines } from "@/pages/index/Lines";
import { Map } from "@/components/map/Map";
import { Row } from "@/components/core/Row";
import { With } from "@/components/core/With";
import { Text } from "@/components/core/Text";
import { Column } from "@/components/core/Column";
import { Spacer } from "@/components/core/Spacer";
import { PagePadding } from "@/components/common/PagePadding";
import { PageCenterer } from "@/components/common/PageCenterer";
import { DisruptionButton } from "@/pages/index/DisruptionButton";

export default function Page() {
  const { disruptions, suburban, regional } = useData<Data>();

  return (
    <PageCenterer>
      <PagePadding>
        <Column>
          <Text style="megatitle">Is it buses?</Text>
          <Spacer h="4" />

          <Text>Melbourne&apos;s train disruptions, visualised</Text>
          <Spacer h="8" />

          {/* TODO: determine the options for both selects */}
          <Row align="center" className="max-w-md gap-1.5" wrap>
            <Row align="center" className="flex-grow gap-1.5">
              <Text>Show</Text>
              <select className="border-soft-border flex-grow rounded border">
                <option value={"all"}>all disruptions</option>
              </select>
            </Row>
            <Row align="center" className="flex-grow gap-1.5">
              <Text>occurring</Text>
              <select className="border-soft-border flex-grow rounded border">
                <option value={"now"}>right now</option>
              </select>
            </Row>
          </Row>
          <Spacer h="4" />

          <With className="border-soft-border rounded-md border">
            <Map />
          </With>
          <Spacer h="2" />

          <Column className="divide-soft-border divide-y-1">
            {disruptions.map((x) => (
              <DisruptionButton key={x.id} data={x} />
            ))}
          </Column>
          <Spacer h="8" />

          <div className="grid gap-8 md:grid-cols-2">
            <Lines title="Suburban lines" lines={suburban} />
            <Lines title="Regional lines" lines={regional} />
          </div>
        </Column>
      </PagePadding>
    </PageCenterer>
  );
}

import React from "react";
import { useData } from "vike-react/useData";

import { Data } from "@/pages/index/+data";

import { Lines } from "@/pages/index/Lines";
import { Disruptions } from "@/pages/index/Disruptions";
import { Map } from "@/components/map/Map";
import { Row } from "@/components/core/Row";
import { With } from "@/components/core/With";
import { Text } from "@/components/core/Text";
import { Column } from "@/components/core/Column";
import { Spacer } from "@/components/core/Spacer";
import { PagePadding } from "@/components/common/PagePadding";
import { PageCenterer } from "@/components/common/PageCenterer";

export default function Page() {
  const { suburban, regional } = useData<Data>();

  return (
    <PageCenterer>
      <PagePadding>
        <Column>
          <Text style="title">Is it buses?</Text>
          <Spacer h="4" />

          <Text>Melbourne&apos;s train disruptions, visualised</Text>
          <Spacer h="6" />

          {/* TODO: determine the options for both selects */}
          <Row align="center" className="max-w-md gap-1.5" wrap>
            <Row align="center" className="flex-grow gap-1.5">
              <Text>Show</Text>
              <select className="flex-grow rounded border border-black">
                <option value={"all"}>all disruptions</option>
              </select>
            </Row>
            <Row align="center" className="flex-grow gap-1.5">
              <Text>occurring</Text>
              <select className="flex-grow rounded border border-black">
                <option value={"now"}>right now</option>
              </select>
            </Row>
          </Row>
          <Spacer h="4" />

          <With className="rounded-md border border-slate-200">
            <Map />
          </With>
          <Spacer h="4" />

          <Disruptions />
          <Spacer h="4" />

          <Lines title="Suburban lines" lines={suburban} />
          <Spacer h="4" />
          <Lines title="Regional lines" lines={regional} />
        </Column>
      </PagePadding>
    </PageCenterer>
  );
}

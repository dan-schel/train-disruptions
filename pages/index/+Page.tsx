import React from "react";
import { useData } from "vike-react/useData";
import { Data } from "@/pages/index/+data";

import { Lines } from "@/pages/index/Lines";
import { Map } from "@/components/map/Map";
import { Row } from "@/components/core/Row";
import { Column } from "@/components/core/Column";
import { Spacer } from "@/components/core/Spacer";
import { PagePadding } from "@/components/common/PagePadding";
import { PageCenterer } from "@/components/common/PageCenterer";
import { DisruptionButton } from "@/components/disruptions/DisruptionButton";
import { Select } from "@/components/common/Select";
import { Hero } from "@/components/overview/Hero";
import { SimpleButton } from "@/components/common/SimpleButton";
import { MingcuteSettings7Line } from "@/components/icons/MingcuteSettings7Line";
import { Divider } from "@/components/common/Divider";

export default function Page() {
  const { disruptions, suburban, regional, mapHighlighting, occuring } =
    useData<Data>();

  return (
    <PageCenterer>
      <PagePadding excludingTop={true}>
        <Column>
          <Hero />
          <Divider />
          <Spacer h="4" />
          <Row justify="space-between" align="center">
            <Select
              value={occuring}
              options={[
                { label: "Right now", value: "now" },
                { label: "Today", value: "today" },
                { label: "Next 7 days", value: "week" },
              ]}
              onChange={(value) => {
                window.location.search = new URLSearchParams({
                  occuring: value,
                }).toString();
              }}
            />
            <SimpleButton
              theme="hover"
              icon={<MingcuteSettings7Line />}
              alt="Settings"
              onClick={() => {}}
            />
          </Row>
          <Spacer h="8" />

          <Map mode="show-disruptions" highlighting={mapHighlighting} />
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

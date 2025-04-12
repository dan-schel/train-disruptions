import React from "react";
import { useData } from "vike-react/useData";

import { Data } from "@/pages/overview/+data";

import { Lines } from "@/pages/overview/Lines";
import { Map, MapMode } from "@/components/map/Map";
import { Row } from "@/components/core/Row";
import { With } from "@/components/core/With";
import { Text } from "@/components/core/Text";
import { Column } from "@/components/core/Column";
import { Spacer } from "@/components/core/Spacer";
import { PagePadding } from "@/components/common/PagePadding";
import { PageCenterer } from "@/components/common/PageCenterer";
import { DisruptionButton } from "@/pages/overview/DisruptionButton";
import { Select } from "@/components/common/Select";

export default function Page() {
  const { disruptions, suburban, regional, mapHighlighting } = useData<Data>();

  const [mapMode, setMapMode] = React.useState<MapMode>("show-disruptions");

  function handleMapModeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    if (event.target.value === "show-disruptions") {
      setMapMode("show-disruptions");
    } else if (event.target.value === "show-lines-running") {
      setMapMode("show-lines-running");
    } else {
      throw new Error(`Unknown map mode: ${event.target.value}`);
    }
  }

  return (
    <PageCenterer>
      <PagePadding>
        <Column>
          <Text style="megatitle">Is it buses?</Text>
          <Spacer h="4" />

          <Text>Melbourne&apos;s train disruptions, visualised</Text>
          <Spacer h="8" />

          <Row align="center" className="max-w-md gap-1.5" wrap>
            <Text>Show</Text>
            <Select<MapMode>
              options={[
                { label: "disruptions occuring", value: "show-disruptions" },
                {
                  label: "train lines running",
                  value: "show-lines-running",
                },
              ]}
              value={mapMode}
              handleChange={handleMapModeChange}
            />
            {/* TODO: Determine/implement time range options. */}
            <Select
              options={[{ label: "right now", value: "now" }]}
              handleChange={() => {}}
            />
          </Row>
          <Spacer h="4" />

          <With className="border-soft-border rounded-md border">
            <Map mode={mapMode} highlighting={mapHighlighting} />
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

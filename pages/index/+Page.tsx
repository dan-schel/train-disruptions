import React from "react";
import { useData } from "vike-react/useData";

import { Data } from "./+data";

import { LineButton } from "./LineButton";
import { Map } from "../../components/map/Map";
import { With } from "../../components/core/With";
import { Text } from "../../components/core/Text";
import { Column } from "../../components/core/Column";
import { Spacer } from "../../components/core/Spacer";
import { PagePadding } from "../../components/common/PagePadding";
import { PageCenterer } from "../../components/common/PageCenterer";
import { SimpleButton } from "../../components/common/SimpleButton";
import { Button } from "../../components/core/Button";
import { Grid } from "../../components/core/Grid";
import { MingcuteRightLine } from "../../components/icons/MingcuteRightLine";
import { MingcuteCloseCircleFill } from "../../components/icons/MingcuteCloseCircleFill";

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
          <Spacer h="2" />
          <Column className="divide-y-1 divide-slate-200">
            <Button href="/disruption/5">
              <Grid
                columns="2rem 1fr 1.5rem"
                align="center"
                className="gap-2 p-2"
              >
                <div className="grid size-8 rounded-full bg-[#16b4e8]" />
                <Column className="gap-1.5">
                  <Text style="custom" className="text-xs">
                    Buses replace trains
                  </Text>
                  <Text>Caulfield to Westall</Text>
                  <Text style="custom" className="text-xs">
                    Until further notice
                  </Text>
                </Column>
                <MingcuteRightLine className="size-full" />
              </Grid>
            </Button>
            <Button href="/disruption/1">
              <Grid
                columns="2rem 1fr 1.5rem"
                align="center"
                className="gap-2 p-2"
              >
                <div className="grid size-8 rounded-full bg-[#6c3b9f]" />
                <Column className="gap-1.5">
                  <Text style="custom" className="text-xs">
                    Major delays
                  </Text>
                  <Text>Sandringham line</Text>
                </Column>
                <MingcuteRightLine className="size-full" />
              </Grid>
            </Button>
            <Button href="/disruption/1">
              <Grid
                columns="2rem 1fr 1.5rem"
                align="center"
                className="gap-2 p-2"
              >
                <MingcuteCloseCircleFill className="size-8" />
                <Column className="gap-1.5">
                  <Text>Glenferrie station closed</Text>
                  <Text style="custom" className="text-xs">
                    Until last train on Sunday
                  </Text>
                </Column>
                <MingcuteRightLine className="size-full" />
              </Grid>
            </Button>
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

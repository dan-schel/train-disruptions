import React from "react";
import { Grid } from "@/components/core/Grid";
import { PeriodFilter } from "@/pages/index/+data";
import { Row } from "@/components/core/Row";
import { Select } from "@/components/common/Select";
import { SimpleButton } from "@/components/common/SimpleButton";
import { MingcuteSettings7Line } from "@/components/icons/MingcuteSettings7Line";
import { MingcuteTimeLine } from "@/components/icons/MingcuteTimeLine";
import { With } from "@/components/core/With";

export type OverviewControlsProps = {
  occuring: PeriodFilter;
};

export function OverviewControls(props: OverviewControlsProps) {
  return (
    <Grid columns="1fr auto" className="bg-soft p-2">
      <Row align="center">
        <With className="h-8 w-8 items-center justify-center text-lg">
          <MingcuteTimeLine />
        </With>
        <Select
          value={props.occuring}
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
      </Row>
      <SimpleButton
        theme="hover"
        icon={<MingcuteSettings7Line />}
        alt="Settings"
        onClick={() => {}}
      />
    </Grid>
  );
}

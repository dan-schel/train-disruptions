import React from "react";

import clsx from "clsx";
import { Row } from "@/components/core/Row";
import { Grid } from "@/components/core/Grid";
import { Text } from "@/components/core/Text";
import { Button } from "@/components/core/Button";
import { MingcuteRightLine } from "@/components/icons/MingcuteRightLine";
import { OverviewPageLineData } from "@/shared/types/overview-page";
import { Marquee } from "@/components/common/Marquee";
import { With } from "@/components/core/With";

type LineButtonProps = {
  line: OverviewPageLineData;
};

const bgClassMapping = {
  green: "bg-status-green",
  yellow: "bg-status-yellow",
  red: "bg-status-red",
} as const;

const textStyleMapping = {
  green: "small-green",
  yellow: "small-yellow",
  red: "small-red",
} as const;

export function LineButton({ line }: LineButtonProps) {
  return (
    <Button href={`/line/${line.id}`}>
      <Grid
        columns="auto 1fr auto"
        align="center"
        className="group-active:bg-soft-active group-hover:bg-soft-hover gap-2 p-1"
      >
        <Row align="center" className="gap-2">
          <div
            className={clsx(
              "size-2 rounded-full",
              bgClassMapping[line.statusColor],
            )}
          />
          <Text oneLine style="small">
            {line.name}
          </Text>
        </Row>
        <With className="justify-self-end">
          <Marquee>
            <Text style={textStyleMapping[line.statusColor]}>
              {line.status}
            </Text>
          </Marquee>
        </With>
        <MingcuteRightLine />
      </Grid>
    </Button>
  );
}

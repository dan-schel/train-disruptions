import React from "react";

import clsx from "clsx";
import { Row } from "@/components/core/Row";
import { Grid } from "@/components/core/Grid";
import { Text } from "@/components/core/Text";
import { Button } from "@/components/core/Button";
import { MingcuteRightLine } from "@/components/icons/MingcuteRightLine";
import {
  OverviewPageLineData,
  OverviewPageLineStatusColor,
} from "@/shared/types/overview-page-line-data";

type LineButtonProps = {
  line: OverviewPageLineData;
};

const bgClassMapping: Record<OverviewPageLineStatusColor, string> = {
  green: "bg-status-clear",
  yellow: "bg-status-delays",
  red: "bg-status-buses",
};

const textClassMapping: Record<OverviewPageLineStatusColor, string> = {
  green: "text-status-clear",
  yellow: "text-status-delays",
  red: "text-status-buses",
};

export function LineButton({ line }: LineButtonProps) {
  return (
    <Button href={`/line/${line.id}`}>
      <Grid
        columns="auto 1fr auto"
        align="center"
        className="group-active:bg-action gap-2 p-1 transition-colors lg:p-2"
      >
        <Row align="center" className="gap-2">
          <div
            className={clsx(
              "size-2 rounded-full",
              bgClassMapping[line.statusColor],
            )}
          />
          <Text oneLine style="custom" className="text-sm lg:text-base">
            {line.name}
          </Text>
        </Row>
        <div className="flex overflow-hidden text-end">
          <span
            className={clsx(
              "marquee text-sm lg:text-base",
              textClassMapping[line.statusColor],
            )}
          >
            {line.status}
          </span>
        </div>
        <MingcuteRightLine />
      </Grid>
    </Button>
  );
}

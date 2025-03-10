import clsx from "clsx";
import React from "react";
import { Line } from "./+data";

import { Row } from "../../components/core/Row";
import { Grid } from "../../components/core/Grid";
import { Text } from "../../components/core/Text";
import { Button } from "../../components/core/Button";
import { MingcuteRightLine } from "../../components/icons/MingcuteRightLine";

type LineButtonProps = {
  line: Line;
  status: "clear" | "delays" | "buses";
};

export function LineButton({ line, status }: LineButtonProps) {
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
              status === "clear" && "bg-status-clear",
              status === "delays" && "bg-status-delays",
              status === "buses" && "bg-status-buses",
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
              status === "clear" && "text-status-clear",
              status === "delays" && "text-status-delays",
              status === "buses" && "text-status-buses",
            )}
          >
            {status === "clear" && "No reported disruption"}
            {status === "delays" && "Major delays"}
            {status === "buses" &&
              "Long message of the two station to test marquee"}
          </span>
        </div>
        <MingcuteRightLine />
      </Grid>
    </Button>
  );
}

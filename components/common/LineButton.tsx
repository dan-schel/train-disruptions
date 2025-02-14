import React from "react";
import { Line } from "../../server/data/line";

import { Row } from "../core/Row";
import { Grid } from "../core/Grid";
import { Text } from "../core/Text";
import { Button } from "../core/Button";
import { MingcuteRightLine } from "../icons/MingcuteRightLine";

// TODO: Pick color for each status

// TODO: Attach disruption status
type LineButtonProps = {
  line: Line;
};

export function LineButton({ line }: LineButtonProps) {
  return (
    <Button href={`/line/${line.id}`}>
      <Grid columns="auto 1fr auto" align="center" className="gap-2 p-1 lg:p-2">
        <Row align="center" className="gap-2">
          <div className="size-2 rounded-full bg-green-500" />
          <Text oneLine style="custom" className="text-sm lg:text-base">
            {line.name}
          </Text>
        </Row>
        <div className="overflow-hidden text-end">
          <span className="marquee text-sm text-green-500 lg:text-base">
            Long message in case the two station names are long
          </span>
        </div>
        <MingcuteRightLine />
      </Grid>
    </Button>
  );
}

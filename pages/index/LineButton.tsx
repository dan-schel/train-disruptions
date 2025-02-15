import React from "react";
import { Line } from "../../server/data/line";

import { Row } from "../../components/core/Row";
import { Grid } from "../../components/core/Grid";
import { Text } from "../../components/core/Text";
import { Button } from "../../components/core/Button";
import { MingcuteRightLine } from "../../components/icons/MingcuteRightLine";

// TODO: Pick color for each status
// oklch(77.48% 0.1544 78.87)
// oklch(61.76% 0.2511 28.06)

// TODO: Attach disruption status
type LineButtonProps = {
  line: Line;
};

export function LineButton({ line }: LineButtonProps) {
  return (
    <Button href={`/line/${line.id}`}>
      <Grid columns="auto 1fr auto" align="center" className="gap-2 p-1 lg:p-2">
        <Row align="center" className="gap-2">
          <div className="size-2 rounded-full bg-[#14d64b]" />
          <Text oneLine style="custom" className="text-sm lg:text-base">
            {line.name}
          </Text>
        </Row>
        <div className="overflow-hidden text-end">
          <span className="marquee text-sm text-[#14d64b] lg:text-base">
            Long message in case the two station names are long
          </span>
        </div>
        <MingcuteRightLine />
      </Grid>
    </Button>
  );
}

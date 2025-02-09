import React from "react";
import { Line } from "../../server/data/line";

import { Button } from "../core/Button";
import { Row } from "../core/Row";
import { Text } from "../core/Text";
import { MingcuteRightLine } from "../icons/MingcuteRightLine";

// TODO: Pick color for each status

// TODO: Attach disruption status
type LineButtonProps = {
  line: Line;
};

export function LineButton({ line }: LineButtonProps) {
  return (
    <Button href={`/line/${line.id}`}>
      <Row align="center" justify="space-between" className="gap-2 p-1 lg:p-2">
        <Row align="center" className="gap-2">
          <div className="size-2 rounded-full bg-green-500" />
          <Text oneLine style="custom" className="text-sm lg:text-base">
            {line.name}
          </Text>
        </Row>
        <Row align="center" className="gap-2">

          {/* TODO: Deal with situation where status text is too long. Marquee text? */}
          <Text
            oneLine
            style="custom"
            className="text-sm text-green-500 lg:text-base"
          >
            No reported disruptions
          </Text>
          <MingcuteRightLine />
        </Row>
      </Row>
    </Button>
  );
}

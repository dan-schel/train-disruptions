import clsx from "clsx";
import React from "react";

import { Row } from "../core/Row";
import { Text } from "../core/Text";

import { disruption } from "./utils";

export const Legends = () => {
  return (
    <Row className="gap-4">
      <div className="flex items-center gap-2">
        <div className={clsx("size-4 lg:size-6", disruption.buses)} />
        <Text oneLine style="custom" className="text-xs lg:text-sm">
          All day
        </Text>
      </div>
      <div className="flex items-center gap-2">
        <div className={clsx("size-4 lg:size-6", disruption.night)} />
        <Text oneLine style="custom" className="text-xs lg:text-sm">
          Evening only
        </Text>
      </div>
      <div className="flex items-center gap-2">
        <div className={clsx("size-4 lg:size-6", disruption.trains)} />
        <Text oneLine style="custom" className="text-xs lg:text-sm">
          Trains
        </Text>
      </div>
    </Row>
  );
};

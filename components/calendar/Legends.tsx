import React from "react";

import clsx from "clsx";
import { Row } from "@/components/core/Row";
import { Text } from "@/components/core/Text";
import { disruption } from "@/components/calendar/utils";

export const Legends = () => {
  return (
    <Row className="gap-4">
      <div className="flex items-center gap-2">
        <div className={clsx("size-4 md:size-6", disruption.buses)} />
        <Text oneLine style="custom" className="text-xs md:text-sm">
          All day
        </Text>
      </div>
      <div className="flex items-center gap-2">
        <div className={clsx("size-4 md:size-6", disruption.night)} />
        <Text oneLine style="custom" className="text-xs md:text-sm">
          Evening only
        </Text>
      </div>
      <div className="flex items-center gap-2">
        <div className={clsx("size-4 md:size-6", disruption.trains)} />
        <Text oneLine style="custom" className="text-xs md:text-sm">
          Trains
        </Text>
      </div>
    </Row>
  );
};

import clsx from "clsx";
import React from "react";

import { Row } from "@/components/core/Row";
import { Text } from "@/components/core/Text";
import { dateBoxStyles } from "@/components/calendar/utils";

export const Legends = () => {
  return (
    <Row className="gap-4">
      <Row className="gap-2" align="center">
        <div className={clsx("size-4", dateBoxStyles["all-day"])}></div>
        <Text style="small">All day</Text>
      </Row>
      <Row className="gap-2" align="center">
        <div className={clsx("size-4", dateBoxStyles["evening-only"])}></div>
        <Text style="small">Evening only</Text>
      </Row>
      <Row className="gap-2" align="center">
        <div className={clsx("size-4", dateBoxStyles["no-disruption"])}></div>
        <Text style="small">Trains</Text>
      </Row>
    </Row>
  );
};

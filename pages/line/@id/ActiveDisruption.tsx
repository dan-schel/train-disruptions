import clsx from "clsx";
import React from "react";
import { LinePageData } from "@/pages/line/@id/+data";

import { Row } from "@/components/core/Row";
import { Link } from "@/components/core/Link";
import { Text } from "@/components/core/Text";
import { Column } from "@/components/core/Column";
import { MingcuteCloseCircleFill } from "@/components/icons/MingcuteCloseCircleFill";

type ActiveDisruptionProps = {
  lineNumber: number;
  disruption: LinePageData;
};

export function ActiveDisruption({
  lineNumber,
  disruption,
}: ActiveDisruptionProps) {
  return (
    <Column className="gap-3 py-2">
      <Row align="center" className={clsx("gap-2", disruption.colour)}>
        <MingcuteCloseCircleFill className="size-10" />
        <Column className="gap-1">
          {disruption.headline && (
            <Text style="custom" className="text-xl">
              {disruption.headline}
            </Text>
          )}
          <Text
            style="custom"
            className={!disruption.headline ? "text-xl" : "text-base"}
          >
            {disruption.subject}
          </Text>
        </Column>
      </Row>

      <Text>{disruption.period}</Text>
      <Link href={`/disruption/${disruption.id}?from=line-${lineNumber}`}>
        <Text>More info</Text>
      </Link>
    </Column>
  );
}

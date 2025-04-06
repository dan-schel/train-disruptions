import React from "react";
import { LinePageData } from "@/pages/line/@id/+data";

import { Link } from "@/components/core/Link";
import { Text } from "@/components/core/Text";
import { Column } from "@/components/core/Column";

type UpcomingDisruptionProps = {
  lineNumber: number;
  disruption: Omit<LinePageData, "colour">;
};

export function UpcomingDisruption({
  lineNumber,
  disruption,
}: UpcomingDisruptionProps) {
  return (
    <Column className="gap-2 py-2">
      <Text>
        {disruption.headline} {disruption.subject}
      </Text>

      <Text style="small">
        {disruption.period}
        {" • "}
        <Link href={`/disruption/${disruption.id}?from=line-${lineNumber}`}>
          More info
        </Link>
      </Text>
    </Column>
  );
}

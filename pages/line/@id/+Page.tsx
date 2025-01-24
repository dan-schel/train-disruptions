import React, { useState } from "react";
import { usePageContext } from "vike-react/usePageContext";

import { Text } from "../../../components/core/Text";
import { Column } from "../../../components/core/Column";

import { Line } from "../../../server/data/line";
import { lines } from "../../../server/data/lines";

/**
 * TODO: Handle scenarios where the provided id doesn't correspond to a line.
 *
 * Options:
 * - Show an error page
 * - Navigate back straight away
 */

export default function Page() {
  const pageContext = usePageContext();
  const [line] = useState<Line | null>(
    lines.get(parseInt(pageContext.routeParams.id)),
  );

  return (
    <Column className="p-4">
      <Text>Is it buses on the {line?.name} line</Text>
    </Column>
  );
}

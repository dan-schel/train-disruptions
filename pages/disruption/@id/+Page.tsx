import React from "react";
import { usePageContext } from "vike-react/usePageContext";

import { Text } from "../../../components/core/Text";
import { Column } from "../../../components/core/Column";
import { PageCenterer } from "../../../components/common/PageCenterer";

/**
 * TODO: Handle scenarios where the provided id doesn't correspond to a disruption.
 *
 * Options:
 * - Show an error page
 * - Navigate back straight away
 */

export default function Page() {
  const pageContext = usePageContext();

  const { id } = pageContext.routeParams;

  return (
    <PageCenterer>
      <Column className="gap-4 p-4">
        <Text>
          DisruptionID: {id} <em>(⬆ ID set in query string)</em>
        </Text>
      </Column>
    </PageCenterer>
  );
}

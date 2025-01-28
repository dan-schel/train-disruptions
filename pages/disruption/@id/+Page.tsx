import React from "react";
import { usePageContext } from "vike-react/usePageContext";

import { Text } from "../../../components/core/Text";
import { Column } from "../../../components/core/Column";
import { PageCenterer } from "../../../components/common/PageCenterer";
import { BackNavigation } from "../../../components/navigation/BackNavigation";
import { PagePadding } from "../../../components/common/PagePadding";

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
    <Column>
      <BackNavigation name="Overview" href="/" />
      <PageCenterer>
        <PagePadding>
          <Column className="gap-4">
            <Text>
              DisruptionID: {id} <em>(⬆ ID set in query string)</em>
            </Text>
          </Column>
        </PagePadding>
      </PageCenterer>
    </Column>
  );
}

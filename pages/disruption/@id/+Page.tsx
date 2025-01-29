import React from "react";
import { usePageContext } from "vike-react/usePageContext";

import { Text } from "../../../components/core/Text";
import { Column } from "../../../components/core/Column";
import { PageCenterer } from "../../../components/common/PageCenterer";
import { Calendar } from "../../../components/calendar/Calendar";

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
      <Column className="gap-4 p-6">
        <Text>
          DisruptionID: {id} <em>(⬆ ID set in query string)</em>
        </Text>

        <Calendar
          disruptions={[
            {
              from: new Date("2025-02-28T18:00:00Z"),
              to: new Date("2025-03-02T16:00:00Z"),
              evenings: false,
            },
          ]}
          glance
        />
      </Column>
    </PageCenterer>
  );
}

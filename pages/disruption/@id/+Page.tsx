import React from "react";
import { format } from "date-fns";

import { Text } from "../../../components/core/Text";
import { Column } from "../../../components/core/Column";
import { PageCenterer } from "../../../components/common/PageCenterer";
import { BackNavigation } from "../../../components/navigation/BackNavigation";
import { PagePadding } from "../../../components/common/PagePadding";
import { Calendar } from "../../../components/calendar/Calendar";

/**
 * TODO: Handle scenarios where the provided id doesn't correspond to a disruption.
 *
 * Options:
 * - Show an error page
 * - Navigate back straight away
 */

export default function Page() {
  const disruption = {
    from: new Date("2025-02-13T09:40:00Z"),
    // A lot of disruptions sourced from PTV mark disruptions as ending at 3am the following day,
    // so we'll need to do some manipulating to make sure the days are correct
    to: new Date("2025-02-18T12:00:00Z"),
    evenings: false,
  };

  return (
    <Column>
      {/* The previous page won't always be the overview. We'll probably need to set a query param, e.g. `?from=overview` or `?from=line-12`. */}
      <BackNavigation name="Overview" href="/" />
      <PageCenterer>
        <PagePadding>
          <Column className="gap-8">
            <Text style="title">
              Buses replace trains from Newport to Footscray
            </Text>
            <Column className="gap-2">
              <Text>Starts {format(disruption.from, "p cccc d MMMM")}</Text>
              <Text>
                Ends last service {format(disruption.to, "cccc d MMMM")}
              </Text>
            </Column>
            <Calendar disruptions={disruption} />
          </Column>
        </PagePadding>
      </PageCenterer>
    </Column>
  );
}

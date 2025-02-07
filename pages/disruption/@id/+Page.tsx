import React from "react";
import { format } from "date-fns";

import { Text } from "../../../components/core/Text";
import { Column } from "../../../components/core/Column";
import { PageCenterer } from "../../../components/common/PageCenterer";
import { BackNavigation } from "../../../components/navigation/BackNavigation";
import { PagePadding } from "../../../components/common/PagePadding";
import { Calendar } from "../../../components/calendar/Calendar";
import { Link } from "../../../components/core/Link";
import { useData } from "vike-react/useData";
import { Data } from "./+data";

/**
 * TODO: Handle scenarios where the provided id doesn't correspond to a disruption.
 *
 * Options:
 * - Show an error page
 * - Navigate back straight away
 */

export default function Page() {
  const { disruption, link, station, backHref } = useData<Data>();

  return (
    <Column>
      {/* The previous page won't always be the overview. We'll probably need to set a query param, e.g. `?from=overview` or `?from=line-12`. */}
      <BackNavigation name="Overview" href={backHref} />
      <PageCenterer>
        <PagePadding>
          <Column className="gap-8">
            <Text style="title">
              {typeof station === "string"
                ? `Buses replace trains at ${station}`
                : `Buses replace trains from ${station.from} to ${station.to}`}
            </Text>
            <Column className="gap-2">
              <Text>Starts {format(disruption.from, "p cccc d MMMM")}</Text>
              <Text>
                Ends last service {format(disruption.to, "cccc d MMMM")}
              </Text>
              <Link href={link} target="_blank">
                More info (ptv.vic.gov.au)
              </Link>
            </Column>

            <Calendar disruptions={disruption} />

            <iframe src={link} className="h-[500px] lg:h-[1000px]" />
          </Column>
        </PagePadding>
      </PageCenterer>
    </Column>
  );
}

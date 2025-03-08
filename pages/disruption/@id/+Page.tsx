import React from "react";
import { Data } from "./+data";
import { useData } from "vike-react/useData";

import { Delay } from "./Delay";
import { NotFound } from "./NotFound";
import { Disruption } from "./Disruption";
import { With } from "../../../components/core/With";
import { Column } from "../../../components/core/Column";
import { PagePadding } from "../../../components/common/PagePadding";
import { PageCenterer } from "../../../components/common/PageCenterer";
import { BackNavigation } from "../../../components/navigation/BackNavigation";

export default function Page() {
  const { data, backHref } = useData<Data>();

  function renderDisruption() {
    switch (data.type) {
      case "delay":
        return <Delay {...data} />;
      case "bus-replacement":
      case "station-closure":
      case "altered-route":
        return <Disruption {...data} />;
      case "not-found":
        return <NotFound />;
    }
  }

  return (
    <Column>
      {/* The previous page won't always be the overview. We'll probably need to set a query param, e.g. `?from=overview` or `?from=line-12`. */}
      <BackNavigation name="Overview" href={backHref} />
      <With className="flex-1">
        <PageCenterer>
          <PagePadding>{renderDisruption()}</PagePadding>
        </PageCenterer>
      </With>
    </Column>
  );
}

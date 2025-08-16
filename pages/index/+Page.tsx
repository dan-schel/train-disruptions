import React from "react";
import { useData } from "vike-react/useData";
import { Data } from "@/pages/index/+data";

import { Column } from "@/components/core/Column";
import { PagePadding } from "@/components/common/PagePadding";
import { PageCenterer } from "@/components/common/PageCenterer";
import { Hero } from "@/components/overview/Hero";
import { Divider } from "@/components/common/Divider";
import { Lines } from "@/components/overview/Lines";
import { MapSection } from "@/components/overview/MapSection";
import { FinePrint } from "@/components/overview/FinePrint";

export default function Page() {
  const { disruptions, suburban, regional, mapHighlighting, occuring } =
    useData<Data>();

  return (
    <PageCenterer>
      <PagePadding excludingTop={true}>
        <Column className="gap-8">
          <Hero className="mt-12 mb-4" />
          <Divider />
          <MapSection
            disruptions={disruptions}
            mapHighlighting={mapHighlighting}
            occuring={occuring}
          />
          <Divider />
          <Lines suburban={suburban} regional={regional} />
          <Divider />
          <FinePrint />
        </Column>
      </PagePadding>
    </PageCenterer>
  );
}

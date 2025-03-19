import React from "react";
import { Data } from "@/pages/disruption/@id/+data";
import { useData } from "vike-react/useData";

import { NotFound } from "@/pages/disruption/@id/NotFound";
import { Disruption } from "@/pages/disruption/@id/Disruption";
import { With } from "@/components/core/With";
import { Column } from "@/components/core/Column";
import { PagePadding } from "@/components/common/PagePadding";
import { PageCenterer } from "@/components/common/PageCenterer";
import { BackNavigation } from "@/components/navigation/BackNavigation";

export default function Page() {
  const { disruption, back } = useData<Data>();

  return (
    <Column>
      <BackNavigation name={back.name} href={back.href} />
      <With className="flex-1">
        <PageCenterer>
          <PagePadding>
            {disruption != null ? (
              <Disruption data={disruption} />
            ) : (
              <NotFound />
            )}
          </PagePadding>
        </PageCenterer>
      </With>
    </Column>
  );
}

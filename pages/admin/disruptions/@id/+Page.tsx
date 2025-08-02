import React from "react";
import { PageCenterer } from "@/components/common/PageCenterer";
import { PagePadding } from "@/components/common/PagePadding";
import { Column } from "@/components/core/Column";
import { BackNavigation } from "@/components/navigation/BackNavigation";
import { Data } from "@/pages/admin/disruptions/@id/+data";
import { Disruption } from "@/pages/admin/disruptions/@id/Disruption";
import { useData } from "vike-react/useData";
import { NotFound } from "@/components/disruptions/NotFound";

export default function Page() {
  const { context, disruption } = useData<Data>();

  return (
    <Column>
      <BackNavigation name="Disruptions" href="/admin/disruptions" />
      <PageCenterer>
        <PagePadding>
          <Column>
            {disruption === null ? (
              <NotFound />
            ) : (
              <Disruption context={context} data={disruption} />
            )}
          </Column>
        </PagePadding>
      </PageCenterer>
    </Column>
  );
}

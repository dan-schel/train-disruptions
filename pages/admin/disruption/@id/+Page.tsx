import React from "react";
import { useData } from "vike-react/useData";
import { Data } from "@/pages/admin/disruption/@id/+data";
import { usePageContext } from "vike-react/usePageContext";

import { Text } from "@/components/core/Text";
import { With } from "@/components/core/With";
import { Column } from "@/components/core/Column";
import { NotFound } from "@/pages/disruption/@id/NotFound";
import { PagePadding } from "@/components/common/PagePadding";
import { AlertButton } from "@/components/alerts/AlertButton";
import { PageCenterer } from "@/components/common/PageCenterer";
import { Disruption } from "@/pages/admin/disruption/@id/Disruption";
import { BackNavigation } from "@/components/navigation/BackNavigation";
import { InvalidDisruption } from "@/pages/admin/disruption/@id/InvalidDisruption";

export default function Page() {
  const { disruption, alert } = useData<Data>();
  const {
    routeParams: { id },
  } = usePageContext();

  return (
    <Column>
      <BackNavigation name={"Disruptions"} href={"/admin/disruption"} />
      <With className="flex-1">
        <PageCenterer>
          <PagePadding>
            <Column>
              {disruption != null ? (
                disruption.type === "valid" ? (
                  <Disruption data={disruption} />
                ) : (
                  <InvalidDisruption data={disruption} />
                )
              ) : (
                <NotFound />
              )}

              {id && alert && (
                <Column className="gap-2 pt-8">
                  <Text style="subtitle">Related Alert</Text>
                  <AlertButton
                    action={`/admin/alerts/${alert.id}?from=${id}`}
                    {...alert}
                  />
                </Column>
              )}
            </Column>
          </PagePadding>
        </PageCenterer>
      </With>
    </Column>
  );
}

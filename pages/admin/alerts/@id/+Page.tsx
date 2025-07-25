import React from "react";
import { Text } from "@/components/core/Text";
import { Column } from "@/components/core/Column";
import { PagePadding } from "@/components/common/PagePadding";
import { PageCenterer } from "@/components/common/PageCenterer";
import { BackNavigation } from "@/components/navigation/BackNavigation";
import { Data } from "@/pages/admin/alerts/@id/+data";
import { useData } from "vike-react/useData";
import { AlertData } from "@/pages/admin/alerts/@id/AlertData";
import { Spacer } from "@/components/core/Spacer";
import { usePageContext } from "vike-react/usePageContext";
import { navigate } from "vike/client/router";
import { DisruptionBuilder } from "@/pages/admin/alerts/@id/DisruptionBuilder";

export default function Page() {
  const { id } = usePageContext().routeParams;
  const { alert } = useData<Data>();

  function handleProcessed() {
    navigate("/admin/alerts");
  }

  return (
    <Column>
      <BackNavigation name="Alerts" href="/admin/alerts" />
      <PageCenterer>
        <PagePadding>
          {alert != null ? (
            <Column className="min-w-0">
              <Text style="megatitle">Process alert</Text>
              <Spacer h="4" />
              <AlertData data={alert.data} />
              <Spacer h="8" />
              <hr className="border-soft-border" />
              <Spacer h="8" />
              <DisruptionBuilder
                id={id}
                context={alert.context}
                onProcessed={handleProcessed}
              />
            </Column>
          ) : (
            <Column className="gap-4">
              <Text style="megatitle">Alert not found</Text>
              <Text>Alert not found</Text>
            </Column>
          )}
        </PagePadding>
      </PageCenterer>
    </Column>
  );
}

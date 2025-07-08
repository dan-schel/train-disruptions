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
import { Questionnaire } from "@/components/question";
import { disruptionDataQuestion } from "@/components/alert-processing/disruption-data/disruption-data-question";
import { DisruptionDataInput } from "@/shared/types/alert-processing/disruption-data-input";
import { SimpleButton } from "@/components/common/SimpleButton";
import { usePageContext } from "vike-react/usePageContext";
import axios from "axios";
import { navigate } from "vike/client/router";
import { With } from "@/components/core/With";

export default function Page() {
  const { id } = usePageContext().routeParams;
  const { alert } = useData<Data>();

  async function handleIgnore() {
    if (alert == null) return;

    try {
      await axios.post(`/api/admin/alert-processing/ignore/${id}`, {
        permanently: false,
      });
      navigate("/admin/alerts");
    } catch {
      window.alert("Failed to ignore alert.");
    }
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
              <Text style="subtitle">Disruption builder</Text>
              <Spacer h="4" />
              <Column className="gap-6">
                <Questionnaire
                  config={disruptionDataQuestion}
                  // eslint-disable-next-line no-console
                  onSubmit={(p: DisruptionDataInput) => console.log(p)}
                />
                <With className="self-start">
                  <SimpleButton onClick={handleIgnore} text="Ignore" />
                </With>
              </Column>
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

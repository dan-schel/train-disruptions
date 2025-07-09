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
import { SimpleButton } from "@/components/common/SimpleButton";
import { usePageContext } from "vike-react/usePageContext";
import axios from "axios";
import { navigate } from "vike/client/router";
import { alertProcessingQuestion } from "@/components/alert-processing/alert-processing-question";
import { AlertProcessingInput } from "@/shared/schemas/alert-processing/alert-processing-input";
import { Row } from "@/components/core/Row";
import { MingcuteCheckLine } from "@/components/icons/MingcuteCheckLine";
import { MingcuteDelete2Line } from "@/components/icons/MingcuteDelete2Line";

export default function Page() {
  const { id } = usePageContext().routeParams;
  const { alert } = useData<Data>();

  const [alertProcessingInput, setAlertProcessingInput] =
    React.useState<AlertProcessingInput | null>(null);

  async function handleProcess() {
    if (alert == null || alertProcessingInput == null) return;

    try {
      await axios.post(`/api/admin/alert-processing/process/${id}`, {
        input: alertProcessingInput,
      });
      navigate("/admin/alerts");
    } catch (err) {
      // TODO: Better UX for these errors.
      console.warn("Failed to process alert.", err);
      window.alert("Failed to process alert.");
    }
  }

  async function handleIgnore() {
    if (alert == null) return;

    try {
      await axios.post(`/api/admin/alert-processing/ignore/${id}`, {
        permanently: false,
      });
      navigate("/admin/alerts");
    } catch (err) {
      // TODO: Better UX for these errors.
      console.warn("Failed to ignore alert.", err);
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
                  config={alertProcessingQuestion}
                  input={alertProcessingInput ?? undefined}
                  onSubmit={setAlertProcessingInput}
                />
                <Row className="gap-2">
                  <SimpleButton
                    onClick={handleIgnore}
                    text="Ignore"
                    icon={<MingcuteDelete2Line />}
                  />
                  {alertProcessingInput != null && (
                    <SimpleButton
                      onClick={handleProcess}
                      text="Process"
                      icon={<MingcuteCheckLine />}
                    />
                  )}
                </Row>
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

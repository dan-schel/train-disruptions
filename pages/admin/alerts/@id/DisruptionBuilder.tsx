import React from "react";
import { alertProcessingQuestion } from "@/components/alert-processing/alert-processing-question";
import { AlertProcessingContextProvider } from "@/components/alert-processing/AlertProcessingContextProvider";
import { SimpleButton } from "@/components/common/SimpleButton";
import { Column } from "@/components/core/Column";
import { Row } from "@/components/core/Row";
import { Spacer } from "@/components/core/Spacer";
import { Text } from "@/components/core/Text";
import { MingcuteCheckLine } from "@/components/icons/MingcuteCheckLine";
import { MingcuteDelete2Line } from "@/components/icons/MingcuteDelete2Line";
import { Questionnaire } from "@/components/question";
import { AlertProcessingContextData } from "@/shared/types/alert-processing-context-data";
import axios from "axios";
import { AlertProcessingInput } from "@/shared/schemas/alert-processing/alert-processing-input";

export type DisruptionBuilderProps = {
  id: string;
  context: AlertProcessingContextData;
  onProcessed: () => void;
};

export function DisruptionBuilder(props: DisruptionBuilderProps) {
  const [alertProcessingInput, setAlertProcessingInput] =
    React.useState<AlertProcessingInput | null>(null);

  async function handleProcess() {
    if (alert == null || alertProcessingInput == null) return;

    try {
      await axios.post(`/api/admin/alert-processing/process/${props.id}`, {
        input: alertProcessingInput,
      });
      props.onProcessed();
    } catch (err) {
      // TODO: Better UX for these errors.
      console.warn("Failed to process alert.", err);
      window.alert("Failed to process alert.");
    }
  }

  async function handleIgnore() {
    if (alert == null) return;

    try {
      await axios.post(`/api/admin/alert-processing/ignore/${props.id}`, {
        permanently: false,
      });
      props.onProcessed();
    } catch (err) {
      // TODO: Better UX for these errors.
      console.warn("Failed to ignore alert.", err);
      window.alert("Failed to ignore alert.");
    }
  }

  return (
    <AlertProcessingContextProvider data={props.context}>
      <Column>
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
    </AlertProcessingContextProvider>
  );
}

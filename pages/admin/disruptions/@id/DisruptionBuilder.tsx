import React from "react";
import { disruptionProcessingQuestion } from "@/components/processing/disruption-processing-question";
import { ProcessingContextProvider } from "@/components/processing/ProcessingContextProvider";
import { SimpleButton } from "@/components/common/SimpleButton";
import { Column } from "@/components/core/Column";
import { Row } from "@/components/core/Row";
import { Spacer } from "@/components/core/Spacer";
import { Text } from "@/components/core/Text";
import { MingcuteCheckLine } from "@/components/icons/MingcuteCheckLine";
import { Questionnaire } from "@/components/question";
import { ProcessingContextData } from "@/shared/types/processing-context-data";
import axios from "axios";
import { DisruptionProcessingInput } from "@/shared/schemas/disruption-processing/disruption-processing-input";
import { MingcuteCloseLine } from "@/components/icons/MingcuteCloseLine";

export type DisruptionBuilderProps = {
  id: string;
  context: ProcessingContextData;
  input: DisruptionProcessingInput | null;
  onCancel: () => void;
  onProcessed: () => void;
};

export function DisruptionBuilder(props: DisruptionBuilderProps) {
  const [disruptionProcessingInput, setDisruptionProcessingInput] =
    React.useState<DisruptionProcessingInput | null>(props.input);

  async function handleProcess() {
    if (alert == null || disruptionProcessingInput == null) return;
    try {
      await axios.put(`/api/admin/disruption/${props.id}`, {
        input: disruptionProcessingInput,
      });
      props.onProcessed();
    } catch (err) {
      // TODO: Better UX for these errors.
      console.warn("Failed to process alert.", err);
      window.alert("Failed to process alert.");
      props.onCancel();
    }
  }

  return (
    <ProcessingContextProvider data={props.context}>
      <Column>
        <Text style="subtitle">Disruption builder</Text>
        <Spacer h="4" />
        <Column className="gap-6">
          <Questionnaire
            config={disruptionProcessingQuestion}
            input={disruptionProcessingInput ?? undefined}
            onSubmit={setDisruptionProcessingInput}
          />
          <Row className="gap-2">
            <SimpleButton
              onClick={props.onCancel}
              text="Cancel"
              icon={<MingcuteCloseLine />}
            />
            {disruptionProcessingInput != null && (
              <SimpleButton
                onClick={handleProcess}
                text="Update"
                icon={<MingcuteCheckLine />}
              />
            )}
          </Row>
        </Column>
      </Column>
    </ProcessingContextProvider>
  );
}

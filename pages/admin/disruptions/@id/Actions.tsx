import React from "react";

import { Row } from "@/components/core/Row";
import { Column } from "@/components/core/Column";
import { SimpleButton } from "@/components/common/SimpleButton";
import { MingcuteDelete2Line } from "@/components/icons/MingcuteDelete2Line";
import { MingcutePencil2Fill } from "@/components/icons/MingcutePencil2Fill";
import { Text } from "@/components/core/Text";
import axios from "axios";
import { navigate } from "vike/client/router";

type ActionsProps = {
  id: string;
};

export function Actions({ id }: ActionsProps) {
  const [currentAction, setCurrentAction] = React.useState<
    "edit" | "delete" | null
  >(null);

  async function handleEdit() {
    if (currentAction !== "edit") {
      setCurrentAction("edit");
    } else {
      // TODO: Update the disruption

      // TODO: On success, reload the page to refetch disruption
      setCurrentAction(null);
    }
  }

  async function handleDelete() {
    if (currentAction !== "delete") {
      setCurrentAction("delete");
    } else {
      try {
        await axios.delete(`/api/admin/disruption/${id}`);
        navigate("/admin/disruptions");
      } catch (err) {
        // TODO: Better UX for these errors.
        console.warn("Failed to delete disruption.", err);
        window.alert("Failed to delete disruption.");
      }
    }
  }

  function handleCancel() {
    setCurrentAction(null);
  }

  return (
    <Column>
      {currentAction === null && (
        <Row wrap className="gap-2">
          <SimpleButton
            icon={<MingcutePencil2Fill />}
            text="Edit Disruption"
            theme="primary"
            onClick={handleEdit}
          />
          <SimpleButton
            icon={<MingcuteDelete2Line />}
            text="Delete Disruption"
            theme="error"
            onClick={handleDelete}
          />
        </Row>
      )}

      {/* Prompt to comfirm the decision */}
      {currentAction === "delete" && (
        <Column justify="center" className="gap-4">
          <Text align="center">
            Are you sure you want to delete this disruption?
          </Text>

          <Row justify="center" className="gap-2">
            <SimpleButton text="No, Cancel" onClick={handleCancel} />

            <SimpleButton
              text="Yes, Delete"
              theme="error"
              onClick={handleDelete}
            />
          </Row>
        </Column>
      )}

      {currentAction === "edit" && (
        <Column className="gap-4">
          {/* TODO: Use the disruption builder but prefill the data of the inputs */}
          <Text>
            <em>Not yet implemented</em>
          </Text>

          <SimpleButton text="Cancel" onClick={handleCancel} />
        </Column>
      )}
    </Column>
  );
}

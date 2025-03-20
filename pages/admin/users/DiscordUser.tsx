import React, { useState } from "react";
import { Text } from "@/components/core/Text";
import { Data } from "@/pages/admin/users/+data";
import { SimpleButton } from "@/components/common/SimpleButton";
import { Row } from "@/components/core/Row";
import { Column } from "@/components/core/Column";
import { TextInput } from "@/components/core/TextInput";
import { Grid } from "@/components/core/Grid";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { MingcuteCheckCircleLine } from "@/components/icons/MingcuteCheckCircleLine";
import { reload } from "vike/client/router";

type DiscordUserProps = {
  user: Data["discord"][number];
};

export function DiscordUser({ user }: DiscordUserProps) {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [status, setStatus] = useState<"uninvited" | "unavailable" | "invited">(
    "uninvited",
  );

  const {
    register,
    reset,
    setError,
    formState: { errors },
    getValues,
  } = useForm({
    values: { username: user.username },
  });

  async function handleInvite() {
    await axios
      .post(
        "/api/admin/users",
        {
          id: user.id,
          username: getValues().username,
        },
        { withCredentials: true },
      )
      .then(() => {
        setShowInput(false);
        setStatus("invited");
      })
      .catch(async (error: AxiosError<{ error: string }>) => {
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          await reload();
        } else if (statusCode === 412) {
          setError("username", { message: error.response?.data.error });
          setShowInput(false);
          setStatus("unavailable");
        } else if (statusCode === 409) {
          setError("username", { message: error.response?.data.error });
        }
      });
  }

  return (
    <Column className="hover:bg-action gap-2 rounded p-2">
      <Grid
        align="center"
        columns="minmax(0, 1fr) minmax(0, 1fr)"
        className="gap-4"
      >
        <Row align="center" className="gap-4">
          <img src={user.avatar} className="size-10 rounded-full" />

          <Text>{user.username}</Text>
        </Row>

        {status === "invited" ? (
          <MingcuteCheckCircleLine className="text-status-clear size-5 justify-self-end" />
        ) : status === "unavailable" ? (
          <Text style="input-error" align="right">
            {errors.username?.message}
          </Text>
        ) : showInput ? (
          <TextInput
            className="w-full"
            placeholder="Username"
            {...register("username")}
            error={errors.username?.message}
          />
        ) : (
          <Row justify="right">
            <SimpleButton text="Invite" onClick={() => setShowInput(true)} />
          </Row>
        )}
      </Grid>
      {status === "uninvited" && showInput && (
        <Row justify="right" className="gap-2">
          <SimpleButton
            text="Cancel"
            onClick={() => {
              reset();
              setShowInput(false);
            }}
          />
          <SimpleButton
            text="Send Invite"
            theme="primary"
            onClick={handleInvite}
          />
        </Row>
      )}
    </Column>
  );
}

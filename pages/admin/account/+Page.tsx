import React, { useState } from "react";
import { Column } from "@/components/core/Column";
import { BackNavigation } from "@/components/navigation/BackNavigation";
import { PageCenterer } from "@/components/common/PageCenterer";
import { PagePadding } from "@/components/common/PagePadding";
import { Text } from "@/components/core/Text";
import { Spacer } from "@/components/core/Spacer";
import { Row } from "@/components/core/Row";
import { SimpleButton } from "@/components/common/SimpleButton";
import { MingcutePencil2Fill } from "@/components/icons/MingcutePencil2Fill";
import { TextInput } from "@/components/core/TextInput";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MingcuteCloseCircleFill } from "@/components/icons/MingcuteCloseCircleFill";
import { useData } from "vike-react/useData";
import { Data } from "@/pages/admin/account/+data";
import axios, { AxiosError } from "axios";
import { reload } from "vike/client/router";

const schema = z
  .object({
    username: z.string().trim().nonempty(),
    password: z
      .string()
      .trim()
      .refine((value) => (value ? value.trim().length >= 8 : true), {
        message: "Password must contain at least 8 characters",
      }),
    confirm: z.string(),
  })
  .refine(
    ({ password, confirm }) =>
      password.length === 0 || confirm.trim() === password.trim(),
    { message: "Passwords does not match", path: ["confirm"] },
  );

export default function Page() {
  const { id, username } = useData<Data>();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
    watch,
    reset,
    resetField,
  } = useForm({
    defaultValues: { username, password: "", confirm: "" },
    resolver: zodResolver(schema),
  });
  const password = watch("password");

  async function updateAccount(data: z.infer<typeof schema>) {
    await axios
      .put(`/api/admin/users/${id}`, {
        username: data.username,
        password: data.password.length > 0 ? data.password : undefined,
      })
      .then(async () => {
        setIsEditing(false);
        resetField("username", { defaultValue: data.username });
        await reload();
      })
      .catch(async (error: AxiosError<{ error: string }>) => {
        const statusCode = error.response?.status;
        if (statusCode === 401 || statusCode === 403) {
          await reload();
        } else if (statusCode === 409) {
          setError("username", { message: error.response?.data.error });
        }
      });
  }

  return (
    <Column>
      <BackNavigation name="Admin" href="/admin" />
      <PageCenterer>
        <PagePadding>
          <Column>
            <Row align="center" justify="space-between">
              <Text style="title">Account</Text>
              <SimpleButton
                text={isEditing ? "Cancel" : "Edit Details"}
                theme={isEditing ? "error" : "default"}
                icon={
                  isEditing ? (
                    <MingcuteCloseCircleFill />
                  ) : (
                    <MingcutePencil2Fill />
                  )
                }
                onClick={() => {
                  if (isEditing) {
                    reset();
                  }
                  setIsEditing(!isEditing);
                }}
              />
            </Row>

            <Spacer h="6" />

            {isEditing ? (
              <form onSubmit={handleSubmit(updateAccount)}>
                <Column className="gap-4">
                  <TextInput
                    label="Username"
                    placeholder="Enter a username"
                    autoComplete="username"
                    {...register("username")}
                    error={errors.username?.message}
                  />
                  <TextInput
                    label="Password"
                    placeholder="Enter your new password (optional)"
                    autoComplete="new-password"
                    type="password"
                    {...register("password")}
                    error={errors.password?.message}
                  />
                  {password.length > 0 && (
                    <TextInput
                      placeholder="Re-enter password"
                      autoComplete="none"
                      type="password"
                      {...register("confirm")}
                      error={errors.confirm?.message}
                    />
                  )}

                  <SimpleButton text="Update" submit />
                </Column>
              </form>
            ) : (
              <>
                <Text style="subtitle">Username</Text>
                <Spacer h="4" />
                <Text>{username}</Text>
              </>
            )}
          </Column>
        </PagePadding>
      </PageCenterer>
    </Column>
  );
}

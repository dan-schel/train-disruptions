import React from "react";

import { PageCenterer } from "@/components/common/PageCenterer";
import { PagePadding } from "@/components/common/PagePadding";
import { Column } from "@/components/core/Column";
import axios, { AxiosError } from "axios";
import { SimpleButton } from "@/components/common/SimpleButton";
import { reload } from "vike/client/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextInput } from "@/components/core/TextInput";

const schema = z.object({
  username: z.string().nonempty("This field is required"),
  password: z.string().nonempty("This field is required"),
});

export default function Page() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  async function handleLogin(data: z.infer<typeof schema>) {
    try {
      await axios
        .post("/api/auth/login", data, { withCredentials: true })
        .catch((err: AxiosError<{ error: string }>) => {
          throw new Error(err.response?.data.error);
        });
      await reload();
    } catch (error) {
      if (error instanceof Error) {
        setError(
          "password",
          {
            message: error.message,
          },
          { shouldFocus: true },
        );
      }
    }
  }

  return (
    <PageCenterer>
      <PagePadding>
        <form onSubmit={handleSubmit(handleLogin)}>
          <Column className="gap-4">
            <TextInput
              id="username"
              label="Username"
              autoComplete="username"
              {...register("username", { required: true })}
              error={errors.username?.message}
            />

            <TextInput
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              {...register("password", { required: true })}
              error={errors.password?.message}
            />

            <SimpleButton text="Login" submit />
          </Column>
        </form>
      </PagePadding>
    </PageCenterer>
  );
}

import { z } from "zod";
import React from "react";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { reload } from "vike/client/router";
import { loginSchema } from "@/shared/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";

import { Column } from "@/components/core/Column";
import { TextInput } from "@/components/common/TextInput";
import { PagePadding } from "@/components/common/PagePadding";
import { PageCenterer } from "@/components/common/PageCenterer";
import { SimpleButton } from "@/components/common/SimpleButton";

export default function Page() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(data: z.infer<typeof loginSchema>) {
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

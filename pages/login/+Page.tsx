import { z } from "zod";
import React from "react";
import axios, { AxiosError } from "axios";
import { reload } from "vike/client/router";
import { loginSchema } from "@/shared/types/auth";

import { Column } from "@/components/core/Column";
import { TextInput } from "@/components/common/TextInput";
import { PagePadding } from "@/components/common/PagePadding";
import { PageCenterer } from "@/components/common/PageCenterer";
import { SimpleButton } from "@/components/common/SimpleButton";

export default function Page() {
  const [formData, setFormData] = React.useState<z.input<typeof loginSchema>>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = React.useState<
    z.inferFlattenedErrors<typeof loginSchema>["fieldErrors"] | null
  >(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const data = {
      ...formData,
      [e.target.name]: e.target.value,
    };

    const { error, success } = loginSchema.safeParse(data);
    // Only validate on change if the form has been submitted before
    if (errors !== null) {
      setErrors(!success ? error.flatten().fieldErrors : {});
    }

    setFormData(data);
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const { success, data, error } = loginSchema.safeParse(formData);
    if (!success) {
      setErrors(error.flatten().fieldErrors);
      return;
    }

    try {
      await axios
        .post("/api/auth/login", data, { withCredentials: true })
        .catch((err: AxiosError<{ error: string }>) => {
          throw new Error(err.response?.data.error);
        });
      await reload();
    } catch (error) {
      if (error instanceof Error) {
        setErrors({ username: [error.message], password: [error.message] });
      }
    }
  }

  return (
    <PageCenterer>
      <PagePadding>
        <form onSubmit={handleLogin}>
          <Column className="gap-4">
            <TextInput
              id="username"
              label="Username"
              autoComplete="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={errors?.username?.at(0)}
            />

            <TextInput
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors?.password?.at(0)}
            />

            <SimpleButton text="Login" submit />
          </Column>
        </form>
      </PagePadding>
    </PageCenterer>
  );
}

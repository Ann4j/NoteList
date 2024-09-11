import "./LoginForm.css";
import { FormField } from "../FormField";
import { Button } from "../Button";
import { useMutation } from '@tanstack/react-query'
import { FC, FormEventHandler, useState } from "react";
import { login } from "../../api/user";
import { queryClient } from "../../api/queriClient";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


const loginSchema = z.object({
  email: z.string()
    .min(5, "Почта должна содержать не менее 5 символов")
    .email("Неверный формат email"),
  password: z.string()
    .min(8, "Пароль должен содержать не менее 8 символов")
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm: FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema)
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["users", "me"] });
    }
  }, queryClient);

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Почта" errorMessage={errors.email?.message}>
        <input
          type="text"
          {...register("email")}
        />
      </FormField>
      <FormField label="Пароль" errorMessage={errors.password?.message}>
        <input
          type="password"
          {...register("password")}
        />
      </FormField>

      <Button type="submit" title="Войти" isLoading={loginMutation.isPending}>Войти</Button>
    </form>
  );
};

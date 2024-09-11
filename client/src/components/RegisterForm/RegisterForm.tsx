import { FormField } from "../FormField";
import { Button } from "../Button";
import "./RegisterForm.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { FC } from "react";
import { regiserUser } from "../../api/user";
import { queryClient } from "../../api/queriClient";

// Схема валидации с использованием zod
const registerSchema = z.object({
  username: z.string()
    .min(5, "Имя пользователя должно содержать не менее 5 символов"),
  email: z.string()
    .email("Введите корректный формат электронной почты"),
  password: z.string()
    .min(8, "Пароль должен содержать не менее 8 символов"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterForm: FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = useMutation({
    mutationFn:regiserUser,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["users", "me"] });
    }
  });

  const onSubmit = (data: RegisterFormValues) => {
    registerMutation.mutate(data);
  };

  return (
    <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Имя пользователя" errorMessage={errors.username?.message}>
        <input
          type="text"
          {...register("username")}
        />
      </FormField>

      <FormField label="Email" errorMessage={errors.email?.message}>
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

      <Button type="submit" isLoading={registerMutation.isPending}>Зарегистрироваться</Button>
    </form>
  );
};


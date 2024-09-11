import { Button } from "../Button";
import "./LogoutButton.css";
import {  useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/queriClient";
import { deactivateUser } from "../../api/user";


export const LogoutButton = () => {
  const deactiveMutation = useMutation({
    mutationFn: deactivateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", "me"] });
    },
  });

  // Функция для деактивации пользователя
  const handleDeactivate = () => {
    deactiveMutation.mutate();
  };

  return (
    <div className="logout-button">
      <Button onClick={handleDeactivate} isLoading={deactiveMutation.isPending} kind="secondary">
        Выйти
      </Button>
    </div>
  );
};


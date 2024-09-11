import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { fetchUser } from "../../api/user";
import { queryClient } from "../../api/queriClient";
import { UserView } from ".";
import { Loader } from "../Loader";

interface FetchUserViewProps {
  userId: string;
}

export const FetchUserView: FC<FetchUserViewProps> = ({ userId }) => {
  const userQuery = useQuery({
    queryFn: () => fetchUser(userId),
    queryKey: ["users", userId]
  }, queryClient)

  switch (userQuery.status) {
    case "pending":
      return <Loader />;

    case "success":
      return <UserView user={userQuery.data} />

    case "error":
      return (
        <div>
          <span>
            Произошла ошибка:
          </span>
          <button onClick={() => userQuery.refetch()}>Повторить запрос</button>
        </div>
      )
  }

}

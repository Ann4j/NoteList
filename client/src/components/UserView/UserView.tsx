import { FC } from "react";
import { User } from "../../api/user";
import "./UserView.css";

export interface UserViewProps {
  user: User
}

export const UserView: FC<UserViewProps> = ({user}) => {
  const username = user.username;

  return (
    <div className="user-view">
      <div className="user-view__logo">
        {username.slice(0, 1).toUpperCase()}
      </div>
      <span className="user-view__name">{username}</span>
    </div>
  );
};

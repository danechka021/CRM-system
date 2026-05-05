import { Button } from "antd";
import { memo } from "react";
import { User } from "../../../types";

interface UserLockoutButtonProps {
  user: User;
}

const UserLockoutButton: React.FC<UserLockoutButtonProps> = memo(({ user }) => {
  return <Button>{user.isBlocked ? "Разблок" : "Блок"}</Button>;
});

export default UserLockoutButton;

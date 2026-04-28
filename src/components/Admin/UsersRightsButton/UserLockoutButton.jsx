import { Button } from "antd";
import { memo } from "react";

const UserLockoutButton = memo(({ user, onAction }) => {
  const handleClick = () => {
    onAction(user);
  };
  return (
    <Button onClick={handleClick}>{user.isBlocked ? "Разблок" : "Блок"}</Button>
  );
});

export default UserLockoutButton;

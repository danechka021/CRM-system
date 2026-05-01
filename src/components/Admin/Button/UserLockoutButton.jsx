import { Button } from "antd";
import { memo } from "react";

const UserLockoutButton = memo(({ user, handleBlocked }) => {
  const handleClick = () => {
    handleBlocked(user);
  };
  return (
    <Button onClick={handleClick}>{user.isBlocked ? "Разблок" : "Блок"}</Button>
  );
});

export default UserLockoutButton;

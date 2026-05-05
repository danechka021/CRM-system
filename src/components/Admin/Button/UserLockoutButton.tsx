import { Button, Popconfirm } from "antd";
import { memo } from "react";
import { User } from "../../../types";

interface UserLockoutButtonProps {
  user: User;
  onConfirm: () => void;
}

const UserLockoutButton: React.FC<UserLockoutButtonProps> = memo(
  ({ user, onConfirm }) => {
    return (
      <Popconfirm
        title="Изменить статус блокировки?"
        okText="Да"
        cancelText="Нет"
        onConfirm={onConfirm}
      >
        <Button>{user.isBlocked ? "Разблок" : "Блок"}</Button>;
      </Popconfirm>
    );
  },
);

export default UserLockoutButton;

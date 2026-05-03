import { DeleteTwoTone, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { User } from "../../../types";

interface DeleteUserButtonProps {
  user: User;
  onDelete: (id: number) => void;
}

const DeleteUserButton: React.FC<DeleteUserButtonProps> = ({
  user,
  onDelete,
}) => {
  return (
    <div>
      <Popconfirm
        title="Удалить пользоватлея"
        description={`Вы уверены, что хотите удалить ${user.username || `этого пользоватлея`}?`}
        okText="Да"
        cancelText="Нет"
        okButtonProps={{ danger: true }}
        icon={<QuestionCircleOutlined style={{ color: "red" }} />}
        onConfirm={() => onDelete(user.id)}
      >
        <Button size="small">
          <DeleteTwoTone twoToneColor="red" />
        </Button>
      </Popconfirm>
    </div>
  );
};

export default DeleteUserButton;

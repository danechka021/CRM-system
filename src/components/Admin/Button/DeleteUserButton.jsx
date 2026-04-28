import { DeleteTwoTone } from "@ant-design/icons";
import { Button } from "antd";

const DeleteUserButton = () => {
  return (
    <div>
      <Button>
        <DeleteTwoTone twoToneColor="red" />
      </Button>
    </div>
  );
};

export default DeleteUserButton;

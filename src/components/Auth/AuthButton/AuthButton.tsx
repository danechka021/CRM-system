import { FC } from "react";
import styles from "../AuthButton/AuthButton.module.css";
import { Button } from "antd";

const AuthButton: FC = () => {
  return (
    <div className={styles.authBottomForm}>
      <Button
        htmlType="submit"
        variant="solid"
        color="purple"
        size="large"
        className={styles.stylesLogin}
      >
        Login
      </Button>
    </div>
  );
};

export default AuthButton;

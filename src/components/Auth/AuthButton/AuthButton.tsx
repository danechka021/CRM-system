import { FC } from "react";
import styles from "../AuthButton/AuthButton.module.css";

const AuthButton: FC = () => {
  return (
    <div className={styles.authBottomForm}>
      <button className={styles.stylesLogin} type="submit">
        Login
      </button>
    </div>
  );
};

export default AuthButton;

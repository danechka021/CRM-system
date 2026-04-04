import { JSX } from "react";
import styles from "../AuthButton/AuthButton.module.css";

const AuthButton = (): JSX.Element => {
  return (
    <div className={styles.authBottomForm}>
      <button className={styles.stylesLogin} type="submit">
        Login
      </button>
    </div>
  );
};

export default AuthButton;

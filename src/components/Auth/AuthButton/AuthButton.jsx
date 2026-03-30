import styles from "../AuthButton/AuthBotton.module.css";

const AuthButton = () => {
  return (
    <div className={styles.authBottomForm}>
      <button className={styles.stylesLogin}>Login</button>
    </div>
  );
};

export default AuthButton;

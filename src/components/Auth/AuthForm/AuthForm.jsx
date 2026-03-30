import AuthButton from "../AuthButton/AuthButton";
import LinkButton from "../LinkButton/LinkButton";
import ValidatedInput from "../ValidathionInput/ValidatedInput";
import styles from "../AuthForm/AuthForm.module.css";
import authImg from "../../../assets/image_auth.jpg";

import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const navigate = useNavigate();

  const openRegistrationPage = (event) => {
    event.preventDefault();
    navigate("/register");
  };

  return (
    <>
      <form className={styles.pageLayout}>
        <div className={styles.auth}>
          <div className={styles.imageForm}>
            <img src={authImg} alt="Auth" className={styles.img} />
            <div className={styles.textImageForm}>
              <p className={styles.slogan}>
                <b>Turn your ideas into reality.</b>
              </p>

              <p className={styles.promoText}>
                Start for free and get attractive offers from the community
              </p>
            </div>
          </div>

          <div className={styles.authForm}>
            <div className={styles.headerAuthForm}>
              <h1 className={styles.authTitle}>Login to your Account</h1>
              <p className={styles.formSubtitle}>
                See what is going on with your buisness
              </p>
            </div>

            <div className={styles.inputValidateForm}>
              <div>
                <ValidatedInput
                  label="Email"
                  placeholder="mail@abc.ru"
                  type="email"
                  id="email-input"
                />
                <ValidatedInput
                  label="Password"
                  placeholder="*********"
                  type="password"
                  id="password-input"
                />
              </div>

              <div className={styles.formOptions}>
                <div className={styles.checkboxGroup}>
                  <label htmlFor="Remember-me">Remember me</label>
                  <input
                    type="checkbox"
                    id="Remember-me"
                    className={styles.checkbox}
                  />
                </div>
                <LinkButton name="Forgot Password?" />
              </div>

              <div>
                <AuthButton />
              </div>
            </div>

            <div className={styles.footerAuth}>
              <p className={styles.footerText}>Not Registered Yet?</p>
              <LinkButton
                name="Create an Account"
                onClick={openRegistrationPage}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AuthForm;

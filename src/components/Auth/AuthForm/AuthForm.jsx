import AuthButton from "../AuthButton/AuthButton";
import LinkButton from "../LinkButton/LinkButton";
import ValidatedInput from "../ValidathionInput/ValidatedInput";
import styles from "../AuthForm/AuthForm.module.css";
import authImg from "../../../assets/image_auth.jpg";
import { authorizeUser } from "../../../api/auth";

import { useNavigate } from "react-router-dom";
import { Form, message } from "antd";

const AuthForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log(values);
    try {
      const data = await authorizeUser({
        login: values.login,
        password: values.password,
      });

      localStorage.setItem("accessToken", data.accessToken);
      message.success("Вход выполнен успешно!");
      navigate("/todos");
    } catch (error) {
      message.error(error.message);
    }
  };

  const openRegistrationPage = (event) => {
    event.preventDefault();
    navigate("/register");
  };

  return (
    <>
      <div className={styles.pageLayout}>
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

          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            className={styles.authForm}
          >
            <div className={styles.headerAuthForm}>
              <h1 className={styles.authTitle}>Login to your Account</h1>
              <p className={styles.formSubtitle}>
                See what is going on with your buisness
              </p>
            </div>

            <div className={styles.inputValidateForm}>
              <div>
                <ValidatedInput
                  name="login"
                  label="email"
                  placeholder="mail@abc.ru"
                  type="text"
                  id="email-input"
                />
                <ValidatedInput
                  name="password"
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
          </Form>
        </div>
      </div>
    </>
  );
};

export default AuthForm;

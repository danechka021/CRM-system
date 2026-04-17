import React from "react";
import AuthButton from "../AuthButton/AuthButton";
import LinkButton from "../LinkButton/LinkButton";
import ValidatedInput from "../ValidationInput/ValidatedInput";
import styles from "../AuthForm/AuthForm.module.css";
import authImg from "../../../assets/image_auth.jpg";
import { authorizeUser } from "../../../api/auth";
import { AuthData } from "../../../types";
import { accessToken } from "../../../authService";
import { useNavigate } from "react-router-dom";
import { ConfigProvider, Form, message } from "antd";
import Checkbox from "antd/es/checkbox/Checkbox";
import { useDispatch } from "react-redux";
import { setSuccessfulLogin } from "../../../store/slices/authSlice";

const AuthForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = async (authData: AuthData): Promise<void> => {
    try {
      const data = await authorizeUser(authData);
      accessToken.value = data.accessToken;
      localStorage.setItem("refreshToken", data.refreshToken);

      dispatch(setSuccessfulLogin(data.accessToken));
      message.success("Вход выполнен успешно!");
      navigate("/todos");
    } catch (error) {
      message.error("Неверные логин или пароль");
    }
  };

  const handleRegistrationPageOpen = (
    event: React.MouseEvent<HTMLElement>,
  ): void => {
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
              <ValidatedInput
                name="login"
                label="Login"
                placeholder="Login"
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

              <div className={styles.formOptions}>
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: "#a435f0",
                    },

                    components: {
                      Checkbox: {
                        colorText: "purple",
                      },
                    },
                  }}
                >
                  <Checkbox>Remember me</Checkbox>
                </ConfigProvider>
                <LinkButton name="Forgot Password?" />
              </div>

              <div className={styles.authLog}>
                <AuthButton />
              </div>
            </div>
            <div className={styles.footerAuth}>
              <p className={styles.footerText}>Not Registered Yet?</p>
              <LinkButton
                name="Create an Account"
                onClick={handleRegistrationPageOpen}
              />
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AuthForm;

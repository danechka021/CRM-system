import { Form, Button, message, Modal } from "antd";
import React, { useState } from "react";
import ValidatedInput from "../ValidathionInput/ValidatedInput";
import styles from "../RegistrationForm/RegistrationForm.module.css";
import { registrationUser } from "../../../api/auth";
import { UserRegistration } from "../../../types";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (
    registrationData: UserRegistration,
  ): Promise<void> => {
    setLoading(true);
    try {
      await registrationUser(registrationData);

      Modal.success({
        title: "Регистраци прошла успешно!",
        content: "Теперь вы можете войти в систему используя логин и пароль.",
        okText: "Перейти к авторизации",
        centered: true,
        onOk: () => {
          navigate("/auth");
        },
      });
    } catch (error) {
      message.error(
        "Ошибка регистрации, введенные данные должны быть уникальными",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageLayout}>
      <Form
        className={styles.registrationForm}
        layout="vertical"
        onFinish={onFinish}
      >
        <ValidatedInput
          label="Имя пользователя"
          name="username"
          placeholder="Введите имя"
          isRequired={true}
          rules={[
            {
              pattern: /^[А-Яа-яЁёa-zA-Z0-9\s]+$/,
              message: "Допускаются только русские и английские буквы",
            },
            { required: true, message: "" },
            { min: 1, message: "Минимальная длина 1 символ " },
            { max: 60, message: "Максимальная длина 60 символов" },
          ]}
        />

        <ValidatedInput
          label="Логин"
          placeholder="Введите логин"
          name="login"
          isRequired={true}
          rules={[
            { pattern: /^[a-zA-Z]+$/, message: "Только английские буквы" },
            { required: true, message: "" },
            { min: 2, message: "Минимальная длина 2 символ " },
            { max: 60, message: "Максимальная длина 60 символов" },
          ]}
        />
        <ValidatedInput
          label="Пароль"
          placeholder="Введите пароль"
          name="password"
          isRequired={true}
          rules={[
            { required: true, message: "" },
            { min: 6, message: "Минимальная длина 6 символ " },
            { max: 60, message: "Максимальная длина 60 символов" },
          ]}
        />
        <ValidatedInput
          label="Повторите пароль"
          placeholder="Введите пароль"
          type="password"
          name="returnpasswordId"
          isRequired={true}
          dependencies={["password"]}
          rules={[
            ({ getFieldValue }) => ({
              validator: (_, value) =>
                !value || getFieldValue("password") === value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Пароли не совпадают!")),
            }),
          ]}
        />
        <ValidatedInput
          label="Почтовый адрес"
          placeholder="Введите почтовый адрес"
          type="email"
          name="email"
          isRequired={true}
        />
        <ValidatedInput
          label="Телефон"
          placeholder="Введите телефон"
          type="tel"
          name="phoneNumber"
          isRequired={false}
          rules={[
            {
              pattern: /^((\+7|7|8)+([0-9]){10})$/,
              message: "Введите корректный номер",
            },
          ]}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            event.target.value = event.target.value.replace(/[^0-9+]/g, "");
          }}
        />
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
            className={styles.submitBtn}
          >
            Зарегистрироваться
          </Button>
        </Form.Item>

        <Button
          type="primary"
          danger
          htmlType="button"
          size="large"
          block
          className={styles.submitBtn}
          onClick={() => navigate("/auth")}
        >
          Выйти
        </Button>
      </Form>
    </div>
  );
};

export default RegistrationForm;

import ValidatedInput from "../ValidathionInput/ValidatedInput";

const RegistrationForm = () => {
  return (
    <div>
      <ValidatedInput
        label="Имя пользователя"
        placeholder="Введите имя"
        type="text"
        id="name-input"
        isRequired={true}
      />
      <ValidatedInput
        label="Логин"
        placeholder="Введите логин"
        type="text"
        id="login-input"
        isRequired={true}
      />
      <ValidatedInput
        label="Пароль"
        placeholder="Введите пароль"
        type="password"
        id="passwordId-input"
        isRequired={true}
      />
      <ValidatedInput
        label="Повторите пароль"
        placeholder="Введите пароль"
        type="password"
        id="returnpassword-input"
        isRequired={true}
      />
      <ValidatedInput
        label="Почтовый адрес"
        placeholder="Введите почтовый адрес"
        type="email"
        id="email-input2"
        isRequired={true}
      />
      <ValidatedInput
        label="Телефон"
        placeholder="Введите телефон"
        type="tel"
        id="number-input"
        isRequired={false}
      />
      <button>Зарегистрироваться</button>
    </div>
  );
};

export default RegistrationForm;

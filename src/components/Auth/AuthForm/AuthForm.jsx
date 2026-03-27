import AuthButton from "../AuthButton/AuthButton";
import LinkButton from "../LinkButton/LinkButton";
import ValidatedInput from "../ValidathionInput/ValidatedInput";

const AuthForm = () => {
  return (
    <>
      <div>
        <h1>Login to your Account</h1>
        <p>See what is going on with your buisness</p>
      </div>

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

      <div>
        <label htmlFor="Remember-me">Remember me</label>
        <input type="checkbox" id="Remember-me" />
        <LinkButton name="Forgot Password?" />
      </div>

      <div>
        <AuthButton />
      </div>

      <div>
        <p>Not Registered Yet?</p>
        <LinkButton name="Create an Account" />
      </div>
    </>
  );
};

export default AuthForm;

import AuthForm from "../../components/Auth/AuthForm/AuthForm";
import { Outlet } from "react-router-dom";

const AuthorizationPage = () => {
  return (
    <>
      <div>
        <Outlet />
        <AuthForm />
      </div>
    </>
  );
};

export default AuthorizationPage;

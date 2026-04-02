import { Outlet, useNavigate } from "react-router-dom";

const PrivateRoute = () => {
  const navigate = useNavigate();
  if (!localStorage.getItem("accessToken")) {
    navigate("/auth");
  }

  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default PrivateRoute;

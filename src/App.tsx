import { BrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout/AppLayout";
// import AuthorizationPage from "./pages/auth/AuthorizationPage";
// import RegistrationPage from "./pages/registration/RegistrationPage";
const App = () => {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
};

export default App;

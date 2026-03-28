import { BrowserRouter } from "react-router-dom";
//import AppLayout from "./AppLayout/AppLayout";
import AuthorizationPage from "./pages/auth/AuthorizationPage";

const App = () => {
  return (
    <BrowserRouter>
      <AuthorizationPage />
    </BrowserRouter>
  );
};

export default App;

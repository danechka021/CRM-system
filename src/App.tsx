import { BrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout/AppLayout";

const App = () => {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
};

export default App;

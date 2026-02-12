import TodoListPage from "./pages/TodoListPage";
import "antd/dist/reset.css";
import { Axios } from "axios";

const App = () => {
  return (
    <div className="mainContainer">
      <TodoListPage />
    </div>
  );
};

export default App;

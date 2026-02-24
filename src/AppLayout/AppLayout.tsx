import { UserOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Layout, Menu, MenuProps } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {
  useLocation,
  useNavigate,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import UserProfile from "../profile/UserProfile";
import TodoListPage from "../pages/TodoListPage";
import styles from "../AppLayout/AppLayout.module.css";

type MenuItem = Required<MenuProps>["items"][number];

const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const sections: MenuItem[] = [
    {
      key: "/profile",
      icon: <UserOutlined />,
      label: "Профиль",
    },
    {
      key: "/todos",
      icon: <UnorderedListOutlined />,
      label: "ToDo List",
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  return (
    <Layout className={styles.layoutContainer}>
      <Sider collapsible>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={handleMenuClick}
          items={sections}
        />
      </Sider>

      <Layout className={styles.layoutContainer}>
        <Content>
          <Routes>
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/todos" element={<TodoListPage />} />
            <Route path="*" element={<TodoListPage />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;

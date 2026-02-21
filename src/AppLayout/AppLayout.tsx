import { UserOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useLocation, useNavigate, Route, Routes } from "react-router-dom";
import UserProfile from "../profile/UserProfile";
import TodoListPage from "../pages/TodoListPage";
import styles from "../AppLayout/AppLayout.module.css";

const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const sections = [
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

  return (
    <Layout className={styles.layoutContainer}>
      <Sider collapsible>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={(e) => navigate(e.key)}
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

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
import { useState, useEffect } from "react";
import { isAuthorized } from "../api/auth";

import UserProfile from "../pages/profile/UserProfilePage";
import TodoListPage from "../pages/todo/TodoListPage";
import AuthorizationPage from "../pages/auth/AuthorizationPage";
import RegistrationPage from "../pages/registration/RegistrationPage";
import styles from "../AppLayout/AppLayout.module.css";

type MenuItem = Required<MenuProps>["items"][number];

const AppLayout: React.FC = () => {
  const [isAuthorization, setIsAuthorization] = useState<boolean>(isAuthorized);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const syncAuthorization = () => setIsAuthorization(isAuthorized);
    window.addEventListener("authChange", syncAuthorization);
    syncAuthorization();

    return () => window.removeEventListener("authChange", syncAuthorization);
  }, []);

  const sections: MenuItem[] = [
    {
      key: "/profile",
      icon: <UserOutlined />,
      label: "Профиль",
    },
    {
      key: "/todos",
      icon: <UnorderedListOutlined />,
      label: "Список дел",
    },
  ];

  const handleNavigate: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  if (!isAuthorization) {
    return (
      <Layout className={styles.layoutContainer}>
        <Content>
          <Routes>
            <Route path="/auth" element={<AuthorizationPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="*" element={<Navigate to="/auth" replace />} />
          </Routes>
        </Content>
      </Layout>
    );
  }
  return (
    <Layout className={styles.layoutContainer}>
      <Sider collapsible>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={handleNavigate}
          items={sections}
        />
      </Sider>

      <Layout>
        <Content>
          <Routes>
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/todos" element={<TodoListPage />} />{" "}
            <Route path="*" element={<Navigate to="/todos" replace />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;

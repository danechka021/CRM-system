import {
  UserOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, MenuProps, Button, Popconfirm } from "antd";
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

import UserProfile from "../profile/UserProfile";
import TodoListPage from "../pages/todo/TodoListPage";
import AuthorizationPage from "../pages/auth/AuthorizationPage";
import RegistrationPage from "../pages/registration/RegistrationPage";
import styles from "../AppLayout/AppLayout.module.css";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import { logoutUser } from "../api/auth";

type MenuItem = Required<MenuProps>["items"][number];

const AppLayout: React.FC = () => {
  const [isAuth, setIsAuth] = useState<boolean>(
    !!localStorage.getItem("accessToken"),
  );

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuth(!!token);
  }, [location.pathname]);

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

  if (!isAuth) {
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
          onClick={handleMenuClick}
          items={sections}
        />
        <Popconfirm
          title="Выйти из ситсемы"
          description="Вы учерены, что хотите выйти?"
          onConfirm={logoutUser}
          okText="Да"
          cancelText="Нет"
          placement="rightBottom"
        >
          <Button type="primary" danger icon={<LogoutOutlined />} block>
            Выйти
          </Button>
        </Popconfirm>
      </Sider>

      <Layout>
        <Content>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/todos" element={<TodoListPage />} />
            </Route>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;

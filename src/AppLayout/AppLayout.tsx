import { UserOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Layout, Menu, MenuProps, Spin } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {
  useLocation,
  useNavigate,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import UserProfile from "../pages/profile/UserProfilePage";
import TodoListPage from "../pages/todo/TodoListPage";
import AuthorizationPage from "../pages/auth/AuthorizationPage";
import RegistrationPage from "../pages/registration/RegistrationPage";
import styles from "../AppLayout/AppLayout.module.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { useEffect } from "react";
import { checkAuth } from "../store/slices/authSlice";

type MenuItem = Required<MenuProps>["items"][number];

const AppLayout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, isInitialized } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

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
  if (!isInitialized) {
    return <Spin size="large" />;
  }

  return (
    <Layout className={styles.layoutContainer}>
      {isAuthenticated && (
        <Sider collapsible>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[location.pathname]}
            onClick={handleNavigate}
            items={sections}
          />
        </Sider>
      )}

      <Layout className={styles.layoutContainer}>
        <Content>
          <Routes>
            {!isAuthenticated ? (
              <>
                <Route path="/auth" element={<AuthorizationPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="*" element={<Navigate to="/auth" replace />} />
              </>
            ) : (
              <>
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/todos" element={<TodoListPage />} />{" "}
                <Route path="*" element={<Navigate to="/todos" replace />} />
              </>
            )}
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;

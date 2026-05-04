import {
  UserOutlined,
  UnorderedListOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Layout, Menu, MenuProps, Spin } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {
  useLocation,
  useNavigate,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";

import UserProfile from "../pages/profile/UserProfilePage";
import TodoListPage from "../pages/todo/TodoListPage";
import AuthorizationPage from "../pages/auth/AuthorizationPage";
import RegistrationPage from "../pages/registration/RegistrationPage";
import styles from "../AppLayout/AppLayout.module.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { useEffect, useMemo } from "react";
import { checkAuth } from "../store/slices/authSlice";
import AdminUserControl from "../components/Admin/AdminUserControl/AdminUserControl";
import UsersFormPage from "../pages/users/UsersFormPage";
import { Roles } from "../enums";

type MenuItem = Required<MenuProps>["items"][number];
interface PrivateRouteProps {
  isAuth: boolean;
  allRoles?: Roles[];
  userRole?: Roles[] | undefined;
}

const PrivateRoute = ({ isAuth, allRoles, userRole }: PrivateRouteProps) => {
  if (!isAuth) return <Navigate to="/auth" replace />;

  if (allRoles && userRole) {
    const availabilityOfAccess = allRoles.some((role) =>
      userRole.includes(role),
    );
    if (!availabilityOfAccess) return <Navigate to="/todos" replace />;
  }

  return <Outlet />;
};

const AppLayout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, isInitialized, user } = useSelector(
    (state: RootState) => state.auth,
  );

  const userRole = user?.roles;

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const menuItems: MenuItem[] = useMemo(() => {
    const items: MenuItem[] = [
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

    if (userRole?.includes(Roles.ADMIN)) {
      items.push({
        key: "/users",
        icon: <TeamOutlined />,
        label: "Пользователи",
      });
    }
    return items;
  }, [userRole]);

  if (!isInitialized || (isAuthenticated && !user)) {
    return (
      <Spin
        size="large"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    );
  }

  return (
    <Layout className={styles.layoutContainer}>
      {isAuthenticated && (
        <Sider collapsible>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[location.pathname]}
            onClick={(e) => navigate(e.key)}
            items={menuItems}
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
              <Route
                element={
                  <PrivateRoute isAuth={isAuthenticated} userRole={userRole} />
                }
              >
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/todos" element={<TodoListPage />} />

                {(userRole?.includes(Roles.ADMIN) ||
                  userRole?.includes(Roles.MODERATOR)) && (
                  <Route
                    element={
                      <PrivateRoute
                        isAuth={isAuthenticated}
                        userRole={userRole}
                        allRoles={[Roles.ADMIN, Roles.MODERATOR]}
                      />
                    }
                  >
                    <Route path="/users" element={<UsersFormPage />} />
                    <Route path="/users/:id" element={<AdminUserControl />} />
                  </Route>
                )}
                <Route path="*" element={<Navigate to="/todos" replace />} />
              </Route>
            )}
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;

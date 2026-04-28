import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Descriptions, Spin } from "antd";
import { getUserProfile, editUserProfile } from "../../../api/users";

import styles from "./AdminUserControl.module.css";

const AdminUserControl = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserProfile(id);
        setUser(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin size="large" className={styles.spinStyle} />
      </div>
    );
  }

  const editProfile = () => {};

  return (
    <div className={styles.mainContainer}>
      <Card title={`Профиль пользователя: ${user.username}`}>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Имя">{user.username}</Descriptions.Item>
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          <Descriptions.Item label="Телефон">
            {user.phoneNumber}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Button type="primary" size="large">
        Редактировать
      </Button>

      <Button onClick={() => navigate(-1)} size="large" danger>
        Назад к списку
      </Button>
    </div>
  );
};

export default AdminUserControl;

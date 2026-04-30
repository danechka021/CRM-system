import { useState, useEffect, useCallback, memo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  Button,
  Descriptions,
  Spin,
  notification,
  Input,
  Space,
} from "antd";
import { getUserProfile, editUserProfile } from "../../../api/users";
import styles from "./AdminUserControl.module.css";

const AdminUserControl = memo(() => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserProfile(id);
        setUser(data);
        setFormData({
          username: data.username,
          email: data.email,
          phoneNumber: data.phoneNumber,
        });
      } catch (error) {
        notification.error({
          title: "Ошибка загрузки профиля!",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditData = useCallback(async () => {
    if (!isEdit) {
      setIsEdit(true);
      return;
    }

    if (
      formData.username === user.username &&
      formData.email === user.email &&
      formData.phoneNumber === user.phoneNumber
    ) {
      setIsEdit(false);
      return;
    }

    setSubmit(true);
    try {
      const result = await editUserProfile(id, formData);
      console.log(result);
      setUser(result);
      setIsEdit(false);
      notification.success({
        title: "Данные успешно обновлены!",
      });
    } catch (error) {
      console.log(error.response?.data);
      notification.error({
        title: "Ошибка редактирования!",
        description: "Этот Email или Логин уже занят!",
      });

      setFormData({
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
      });
    } finally {
      setSubmit(false);
    }
  }, [id, isEdit, formData, user]);

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

  return (
    <div className={styles.mainContainer}>
      <Card title={`Профиль пользователя: ${user.username}`}>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Имя">
            {isEdit ? (
              <Input
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            ) : (
              user.username
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {isEdit ? (
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            ) : (
              user.email
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Телефон">
            {isEdit ? (
              <Input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            ) : (
              user.phoneNumber
            )}
          </Descriptions.Item>
        </Descriptions>

        <Space
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "10px",
          }}
        >
          {isEdit && (
            <Button size="large" onClick={() => setIsEdit(false)}>
              Отмена
            </Button>
          )}
          <Button
            type="primary"
            size="large"
            onClick={handleEditData}
            loading={submit}
          >
            {isEdit ? "Сохрнаить" : "Редактировать"}
          </Button>
        </Space>
      </Card>
      <Button onClick={() => navigate(-1)} size="large" danger>
        Назад к списку
      </Button>
    </div>
  );
});

export default AdminUserControl;

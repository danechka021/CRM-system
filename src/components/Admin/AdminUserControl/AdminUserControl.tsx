import { useState, useEffect } from "react";
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
import { User, UserRequest } from "../../../types";

interface FormState {
  username: string;
  email: string;
  phoneNumber: string;
}

const AdminUserControl: React.FC = () => {
  const [user, setUser] = useState<null | User>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormState>({
    username: "",
    email: "",
    phoneNumber: "",
  });

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserProfile(Number(id));
        setUser(data);
        setFormData({
          username: data.username || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditData = async () => {
    if (!isEdit) {
      setIsEdit(true);
      return;
    }

    const dataToChange: UserRequest = {};
    if (formData.username !== user?.username) {
      dataToChange.username = formData.username;
    }
    if (formData.email !== user?.email) {
      dataToChange.email = formData.email;
    }
    if (formData.phoneNumber !== user?.phoneNumber) {
      dataToChange.phoneNumber = formData.phoneNumber;
    }

    if (Object.keys(dataToChange).length === 0) {
      setIsEdit(false);
      return;
    }

    try {
      const result = await editUserProfile(Number(id), dataToChange);
      setUser(result);
      setIsEdit(false);
      notification.success({
        title: "Данные успешно обновлены!",
      });
    } catch (error) {
      notification.error({
        title: "Ошибка редактирования!",
        description: "Этот Email или Логин уже занят!",
      });

      if (user) {
        setFormData({
          username: user.username,
          email: user.email,
          phoneNumber: user.phoneNumber,
        });
      }
    }
  };

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

  const validateEmail = (email: string) => {
    const enteredValue = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z0-9]{1,5}$/i;
    return enteredValue.test(email);
  };

  return (
    <div className={styles.mainContainer}>
      <Card title={`Профиль пользователя: ${user?.username}`}>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Имя">
            {isEdit ? (
              <Input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                maxLength={20}
                pattern="[А-Яа-яЁёa-zA-Z]+"
              />
            ) : (
              user?.username
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {isEdit ? (
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                status={isEdit && !validateEmail(formData.email) ? "error" : ""}
              />
            ) : (
              user?.email
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Телефон">
            {isEdit ? (
              <Input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                pattern="(\+7|7|8)[0-9]{10}"
                maxLength={15}
              />
            ) : (
              user?.phoneNumber
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
            <div className={styles.buttonEdit}>
              <Button danger size="large" onClick={() => setIsEdit(false)}>
                Отмена
              </Button>
            </div>
          )}
          <div className={styles.buttonEdit}>
            <Button type="primary" size="large" onClick={handleEditData}>
              {isEdit ? "Сохрнаить" : "Редактировать"}
            </Button>
          </div>
        </Space>
      </Card>
      <Button onClick={() => navigate(-1)} size="large" danger>
        Назад к списку
      </Button>
    </div>
  );
};

export default AdminUserControl;

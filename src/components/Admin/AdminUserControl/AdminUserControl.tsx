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
  Form,
} from "antd";
import { getUserProfile, editUserProfile } from "../../../api/users";
import { User } from "../../../types/types";
import styles from "./AdminUserControl.module.css";

interface FormState {
  username: string;
  email: string;
  phoneNumber: string;
}

const AdminUserControl: React.FC = () => {
  const [user, setUser] = useState<null | User>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [form] = Form.useForm();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserProfile(Number(id));
        setUser(data);
        form.setFieldsValue(data);
      } catch (error) {
        notification.error({
          title: "Ошибка загрузки профиля!",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [id, form]);

  const getChangedData = <T extends object>(
    original: T,
    updated: T,
  ): Partial<T> => {
    const changedFields: Partial<T> = {};

    (Object.keys(updated) as Array<keyof T>).forEach((key) => {
      if (updated[key] !== original[key]) {
        changedFields[key] = updated[key];
      }
    });
    return changedFields;
  };

  const handleEditData = async () => {
    if (!isEdit) {
      setIsEdit(true);
      return;
    }

    try {
      const values = await form.validateFields();
      const dataToChange = getChangedData(user, values);
      if (Object.keys(dataToChange).length === 0) {
        setIsEdit(false);
        return;
      }

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
    }
  };

  const handelCancel = () => {
    setIsEdit(false);
    form.resetFields();
  };

  if (isLoading) {
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
      <Card title={`Профиль пользователя: ${user?.username}`}>
        <Form form={form} component={false}>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Имя">
              {isEdit ? (
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: "Введите имя" }]}
                >
                  <Input maxLength={20} />
                </Form.Item>
              ) : (
                user?.username
              )}
            </Descriptions.Item>

            <Descriptions.Item label="Email">
              {isEdit ? (
                <Form.Item
                  name="email"
                  rules={[{ type: "email", message: "Некорректный email" }]}
                >
                  <Input />
                </Form.Item>
              ) : (
                user?.email
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Телефон">
              {isEdit ? (
                <Form.Item
                  name="phoneNumber"
                  rules={[
                    {
                      pattern: /^(\+7|7|8)[0-9]{10}$/,
                      message: "Формат: +79991234567",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              ) : (
                user?.phoneNumber
              )}
            </Descriptions.Item>
          </Descriptions>
        </Form>

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
              <Button danger size="large" onClick={handelCancel}>
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

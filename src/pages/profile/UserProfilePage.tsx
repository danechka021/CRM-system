import React, { useEffect, useState } from "react";
import { Card, Descriptions, Spin, message, Button, Popconfirm } from "antd";

import { getUserProfile } from "../../api/auth";
import { Profile } from "../../types";
import styles from "../profile/UserProfilePage.module.css";
import {
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { logoutUser } from "../../api/auth";

const UserProfile = () => {
  const [user, setUser] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getUserProfile();
        setUser(data);
      } catch (error) {
        message.error("Не удалось загрузить данные пользователя");
      } finally {
        setIsLoading(false);
      }
    };
    loadProfile();
  }, []);
  if (isLoading) {
    return (
      <div className={styles.spinStyle}>
        <Spin size="large"> </Spin>
      </div>
    );
  }

  return (
    <div className={styles.mainContainer}>
      <Card title="Личные данные">
        <Descriptions column={1}>
          <Descriptions.Item
            label={
              <span>
                <UserOutlined /> Имя пользователя
              </span>
            }
          >
            {user?.username}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <span>
                <MailOutlined /> Почтовый адрес
              </span>
            }
          >
            {user?.email}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <span>
                <PhoneOutlined /> Телефон
              </span>
            }
          >
            {user?.phoneNumber || "Не указан"}
          </Descriptions.Item>
        </Descriptions>
      </Card>
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
    </div>
  );
};

export default UserProfile;

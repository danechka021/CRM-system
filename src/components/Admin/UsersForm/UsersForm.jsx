import { useEffect, useState } from "react";
import { Input, Space, Button, Dropdown, Divider, Table } from "antd";
import { FilterOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { getUsers } from "../../../api/users";
import { useNavigate } from "react-router-dom";
import styles from "./UsersForm.module.css";

const { Search } = Input;

const UsersForm = () => {
  const [users, setUsers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await getUsers();
        console.log(response);
        const actualUsers = response.data || [];
        setUsers(actualUsers);
        setFilteredData(actualUsers);
      } catch (error) {
        console.log(error);
      }
    };

    loadUsers();
  }, []);

  const onSearch = (value) => {
    const searchTerm = value.toLowerCase().trim();

    const filtered = users.filter((user) => {
      return (
        user.username?.toLowerCase().includes(searchTerm) ||
        user.email?.toLowerCase().includes(searchTerm)
      );
    });
    setFilteredData(filtered);
  };

  const filterItems = [
    {
      key: "1",
      label: "Все пользователи",
    },
    {
      key: "2",
      label: "Заблокированные пользователи",
    },
    {
      key: "3",
      label: "Активные пользователи",
    },
  ];

  const columns = [
    {
      title: "Имя",
      dataIndex: "username",
      key: "username",
      width: 160,
      sorter: (a, b) => a.username.localeCompare(b.username),
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Телефон",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 190,
    },
    {
      title: "Роли",
      dataIndex: "roles",
      key: "roles",
      width: 130,
    },
    {
      title: "Блокировка",
      dataIndex: "isBlocked",
      key: "isBlocked",
      width: 120,
    },
    {
      title: "Дата регистрации",
      dataIndex: "date",
      key: "date",
      width: 170,
    },
    {
      title: "",
      key: "action",
      width: 80,
      render: (_, user) => (
        <Button
          type="text"
          icon={<DoubleRightOutlined />}
          size="large"
          onClick={() => navigate(`/users/${user.id}`)}
        />
      ),
    },
  ];

  return (
    <div className={styles.mainContainer}>
      <div className={styles.title}>
        <h1>Пользователи</h1>
      </div>
      <Divider />

      <div className={styles.tableForm}>
        <h2>Пользователи</h2>

        <div className={styles.antdElementsTable}>
          <Space vertical size="large">
            <Search
              placeholder="Поиск по имени или email"
              enterButton
              allowClear
              size="large"
              style={{ width: "30rem" }}
              onSearch={onSearch}
              onChange={(e) => onSearch(e.target.value)}
            />
          </Space>
          <Dropdown trigger={["click"]} menu={{ items: filterItems }}>
            <Button icon={<FilterOutlined />}>Фильтры</Button>
          </Dropdown>
        </div>
      </div>
      <Table
        pagination={{ pageSize: 20 }}
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        bordered
      />
    </div>
  );
};

export default UsersForm;

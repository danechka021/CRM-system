import { useEffect, useState, memo, useCallback, useMemo } from "react";
import { Input, Space, Button, Dropdown, Divider, Table, Tag } from "antd";
import { FilterOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { getUsers, blockUser, unblockUser } from "../../../api/users";
import { useNavigate } from "react-router-dom";
import { ROLE_COLOR } from "../../../enums";
import UserLockoutButton from "../UsersRightsButton/UserLockoutButton";
import styles from "./UsersForm.module.css";

const { Search } = Input;

const UsersForm = memo(() => {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const loadUsers = async (page, limit) => {
    try {
      const response = await getUsers(page, limit);

      const actualUsers = response.data || [];
      const totalCount = response.meta.totalAmount || 0;

      setUsers(actualUsers);
      setTotal(totalCount);
      setCurrentPage(page);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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
    setUsers(filtered);
  };

  const changeBlockingStatus = useCallback(async (user) => {
    try {
      if (user.isBlocked) {
        await unblockUser(user.id);
      } else {
        await blockUser(user.id);
      }

      loadUsers(currentPage, 20);
    } catch (error) {
      console.log(error);
    }
  }, []);

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

  const columns = useMemo(
    () => [
      {
        title: "Имя",
        dataIndex: "username",
        key: "username",
        width: 160,
        align: "center",
        sorter: (a, b) => a.username.localeCompare(b.username),
        ellipsis: true,
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: 180,
        align: "center",
        sorter: (a, b) => a.email.localeCompare(b.email),
      },
      {
        title: "Телефон",
        dataIndex: "phoneNumber",
        key: "phoneNumber",
        width: 160,
        align: "center",
      },
      {
        title: "Роли",
        dataIndex: "roles",
        key: "roles",
        width: 130,
        align: "center",
        render: (roles) => (
          <>
            {Array.isArray(roles) &&
              roles.map((role) => (
                <Tag color={ROLE_COLOR[role.toLowerCase()]} key={role}>
                  {role}
                </Tag>
              ))}
          </>
        ),
      },
      {
        title: "Блокировка",
        dataIndex: "isBlocked",
        key: "isBlocked",
        width: 120,
        align: "center",
        render: (isBlocked) => (isBlocked ? "+" : "-"),
      },
      {
        title: "Дата регистрации",
        dataIndex: "date",
        key: "date",
        width: 130,
      },
      {
        title: "",
        key: "blocked",
        dataIndex: "isBlocked",
        width: 110,
        align: "center",
        render: (_, user) => {
          return (
            <UserLockoutButton user={user} onAction={changeBlockingStatus} />
          );
        },
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
    ],
    [changeBlockingStatus],
  );

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
        columns={columns}
        dataSource={users}
        rowKey="id"
        bordered
        pagination={{
          pageSize: 20,
          total: total,
          current: currentPage,
          onChange: (page) => loadUsers(page, 20),
          showSizeChanger: false,
        }}
      />
    </div>
  );
});

export default UsersForm;

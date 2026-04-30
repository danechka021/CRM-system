import { useEffect, useState, memo, useCallback, useMemo } from "react";
import {
  Input,
  Space,
  Button,
  Dropdown,
  Divider,
  Table,
  Tag,
  notification,
  Tooltip,
} from "antd";
import { FilterOutlined, DoubleRightOutlined } from "@ant-design/icons";
import {
  getUsers,
  blockUser,
  unblockUser,
  deleteUser,
} from "../../../api/users";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDeleteData } from "../../../hooks/DeleteData/DeleteData";
import { ROLE_COLOR } from "../../../enums";
import UserLockoutButton from "../Button/UserLockoutButton";
import DeleteUserButton from "../Button/DeleteUserButton";
import styles from "./UsersForm.module.css";

const { Search } = Input;

const UsersForm = memo(() => {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);
  const pageSize = 20;

  const loadUsers = async (page, limit, search = "") => {
    try {
      const response = await getUsers({
        page,
        limit,
        search,
        sortyBy: "id",
        sortyOrder: "asc",
      });

      const actualUsers = response.data || [];
      const totalCount = response.meta.totalAmount || 0;

      setUsers(actualUsers);
      setTotal(totalCount);
    } catch (error) {
      notification.error({
        title: "Ошибка загрузки пользователей!",
        description: "Не удалось загрузить пользователей в таблицу",
      });
    }
  };

  useEffect(() => {
    loadUsers(currentPage, pageSize, searchValue);
  }, [currentPage]);

  const handleSearchUsers = () => {
    setSearchParams({ page: 1 });
    loadUsers(1, pageSize, searchValue);
  };

  const changeBlockingStatus = useCallback(
    async (user) => {
      try {
        if (user.isBlocked) {
          await unblockUser(user.id);
        } else {
          await blockUser(user.id);
        }

        loadUsers(currentPage, 20);
      } catch (error) {
        notification.error({
          title: "Ошибка смены статуса блокировки",
        });
      }
    },
    [currentPage],
  );

  const { performDelete: deleteUserId, isDeleting } = useDeleteData(
    deleteUser,
    useCallback(() => loadUsers(currentPage, 20), [currentPage, loadUsers]),
  );

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
        width: 70,
        render: (_, user) => (
          <Tooltip title="Перейти к профилю">
            <Button
              type="text"
              icon={<DoubleRightOutlined />}
              size="large"
              onClick={() => navigate(`/users/${user.id}`)}
            />
          </Tooltip>
        ),
      },
      {
        title: "",
        key: "delete",
        width: 80,
        render: (_, user) => {
          return (
            <DeleteUserButton
              onAction={() => deleteUserId(user.id)}
              user={user}
              loading={isDeleting}
            />
          );
        },
      },
    ],
    [changeBlockingStatus, deleteUserId, navigate],
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
              value={searchValue}
              onChange={(e) => {
                const value = e.target.value;
                setSearchValue(value);

                if (!value) {
                  setSearchParams({ page: 1 });
                  loadUsers(1, pageSize, "");
                }
              }}
              onSearch={handleSearchUsers}
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
          onChange: (page) => setSearchParams({ page }),
          showSizeChanger: false,
        }}
      />
    </div>
  );
});

export default UsersForm;

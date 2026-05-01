import { useEffect, useState, memo, useCallback } from "react";
import { Input, Space, Button, Dropdown, Divider, notification } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import {
  getUsers,
  blockUser,
  unblockUser,
  deleteUser,
  changeUserRights,
} from "../../../api/users";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDeleteData } from "../../../hooks/DeleteData/DeleteData";
import styles from "./UsersForm.module.css";
import UsersTable from "../UsersTable/UsersTable";

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

  const changeCurrentRole = useCallback(
    async (userId, newRoles) => {
      try {
        await changeUserRights(userId, { roles: newRoles });
        loadUsers(currentPage, 20, searchValue);
      } catch (error) {
        notification.error({
          title: "Ошибка при смене ролей",
        });
      }
    },
    [currentPage, searchValue, loadUsers],
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
      <UsersTable
        users={users}
        total={total}
        currentPage={currentPage}
        setSearchParams={setSearchParams}
        navigate={navigate}
        changeBlockingStatus={changeBlockingStatus}
        deleteUserId={deleteUserId}
        isDeleting={isDeleting}
        changeCurrentRole={changeCurrentRole}
      />
    </div>
  );
});

export default UsersForm;

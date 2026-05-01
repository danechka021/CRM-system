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
import { FILTER_MAP } from "../../../enums";

const { Search } = Input;

const UsersForm = memo(() => {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [blockStatus, setBlockStatus] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);
  const pageSize = 20;

  const loadUsers = useCallback(
    async (params = {}) => {
      try {
        const requestParams = {
          page: params.page || currentPage,
          limit: pageSize,
          search: params.search ?? searchValue,
          sortBy: params.sortBy || "id",
          sortOrder: params.sortOrder || "asc",
          isBlocked: params.isBlocked ?? blockStatus,
        };

        const response = await getUsers(requestParams);
        setUsers([...(response.data || [])]);
        setTotal(response.meta.totalAmount || 0);
      } catch (error) {
        notification.error({
          title: "Ошибка загрузки пользователей!",
          description: "Произошла ошибка, повторите попытку!",
        });
      }
    },
    [currentPage, searchValue, blockStatus, pageSize],
  );

  useEffect(() => {
    loadUsers(currentPage, pageSize, searchValue);
  }, [currentPage]);

  const hangleFilteredUsers = ({ key }) => {
    const newFilteredStatus = FILTER_MAP[key];
    setBlockStatus(newFilteredStatus);
    setSearchParams({ page: 1 });
    loadUsers({ isBlocked: newFilteredStatus, page: 1 });
  };

  const handleSearchUsers = () => {
    setSearchParams({ page: 1 });
    loadUsers({ page: 1, search: searchValue });
  };

  const handleSortyUsers = useCallback(
    (field, order) => {
      const sortOrder = order === "descend" ? "desc" : "asc";

      loadUsers({
        sortBy: field || "id",
        sortOrder,
      });
    },
    [loadUsers],
  );

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
      key: "allUsers",
      label: "Все пользователи",
    },
    {
      key: "isBlockedUsers",
      label: "Заблокированные пользователи",
    },
    {
      key: "activeUsers",
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
                  loadUsers({ page: 1, search: "" });
                }
              }}
              onSearch={handleSearchUsers}
            />
          </Space>
          <Dropdown
            trigger={["click"]}
            menu={{
              items: filterItems,
              onClick: hangleFilteredUsers,
              selectable: true,
              defaultSelectedKeys: ["allUsers"],
            }}
          >
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
        handleSortyUsers={handleSortyUsers}
      />
    </div>
  );
});

export default UsersForm;

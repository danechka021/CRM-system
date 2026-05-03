import React, { useEffect, useState, memo, useCallback, useRef } from "react";
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
import { FILTER_MAP, Roles } from "../../../enums";
import { User, UserFilters } from "../../../types";

const { Search } = Input;

const UsersForm: React.FC = memo(() => {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [blockStatus, setBlockStatus] = useState<boolean | null | undefined>(
    null,
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const ref = useRef("");
  const navigate = useNavigate();
  const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);
  const pageSize = 20;

  const loadUsers = useCallback(
    async (params: UserFilters = {}) => {
      try {
        const requestParams = {
          page: params.page || currentPage,
          limit: pageSize,
          search: params.search !== undefined ? params.search : ref.current,
          sortBy: params.sortBy || "id",
          sortOrder: params.sortOrder || "asc",
          isBlocked: params.isBlocked ?? blockStatus ?? undefined,
        } as UserFilters;

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
    [currentPage, blockStatus, pageSize],
  );

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleFilteredUsers = (info: { key: string }) => {
    const key = info.key;

    if (key in FILTER_MAP) {
      const k = key as keyof typeof FILTER_MAP;
      const newFilteredStatus = FILTER_MAP[k];
      setBlockStatus(newFilteredStatus);
      setSearchParams({ page: "1" });
      loadUsers({
        page: 1,
        ...(typeof newFilteredStatus === "boolean" && {
          isBlocked: newFilteredStatus,
        }),
      });
    }
  };

  const handleSearchUsers = (value: string) => {
    ref.current = value;
    setSearchParams({ page: "1" });
    loadUsers({ page: 1, search: value });
  };

  const handleSortyUsers = useCallback(
    (
      field: string | undefined,
      order: "ascebd" | "descend" | null | undefined,
    ) => {
      const sortOrder = order === "descend" ? "desc" : "asc";

      loadUsers({
        sortBy: field || "id",
        sortOrder,
      });
    },
    [loadUsers],
  );

  const changeBlockingStatus = useCallback(
    async (user: User) => {
      try {
        user.isBlocked ? await unblockUser(user.id) : await blockUser(user.id);

        await loadUsers();
      } catch (error) {
        notification.error({
          title: "Ошибка смены статуса блокировки",
        });
      }
    },
    [loadUsers],
  );

  const changeCurrentRole = useCallback(
    async (userId: number, newRoles: Roles[]) => {
      try {
        await changeUserRights(userId, { roles: newRoles });
        await loadUsers();
      } catch (error) {
        notification.error({
          title: "Ошибка при смене ролей",
        });
      }
    },
    [loadUsers],
  );

  const { performDelete: deleteUserId } = useDeleteData(
    deleteUser,
    useCallback(
      () => loadUsers({ page: currentPage }),
      [currentPage, loadUsers],
    ),
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
          <Space vertical>
            <Search
              placeholder="Поиск по имени или email"
              enterButton
              allowClear
              size="large"
              style={{ width: "30rem" }}
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              onSearch={handleSearchUsers}
            />
          </Space>
          <Dropdown
            trigger={["click"]}
            menu={{
              items: filterItems,
              onClick: handleFilteredUsers,
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
        changeCurrentRole={changeCurrentRole}
        handleSortyUsers={handleSortyUsers}
      />
    </div>
  );
});

export default UsersForm;

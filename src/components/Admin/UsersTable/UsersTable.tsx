import React, { useState } from "react";
import { Table, Tag, Tooltip, Button, Select, Popconfirm, Popover } from "antd";
import { DoubleRightOutlined, MoreOutlined } from "@ant-design/icons";
import { TableProps } from "antd";
import { SorterResult } from "antd/es/table/interface";
import { ROLE_COLOR, Roles } from "../../../enums";
import { User } from "../../../types";
import UserLockoutButton from "../Button/UserLockoutButton";
import DeleteUserButton from "../Button/DeleteUserButton";
import styles from "./UserTable.module.css";
import { TableColumnsType } from "antd";

interface UserTableProps {
  users: User[];
  total: number;
  currentPage: number;
  setSearchParams: (params: any) => void;
  navigate: (path: string) => void;
  changeBlockingStatus: (user: User) => Promise<void> | void;
  deleteUserId: (id: number) => void;
  changeCurrentRole: (
    userId: number,
    newRoles: Roles[],
  ) => Promise<void> | void;
  handleSortyUsers: (field: string | undefined, order: any) => void;
}

const UsersTable: React.FC<UserTableProps> = ({
  users,
  total,
  currentPage,
  setSearchParams,
  navigate,
  changeBlockingStatus,
  deleteUserId,
  changeCurrentRole,
  handleSortyUsers,
}) => {
  const [visibleId, setVisibleId] = useState<number | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<Roles[]>([]);

  const handleTableChange: TableProps<User>[`onChange`] = (
    _pagination,
    _filters,
    sorter,
  ) => {
    const newSorter = sorter as SorterResult<User>;
    handleSortyUsers(newSorter.field as string, newSorter.order);
  };

  const columns: TableColumnsType<User> = [
    {
      title: "Имя",
      dataIndex: "username",
      key: "username",
      width: 160,
      align: "center",
      sorter: true,
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 180,
      align: "center",
      sorter: true,
    },
    {
      title: "Телефон",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 130,
      align: "center",
    },
    {
      title: "Роли",
      dataIndex: "roles",
      key: "roles",
      width: 110,
      align: "center",
      render: (roles: Roles[]) => (
        <>
          {Array.isArray(roles) &&
            roles.map((role) => (
              <Tag
                color={
                  ROLE_COLOR[role.toLowerCase() as keyof typeof ROLE_COLOR]
                }
                key={role}
              >
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
      render: (isBlocked: boolean) => (isBlocked ? "+" : "-"),
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
      render: (_: boolean, user: User) => {
        return (
          <Popconfirm
            title="Изменить статус блокировки?"
            okText="Да"
            cancelText="Нет"
            onConfirm={() => changeBlockingStatus(user)}
          >
            <UserLockoutButton user={user} />
          </Popconfirm>
        );
      },
    },
    {
      title: "",
      key: "action",
      width: 50,
      align: "center",
      render: (_: boolean, user: User) => (
        <Tooltip title="Перейти к профилю">
          <Button
            size="small"
            type="text"
            icon={<DoubleRightOutlined />}
            onClick={() => navigate(`/users/${user.id}`)}
          />
        </Tooltip>
      ),
    },
    {
      title: "",
      key: "delete",
      width: 60,
      render: (_: boolean, user: User) => {
        return (
          <DeleteUserButton
            onDelete={() => deleteUserId(user.id)}
            user={user}
          />
        );
      },
    },
    {
      title: "",
      key: "isRights",
      width: 70,
      align: "center",
      render: (_: boolean, user: User) => {
        const isOpen = visibleId === user.id;

        const roleMenu = (
          <div className={styles.menuRole}>
            <div>
              <Select
                mode="multiple"
                allowClear
                placeholder="Управление ролями"
                value={selectedRoles}
                options={[
                  { value: "ADMIN", label: "ADMIN" },
                  { value: "MODERATOR", label: "MODERATOR" },
                  { value: "USER", label: "USER" },
                ]}
                onChange={(values) => {
                  setSelectedRoles(values);
                }}
                className={styles.selectRoleMenu}
              />
            </div>
            <div className={styles.Button}>
              <div>
                <Button
                  type="primary"
                  danger
                  onClick={() => setVisibleId(null)}
                >
                  Отменить
                </Button>
              </div>
              <div>
                <Popconfirm
                  title="Измнеить роль"
                  onConfirm={async () => {
                    await changeCurrentRole(user.id, selectedRoles);
                    setVisibleId(null);
                  }}
                  okText="Да"
                  cancelText="Нет"
                >
                  <Button type="primary">Сохрнаить</Button>
                </Popconfirm>
              </div>
            </div>
          </div>
        );

        return (
          <Popover
            content={roleMenu}
            trigger="click"
            open={isOpen}
            onOpenChange={(visible: boolean) => {
              if (visible) {
                setVisibleId(user.id);
                setSelectedRoles(user.roles || []);
              } else {
                setVisibleId(null);
              }
            }}
          >
            <Tooltip title="Управлять текущими ролями">
              <Button icon={<MoreOutlined />} />
            </Tooltip>
          </Popover>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        bordered
        onChange={handleTableChange}
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
};

export default UsersTable;

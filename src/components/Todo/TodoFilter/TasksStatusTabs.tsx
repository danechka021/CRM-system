import { useCallback, memo } from "react";
import { Dispatch } from "react";
import { TodoInfo, TodoStatus } from "../../../types";
import { Tabs } from "antd";
import styles from "./TasksStatusTabs.module.css";

interface TasksStatusTabsProps {
  setSelectedTaskFilter: Dispatch<React.SetStateAction<TodoStatus>>;
  selectedTaskFilter: TodoStatus;
  countTasks: TodoInfo;
}

const TasksStatusTabs = memo(
  ({
    setSelectedTaskFilter,
    countTasks,
    selectedTaskFilter,
  }: TasksStatusTabsProps) => {
    const handleFilterChange = useCallback(
      (key: string) => {
        setSelectedTaskFilter(key as TodoStatus);
      },
      [setSelectedTaskFilter],
    );

    const items = [
      {
        key: TodoStatus.ALL,
        label: `Все (${countTasks.all})`,
      },
      {
        key: TodoStatus.IN_WORK,
        label: `В работе (${countTasks.inWork})`,
      },
      {
        key: TodoStatus.COMPLETED,
        label: `Сделано (${countTasks.completed})`,
      },
    ];

    return (
      <div className={styles.taskForm}>
        <Tabs
          activeKey={selectedTaskFilter}
          onChange={handleFilterChange}
          size="large"
          centered
          items={items}
          className={styles.formControl}
        ></Tabs>
      </div>
    );
  },
);

export default TasksStatusTabs;

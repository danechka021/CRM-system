import { Dispatch } from "react";
import { TodoInfo, TodoStatus } from "../../../types";
import { Tabs } from "antd";
import styles from "./TasksStatusTabs.module.css";

interface TasksStatusTabsProps {
  setSelectedTaskFilter: Dispatch<React.SetStateAction<TodoStatus>>;
  selectedTaskFilter: TodoStatus;
  countTasks: TodoInfo;
}

const TasksStatusTabs = ({
  setSelectedTaskFilter,
  countTasks,
  selectedTaskFilter,
}: TasksStatusTabsProps) => {
  const handleFilterChange = (key: string) => {
    setSelectedTaskFilter(key as TodoStatus);
  };
  return (
    <div className={styles.taskForm}>
      <Tabs
        activeKey={selectedTaskFilter}
        onChange={handleFilterChange}
        size="large"
        centered
        items={[
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
        ]}
        className={styles.formControl}
      ></Tabs>
    </div>
  );
};

export default TasksStatusTabs;

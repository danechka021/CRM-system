import { Dispatch } from "react";
import { TodoInfo, TaskStatus } from "../../types";
import { Tabs } from "antd";
import styles from "./TasksStatusTabs.module.css";

interface TasksStatusTabsProps {
  setSelectedTaskFilter: Dispatch<React.SetStateAction<TaskStatus>>;
  selectedTaskFilter: TaskStatus;
  countTasks: TodoInfo;
}

const TasksStatusTabs = ({
  setSelectedTaskFilter,
  countTasks,
  selectedTaskFilter,
}: TasksStatusTabsProps) => {
  const handleChange = (key: string) => {
    setSelectedTaskFilter(key as TaskStatus);
  };
  return (
    <>
      <Tabs
        activeKey={selectedTaskFilter}
        onChange={handleChange}
        size="large"
        centered
        items={[
          {
            key: TaskStatus.ALL,
            label: `Все (${countTasks.all})`,
          },
          {
            key: TaskStatus.IN_WORK,
            label: `В работе (${countTasks.inWork})`,
          },
          {
            key: TaskStatus.COMPLETED,
            label: `Сделанно (${countTasks.completed})`,
          },
        ]}
        className={styles.formControl}
      ></Tabs>
    </>
  );
};

export default TasksStatusTabs;

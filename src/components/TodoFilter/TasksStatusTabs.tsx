import { Dispatch } from "react";
import { TodoInfo, TaskStatus } from "../../types";
import { Tabs } from "antd";

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
      >
        <Tabs.TabPane tab={`Все (${countTasks.all})`} key={TaskStatus.ALL} />
        <Tabs.TabPane
          tab={`В работе (${countTasks.inWork})`}
          key={TaskStatus.IN_WORK}
        />
        <Tabs.TabPane
          tab={`Сделано (${countTasks.completed})`}
          key={TaskStatus.COMPLETED}
        />
      </Tabs>
    </>
  );
};

export default TasksStatusTabs;

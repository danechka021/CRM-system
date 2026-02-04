import styles from "../TodoFilter/TasksStatusTabs.module.css";
import Tab from "../../ui/Tab/Tab";
import { Dispatch } from "react";
import { TodoInfo } from "../../types";
import { TaskStatus } from "../../types";

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
  return (
    <div className={styles.button}>
      <Tab
        isActive={selectedTaskFilter === TaskStatus.ALL}
        onClick={() => setSelectedTaskFilter(TaskStatus.ALL)}
      >
        Все ({countTasks.all})
      </Tab>

      <Tab
        isActive={selectedTaskFilter === TaskStatus.IN_WORK}
        onClick={() => setSelectedTaskFilter(TaskStatus.IN_WORK)}
      >
        В работе ({countTasks.inWork})
      </Tab>

      <Tab
        isActive={selectedTaskFilter === TaskStatus.COMPLETED}
        onClick={() => setSelectedTaskFilter(TaskStatus.COMPLETED)}
      >
        Сделано ({countTasks.completed})
      </Tab>
    </div>
  );
};

export default TasksStatusTabs;

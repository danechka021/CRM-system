import styles from "../TodoFilter/TasksStatusTabs.module.css";
import Tab from "../../ui/Tab/Tab";
import { Dispatch } from "react";
import { TodoInfo } from "../../types";
import { TaskStatus } from "../enums/task-status.enum";

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
        style={{
          color:
            selectedTaskFilter === TaskStatus.ALL
              ? ColorText.BLUE
              : ColorText.BLACK,
        }}
        onClick={() => setSelectedTaskFilter(TaskStatus.ALL)}
      >
        Все ({countTasks.all})
      </Tab>

      <Tab
        style={{
          color:
            selectedTaskFilter === TaskStatus.IN_WORK
              ? ColorText.BLUE
              : ColorText.BLACK,
        }}
        onClick={() => setSelectedTaskFilter(TaskStatus.IN_WORK)}
      >
        В работе ({countTasks.inWork})
      </Tab>

      <Tab
        style={{
          color:
            selectedTaskFilter === TaskStatus.COMPLETED
              ? ColorText.BLUE
              : ColorText.BLACK,
        }}
        onClick={() => setSelectedTaskFilter(TaskStatus.COMPLETED)}
      >
        Сделано ({countTasks.completed})
      </Tab>
    </div>
  );
};

export default TasksStatusTabs;

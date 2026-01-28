import styles from "../TodoFilter/TasksStatusTabs.module.css";
import Tab from "../../ui/Tab/Tab";
import { Dispatch } from "react";

interface TasksStatusTabsProps {
  setSelectedTaskFilter: Dispatch<React.SetStateAction<string>>;
  selectedTaskFilter: string;
  countTasks: {
    all: number;
    inWork: number;
    completed: number;
  };
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
          color: selectedTaskFilter === "all" ? "blue" : "black",
        }}
        onClick={() => setSelectedTaskFilter("all")}
      >
        Все ({countTasks.all})
      </Tab>

      <Tab
        style={{
          color: selectedTaskFilter === "inWork" ? "blue" : "black",
        }}
        onClick={() => setSelectedTaskFilter("inWork")}
      >
        В работе ({countTasks.inWork})
      </Tab>

      <Tab
        style={{
          color: selectedTaskFilter === "completed" ? "blue" : "black",
        }}
        onClick={() => setSelectedTaskFilter("completed")}
      >
        Сделано ({countTasks.completed})
      </Tab>
    </div>
  );
};

export default TasksStatusTabs;

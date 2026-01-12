import styles from "../TodoFilter/TasksStatusTabs.module.css";

const TasksStatusTabs = ({
  setSelectedTaskFilter,
  countTasks,
  selectedTaskFilter,
}) => {
  return (
    <>
      <div className={styles.button}>
        <button
          className={styles.allButton}
          style={{
            color: selectedTaskFilter === "all" ? "blue" : "black",
          }}
          onClick={() => setSelectedTaskFilter("all")}
        >
          Все ({countTasks.all})
        </button>
        <button
          className={styles.inWorkButton}
          style={{
            color: selectedTaskFilter === "inWork" ? "blue" : "black",
          }}
          onClick={() => setSelectedTaskFilter("inWork")}
        >
          В работе ({countTasks.inWork})
        </button>
        <button
          className={styles.completedButton}
          style={{
            color: selectedTaskFilter === "completed" ? "blue" : "black",
          }}
          onClick={() => setSelectedTaskFilter("completed")}
        >
          Сделано ({countTasks.completed})
        </button>
      </div>
    </>
  );
};

export default TasksStatusTabs;

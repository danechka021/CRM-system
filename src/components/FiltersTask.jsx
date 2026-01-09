import styles from "./FiltersTask.module.css";

const FiltersTask = ({
  setFilteredTask,
  inWorkCount,
  totalCount,
  completedCount,
  filteredTasks,
}) => {
  return (
    <>
      <div className={styles.button}>
        <button
          className={styles.allButton}
          style={{
            color: filteredTasks === "all" ? "blue" : "black",
          }}
          onClick={() => setFilteredTask("all")}
        >
          Все ({totalCount})
        </button>
        <button
          className={styles.inWorkButton}
          style={{
            color: filteredTasks === "inWork" ? "blue" : "black",
          }}
          onClick={() => setFilteredTask("inWork")}
        >
          В работе ({inWorkCount})
        </button>
        <button
          className={styles.completedButton}
          style={{
            color: filteredTasks === "completed" ? "blue" : "black",
          }}
          onClick={() => setFilteredTask("completed")}
        >
          Сделано ({completedCount})
        </button>
      </div>
    </>
  );
};

export default FiltersTask;

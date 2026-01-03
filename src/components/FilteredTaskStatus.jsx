import styles from "./FilteredTaskStatus.module.css";

const FilteredTaskStatus = ({
  setFilteredTask,
  inWorkCount,
  totalCount,
  completedCount,
}) => {
  return (
    <>
      <div className={styles.button}>
        <button
          className={styles.allButton}
          onClick={() => setFilteredTask("all")}
        >
          Все ({totalCount})
        </button>
        <button
          className={styles.inWorkButton}
          onClick={() => setFilteredTask("inWork")}
        >
          В работе ({inWorkCount})
        </button>
        <button
          className={styles.completedButton}
          onClick={() => setFilteredTask("completed")}
        >
          Сделано ({completedCount})
        </button>
      </div>
    </>
  );
};

export default FilteredTaskStatus;

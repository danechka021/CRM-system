import styles from "./FilteredTaskStatus.module.css";

const FilteredTaskStatus = ({ setFilteredTask }) => {
  return (
    <>
      <div className={styles.button}>
        <button
          className={styles.allButton}
          onClick={() => setFilteredTask("all")}
        >
          Все
        </button>
        <button
          className={styles.inWorkButton}
          onClick={() => setFilteredTask("inWork")}
        >
          В работе
        </button>
        <button
          className={styles.completedButton}
          onClick={() => setFilteredTask("completed")}
        >
          Сделано
        </button>
      </div>
    </>
  );
};

export default FilteredTaskStatus;

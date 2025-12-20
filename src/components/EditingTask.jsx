import styles from "./EditingTask.module.css";

const EditingTask = ({ value, setValue, onSave, onCansel }) => {
  return (
    <>
      <div className={styles.container}>
        <input
          className={styles.input}
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <div className={styles.button}>
          <button className={styles.buttonCancel} onClick={onCansel}>
            Отмена
          </button>
          <button className={styles.buttonSave} onClick={onSave}>
            Сохранить
          </button>
        </div>
      </div>
    </>
  );
};

export default EditingTask;

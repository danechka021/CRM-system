import { useState } from "react";
import styles from "./AddTask.module.css";
import { addTask } from "../../api/tasks";

const AddTask = ({ onAddTask, handleError }) => {
  const [taskName, setTaskName] = useState("");

  const addNewTask = async () => {
    try {
      const titleTrim = taskName.trim();
      if (!titleTrim) {
        throw new Error("Это поле не может быть пустым");
      } else if (titleTrim.length < 2) {
        throw new Error("Минимальная длина текста 2 символа");
      } else if (titleTrim.length > 64) {
        throw new Error("Максимальная длина текста 64 символа.");
      }

      await addTask(titleTrim, false);
      setTaskName("");
      onAddTask();
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <>
      <div className={styles.mainContainer}>
        <input
          className={styles.input}
          type="text"
          value={taskName}
          onChange={(event) => setTaskName(event.target.value)}
          id="task"
          placeholder="Task To Be Done..."
        />
        <button className={styles.button} onClick={addNewTask}>
          Add
        </button>
      </div>
    </>
  );
};

export default AddTask;

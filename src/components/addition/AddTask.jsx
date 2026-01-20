import { useState } from "react";
import styles from "./AddTask.module.css";
import { addTask } from "../../api/tasks";

import Button from "../../ui/Button/Button.jsx";
import Input from "../../ui/Input/Input.jsx";

const AddTask = ({ onUpdtaeTask, correctRequest }) => {
  const [taskName, setTaskName] = useState("");

  const addNewTask = async () => {
    const error = correctRequest(taskName);

    if (error) {
      alert(error);
      return;
    }
    try {
      const titleTrim = taskName.trim();

      await addTask(titleTrim, false);
      setTaskName("");
      onUpdtaeTask();
    } catch (error) {
      alert(error.message || "Произошла ошибка");
      console.log(error);
    }
  };
  return (
    <div className={styles.mainContainer}>
      <Input
        value={taskName}
        onChange={(event) => setTaskName(event.target.value)}
        placeholder="Task To Be Done..."
      />
      <Button onClick={addNewTask}>Add</Button>
    </div>
  );
};

export default AddTask;

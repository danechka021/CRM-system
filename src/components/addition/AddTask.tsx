import { useState } from "react";
import styles from "./AddTask.module.css";
import { addTask } from "../../api/tasks";

import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";
import { correctVlidation } from "../../utils";

interface AddTaskProps {
  onUpdateTask: () => void;
}

const AddTask = ({ onUpdateTask }: AddTaskProps) => {
  const [taskName, setTaskName] = useState("");

  const addNewTask = async (): Promise<void> => {
    const error = correctVlidation(taskName);

    if (error) {
      alert(error);
      return;
    }
    try {
      const titleTrim = taskName.trim();

      await addTask({ title: titleTrim, isDone: false });
      setTaskName("");
      onUpdateTask();
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else alert("Неизвестная ошибка");
    }
  };
  return (
    <div className={styles.mainContainer}>
      <Input
        value={taskName}
        onChange={(value: string) => setTaskName(value)}
        placeholder="Task To Be Done..."
      />
      <Button choiseOption="add" onClick={addNewTask}>
        Add
      </Button>
    </div>
  );
};

export default AddTask;

import { useState } from "react";
import styles from "./AddTask.module.css";
import { addTask } from "../../api/tasks";

import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";

interface AddTaskProps {
  onUpdateTask: () => void;
  correctRequest: (title: string) => string | undefined;
}

const AddTask = ({ onUpdateTask, correctRequest }: AddTaskProps) => {
  const [taskName, setTaskName] = useState("");

  const addNewTask = async (): Promise<void> => {
    const error = correctRequest(taskName);

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
        alert(error.message || "Произошла ошибка");
        console.log(error);
      }
    }
  };
  return (
    <div className={styles.mainContainer}>
      <Input
        value={taskName}
        onChange={(value: string) => setTaskName(value)}
        placeholder="Task To Be Done..."
      />
      <Button onClick={addNewTask}>Add</Button>
    </div>
  );
};

export default AddTask;

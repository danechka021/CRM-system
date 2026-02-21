import { useEffect, useRef, useState } from "react";
import styles from "./AddTask.module.css";
import { addTask } from "../../api/tasks";
import { Button, Input, message, InputRef, Form } from "antd";

import { validateTodoTitle } from "../../utils";

interface AddTaskProps {
  onUpdateTask: () => void;
}

const AddTask = ({ onUpdateTask }: AddTaskProps) => {
  const [taskName, setTaskName] = useState("");
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleAddTask = async (): Promise<void> => {
    const error = validateTodoTitle(taskName);

    if (error) {
      message.error(error);
      return;
    }
    try {
      const titleTrim = taskName.trim();

      await addTask({ title: titleTrim, isDone: false });
      setTaskName("");
      onUpdateTask();
      inputRef.current?.focus();
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else alert("Неизвестная ошибка");
    }
  };
  return (
    <Form onFinish={handleAddTask} className={styles.formControl}>
      <Form.Item name="title">
        <Input
          ref={inputRef}
          placeholder="Task to be done..."
          variant="underlined"
          value={taskName}
          onChange={(event) => setTaskName(event.target.value)}
          className={styles.inputForm}
          size="large"
        />
      </Form.Item>

      <Button htmlType="submit" type="primary" className={styles.heightControl}>
        Add
      </Button>
    </Form>
  );
};

export default AddTask;

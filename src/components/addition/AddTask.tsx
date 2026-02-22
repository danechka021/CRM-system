import { useEffect, useRef, useState } from "react";
import styles from "./AddTask.module.css";
import { addTask } from "../../api/tasks";
import { Button, Input, message, InputRef, Form, notification } from "antd";

import { validateTodoTitle } from "../../utils";

interface AddTaskProps {
  onUpdateTask: () => void;
}

const AddTask = ({ onUpdateTask }: AddTaskProps) => {
  const [form] = Form.useForm();
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleAddTask = async (values: { title: string }): Promise<void> => {
    const title = values.title || "";

    const error = validateTodoTitle(title);
    if (error) {
      message.error(error);
      return;
    }
    try {
      const titleTrim = title.trim();

      await addTask({ title: titleTrim, isDone: false });

      form.resetFields();
      onUpdateTask();
      inputRef.current?.focus();
    } catch (error: unknown) {
      if (error instanceof Error) {
        const descriptions =
          error instanceof Error ? error.message : "Попробуйте позже";

        notification.error({
          message: "Ошибка при добавлении задачи",
          description: descriptions,
          placement: "topRight",
        });
      }
    }
  };
  return (
    <Form form={form} onFinish={handleAddTask} className={styles.formControl}>
      <Form.Item name="title">
        <Input
          ref={inputRef}
          placeholder="Task to be done..."
          variant="underlined"
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

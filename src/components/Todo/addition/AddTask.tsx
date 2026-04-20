import React, { useCallback, useEffect, useRef, useState, memo } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { addNewTask } from "../../../store/slices/todoSlice";

import styles from "./AddTask.module.css";
import { Button, Input, InputRef, Form, notification } from "antd";

interface TaskFormValues {
  title: string;
}

const AddTask: React.FC = memo(() => {
  const [form] = Form.useForm<TaskFormValues>();
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<InputRef>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleAddTask = useCallback(
    async (values: TaskFormValues): Promise<void> => {
      const trimmedTitle = values.title.trim();
      if (!trimmedTitle) return;
      setLoading(true);

      try {
        await dispatch(addNewTask(trimmedTitle)).unwrap();

        form.resetFields();
        inputRef.current?.focus();
      } catch (error: unknown) {
        notification.error({
          message: "Ошибка",
          description:
            error instanceof Error ? error.message : "Ошибка сервера",
        });
      } finally {
        setLoading(false);
      }
    },
    [dispatch, form],
  );

  return (
    <Form form={form} onFinish={handleAddTask} className={styles.formControl}>
      <Form.Item
        name="title"
        className={styles.titleItem}
        rules={[
          { required: true, message: "Это поле не может быть пустым" },
          {
            whitespace: true,
            message: "Это поле не может быть пустым",
          },
          {
            min: 2,
            message: "Минимальня длина текста 2 символа",
          },
          {
            max: 64,
            message: "Максимальная длина текста 64 символа",
          },
        ]}
      >
        <Input
          ref={inputRef}
          placeholder="Task to be done..."
          className={styles.inputForm}
          size="large"
          disabled={loading}
          variant="borderless"
        />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          type="primary"
          loading={loading}
          className={styles.heightControl}
        >
          Add
        </Button>
      </Form.Item>
    </Form>
  );
});

export default AddTask;

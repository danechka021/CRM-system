import { JSX, useEffect, useRef, useState } from "react";
import styles from "./AddTask.module.css";
import { addTask } from "../../api/tasks";
import { Button, Input, InputRef, Form, notification } from "antd";
import { validateTodoTitle } from "../../utils";

interface AddTaskProps {
  onUpdateTask: () => void;
}

interface TaskFormValues {
  title: string;
}

const AddTask: React.FC<AddTaskProps> = ({
  onUpdateTask,
}: AddTaskProps): JSX.Element => {
  const [form] = Form.useForm<TaskFormValues>();
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleAddTask = async (values: TaskFormValues): Promise<void> => {
    setLoading(true);

    try {
      await addTask({
        title: values.title.trim(),
        isDone: false,
      });

      form.resetFields();
      onUpdateTask();
      inputRef.current?.focus();
    } catch (error: unknown) {
      notification.error({
        message: "Ошибка",
        description: error instanceof Error ? error.message : "Ошибка сервера",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={handleAddTask} className={styles.formControl}>
      <Form.Item
        name="title"
        className={styles.titleItem}
        rules={[
          {
            validator: (_, value) => {
              const errorTeaxt = validateTodoTitle(value || "");

              if (errorTeaxt) {
                return Promise.reject(new Error(errorTeaxt));
              }
              return Promise.resolve();
            },
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
};

export default AddTask;

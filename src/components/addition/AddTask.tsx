import { JSX, useEffect, useRef, useState } from "react";
import styles from "./AddTask.module.css";
import { addTask } from "../../api/tasks";
import { Button, Input, InputRef, Form, notification } from "antd";

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
};

export default AddTask;

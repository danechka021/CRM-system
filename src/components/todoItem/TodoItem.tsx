import { useState, useRef, useEffect, JSX } from "react";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Checkbox, Button, Input, InputRef, Form, notification } from "antd";

import styles from "../todoItem/TodoItem.module.css";
import { updateTasks, deleteTask } from "../../api/tasks";
import { Todo } from "../../types";
import { validateTodoTitle } from "../../utils";

interface TodoItemProps {
  task: Todo;
  fetchTodos: () => void;
  setEditingTaskId: (id: number | null) => void;
}
const TodoItem = ({
  task,
  fetchTodos,
  setEditingTaskId,
}: TodoItemProps): JSX.Element => {
  //Для редактирования задач
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  //Выбор статуса задачи

  const changeTaskStatus = async (task: Todo): Promise<void> => {
    try {
      await updateTasks(task.id, { isDone: !task.isDone });
      await fetchTodos();
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

  //редактирование задачи

  const handleStartEditingTask = (task: Todo) => {
    setIsEditing(true);
    setEditingTaskId(task.id);
    form.setFieldsValue({ title: task.title });
  };

  const handleCancelEditingTask = () => {
    setIsEditing(false);
    setEditingTaskId(null);
    form.resetFields();
  };

  const handleSaveEditingTask = async (values: {
    title: string;
  }): Promise<void> => {
    const error = validateTodoTitle(values.title || "");

    if (error) {
      notification.error({
        message: "Ошибка валидации",
        description: error,
        placement: "topRight",
      });
      return;
    }
    setLoading(true);

    try {
      await updateTasks(task.id, { title: values.title.trim() });
      await fetchTodos();
      handleCancelEditingTask();
      notification.success({ message: "Задача обновлена" });
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  //Удаление задачи

  const handleDeleteTask = async (id: number): Promise<void> => {
    try {
      await deleteTask(id);
      await fetchTodos();
    } catch (error: unknown) {
      const descriptions =
        error instanceof Error ? error.message : "Попробуйте позже";
      notification.error({
        message: "Ошибка удаления",
        description: descriptions,
      });
    }
  };

  return (
    <div>
      <li className={styles.li} key={task.id}>
        {isEditing ? (
          <Form
            form={form}
            onFinish={handleSaveEditingTask}
            initialValues={{ title: task.title }}
          >
            <div className={styles.container}>
              <Form.Item name="title" noStyle>
                <Input
                  size="large"
                  ref={inputRef}
                  placeholder="Task to be done..."
                  variant="underlined"
                  className={styles.input}
                  disabled={loading}
                />
              </Form.Item>

              <div className={styles.button}>
                <Button size="large" onClick={handleCancelEditingTask}>
                  Отмена
                </Button>

                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                >
                  Сохранить
                </Button>
              </div>
            </div>
          </Form>
        ) : (
          <>
            <label className={styles.mainCheckbox}>
              <Checkbox
                onChange={() => changeTaskStatus(task)}
                checked={task.isDone}
              />
            </label>

            <span
              className={`${styles.taskText} ${
                task.isDone ? styles.taskTextDone : ""
              }`}
            >
              {task.title}
            </span>

            <div className={styles.buttonGroup}>
              <EditTwoTone
                onClick={() => handleStartEditingTask(task)}
                className={styles.customIcon}
              />

              <DeleteTwoTone
                className={styles.customIcon}
                onClick={() => handleDeleteTask(task.id)}
                twoToneColor="red"
              />
            </div>
          </>
        )}
      </li>
    </div>
  );
};

export default TodoItem;

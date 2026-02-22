import { useState, useRef, useEffect } from "react";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import {
  Checkbox,
  Button,
  Input,
  message,
  InputRef,
  Form,
  notification,
} from "antd";

import styles from "../todoItem/TodoItem.module.css";
import { updatesTask, deleteTask } from "../../api/tasks";
import { Todo } from "../../types";
import { validateTodoTitle } from "../../utils";

interface TodoItemProps {
  task: Todo;
  onUpdateTask: () => void;
  setEditingTaskId: (id: number | null) => void;
}
const TodoItem = ({ task, onUpdateTask, setEditingTaskId }: TodoItemProps) => {
  //Для редактирования задач
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  //Выбор статуса задачи

  const changeTaskStatus = async (task: Todo): Promise<void> => {
    try {
      await updatesTask(task.id, { isDone: !task.isDone });
      await onUpdateTask();
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

  const handleCanselEditingTask = () => {
    setIsEditing(false);
    setEditingTaskId(null);
  };

  const handleSaveEditingTask = async (values: {
    title: string;
  }): Promise<void> => {
    const { title } = values;
    const error = validateTodoTitle(title);

    if (error) {
      message.error(error);
      return;
    }

    try {
      const titleTrim = title.trim();
      await updatesTask(task.id, { title: titleTrim });
      await onUpdateTask();
      handleCanselEditingTask();
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else alert("Неизвестаня ошибка");
    }
  };

  //Удаление задачи

  const handleDeleteTask = async (id: number): Promise<void> => {
    try {
      await deleteTask(id);
      await onUpdateTask();
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else "Неизыестная ошибка";
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
                />
              </Form.Item>

              <div className={styles.button}>
                <Button onClick={handleCanselEditingTask}>Отмена</Button>

                <Button type="primary" htmlType="submit">
                  Сохрнаить
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

import { useState, useRef, useEffect } from "react";

import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Checkbox, Button, Input, message, InputRef, Form } from "antd";

import styles from "../todoItem/TodoItem.module.css";
import { updatesTheTask, deleteTask } from "../../api/tasks";
import { Todo } from "../../types";
import { validateTodoTitle } from "../../utils";

interface TodoItemProps {
  task: Todo;
  onUpdateTask: () => void;
  setEditingTaskId: (id: number | null) => void;
}
const TodoItem = ({ task, onUpdateTask, setEditingTaskId }: TodoItemProps) => {
  //Для редактирования задач
  const [editingTitle, setEditingTitle] = useState<string>("");
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
      await updatesTheTask(task.id, { isDone: !task.isDone });
      await onUpdateTask();
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else alert("Неизвестная ошибка");
    }
  };

  //редактирование задачи

  const handleStartEditingTask = (task: Todo) => {
    setEditingTitle(task.title);
    setIsEditing(true);
    setEditingTaskId(task.id);
  };

  const handleCanselEditingTask = () => {
    setIsEditing(false);
    setEditingTaskId(null);
  };

  const handleSaveEditingTask = async (task: Todo): Promise<void> => {
    const error = validateTodoTitle(editingTitle);

    if (error) {
      message.error(error);
      return;
    }

    try {
      const titleTrim = editingTitle.trim();

      await updatesTheTask(task.id, { title: titleTrim });
      await onUpdateTask();
      handleCanselEditingTask();
      setEditingTaskId(null);
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
          <Form onFinish={handleCanselEditingTask}>
            <div className={styles.container}>
              <Input
                size="large"
                ref={inputRef}
                type="text"
                value={editingTitle}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setEditingTitle(event.target.value)
                }
                placeholder="Task to be done..."
                variant="underlined"
                className={styles.input}
              />

              <div className={styles.button}>
                <Button htmlType="submit">Отмена</Button>
                <Button onClick={() => handleSaveEditingTask(task)}>
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

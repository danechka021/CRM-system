import logoEdit from "../../assets/edit.png";
import logoDel from "../../assets/delete.png";

import { useState } from "react";
import styles from "../todoItem/TodoItem.module.css";

import { updatedTask, deleteTask } from "../../api/tasks";
import IconButton from "../../ui/IconButton/IconButton";
import Checkbox from "../../ui/Checkbox/Checkbox";
import { Task } from "../../types";
import { correctVlidation } from "../../utils";

interface TodoItemProps {
  task: Task;
  onUpdateTask: () => void;
}

const TodoItem = ({ task, onUpdateTask }: TodoItemProps) => {
  //Для редактирования задач
  const [editingTitle, setEditingTitle] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  //Выбор статуса задачи

  const changeTaskStatus = async (task: Task): Promise<void> => {
    try {
      await updatedTask(task.id, { isDone: !task.isDone });
      await onUpdateTask();
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else alert("Неизвестная ошибка");
    }
  };

  //редактирование задачи

  const startEditingTask = (task: Task) => {
    setEditingTitle(task.title);
    setIsEditing(true);
  };

  const canselEditingTask = () => {
    setIsEditing(false);
  };

  const saveEditingTask = async (task: Task): Promise<void> => {
    const error = correctVlidation(editingTitle);

    if (error) {
      alert(error);
      return;
    }

    try {
      const titleTrim = editingTitle.trim();

      await updatedTask(task.id, { title: titleTrim });
      await onUpdateTask();
      canselEditingTask();
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else alert("Неизвестаня ошибка");
    }
  };

  //Удаление задачи

  const deleteTodo = async (id: number): Promise<void> => {
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
    <>
      <li className={styles.li} key={task.id}>
        {isEditing ? (
          <div className={styles.container}>
            <input
              className={styles.input}
              type="text"
              value={editingTitle}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setEditingTitle(event.target.value)
              }
            />
            <div className={styles.button}>
              <button
                className={styles.buttonCancel}
                onClick={canselEditingTask}
              >
                Отмена
              </button>
              <button
                className={styles.buttonSave}
                onClick={() => saveEditingTask(task)}
              >
                Сохранить
              </button>
            </div>
          </div>
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

            <div>
              <IconButton onClick={() => startEditingTask(task)} src={logoEdit}>
                <img src={logoEdit} />
              </IconButton>
              <IconButton onClick={() => deleteTodo(task.id)} src={logoDel}>
                <img src={logoDel} />
              </IconButton>
            </div>
          </>
        )}
      </li>
    </>
  );
};

export default TodoItem;

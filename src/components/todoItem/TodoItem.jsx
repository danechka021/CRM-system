import logoEdit from "../../assets/edit.png";
import logoDel from "../../assets/delete.png";

import { useState } from "react";
import styles from "../todoItem/TodoItem.module.css";

import { updatedTask, deleteTask } from "../../api/tasks";

const TodoItem = ({
  task,
  handleError,
  toggleTasksStatus,
  selectedTaskFilter,
}) => {
  //Для редактирования задач
  const [editingTitle, setEditingTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  //Выбор статуса задачи

  const changeTaskStatus = async (task) => {
    try {
      await updatedTask(task.id, { isDone: !task.isDone });
      await toggleTasksStatus(selectedTaskFilter);
    } catch (error) {
      handleError(error);
    }
  };

  //редактирование задачи

  const startEditingTask = (task) => {
    setEditingTitle(task.title || "");
    setIsEditing(true);
  };

  const canselEditingTask = () => {
    setEditingTitle("");
    setIsEditing(false);
  };

  const saveEditingTask = async (task) => {
    try {
      const titleTrim = editingTitle.trim();
      if (!titleTrim) {
        throw new Error("Это поле не может быть пустым");
      } else if (titleTrim.length < 2 || titleTrim.length > 64) {
        throw new Error("Название задачи должно быть от 2 до 64 символов");
      } else if (titleTrim.length > 64) {
        throw new Error("Максимальная длина текста 64 символа.");
      }
      await updatedTask(task.id, { title: titleTrim });
      await toggleTasksStatus(selectedTaskFilter);
      canselEditingTask();
    } catch (error) {
      handleError(error);
    }
  };

  //Удаление задачи

  const deleteTodoTask = async (id) => {
    try {
      await deleteTask(id);
      await toggleTasksStatus(selectedTaskFilter);
    } catch (error) {
      handleError(error);
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
              onChange={(event) => setEditingTitle(event.target.value)}
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
                onClick={() => saveEditingTask(task, editingTitle)}
              >
                Сохранить
              </button>
            </div>
          </div>
        ) : (
          <>
            <label className={styles.mainCheckbox}>
              <input
                type="checkbox"
                className={styles.inputCheckbox}
                checked={task.isDone}
                onChange={() => changeTaskStatus(task)}
              />
              <span className={styles.spanCheckbox}></span>
            </label>

            <span
              className={`${styles.taskText} ${
                task.isDone ? styles.taskTextDone : ""
              }`}
            >
              {task.title}
            </span>

            <div>
              <button onClick={() => startEditingTask(task)}>
                <img className={styles.imgEdit} src={logoEdit} />
              </button>
              <button onClick={() => deleteTodoTask(task.id)}>
                <img className={styles.imgDel} src={logoDel} />
              </button>
            </div>
          </>
        )}
      </li>
    </>
  );
};

export default TodoItem;

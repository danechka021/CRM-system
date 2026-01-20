import logoEdit from "../../assets/edit.png";
import logoDel from "../../assets/delete.png";

import { useState } from "react";
import styles from "../todoItem/TodoItem.module.css";

import { updatedTask, deleteTask } from "../../api/tasks";
import IconButton from "../../ui/IconButton/IconButton";
import Checkbox from "../../ui/Checkbox/Checkbox";

const TodoItem = ({ task, onUpdtaeTask, correctRequest }) => {
  //Для редактирования задач
  const [editingTitle, setEditingTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  //Выбор статуса задачи

  const changeTaskStatus = async (task) => {
    try {
      await updatedTask(task.id, { isDone: !task.isDone });
      await onUpdtaeTask();
    } catch (error) {
      alert(error.message || "Произошла ошибка");
      console.log(error);
    }
  };

  //редактирование задачи

  const startEditingTask = (task) => {
    setEditingTitle(task.title);
    setIsEditing(true);
  };

  const canselEditingTask = () => {
    setIsEditing(false);
  };

  const saveEditingTask = async (task) => {
    const error = correctRequest(editingTitle);

    if (error) {
      alert(error);
      return;
    }

    try {
      const titleTrim = editingTitle.trim();

      await updatedTask(task.id, { title: titleTrim });
      await onUpdtaeTask();
      canselEditingTask();
    } catch (error) {
      alert(error.message || "Произошла ошибка");
      console.log(error);
    }
  };

  //Удаление задачи

  const deleteTodoTask = async (id) => {
    try {
      await deleteTask(id);
      await onUpdtaeTask();
    } catch (error) {
      alert(error.message || "Произошла ошибка");
      console.log(error);
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
              <IconButton onClick={() => deleteTodoTask(task.id)} src={logoDel}>
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

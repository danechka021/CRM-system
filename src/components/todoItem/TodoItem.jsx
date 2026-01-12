import logoEdit from "../../assets/edit.png";
import logoDel from "../../assets/delete.png";

import styles from "../todoItem/TodoItem.module.css";

const TodoItem = ({
  task,
  deleteTodoTask,
  changeTaskStatus,
  editingTaskName,
  value,
  setValue,
  onSave,
  onCansel,
  startEditingTask,
}) => {
  return (
    <>
      <li className={styles.li} key={task.id}>
        {editingTaskName === task.id ? (
          <div className={styles.container}>
            <input
              className={styles.input}
              type="text"
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
            <div className={styles.button}>
              <button className={styles.buttonCancel} onClick={onCansel}>
                Отмена
              </button>
              <button className={styles.buttonSave} onClick={onSave}>
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

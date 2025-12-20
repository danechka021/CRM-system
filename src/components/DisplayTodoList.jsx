import logoEdit from "../assets/edit.png";
import logoDel from "../assets/delete.png";

import styles from "./DisplayTodoList.module.css";
import EditingTask from "./EditingTask";

const DisplayTodoList = ({
  tasksName,
  deleteTodoTask,
  changeTaskStatus,
  editingTaskName,
  editingTaskValue,
  setEditingTaskValue,
  saveEditingTaskId,
  canselEddit,
  startEditingTask,
}) => {
  return (
    <>
      <div className={styles.displayTask}>
        <ul className={styles.ul}>
          {tasksName.map((task) => (
            <li className={styles.li} key={task.id}>
              {editingTaskName === task.id ? (
                <>
                  <EditingTask
                    value={editingTaskValue}
                    setValue={setEditingTaskValue}
                    onCansel={canselEddit}
                    onSave={() => saveEditingTaskId(task)}
                  />
                </>
              ) : (
                <>
                  <label className={styles.mainCheckbox}>
                    <input
                      onClick={() => changeTaskStatus(task)}
                      type="checkbox"
                      className={styles.inputCheckbox}
                      checked={task.isDone}
                      onChange={() => changeTaskStatus(task)}
                    />
                    <span className={styles.spanCheckbox}></span>
                  </label>

                  <span
                    style={{
                      textDecoration: task.isDone ? "line-through" : "none",
                      color: task.isDone ? "grey" : "black",
                    }}
                    className={styles.taskText}
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
          ))}
        </ul>
      </div>
    </>
  );
};

export default DisplayTodoList;

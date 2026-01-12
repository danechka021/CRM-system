import styles from "../ListOfTasks/TasksList.module.css";
import TodoItem from "../todoItem/TodoItem";

const TasksList = ({
  tasksList,
  deleteTodoTask,
  changeTaskStatus,
  editingTaskId,
  editingTitle,
  setEditingTitle,
  saveEditingTask,
  canselEditingTask,
  startEditingTask,
}) => {
  return (
    <>
      <div className={styles.displayTask}>
        <ul className={styles.ul}>
          {tasksList.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              deleteTodoTask={deleteTodoTask}
              changeTaskStatus={changeTaskStatus}
              editingTaskName={editingTaskId}
              value={editingTitle}
              setValue={setEditingTitle}
              onSave={() => saveEditingTask(task, editingTitle)}
              onCansel={canselEditingTask}
              startEditingTask={startEditingTask}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default TasksList;

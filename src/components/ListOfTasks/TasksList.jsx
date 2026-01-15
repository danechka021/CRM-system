import styles from "../ListOfTasks/TasksList.module.css";
import TodoItem from "../todoItem/TodoItem";

const TasksList = ({
  tasksList,
  handleError,
  toggleTasksStatus,
  selectedTaskFilter,
}) => {
  return (
    <>
      <div className={styles.displayTask}>
        <ul className={styles.ul}>
          {tasksList.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              handleError={handleError}
              toggleTasksStatus={toggleTasksStatus}
              selectedTaskFilter={selectedTaskFilter}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default TasksList;

import styles from "../ListOfTasks/TasksList.module.css";
import TodoItem from "../todoItem/TodoItem";

const TasksList = ({ correctRequest, tasksList, onUpdtaeTask }) => {
  return (
    <div className={styles.displayTask}>
      <ul className={styles.ul}>
        {tasksList.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            correctRequest={correctRequest}
            onUpdtaeTask={onUpdtaeTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TasksList;

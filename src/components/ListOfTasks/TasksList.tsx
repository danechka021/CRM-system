import styles from "../ListOfTasks/TasksList.module.css";
import TodoItem from "../todoItem/TodoItem";
import { Task } from "../../types";

interface TasksListProps {
  tasksList: Task[];
  onUpdateTask: () => void;
}

const TasksList = ({ tasksList, onUpdateTask }: TasksListProps) => {
  return (
    <div className={styles.displayTask}>
      <ul className={styles.ul}>
        {tasksList.map((task) => (
          <TodoItem key={task.id} task={task} onUpdateTask={onUpdateTask} />
        ))}
      </ul>
    </div>
  );
};

export default TasksList;

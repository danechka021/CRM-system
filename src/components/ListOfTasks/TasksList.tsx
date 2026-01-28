import styles from "../ListOfTasks/TasksList.module.css";
import TodoItem from "../todoItem/TodoItem";
import { Task } from "../../pages/TodoListPage";

interface TasksListProps {
  correctRequest: (title: string) => string | undefined;
  tasksList: Task[];
  onUpdateTask: () => void;
}

const TasksList = ({
  correctRequest,
  tasksList,
  onUpdateTask,
}: TasksListProps) => {
  return (
    <div className={styles.displayTask}>
      <ul className={styles.ul}>
        {tasksList.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            correctRequest={correctRequest}
            onUpdateTask={onUpdateTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TasksList;

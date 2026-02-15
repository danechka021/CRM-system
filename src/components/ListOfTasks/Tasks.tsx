import styles from "../ListOfTasks/Tasks.module.css";
import TodoItem from "../todoItem/TodoItem";
import { Todo } from "../../types";

interface TasksListProps {
  tasks: Todo[];
  onUpdateTask: () => void;
  setEditingTaskId: (id: number | null) => void;
}

const TasksList = ({
  tasks,
  onUpdateTask,
  setEditingTaskId,
}: TasksListProps) => {
  return (
    <div className={styles.displayTask}>
      <ul className={styles.ul}>
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onUpdateTask={onUpdateTask}
            setEditingTaskId={setEditingTaskId}
          />
        ))}
      </ul>
    </div>
  );
};

export default TasksList;

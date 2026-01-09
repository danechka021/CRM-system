import styles from "./AddTask.module.css";

const AddTask = ({ inputValue, setInputValue, addTodoTasks }) => {
  return (
    <>
      <div className={styles.mainContainer}>
        <input
          className={styles.input}
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          id="task"
          placeholder="Task To Be Done..."
        />
        <button
          className={styles.button}
          onClick={() => addTodoTasks({ title: inputValue, isDone: false })}
        >
          Add
        </button>
      </div>
    </>
  );
};

export default AddTask;

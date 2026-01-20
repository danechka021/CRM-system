import styles from "../Input/Input.module.css";

const Input = ({ value, onChange, placeholder }) => {
  return (
    <>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
};

export default Input;

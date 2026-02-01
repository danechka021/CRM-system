import styles from "../Checkbox/Checkbox.module.css";

const Checkbox = ({ onChange, checked }) => {
  return (
    <span className={styles.mainCheckbox}>
      <input
        className={styles.inputCheckbox}
        type="checkbox"
        onChange={onChange}
        checked={checked}
      />
      <span className={styles.spanCheckbox}></span>
    </span>
  );
};

export default Checkbox;

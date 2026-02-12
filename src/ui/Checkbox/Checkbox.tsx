import styles from "../Checkbox/Checkbox.module.css";

interface CheckboxProps {
  onChange: () => void;
  checked: boolean;
}

const Checkbox = ({ onChange, checked }: CheckboxProps) => {
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

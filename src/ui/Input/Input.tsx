import styles from "../Input/Input.module.css";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const Input = ({ value, onChange, placeholder }: InputProps) => {
  return (
    <>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </>
  );
};

export default Input;

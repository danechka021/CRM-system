import styles from "../Button/Button.module.css";

interface ButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
  choiceOption?: "add";
}

const Button = ({ onClick, children, choiceOption }: ButtonProps) => {
  return (
    <>
      <button
        className={`${styles.button} ${choiceOption ? styles[choiceOption] : ""} `}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

export default Button;

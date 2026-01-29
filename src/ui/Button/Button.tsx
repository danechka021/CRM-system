import styles from "../Button/Button.module.css";

interface ButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
  choiseOption?: "add";
}

const Button = ({ onClick, children, choiseOption }: ButtonProps) => {
  return (
    <>
      <button
        className={`${styles.button} ${choiseOption ? styles[choiseOption] : ""} `}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

export default Button;

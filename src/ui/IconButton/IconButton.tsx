import styles from "../IconButton/IconButton.module.css";

interface IconButtonProps {
  onClick: () => void;
  src: string;
  children?: React.ReactNode;
}

const IconButton = ({ onClick, src }: IconButtonProps) => {
  return (
    <button onClick={onClick}>
      <img src={src} className={styles.iconButton} />
    </button>
  );
};

export default IconButton;

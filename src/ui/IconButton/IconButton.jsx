import styles from "../IconButton/IconButton.module.css";
const IconButton = ({ onClick, src }) => {
  return (
    <button onClick={onClick}>
      <img src={src} className={styles.iconButton} />
    </button>
  );
};

export default IconButton;

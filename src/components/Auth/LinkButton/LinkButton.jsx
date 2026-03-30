import styles from "../LinkButton/LinkButton.module.css";

const LinkButton = ({ name, onClick }) => {
  return (
    <div>
      <button onClick={onClick} className={styles.buttonStyles}>
        {name}
      </button>
    </div>
  );
};

export default LinkButton;

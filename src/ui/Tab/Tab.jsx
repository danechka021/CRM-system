import styles from "../Tab/Tab.module.css";

const Tab = ({ children, onClick, style }) => {
  return (
    <>
      <button className={styles.Tab} onClick={onClick} style={style}>
        {children}
      </button>
    </>
  );
};

export default Tab;

import styles from "../Tab/Tab.module.css";

interface TabProps {
  children?: React.ReactNode;
  onClick: () => void;
  style: {
    color: string;
  };
}

const Tab = ({ children, onClick, style }: TabProps) => {
  return (
    <>
      <button className={styles.Tab} onClick={onClick} style={style}>
        {children}
      </button>
    </>
  );
};

export default Tab;

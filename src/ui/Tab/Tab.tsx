import styles from "../Tab/Tab.module.css";

interface TabProps {
  children?: React.ReactNode;
  onClick: () => void;
  isActive: boolean;
}

const Tab = ({ children, onClick, isActive }: TabProps) => {
  return (
    <>
      <button
        className={`${styles.Tab} ${isActive ? styles.active : styles.notActive}`}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

export default Tab;

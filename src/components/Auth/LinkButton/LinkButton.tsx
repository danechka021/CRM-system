import React, { JSX } from "react";
import styles from "../LinkButton/LinkButton.module.css";

interface LinkButtonProps {
  name: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const LinkButton = ({ name, onClick }: LinkButtonProps): JSX.Element => {
  return (
    <div>
      <button onClick={onClick} className={styles.buttonStyles} type="button">
        {name}
      </button>
    </div>
  );
};

export default LinkButton;

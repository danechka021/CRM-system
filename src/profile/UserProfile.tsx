import { Outlet } from "react-router-dom";
import styles from "../profile/UserProfile.module.css";

const UserProfile = () => {
  return (
    <>
      <div className={styles.mainContainer}>Привет</div>
      <Outlet />
    </>
  );
};

export default UserProfile;

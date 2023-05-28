import React from "react";
import styles from "./SideBar.less";


const SideBar: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.active}>
      </div>
      <div></div>
      <div></div>
      <div className={styles.lastDiv}>+</div>
    </div>
  );
};

export default SideBar;

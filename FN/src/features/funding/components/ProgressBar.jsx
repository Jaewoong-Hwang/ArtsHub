import React from "react";
import styles from "./css/ProgressBar.module.css";

/**
 * @param {number} percent - 0~100 사이의 숫자
 */
const ProgressBar = ({ percent }) => {
  const displayPercent = Math.min(100, Math.round(percent));

  return (
    <div className={styles.progressWrapper} aria-label={`달성률 ${displayPercent}%`}>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${displayPercent}%` }}
        ></div>
      </div>
      <span className={styles.percentText}>{displayPercent}% 달성</span>
    </div>
  );
};

export default ProgressBar;

import React from "react";
import styles from "./css/projectFilterStatus.module.css"; // ✅ CSS 모듈 import

const ProjectFilterStatus = ({ totalCount }) => {
  return (
    <>
      {totalCount === 0 && (
        <div className={styles.projectFilterStatus}>
          <p className={styles.noResultMessage}>
            해당 조건에 맞는 프로젝트가 없습니다.
          </p>
        </div>
      )}
    </>
  );
};

export default ProjectFilterStatus;

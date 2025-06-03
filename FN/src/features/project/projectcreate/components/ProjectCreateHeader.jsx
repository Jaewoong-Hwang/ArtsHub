import React from 'react';
import styles from './css/projectCreateHeader.module.css';
import '../../../../assets/styles/reset.css'; // 전역 리셋은 유지

const ProjectCreateHeader = () => {
  return (
    <div className={styles.projectHeader}>
      <div className={styles.container}>
        <h1 className={styles.logo}>ArtsHub</h1>
        <div className={styles.topActions}>
          <a href="/mypage/project" className={`${styles.btn} ${styles.small}`}>
            내 프로젝트 보기
          </a>
          <a href="../../ProjectMain" className={`${styles.btn} ${styles.small} ${styles.outline}`}>
            나가기
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCreateHeader;

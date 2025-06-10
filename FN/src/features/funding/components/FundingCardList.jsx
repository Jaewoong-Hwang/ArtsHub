import React from 'react';
import FundingCard from './FundingCard';
import styles from './css/FundingCardList.module.css'; 

const FundingCardList = ({ projects }) => {
  if (!projects || projects.length === 0) {
    return <p className={styles.emptyMessage}>등록된 펀딩이 없습니다.</p>;
  }

  return (
    <div className={styles.projectList}>
      {projects.map((proj, idx) => (
        <FundingCard key={proj.id || idx} project={proj} index={idx} />
      ))}
    </div>
  );
};

export default FundingCardList;
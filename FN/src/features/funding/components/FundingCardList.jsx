// src/features/funding/components/FundingCardList.jsx
import React from "react";
import FundingCard from "./FundingCard";
import styles from "./css/FundingCardList.module.css";

/**
 * @param {Object} props
 * @param {Array} props.projects - 프로젝트 배열
 */
const FundingCardList = ({ projects }) => {
  if (projects.length === 0) {
    return <p className={styles.noResult}>검색 결과가 없습니다.</p>;
  }

  return (
    <div className={styles.grid}>
      {projects.map((project) => (
        <FundingCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default FundingCardList;
// src/features/funding/components/FundingCard.jsx
import React from "react";
import styles from "./css/FundingCard.module.css";
import { getDday } from "../../../utils/getDday";

const FundingCard = ({ project }) => {
  const {
    title,
    image,
    description,
    totalFunded,
    fundingGoal,
    deadline,
  } = project;

  const fundingRate = Math.floor((totalFunded / fundingGoal) * 100);
  const isSuccess = fundingRate >= 100;
  const dDayText = getDday(deadline);

  return (
    <div className={styles.card}>
      <div className={styles.thumbnailWrapper}>
        <img src={image} alt={title} className={styles.thumbnail} />
        {isSuccess && <span className={styles.badge}>성공 🎉</span>}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        <div className={styles.progressWrapper}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${fundingRate}%` }}
            ></div>
          </div>
          <p className={styles.fundingRate}>{fundingRate}% 달성</p>
        </div>

        <div className={styles.bottomRow}>
          <span className={styles.dDay}>{dDayText}</span>
          <button className={styles.button}>후원하기</button>
        </div>
      </div>
    </div>
  );
};

export default FundingCard;
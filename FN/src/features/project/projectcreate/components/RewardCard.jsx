import React from "react";
import styles from "./css/RewardCard.module.css"; // ✅ CSS Module

const RewardCard = ({ reward, onEdit, onDelete }) => {
  return (
    <div className={styles.rewardCard}>
      <h4>
        {reward.title} ({Number(reward.amount).toLocaleString()}원)
      </h4>
      <p>{reward.description}</p>

      {reward.type === "set" && Array.isArray(reward.options) && (
        <div className={styles.rewardOptions}>
          <strong>옵션 구성:</strong>
          {reward.options.length > 0 ? (
            <ul>
              {reward.options.map((opt, i) => (
                <li key={i}>
                  {opt.optionName}: {opt.optionValues}
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.emptyOption}>옵션이 아직 등록되지 않았습니다.</p>
          )}
        </div>
      )}

      <div className={styles.rewardActions}>
        <button
          className={`${styles.btn} ${styles.outline}`}
          onClick={() => onEdit(reward)}
        >
          수정
        </button>
        <button
          className={`${styles.btn} ${styles.remove}`}
          onClick={() => onDelete(reward.id)}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default RewardCard;

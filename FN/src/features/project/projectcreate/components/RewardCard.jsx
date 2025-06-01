import React from "react";
import './css/RewardCard.css'

const RewardCard = ({ reward, onEdit, onDelete }) => {
  return (
    <div className="reward-card">
      <h4>
        {reward.title} ({Number(reward.amount).toLocaleString()}원)
      </h4>
      <p>{reward.description}</p>

      {reward.type === "set" && Array.isArray(reward.options) && (
        <div className="reward-options">
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
            <p style={{ color: "#999" }}>옵션이 아직 등록되지 않았습니다.</p>
          )}
        </div>
      )}

      <div className="reward-actions">
        <button className="btn outline small" onClick={() => onEdit(reward)}>
          수정
        </button>
        <button className="btn remove" onClick={() => onDelete(reward.id)}>
          삭제
        </button>
      </div>
    </div>
  );
};

export default RewardCard;
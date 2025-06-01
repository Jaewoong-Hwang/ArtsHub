import React from "react";
import './css/RewardForm.css'

const RewardForm = ({
  reward,
  updateField,
  addOption,
  updateOption,
  removeOption,
  onSave,
  onCancel,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateField(name, value);
  };

  return (
    <div className="reward-form">
      <label>
        금액 (원)
        <input
          type="number"
          name="amount"
          value={reward.amount}
          onChange={handleChange}
        />
      </label>

      <label>
        리워드 제목
        <input
          type="text"
          name="title"
          value={reward.title}
          onChange={handleChange}
        />
      </label>

      <label>
        설명
        <textarea
          name="description"
          value={reward.description}
          onChange={handleChange}
        />
      </label>

      <label>
        리워드 유형
        <select
          name="type"
          value={reward.type}
          onChange={handleChange}
        >
          <option value="single">단일 리워드</option>
          <option value="set">옵션 구성</option>
        </select>
      </label>

      {reward.type === "set" && (
        <div className="reward-options">
          <h4>옵션 구성</h4>
          {reward.options.map((opt, index) => (
            <div key={index} className="option-row">
              <input
                type="text"
                placeholder="옵션 이름"
                value={opt.optionName}
                onChange={(e) =>
                  updateOption(index, "optionName", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="옵션 값 (쉼표로 구분)"
                value={opt.optionValues}
                onChange={(e) =>
                  updateOption(index, "optionValues", e.target.value)
                }
              />
              <button
                type="button"
                className="btn small remove"
                onClick={() => removeOption(index)}
              >
                삭제
              </button>
            </div>
          ))}
          <button type="button" className="btn small" onClick={addOption}>
            + 옵션 추가
          </button>
        </div>
      )}

      <label>
        배송비 (원)
        <input
          type="number"
          name="shippingFee"
          value={reward.shippingFee}
          onChange={handleChange}
        />
      </label>

      <div className="reward-buttons">
        <button type="button" className="btn outline" onClick={onCancel}>
          취소
        </button>
        <button type="button" className="btn primary" onClick={onSave}>
          저장
        </button>
      </div>
    </div>
  );
};

export default RewardForm;
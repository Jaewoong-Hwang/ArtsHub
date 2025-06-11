import React from "react";
import styles from "./css/RewardForm.module.css";

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
    <div className={styles.rewardForm}>
      {/* 금액 */}
      <label className={styles.labelInput}>
        금액 (원)
        <input
          type="number"
          name="price" // ✅ 수정됨
          value={reward.price}
          onChange={handleChange}
          className={styles.input}
        />
      </label>

      {/* 제목 */}
      <label className={styles.labelInput}>
        리워드 제목
        <input
          type="text"
          name="title"
          value={reward.title}
          onChange={handleChange}
          className={styles.input}
        />
      </label>

      {/* 설명 */}
      <label className={styles.labelTextarea}>
        설명
        <textarea
          name="description"
          value={reward.description}
          onChange={handleChange}
          className={styles.textarea}
        />
      </label>

      {/* 유형 선택 */}
      <label className={styles.labelSelect}>
        리워드 유형
        <select
          name="type"
          value={reward.type}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="single">단일 리워드</option>
          <option value="set">옵션 구성</option>
        </select>
      </label>

      {/* 옵션 구성 */}
      {reward.type === "set" && (
        <div className={styles.rewardOptions}>
          <h4>옵션 구성</h4>
          {reward.options.map((opt, index) => (
            <div key={index} className={styles.optionRow}>
              <input
                type="text"
                placeholder="옵션 이름"
                value={opt.optionName}
                onChange={(e) =>
                  updateOption(index, "optionName", e.target.value)
                }
                className={styles.optionInput}
              />
              <input
                type="text"
                placeholder="옵션 값 (쉼표로 구분)"
                value={
                  Array.isArray(opt.optionValues)
                    ? opt.optionValues.join(", ")
                    : opt.optionValues
                }
                onChange={(e) =>
                  updateOption(index, "optionValues", e.target.value)
                }
                className={styles.optionInput}
              />
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => removeOption(index)}
              >
                삭제
              </button>
            </div>
          ))}
          <button
            type="button"
            className={styles.addOptionBtn}
            onClick={addOption}
          >
            + 옵션 추가
          </button>
        </div>
      )}

      {/* 저장/취소 버튼 */}
      <div className={styles.rewardButtons}>
        <button type="button" className={styles.cancelBtn} onClick={onCancel}>
          취소
        </button>
        <button type="button" className={styles.saveBtn} onClick={onSave}>
          저장
        </button>
      </div>

      {/* 배송비는 추후 활성화 */}
      {/* 
      <label className={styles.labelInput}>
        배송비 (원)
        <input
          type="number"
          name="shippingFee"
          value={reward.shippingFee}
          onChange={handleChange}
          className={styles.input}
        />
      </label> 
      */}
    </div>
  );
};

export default RewardForm;

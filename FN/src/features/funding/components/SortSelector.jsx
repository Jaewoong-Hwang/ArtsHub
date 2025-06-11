import React from "react";
import styles from "./css/SortSelector.module.css";

/**
 * @param {Object} props
 * @param {string} props.selected - 현재 선택된 정렬 옵션
 * @param {function} props.onChange - 정렬 옵션 변경 함수
 */
const SortSelector = ({ selected, onChange }) => {
  return (
    <div className={styles.sortSelector}>
      <label htmlFor="sort" className={styles.label}>정렬:</label>
      <select
        id="sort"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className={styles.select}
      >
        <option value="latest">최신순</option>
        <option value="popular">인기순</option>
        <option value="fundingRate">펀딩 달성률순</option>
      </select>
    </div>
  );
};

export default SortSelector;
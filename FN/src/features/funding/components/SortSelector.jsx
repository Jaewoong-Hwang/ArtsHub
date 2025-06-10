import React from "react";
import styles from "./css/SortSelector.module.css";

/**
 * @param {string} sortOption - 현재 선택된 정렬 옵션
 * @param {function} onChange - 정렬 변경 핸들러
 */
const SortSelector = ({ sortOption, onChange }) => {
  return (
    <div className={styles.sortBox}>
      <label htmlFor="sort" className={styles.sortLabel}>정렬:</label>
      <select
        id="sort"
        className={styles.sortSelect}
        value={sortOption}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="popular">인기순</option>
        <option value="deadline">마감 임박순</option>
        <option value="latest">최신 등록순</option>
      </select>
    </div>
  );
};

export default SortSelector;

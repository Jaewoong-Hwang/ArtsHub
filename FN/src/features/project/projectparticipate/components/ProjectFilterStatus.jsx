import React from "react";
import "./css/ProjectFilterStatus.css";

const ProjectFilterStatus = ({ totalCount, selectedCategory, keyword, onReset }) => {
  const isFiltered = selectedCategory || keyword;

  return (
    <div className="project-filter-status">
      {/* 🔍 필터 조건 설명 + 전체보기 버튼 */}
      {isFiltered && (
        <div className="status-row">
          {/* <span className="filter-description">
            🔍 현재 조건:
            {selectedCategory && ` 카테고리 - ${selectedCategory}`}
            {keyword && ` / 검색어 - "${keyword}"`}
          </span> */}
         
        </div>
      )}

      {/* ❌ 결과 없음 메시지 */}
      {totalCount === 0 && (
         <button className="reset-button" onClick={onReset}>
            전체 보기
          </button>
      )}
      {totalCount === 0 && (
        <p className="no-result-message">😢 해당 조건에 맞는 프로젝트가 없습니다.</p>
      )}
      
    </div>
  );
};

export default ProjectFilterStatus;

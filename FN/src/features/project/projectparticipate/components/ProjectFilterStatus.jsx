import React from "react";
import "./css/ProjectFilterStatus.css";

const ProjectFilterStatus = ({ totalCount }) => {
  return (
    <>
      {totalCount === 0 && (
        <div className="project-filter-status">
          <p className="no-result-message">해당 조건에 맞는 프로젝트가 없습니다.</p>
        </div>
      )}
    </>
  );
};

export default ProjectFilterStatus;
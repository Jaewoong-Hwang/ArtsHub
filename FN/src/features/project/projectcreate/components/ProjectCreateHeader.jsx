import React from 'react';

//css
import '../../../../assets/styles/reset.css';
import '../components/css/projectHeader.css'; // CSS 경로는 상대적으로 조정 필요

const ProjectCreateHeader = () => {
  return (
    <div className="project-header">
      <div className="container">
        <h1 className="logo">ArtsHub</h1>
        <div className="top-actions">
          <a href="/mypage/project" className="btn small">내 프로젝트 보기</a>
          <a href="../../ProjectMain" className="btn small outline">나가기</a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCreateHeader;
import React from 'react';
import ProjectCard from '../components/ProjectCard';
import styles from './css/projectCardList.module.css'; // ✅ CSS Module 적용

const ProjectCardList = ({ projects }) => {
  if (!projects || projects.length === 0) {
    return <p className={styles.emptyMessage}>등록된 프로젝트가 없습니다.</p>;
  }

  return (
    <div className={styles.projectList}>
      {projects.map((proj, idx) => (
        <ProjectCard key={proj.id || idx} project={proj} index={idx} />
      ))}
    </div>
  );
};

export default ProjectCardList;
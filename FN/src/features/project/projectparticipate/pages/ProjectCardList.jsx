import React from 'react';
import ProjectCard from '../components/ProjectCard';
import styles from './css/projectCardList.module.css'; // ✅ CSS Module 적용

const ProjectCardList = ({ projects }) => {
  return (
    <div className={styles.projectList}>
      {projects.map((proj, idx) => (
        <ProjectCard key={proj.id} project={proj} index={idx} />
      ))}
    </div>
  );
};

export default ProjectCardList;

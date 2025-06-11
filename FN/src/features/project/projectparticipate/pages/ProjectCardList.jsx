import React from 'react';
import ProjectCard from '../components/ProjectCard';
import styles from './css/ProjectCardList.module.css'; // ✅ CSS Module import로 변경

const ProjectCardList = ({ projects }) => {
  return (
    <div className={styles.projectList}> {/* ✅ className 수정 */}
      {projects.map((proj, idx) => (
        <ProjectCard key={proj.id} project={proj} index={idx} />
      ))}
    </div>
  );
};

export default ProjectCardList;
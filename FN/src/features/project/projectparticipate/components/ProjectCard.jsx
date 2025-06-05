import React from 'react';
import useScrollFadeIn from '../hooks/useScrollFadeIn';
import styles from './css/projectCard.module.css'; // ✅ 모듈 CSS import

const ProjectCard = ({ project, index }) => {
  const [ref, visible, style] = useScrollFadeIn(index * 0.1); // 0.1초 간격 딜레이

  return (
    <div
      ref={ref}
      className={`${styles.projectCard} ${visible ? styles.visible : ''}`}
      style={style}
    >
      <img src={project.image} alt={project.title} />
      <div className={styles.projectContent}>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className={styles.projectViews}>조회수: {project.views}</div>
      </div>
    </div>
  );
};

export default ProjectCard;

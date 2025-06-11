import React from 'react';
import useScrollFadeIn from '../hooks/useScrollFadeIn';
import './css/ProjectCard.css';

const ProjectCard = ({ project, index }) => {
  const [ref, visible, style] = useScrollFadeIn(index * 0.1); // 0.1s 간격으로 딜레이

  return (
    <div
      ref={ref}
      className={`project-card ${visible ? 'visible' : ''}`}
      style={style}
    >
      <img src={project.image} alt={project.title} />
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-views">조회수: {project.views}</div>
      </div>
    </div>
  );
};

export default ProjectCard;

import React from 'react';

//css
import '../../../../assets/styles/reset.css';
import './css/ProjectCard.css';

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <img src={project.image} alt={project.title} />
      <div className="card-info">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="card-tags">
          <span>모집중</span>
          <span>{project.remainingDays}일 남음</span>
          <span>{project.category}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
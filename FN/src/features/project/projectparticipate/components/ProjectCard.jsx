import React from 'react';
import './css/ProjectCard.css';

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <img src={project.image} alt={project.title} />
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        {project.subtext && <p className="project-subtext">{project.subtext}</p>}
        <div className="project-views">조회수: {project.views}</div>
        <button className="btn-apply">참여하기</button>
      </div>
    </div>
  );
};

export default ProjectCard;

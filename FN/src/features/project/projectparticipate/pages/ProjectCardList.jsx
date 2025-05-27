import React from 'react';
import ProjectCard from './ProjectCard';
import './css/ProjectCardList.css';

const ProjectCardList = ({ projects }) => {
  return (
    <div className="project-list">
      {projects.map((proj) => (
        <ProjectCard key={proj.id} project={proj} />
      ))}
    </div>
  );
};

export default ProjectCardList;
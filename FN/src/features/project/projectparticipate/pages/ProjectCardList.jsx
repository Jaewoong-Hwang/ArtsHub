import React from 'react';
import ProjectCard from '../components/ProjectCard';
import './css/ProjectCardList.css';

const ProjectCardList = ({ projects }) => {
  return (
    <div className="project-list">
      {projects.map((proj, idx) => (
        <ProjectCard key={proj.id} project={proj} index={idx} />
      ))}
    </div>
  );
};

export default ProjectCardList;

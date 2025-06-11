import React from 'react';
import useScrollFadeIn from '../hooks/useScrollFadeIn';
import './css/ProjectCard.css';

const ProjectCard = ({ project, index }) => {
  console.log("💡 전달된 프로젝트 데이터:", project); 
  const [ref, visible, style] = useScrollFadeIn(index * 0.1);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!project?.id) {
      alert("프로젝트 ID가 없습니다.");
      return;
    }
    navigate(`/project/${project.slug}`);

  };

  // 🔹 D-Day 계산
  const calcDday = (deadline) => {
    if (!deadline) return null;
    const today = new Date();
    const end = new Date(deadline);
    const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
    return diff >= 0 ? `D-${diff}` : "마감";
  };

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

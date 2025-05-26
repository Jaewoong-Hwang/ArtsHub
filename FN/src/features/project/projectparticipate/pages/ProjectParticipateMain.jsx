import React, { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import './css/ProjectParticipateMain.css'; // 스타일 따로 분리

const ProjectParticipateMain = () => {
  const [slides, setSlides] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const slidesRes = await fetch('/api/slides');
        const projectsRes = await fetch('/api/projects');
        const slidesData = await slidesRes.json();
        const projectsData = await projectsRes.json();

        setSlides(slidesData);
        setProjects(projectsData);
      } catch (error) {
        console.error('데이터 로딩 실패:', error);
        setSlides([
          { id: 1, title: 'AI 작곡가 vs 인간', description: '승자는?', image: 'https://picsum.photos/600/180?random=1' },
          { id: 2, title: '물 위 공연', description: '환상적인 무대', image: 'https://picsum.photos/400/180?random=2' }
        ]);
        setProjects([
          { id: 1, title: '수중 오페라', description: '환상적 무대', views: '1000+', image: 'https://picsum.photos/300/144?random=3' }
        ]);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="project-page">
      {/* <HeroCarousel slides={slides} /> */}

      <section className="projects-section">
        <h2 className="section-title">Project Recruitment</h2>
        <p className="section-subtitle">함께하길 기다리는 팀원에 참가하세요 !!</p>

        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProjectParticipateMain;

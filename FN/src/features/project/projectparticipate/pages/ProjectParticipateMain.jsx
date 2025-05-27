import React, { useEffect, useState } from 'react';
import HeroCarousel from './HeroCarousel';
import CategoryList from './CategoryList';
import ProjectCardList from './ProjectCardList';

//css
import '../../../../assets/styles/reset.css';
import './css/ProjectParticipateMain.css';

const ProjectParticipateMain = () => {
  const [slides, setSlides] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const slideRes = await fetch('/api/slides');
        const projectRes = await fetch('/api/projects');
        const slideData = await slideRes.json();
        const projectData = await projectRes.json();

        setSlides(slideData);
        setProjects(projectData);
      } catch (err) {
        console.error('API 오류:', err);
        // Fallback data
        setSlides([
          { id: 1, title: '빛과 그림자', description: '조명과 감정이 교차하는 무대', image: 'https://picsum.photos/600/180?random=1' }
        ]);
        setProjects([
          { id: 1, title: '마임의 세계', description: '무언극으로 마음을 전달합니다.', image: 'https://picsum.photos/300/180?random=2', remainingDays: 5, category: '연극' }
        ]);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="project-page">
      <HeroCarousel slides={slides} />
      <section className="content">
        <h2 className="section-title">Project Recruitment</h2>
        <p className="section-subtitle">함께하길 기다리는 팀원에 합류하세요 !!</p>
        <CategoryList />
        <ProjectCardList projects={projects} />
      </section>
    </main>
  );
};

export default ProjectParticipateMain;
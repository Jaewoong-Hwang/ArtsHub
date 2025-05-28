import React, { useEffect, useState } from "react";
import HeroCarousel from "./HeroCarousel";
import CategoryList from "./CategoryList";
import ProjectCardList from "./ProjectCardList";

//css
import "../../../../assets/styles/reset.css";
import "./css/ProjectParticipateMain.css";

const ProjectParticipateMain = () => {
  const [slides, setSlides] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const slideRes = await fetch("/api/slides");
        const projectRes = await fetch("/api/projects");
        const slideData = await slideRes.json();
        const projectData = await projectRes.json();

        setSlides(slideData);
        setProjects(projectData);
      } catch (err) {
        console.error("API 오류:", err);

        // ✅ 더미 슬라이드 데이터
        setSlides([
          {
            id: 1,
            title: "빛과 그림자",
            description: "조명과 감정이 교차하는 무대",
            subtext: "연극 / 조명 예술",
            image: "https://picsum.photos/600/180?random=1",
          },
          {
            id: 2,
            title: "거리의 선율",
            description: "도심 속 자유로운 퍼포먼스",
            subtext: "버스킹 / 밴드 공연",
            image: "https://picsum.photos/600/180?random=2",
          },
          {
            id: 3,
            title: "환상의 오페라",
            description: "환상과 현실이 교차하는 극장",
            subtext: "오페라 / 클래식",
            image: "https://picsum.photos/600/180?random=3",
          },
          {
            id: 4,
            title: "마임의 세계",
            description: "말 없이 전하는 감정",
            image: "https://picsum.photos/600/200?random=4",
          },
        ]);

        // ✅ 더미 프로젝트 카드 데이터
        setProjects([
          {
            id: 1,
            title: "마임의 세계",
            description: "무언극으로 마음을 전달합니다.",
            image: "https://picsum.photos/300/180?random=4",
            remainingDays: 5,
            category: "연극",
          },
        ]);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="project-page">
      <HeroCarousel slides={slides} />
      <section className="content">
        <div className="title">
          <h2 className="section-title">Project Recruitment</h2>
          <p className="section-subtitle">
            함께하길 기다리는 팀원에 합류하세요 !!
          </p>
          <CategoryList />
        </div>
        
        <ProjectCardList projects={projects} />
      </section>
    </main>
  );
};

export default ProjectParticipateMain;

import React, { useEffect, useState } from "react";
import HeroCarousel from "./HeroCarousel";
import CategoryList from "./CategoryList";
import ProjectCardList from "./ProjectCardList";
import Header from "../../../../components/layout/Header";
import SearchBar from "../../../../components/common/SearchBar";
import ProjectFilterStatus from "../components/ProjectFilterStatus";

// css
import "../../../../assets/styles/reset.css";
import "./css/ProjectParticipateMain.css";

const Funding = () => {
  const [slides, setSlides] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleResetFilter = () => {
    setSelectedCategory(null);
    setSearchKeyword("");
  };

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

        // 더미 슬라이드 데이터
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

        // 더미 프로젝트 카드 데이터
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

  const filteredProjects = projects.filter((project) => {
    const matchCategory = selectedCategory
      ? project.category === selectedCategory
      : true;

    // 소문자로 통일한 키워드 배열 생성
    const keywordList = searchKeyword.toLowerCase().split(" ").filter(Boolean);

    // keyword가 모두 포함되는지 확인
    const matchSearch = keywordList.every(
      (kw) =>
        project.title.toLowerCase().includes(kw) ||
        project.description.toLowerCase().includes(kw) ||
        project.category.toLowerCase().includes(kw)
    );

    return matchCategory && matchSearch;
  });

  return (
    <main className="project-page">
      <Header />
      <HeroCarousel slides={slides} />
      <section className="content">
        <div className="title">
          <h2 className="section-title">Project Recruitment</h2>
          <p className="section-subtitle">
            함께하길 기다리는 팀원에 합류하세요 !!
          </p>
          <SearchBar onSearch={handleSearch} />
          <div className="category-header">
            <CategoryList
              onCategorySelect={handleCategorySelect}
              selectedCategory={selectedCategory}
            />
          </div>
          {selectedCategory && (
            <div className="category-reset-container">
              <p
                className="reset-text"
                onClick={() => setSelectedCategory(null)}
              >
                전체 보기
              </p>
            </div>
          )}
        </div>

        <ProjectFilterStatus
          totalCount={filteredProjects.length}
          selectedCategory={selectedCategory}
          keyword={searchKeyword}
          onReset={handleResetFilter}
        />
        <ProjectCardList projects={filteredProjects} />
      </section>
    </main>
  );
};

export default Funding;

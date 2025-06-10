import React, { useEffect, useState } from "react";
import axios from "../../../../services/axiosInstance";
import HeroCarousel from "./HeroCarousel";
import CategoryList from "./CategoryList";
import ProjectCardList from "./ProjectCardList";
import Header from "../../../../components/layout/Header";
import SearchBar from "../../../../components/common/SearchBar";
import ProjectFilterStatus from "../components/ProjectFilterStatus";
import styles from "./css/projectParticipateMain.module.css";
import "../../../../assets/styles/reset.css";

// 🔸 대체 슬라이드 데이터
const fallbackSlides = [
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
];

const ProjectParticipateMain = () => {
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
  axios.get("/api/projects")
    .then((res) => {
      const serverData = res.data;
      setProjects(
        serverData.map((p) => ({
          id: p.id,
          title: p.title,
          category: p.genre,
          image: p.thumbnail,
          descriptionSummary: p.description.summary || "",
          views: p.views || 0,
          deadline: p.deadline || "",
          capacity: p.capacity || "",
        }))
      );
    })
    .catch((err) => {
      console.error("🚨 서버 프로젝트 조회 실패:", err);
      setProjects([]);
    });

    setSlides(fallbackSlides);
  }, []);

  // 🔎 필터링 (카테고리 + 키워드)
  const filteredProjects = projects.filter((project) => {
    const matchCategory = selectedCategory
      ? project.category === selectedCategory
      : true;

    const keywords = searchKeyword.toLowerCase().split(" ").filter(Boolean);

    const matchSearch = keywords.every(
      (kw) =>
        project.title?.toLowerCase()?.includes(kw) ||
        project.descriptionSummary?.toLowerCase()?.includes(kw) ||
        project.category?.toLowerCase()?.includes(kw)
    );

    return matchCategory && matchSearch;
  });

  return (
    <main className={styles.projectPage}>
      <Header />
      <HeroCarousel slides={slides} />
      <section className={styles.content}>
        <div className={styles.title}>
          <h2 className={styles.sectionTitle}>Project Recruitment</h2>
          <p className={styles.sectionSubtitle}>
            함께하길 기다리는 팀원에 합류하세요 !!
          </p>

          <SearchBar onSearch={handleSearch} />

          <div className={styles.categoryHeader}>
            <CategoryList
              onCategorySelect={handleCategorySelect}
              selectedCategory={selectedCategory}
            />
          </div>

          {selectedCategory && (
            <div className={styles.categoryResetContainer}>
              <p className={styles.resetText} onClick={handleResetFilter}>
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

export default ProjectParticipateMain;

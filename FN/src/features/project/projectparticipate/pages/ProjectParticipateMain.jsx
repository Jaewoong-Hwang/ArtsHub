// ProjectParticipateMain.jsx
import React, { useEffect, useState } from "react";
import axios from "../../../../services/axiosInstance";
import HeroCarousel from "./HeroCarousel";
import CategoryList from "./CategoryList";
import ProjectCardList from "./ProjectCardList";
import Header from "../../../../components/layout/Header";
import SearchBar from "../../../../components/common/SearchBar";
import ProjectFilterStatus from "../components/ProjectFilterStatus";
import Footer from "../../../../components/layout/Footer";

// css
import "../../../../assets/styles/reset.css";
import styles from "./css/ProjectParticipateMain.module.css"; // ✅ module.css 방식

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
    axios
      .get("/api/projects")
      .then((res) => {
        const serverData = res.data;

        const mappedProjects = serverData.map((p) => ({
          id: p.id,
          title: p.title,
          category: p.genre,
          image: p.thumbnail,
          descriptionSummary: p.descriptionSummary,
          description: p.description,
          views: p.views || 0,
          deadline: p.deadline || "",
          capacity: p.capacity || "",
          slug: p.slug,
        }));

        setProjects(mappedProjects);

        // ✅ 이미지 있는 프로젝트 중 랜덤 3개 뽑기
        const validProjects = mappedProjects.filter((p) => p.image);
        const shuffled = [...validProjects].sort(() => 0.5 - Math.random());
        const selectedSlides = shuffled.slice(0, 3).map((p) => ({
          id: p.id,
          title: p.title,
          description: p.descriptionSummary || "설명이 없습니다.",
          subtext: p.category || "기타",
          image: p.image,
          previewUrl: p.description?.previewUrl,
          slug: p.slug,
        }));

        // ✅ 부족한 경우 fallbackSlides로 채우기
        const mergedSlides = [
          ...selectedSlides,
          ...fallbackSlides.slice(0, 6 - selectedSlides.length),
        ];

        setSlides(mergedSlides);
      })
      .catch((err) => {
        console.error("🚨 서버 프로젝트 조회 실패:", err);
        setProjects([]);
        setSlides(fallbackSlides);
      });
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchCategory = selectedCategory
      ? project.category === selectedCategory
      : true;

    const keywordList = searchKeyword.toLowerCase().split(" ").filter(Boolean);

    const matchSearch = keywordList.every(
      (kw) =>
        project.title.toLowerCase().includes(kw) ||
        project.description.toLowerCase().includes(kw) ||
        project.category.toLowerCase().includes(kw)
    );

    return matchCategory && matchSearch;
  });

  return (
    <>
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
                <p
                  className={styles.resetText}
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
      <Footer />
    </>
  );
};

export default ProjectParticipateMain;

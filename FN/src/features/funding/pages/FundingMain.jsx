import React, { useEffect, useState } from "react";
import HeroCarousel from "../../project/projectparticipate/pages/HeroCarousel";
import CategoryList from "../../project/projectparticipate/pages/CategoryList";
import FundingCardList from "../components/FundingCardList";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import SearchBar from "../../../components/common/SearchBar";
import ProjectFilterStatus from "../../project/projectparticipate/components/ProjectFilterStatus";
import styles from "./css/fundingMain.module.css";
import "../../../assets/styles/reset.css";

const fallbackSlides = [
  {
    title: "백조의 호수",
    description: "고전 발레의 정수, 새롭게 해석된 명작!",
    image: "/static/assets/img/백조의호수.webp",
    category: "발레",
    fundingRate: 7200,
    dday: 4,
    status: "모집중",
  },
  {
    title: "재즈 나이트",
    description: "즉흥의 미학, 뉴올리언스 감성을 담다.",
    image: "/static/assets/img/재즈나이트.webp",
    category: "재즈",
    fundingRate: 230,
    dday: 12,
    status: "모집중",
  },
  {
    title: "연극: 사랑의 기술",
    description: "감정을 직면하는 무대, 사랑의 본질을 말하다.",
    image: "/static/assets/img/사랑의기술.webp",
    category: "연극",
    fundingRate: 1020,
    dday: 1,
    status: "마감임박",
  },
];

const FundingMain = () => {
  const [slides, setSlides] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("fundingProjects");
      const parsed = JSON.parse(stored);

      if (Array.isArray(parsed)) {
        const normalized = parsed.map((p) => ({
          id: p.id,
          title: p.title,
          category: p.genre,
          image: p.thumbnail,
          descriptionSummary: p.description?.summary || "",
          currentAmount: p.currentAmount,
          targetAmount: p.targetAmount,
          deadline: p.deadline,
        }));
        setProjects(normalized);
      } else {
        setProjects([]);
      }
    } catch (err) {
      console.error("🚨 로딩 오류:", err);
      setProjects([]);
    }
    setSlides(fallbackSlides);
  }, []);

  const handleSearch = (keyword) => setSearchKeyword(keyword);
  const handleCategorySelect = (category) => setSelectedCategory(category);
  const handleResetFilter = () => {
    setSelectedCategory(null);
    setSearchKeyword("");
  };

  const filteredProjects = projects.filter((project) => {
    const matchCategory = selectedCategory ? project.category === selectedCategory : true;

    const keywords = searchKeyword.toLowerCase().split(" ").filter(Boolean);
    const matchSearch = keywords.every((kw) =>
      [project.title, project.descriptionSummary, project.category]
        .some((field) => field?.toLowerCase()?.includes(kw))
    );

    return matchCategory && matchSearch;
  });

  return (
    <>
      <Header />
      <main className={styles.fundingPage}>
        <HeroCarousel slides={slides} />

        <section className={styles.content}>
          <div className={styles.title}>
            <h2 className={styles.sectionTitle}>Funding Projects</h2>
            <p className={styles.sectionSubtitle}>
              후원을 기다리는 공연 예술 프로젝트에 참여하세요!
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

          <FundingCardList projects={filteredProjects} />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default FundingMain;

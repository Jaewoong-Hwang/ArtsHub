import React, { useEffect, useState } from "react";
import axios from "../../../services/axiosInstance";
import HeroCarousel from "../../project/projectparticipate/pages/HeroCarousel";
import CategoryList from "../../project/projectparticipate/pages/CategoryList";
import FundingCardList from "../components/FundingCardList";
import Header from "../../../components/layout/Header";
import SearchBar from "../../../components/common/SearchBar";
import ProjectFilterStatus from "../../project/projectparticipate/components/ProjectFilterStatus";
import SortSelector from "../components/SortSelector"; // ✅ 정렬 컴포넌트 추가
import Footer from "../../../components/layout/Footer";



// css
import "../../../assets/styles/reset.css";
import styles from "./css/FundingMain.module.css";

const fallbackSlides = [
  {
    id: 1,
    title: "예술은 나눌 때 빛난다",
    description: "지금, 당신의 후원이 누군가의 무대를 밝힙니다",
    subtext: "펀딩 프로젝트 소개",
    image: "https://picsum.photos/600/180?random=11",
  },
  {
    id: 2,
    title: "소극장의 꿈",
    description: "작은 무대에서 시작되는 큰 울림",
    subtext: "연극 / 독립 창작",
    image: "https://picsum.photos/600/180?random=12",
  },
];

const FundingMain = () => {
  const [slides, setSlides] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOption, setSortOption] = useState("latest"); // ✅ 기본 정렬 옵션

  const handleSearch = (keyword) => setSearchKeyword(keyword);
  const handleCategorySelect = (category) => setSelectedCategory(category);
  const handleResetFilter = () => {
    setSelectedCategory(null);
    setSearchKeyword("");
  };

  const handleSortChange = (option) => setSortOption(option);

  useEffect(() => {
    axios.get("/api/funding-projects")
      .then((res) => {
        const data = res.data;
        setProjects(
          data.map((p) => ({
            id: p.id,
            title: p.title,
            category: p.genre,
            image: p.thumbnail,
            description: p.description?.summary || "",
            views: p.views || 0,
            deadline: p.deadline,
            totalFunded: p.totalFunded || 0,
            fundingGoal: p.fundingGoal || 1000000,
          }))
        );
      })
      .catch((err) => {
        console.error("🚨 펀딩 프로젝트 조회 실패:", err);
        setProjects([]);
      });

    setSlides(fallbackSlides);
  }, []);

  const filteredProjects = projects
    .filter((project) => {
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
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "latest":
          return new Date(b.deadline) - new Date(a.deadline);
        case "popular":
          return b.views - a.views;
        case "fundingRate":
          return (b.totalFunded / b.fundingGoal) - (a.totalFunded / a.fundingGoal);
        default:
          return 0;
      }
    });

  return (
    <>
    <main className={styles.fundingPage}>
      <Header />
      <HeroCarousel slides={slides} />
      <section className={styles.content}>
        <div className={styles.title}>
          <h2 className={styles.sectionTitle}>Funding Projects</h2>
          <p className={styles.sectionSubtitle}>
            지금 후원 가능한 공연들을 확인해보세요 🎁
          </p>
          <SearchBar onSearch={handleSearch} />
          <div className={styles.categoryHeader}>
            <CategoryList
              onCategorySelect={handleCategorySelect}
              selectedCategory={selectedCategory}
            />
            <SortSelector selected={sortOption} onChange={handleSortChange} />
          </div>
          {selectedCategory && (
            <div className={styles.categoryResetContainer}>
              <p className={styles.resetText} onClick={() => setSelectedCategory(null)}>
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
    <Footer/>
    </>
  );
};

export default FundingMain;
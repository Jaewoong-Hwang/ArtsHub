import React, { useState } from "react";
import SearchBar from "../../../components/common/SearchBar";
import RecommendedProjects, { allProjects } from "../components/RecommendedProjects";
import ProjectFilterStatus from "../../project/projectparticipate/components/ProjectFilterStatus";
import ExpertSection from "../components/ExpertSection";
import SidebarRanking from "../components/SidebarRanking";
import CategoryList from "../../project/projectparticipate/pages/CategoryList";
import Header from "../../../components/layout/Header";
import "../../../assets/styles/reset.css";
import styles from "./css/home..module.css";

const Home = () => {
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (inputKeyword) => {
    const trimmed = inputKeyword.trim();
    setKeyword(trimmed);
    setSelectedCategory(null);

    if (trimmed === "") {
      // ✅ 검색 초기화
      setIsSearching(false);
      setFilteredProjects([]);
      return;
    }

    const keywords = trimmed.toLowerCase().split(" ").filter(Boolean);
    const filtered = allProjects.filter((p) => {
      if (p.status !== "모집중") return false;
      return keywords.some((kw) =>
        [p.title, p.description, p.category].join(" ").toLowerCase().includes(kw)
      );
    });

    setFilteredProjects(filtered);
    setIsSearching(true);
  };

  const handleCategorySelect = (category) => {
    setKeyword("");
    setSelectedCategory(category);

    if (category) {
      const filtered = allProjects.filter(
        (p) => p.status === "모집중" && p.category === category
      );
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects([]);
    }

    setIsSearching(false);
  };

  // ✅ 랜덤 추천 모드인지 판단
  const showRandom = keyword === "" && selectedCategory === null;

  return (
    <div className={styles.container}>
      <Header />
      <SearchBar onSearch={handleSearch} />
      <CategoryList
        onCategorySelect={handleCategorySelect}
        selectedCategory={selectedCategory}
      />
      <div className={styles.sectionWrap}>
        <div className={styles.leftColumn}>
          {!showRandom && filteredProjects.length === 0 && (
            <ProjectFilterStatus totalCount={0} />
          )}
          <RecommendedProjects
            projects={showRandom ? undefined : filteredProjects}
          />
          <ExpertSection />
        </div>
        <SidebarRanking />
      </div>
    </div>
  );
};

export default Home;

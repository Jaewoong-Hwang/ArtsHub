import React from "react";
import SearchBar from "../../../components/common/SearchBar";
import ExpertSection from "../components/ExpertSection";
import RecommendedProjects from "../components/RecommendedProjects";
import SidebarRanking from "../components/SidebarRanking";
import CategoryList from "../../project/projectparticipate/pages/CategoryList";
import Header from "../../../components/layout/Header";

import "../../../assets/styles/reset.css"
import styles from "./css/home..module.css";


const Home = () => {
  return (
    <div className={styles.container}>
      <Header />
      <SearchBar />
      <CategoryList />
      <div className={styles.sectionWrap}>
        <div className={styles.leftColumn}>
          <ExpertSection />
          <RecommendedProjects />
        </div>
        <SidebarRanking />
      </div>
    </div>
  );
};

export default Home;

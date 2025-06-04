import React, { useState } from "react";
import "../../assets/styles/reset.css";
import styles from "./css/SearchBar.module.css";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    onSearch(keyword); // ✅ 무조건 호출
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchInputWrapper}>
        <input
          type="text"
          placeholder="어떤 공연을 찾고 계신가요?"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          className={styles.searchInput}
        />
        <button className={styles.searchIcon} onClick={handleSearch}>
          <FiSearch size={20} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;

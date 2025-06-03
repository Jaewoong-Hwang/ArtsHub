import React, { useState } from "react";
import '../../assets/styles/reset.css'
import "./css/SearchBar.css";
import { FiSearch } from "react-icons/fi"; // 돋보기 아이콘

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    if (keyword.trim()) {
      onSearch(keyword); // 상위에서 넘긴 검색 처리 함수 실행
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="어떤 공연을 찾고 계신가요?"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="search-icon" onClick={handleSearch}>
          <FiSearch size={20} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;

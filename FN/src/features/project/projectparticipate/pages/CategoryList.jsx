import React, { useRef } from "react";
import "./css/CategoryList.css";

const categories = [
  { name: "뮤지컬", emoji: "🎭" },
  { name: "연극", emoji: "🎬" },
  { name: "클래식", emoji: "🎻" },
  { name: "국악", emoji: "🥁" },
  { name: "어린이", emoji: "👶" },
  { name: "밴드", emoji: "🎸" },
  { name: "무용", emoji: "🩰" },
  { name: "재즈", emoji: "🎷" },
  { name: "인디", emoji: "🎤" },
  { name: "오페라", emoji: "🎼" },
  { name: "창극", emoji: "🧙" },
  { name: "퍼포먼스", emoji: "🕺" },
];

const CategoryList = ({ onCategorySelect, selectedCategory }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div className="category-wrapper">
      <button className="arrow-button left" onClick={scrollLeft}>
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
          <polyline points="15,18 9,12 15,6" stroke="currentColor" />
        </svg>
      </button>

      <div className="category-list" ref={scrollRef}>
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className={`category-item ${
              selectedCategory === cat.name ? "active" : ""
            }`}
            onClick={() => onCategorySelect(cat.name)}
          >
            <div className="emoji">{cat.emoji}</div>
            <p>{cat.name}</p>
          </div>
        ))}

        {selectedCategory && (
          <div
            className="category-item reset"
            onClick={() => onCategorySelect(null)}
          >
            <div className="emoji">🔁</div>
            <p>전체 보기</p>
          </div>
        )}
      </div>

      <button className="arrow-button right" onClick={scrollRight}>
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
          <polyline points="9,18 15,12 9,6" stroke="currentColor" />
        </svg>
      </button>
    </div>
  );
};

export default CategoryList;

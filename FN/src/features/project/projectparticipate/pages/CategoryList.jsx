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
  { name: "퍼포먼스", emoji: "🕺" },
  { name: "퍼포먼스", emoji: "🕺" },
  { name: "퍼포먼스", emoji: "🕺" },
  { name: "퍼포먼스", emoji: "🕺" },
];

const CategoryList = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div className="category-wrapper">
      {/* ← 왼쪽 버튼 */}
      <button className="arrow-button left" onClick={scrollLeft}>
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
          <polyline points="15,18 9,12 15,6" stroke="currentColor" />
        </svg>
      </button>

      {/* 스크롤 가능한 카테고리 리스트 */}
      <div className="category-list" ref={scrollRef}>
        {categories.map((cat, idx) => (
          <div key={idx} className="category-item">
            <div className="emoji">{cat.emoji}</div>
            <p>{cat.name}</p>
          </div>
        ))}
      </div>

      {/* → 오른쪽 버튼 */}
      <button className="arrow-button right" onClick={scrollRight}>
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
          <polyline points="9,18 15,12 9,6" stroke="currentColor" />
        </svg>
      </button>
    </div>
  );
};

export default CategoryList;

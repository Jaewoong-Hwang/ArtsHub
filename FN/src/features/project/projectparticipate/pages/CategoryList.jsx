import React, { useRef } from "react";
import styles from "./css/CategoryList.module.css";

// ✅ 이미지 import
import musicalImg from "../../../../assets/images/categories/musical_icon.png";
import dramaImg from "../../../../assets/images/categories/drama_icon.png";
import classicImg from "../../../../assets/images/categories/classic_icon.png";
import gugakImg from "../../../../assets/images/categories/gugak_icon.png";
import kidsImg from "../../../../assets/images/categories/kids_icon.png";
import bandImg from "../../../../assets/images/categories/band_icon.png";
import danceImg from "../../../../assets/images/categories/dance_icon.png";
import jazzImg from "../../../../assets/images/categories/jazz_icon.png";
import indieImg from "../../../../assets/images/categories/indie_icon.png";
import operaImg from "../../../../assets/images/categories/opera_icon.png";
import fusionImg from "../../../../assets/images/categories/fusion_icon.png";
import performanceImg from "../../../../assets/images/categories/performance_icon.png";

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
  { name: "퓨전", emoji: "🧙" },
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
    <div className={styles.categoryWrapper}>
      <button className={`${styles.arrowButton} ${styles.left}`} onClick={scrollLeft}>
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
          <polyline points="15,18 9,12 15,6" stroke="currentColor" />
        </svg>
      </button>

      <div className={styles.categoryList} ref={scrollRef}>
        {categories.map((cat, idx) => {
          const isActive = selectedCategory === cat.name;

          return (
            <div
              key={idx}
              className={`${styles.categoryItem} ${isActive ? styles.active : ""}`}
              onClick={() => onCategorySelect(isActive ? null : cat.name)}
            >
              {/* ✅ 이미지로 대체 */}
              <div className={`${styles.emoji} ${isActive ? styles.activeEmoji : ""}`}>
                <img src={cat.img} alt={cat.name} className={styles.categoryImage} />
              </div>
              <p className={styles.categoryItemText}>{cat.name}</p>
            </div>
          );
        })}
      </div>

      <button className={`${styles.arrowButton} ${styles.right}`} onClick={scrollRight}>
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
          <polyline points="9,18 15,12 9,6" stroke="currentColor" />
        </svg>
      </button>
    </div>
  );
};

export default CategoryList;

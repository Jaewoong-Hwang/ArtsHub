import React, { useRef } from 'react';
import './css/CategoryList.css';

const categories = [
  { name: '뮤지컬', emoji: '🎭' },
  { name: '연극', emoji: '🎬' },
  { name: '클래식', emoji: '🎻' },
  { name: '국악', emoji: '🥁' },
  { name: '어린이', emoji: '👶' },
  { name: '밴드', emoji: '🎸' },
  { name: '무용', emoji: '🩰' },
  { name: '재즈', emoji: '🎷' },
  { name: '인디', emoji: '🎤' },
  { name: '오페라', emoji: '🎼' },
];

const CategoryList = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <div className="category-wrapper">
      <button className="scroll-btn left" onClick={scrollLeft}>‹</button>

      <div className="category-list" ref={scrollRef}>
        {categories.map((cat, idx) => (
          <div key={idx} className="category-item">
            <div className="emoji">{cat.emoji}</div>
            <p>{cat.name}</p>
          </div>
        ))}
      </div>

      <button className="scroll-btn right" onClick={scrollRight}>›</button>
    </div>
  );
};

export default CategoryList;

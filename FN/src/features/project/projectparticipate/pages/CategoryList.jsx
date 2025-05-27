import React from 'react';
import './css/CategoryList.css';

const categories = [
  { name: '뮤지컬', emoji: '🎭' },
  { name: '연극', emoji: '🎬' },
  { name: '클래식', emoji: '🎻' },
  { name: '국악', emoji: '🥁' },
  { name: '어린이', emoji: '👶' },
  { name: '밴드', emoji: '🎸' }
];

const CategoryList = () => {
  return (
    <div className="category-list">
      {categories.map((cat, idx) => (
        <div key={idx} className="category-item">
          <div className="emoji">{cat.emoji}</div>
          <p>{cat.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
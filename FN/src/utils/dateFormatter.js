// utils/dateFormatter.js
// 날짜 형식: "2025-06-29" → "2025년 6월 29일"
export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  if (isNaN(date)) return "마감일 없음";

  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

// D-Day 계산
export const getDDay = (dateStr) => {
  const today = new Date();
  const target = new Date(dateStr);
  if (isNaN(target)) return "";

  const diff = Math.floor((target - today) / (1000 * 60 * 60 * 24));
  if (diff > 0) return `D-${diff}`;
  if (diff === 0) return `D-DAY`;
  return `마감`;
};
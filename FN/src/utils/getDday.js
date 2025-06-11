// src/utils/getDday.js
export const getDday = (deadline) => {
  const now = new Date();
  const end = new Date(deadline);
  const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));

  if (diff > 0) return `D-${diff}`;
  if (diff === 0) return "오늘 마감!";
  return "마감됨";
};
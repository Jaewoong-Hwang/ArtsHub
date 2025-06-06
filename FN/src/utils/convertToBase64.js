// src/utils/convertToBase64.js
export const convertToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result); // base64 문자열
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
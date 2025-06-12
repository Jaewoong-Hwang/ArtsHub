// src/utils/resolveProfileImage.js
import defaultImg from "../assets/images/default.png";

export function resolveProfileImage(imageFilename) {
  const SPRING_IMAGE_BASE_URL = "http://localhost:8090/img";

  if (!imageFilename) return defaultImg;

  // 외부 URL이면 그대로 반환, 내부 파일이면 경로 조합
  return imageFilename.startsWith("http")
    ? imageFilename
    : `${SPRING_IMAGE_BASE_URL}/${imageFilename}`;
}

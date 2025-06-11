import React from "react";
import { useNavigate } from "react-router-dom";
import useScrollFadeIn from "../hooks/useScrollFadeIn";
import styles from "./css/ProjectCard.module.css";

const ProjectCard = ({ project, index }) => {
  const [ref, visible, style] = useScrollFadeIn(index * 0.1);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!project?.slug) {
      console.warn("⚠️ slug 누락 - 이동 불가");
      return;
    }
    navigate(`/project/${project.slug}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleClick();
  };

  // 🔹 D-Day 계산
  const calcDday = (deadline) => {
    if (!deadline) return null;
    const today = new Date();
    const end = new Date(deadline);
    const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
    if (diff === 0) return "D-Day";
    if (diff > 0) return `D-${diff}`;
    return "마감";
  };

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      className={`${styles.projectCard} ${visible ? styles.visible : ""}`}
      style={style}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {/* 🔹 이미지 썸네일 */}
      <figure className={styles.thumbnailWrapper}>
        <img
          src={
            project.thumbnail ||
            project.image ||
            project.description?.previewUrl ||
            "/static/assets/img/default-thumbnail.jpg"
          }
          alt={project.title || "프로젝트 이미지"}
          onError={(e) => {
            e.target.src = "/static/assets/img/default-thumbnail.jpg";
          }}
        />
      </figure>

      {/* 🔹 카드 본문 */}
      <div className={styles.projectContent}>
        <div
          className={`${styles.projectBadge} ${
            styles[project.genre?.toLowerCase()] || ""
          }`}
        >
          {project.genre || project.category || "기타"}
        </div>

        <h3 className={styles.projectTitle}>
          {project.title ?? "제목 없음"}
        </h3>

        <p className={styles.projectSummary}>
          {project.descriptionSummary ??
            project.description?.summary ??
            "설명이 없습니다."}
        </p>

        <div className={styles.projectMeta}>
          <span className={styles.deadline}>
            마감일: {project.deadline || "미정"}
          </span>
          <span className={styles.dday}>{calcDday(project.deadline)}</span>
        </div>

        <div className={styles.capacity}>
          모집 인원: {Number(project.capacity) > 0 ? `${project.capacity}명` : "미정"}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
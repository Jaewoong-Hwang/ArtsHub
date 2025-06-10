import React from "react";
import { useNavigate } from "react-router-dom";
import useScrollFadeIn from "../hooks/useScrollFadeIn";
import styles from "./css/projectCard.module.css";

const ProjectCard = ({ project, index }) => {
  console.log("💡 전달된 프로젝트 데이터:", project); 
  const [ref, visible, style] = useScrollFadeIn(index * 0.1);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!project?.id) {
      alert("프로젝트 ID가 없습니다.");
      return;
    }
    navigate(`/project/${project.slug}`);

  };

  // 🔹 D-Day 계산
  const calcDday = (deadline) => {
    if (!deadline) return null;
    const today = new Date();
    const end = new Date(deadline);
    const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
    return diff >= 0 ? `D-${diff}` : "마감";
  };

  return (
    <article
      ref={ref}
      className={`${styles.projectCard} ${visible ? styles.visible : ""}`}
      style={style}
      onClick={handleClick}
    >
      {/* 🔹 이미지 썸네일 */}
      <figure className={styles.thumbnailWrapper}>
        <img
          src={
            project.thumbnail ||
            project.image ||
            "/static/assets/img/default-thumbnail.jpg"
          }
          alt={project.title}
          onError={(e) => {
            e.target.src = "/static/assets/img/default-thumbnail.jpg";
          }}
        />
      </figure>

      {/* 🔹 카드 본문 */}
      <div className={styles.projectContent}>
        <div className={styles.projectBadge}>
          {project.genre || project.category || "기타"}
        </div>

        <h3 className={styles.projectTitle}>{project.title ?? "제목 없음"}</h3>

        <p className={styles.projectSummary}>
          {project.descriptionSummary ??
            project.description?.summary ??
            "설명이 없습니다."}
        </p>

        {/* 🔹 마감일 & D-day */}
        <div className={styles.projectMeta}>
          <span className={styles.deadline}>
            마감일: {project.deadline || "미정"}
          </span>
          <span className={styles.dday}>{calcDday(project.deadline)}</span>
        </div>

        {/* 🔹 모집 인원 */}
        <div className={styles.capacity}>
          모집 인원: {Number(project.capacity) > 0 ? `${project.capacity}명` : "미정"}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;

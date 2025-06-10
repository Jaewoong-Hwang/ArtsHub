import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/FundingCard.module.css";

/**
 * @param {Object} props
 * @param {Object} props.project - 펀딩 프로젝트 정보
 * @param {number} props.index - 카드 인덱스 (애니메이션 딜레이용)
 */
const FundingCard = ({ project, index }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!project?.id) {
      alert("프로젝트 ID가 없습니다.");
      return;
    }
    navigate(`/funding/${project.id}`);
  };

  // 🔹 퍼센트 계산
  const getFundingPercent = () => {
    const { currentAmount = 0, targetAmount = 1 } = project;
    return Math.min(100, Math.round((currentAmount / targetAmount) * 100));
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
    <article className={styles.card} onClick={handleClick}>
      {/* 이미지 썸네일 */}
      <figure className={styles.thumbnailWrapper}>
        <img
          src={project.image || "/static/assets/img/default-thumbnail.jpg"}
          alt={project.title}
          onError={(e) =>
            (e.target.src = "/static/assets/img/default-thumbnail.jpg")
          }
        />
      </figure>

      {/* 콘텐츠 영역 */}
      <div className={styles.cardContent}>
        <span className={styles.category}>
          {project.category || "기타"}
        </span>

        <h3 className={styles.title}>{project.title || "제목 없음"}</h3>

        <p className={styles.summary}>
          {project.descriptionSummary || "설명이 없습니다."}
        </p>

        {/* 펀딩 퍼센트 + D-day */}
        <div className={styles.meta}>
          <span className={styles.fundingRate}>
            {getFundingPercent()}% 달성
          </span>
          <span className={styles.dday}>{calcDday(project.deadline)}</span>
        </div>

        {/* 목표 금액 */}
        <div className={styles.amounts}>
          <span className={styles.amountLabel}>목표금액</span>
          <span className={styles.amountValue}>
            {project.targetAmount?.toLocaleString() || "미정"} 원
          </span>
        </div>
      </div>
    </article>
  );
};

export default FundingCard;

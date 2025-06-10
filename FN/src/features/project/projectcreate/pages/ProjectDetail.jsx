// src/features/project/pages/ProjectDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../../../services/axiosInstance";

import "../../../../assets/styles/reset.css";
import styles from "./css/ProjectDetail.module.css";

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null); // null: 로딩, false: 실패, {}: 성공

  useEffect(() => {
    axios
      .get(`/api/projects/${slug}`)
      .then((res) => setProject(res.data))
      .catch((err) => {
        console.error("❌ 프로젝트 조회 실패:", err);
        setProject(false);
      });
  }, [slug]);

  if (project === null) {
    return <p className={styles.loading}>불러오는 중입니다...</p>;
  }

  if (project === false) {
    return <p className={styles.notFound}>해당 프로젝트를 찾을 수 없습니다.</p>;
  }

  const {
    title,
    genre,
    deadline,
    capacity,
    thumbnail,
    description,
    rewards,
  } = project;

  return (
    <div className={styles.detailWrapper}>
      <h1>{title}</h1>

      {thumbnail && (
        <img src={thumbnail} alt="썸네일" className={styles.detailImage} />
      )}

      <div className={styles.detailInfo}>
        <p>장르: {genre}</p>
        <p>모집 인원: {capacity}명</p>
        <p>모집 마감일: {deadline}</p>
      </div>

      <section className={styles.detailSection}>
        <h2>📖 상세 설명</h2>
        <p><strong>개요:</strong> {description?.summary || "없음"}</p>
        <p><strong>기획 배경:</strong> {description?.background || "없음"}</p>
        <p><strong>모집 역할:</strong> {description?.roles || "없음"}</p>
        <p><strong>일정:</strong> {description?.schedule || "없음"}</p>
        <p><strong>보상:</strong> {description?.compensation || "없음"}</p>
      </section>

      <section className={styles.detailSection}>
        <h2>🎁 리워드</h2>
        {Array.isArray(rewards) && rewards.length > 0 ? (
          rewards.map((reward, idx) => (
            <div key={idx} className={styles.rewardCard}>
              <h3>{reward.title} - {reward.price}원</h3>
              <ul>
                {reward.options?.map((opt, i) => (
                  <li key={i}>{opt}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>등록된 리워드가 없습니다.</p>
        )}
      </section>

      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← 돌아가기
      </button>
    </div>
  );
};

export default ProjectDetail;

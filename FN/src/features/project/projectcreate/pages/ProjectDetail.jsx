// src/features/project/pages/ProjectDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "../../../../assets/styles/reset.css";
import styles from "./css/ProjectDetail.module.css";

const ProjectDetail = () => {
  const { id } = useParams(); // 📌 URL에서 id 가져오기
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("submittedProjects");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const found = parsed.find((p) => String(p.id) === String(id));
        if (found) setProject(found);
      } catch (e) {
        console.error("❌ 로컬스토리지 파싱 오류:", e);
      }
    }
  }, [id]);

  if (!project) {
    return <p className={styles.notFound}>해당 프로젝트를 찾을 수 없습니다.</p>;
  }

  const { title, genre, deadline, capacity, thumbnail, description, rewards } = project;

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
          rewards.map((reward) => (
            <div key={reward.id} className={styles.rewardCard}>
              <h3>{reward.title} - {reward.amount}원</h3>
              <p>{reward.description}</p>
              {reward.type === "set" && (
                <ul>
                  {reward.options?.map((opt, idx) => (
                    <li key={idx}>
                      {opt.optionName}: {opt.optionValues}
                    </li>
                  ))}
                </ul>
              )}
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
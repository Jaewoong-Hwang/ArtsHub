import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../../../services/axiosInstance";

import "../../../../assets/styles/reset.css";
import styles from "./css/ProjectDetail.module.css";

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

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
    capacity,
    deadline,
    thumbnail,
    description,
    rewards,
  } = project;

  return (
    <div className={styles.previewWrapper}>
      <h1>프로젝트 상세 보기</h1>

      <section className={styles.previewSection}>
        <h2>{title || "제목 없음"}</h2>
        <p>장르: {genre || "장르 없음"}</p>
        <p>모집 인원: {capacity?.toLocaleString() || 0}명</p>
        <p>모집 마감일: {deadline || "없음"}</p>
      </section>

      <section className={styles.previewSection}>
        <h3>프로젝트 상세 설명</h3>
        {description?.previewUrl && (
          <div className={styles.previewThumbnail}>
            <img src={description.previewUrl} alt="썸네일" />
          </div>
        )}
        <p><strong>개요:</strong> {description?.summary || "없음"}</p>
        <p><strong>본문 내용:</strong> {description?.content || "없음"}</p>
        <p><strong>기획 배경:</strong> {description?.background || "없음"}</p>
        <p><strong>모집 역할:</strong> {description?.roles || "없음"}</p>
        <p><strong>일정:</strong> {description?.schedule || "없음"}</p>
        <p><strong>보상:</strong> {description?.compensation || "없음"}</p>
      </section>

      <section className={styles.previewSection}>
        <h3>리워드</h3>
        {Array.isArray(rewards) && rewards.length > 0 ? (
          rewards.map((reward, index) => (
            <div key={index} className={styles.previewReward}>
              <h4>
                {reward.title || "제목 없음"} -{" "}
                {reward.price?.toLocaleString() || 0}원
              </h4>
              <p>{reward.description || "설명이 없습니다."}</p>

              {Array.isArray(reward.options) && reward.options.length > 0 && (
                <ul>
                  {reward.options.map((opt, idx) => (
                    <li key={idx}>
                      <strong>{opt.optionName}</strong>:{" "}
                      {Array.isArray(opt.optionValues)
                        ? opt.optionValues.join(", ")
                        : opt.optionValues || "없음"}
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

      <div className={styles.ctaButtons}>
        <button
          className={`${styles.btn} ${styles.btnPrimary}`}
          onClick={() => navigate(-1)}
        >
          ← 돌아가기
        </button>

        
      </div>
    </div>
  );
};

export default ProjectDetail;

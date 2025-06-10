// src/features/project/pages/ProjectPreview.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextWithBreaks from "../components/TextWithBreaks";
import Modal from "../components/Modal";
import useSubmitProject from "../hooks/useSubmitProject";

import "../../../../assets/styles/reset.css";
import styles from "./css/ProjectPreview.module.css";

const ProjectPreview = () => {
  const navigate = useNavigate();
  const [previewData, setPreviewData] = useState({
    info: {},
    description: {},
    rewards: [],
  });
  const [showModal, setShowModal] = useState(false);

  const { info, description, rewards } = previewData;
  const { submitProject } = useSubmitProject(); // ✅ 등록 훅 호출

  // 📦 로컬스토리지에서 데이터 불러오기
  useEffect(() => {
    try {
      const info = JSON.parse(localStorage.getItem("projectInfo")) || {};
      const description = JSON.parse(localStorage.getItem("project_description")) || {};
      const rewards = JSON.parse(localStorage.getItem("projectRewards")) || [];
      setPreviewData({ info, description, rewards });
    } catch (e) {
      console.error("❌ 로컬스토리지 파싱 오류:", e);
    }
  }, []);

  // 🔘 등록 버튼 클릭 시
  const handleSubmit = () => {
    if (!info.title || !description.summary) {
      alert("프로젝트 제목과 개요는 필수입니다.");
      return;
    }

    submitProject(); // ✅ 등록 실행
  };

  return (
    <div className={styles.previewWrapper}>
      <h1>프로젝트 미리보기</h1>

      <section className={styles.previewSection}>
        <h2>{info.title || "제목 없음"}</h2>
        <p>장르: {info.genre || "장르 없음"}</p>
        <p>모집 인원: {info.capacity || "0"}명</p>
        <p>모집 마감일: {info.deadline || "없음"}</p>
      </section>

      <section className={styles.previewSection}>
        <h3>프로젝트 상세 설명</h3>
        {description.previewUrl && (
          <div className={styles.previewThumbnail}>
            <img src={description.previewUrl} alt="썸네일" />
          </div>
        )}
        <TextWithBreaks label="개요" text={description.summary} />
        <TextWithBreaks label="기획 배경" text={description.background} />
        <TextWithBreaks label="모집 역할" text={description.roles} />
        <TextWithBreaks label="일정" text={description.schedule} />
        <TextWithBreaks label="보상" text={description.compensation} />
      </section>

      <section className={styles.previewSection}>
        <h3>리워드</h3>
        {Array.isArray(rewards) && rewards.length > 0 ? (
          rewards.map((reward) => (
            <div key={reward.id} className={styles.previewReward}>
              <h4>
                {reward.title} - {reward.amount}원
              </h4>
              <p>{reward.description}</p>
              {reward.type === "set" &&
                Array.isArray(reward.options) &&
                reward.options.length > 0 && (
                  <ul>
                    {reward.options.map((opt, idx) => (
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

      <div className={styles.ctaButtons}>
        <button
          className={`${styles.btn} ${styles.btnOutline}`}
          onClick={() => window.history.back()}
        >
          수정하러 가기
        </button>
        <button
          className={`${styles.btn} ${styles.btnPrimary}`}
          onClick={handleSubmit}
        >
          등록하기
        </button>
      </div>

      {showModal && (
        <Modal type="submit" onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default ProjectPreview;
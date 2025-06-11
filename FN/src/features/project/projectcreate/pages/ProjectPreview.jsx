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
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ 로딩 상태

  const { info, description, rewards } = previewData;
  const { submitProject } = useSubmitProject();

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
  const handleSubmit = async () => {
    if (!info.title || !description.summary) {
      alert("프로젝트 제목과 개요는 필수입니다.");
      return;
    }

    try {
      setIsSubmitting(true);
      await submitProject(); // ✅ 등록 실행
      setShowModal(true); // ✅ 모달 오픈
    } catch (error) {
      alert("등록 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
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
          rewards.map((reward, index) => (
            <div key={index} className={styles.previewReward}>
              <h4>
                {reward.title || "제목 없음"} - {reward.price || 0}원
              </h4>
              {Array.isArray(reward.options) && reward.options.length > 0 && (
                <ul>
                  {reward.options.map((opt, idx) => (
                    <li key={idx}>
                      {opt.optionName || "이름 없음"}:{" "}
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
          className={`${styles.btn} ${styles.btnOutline}`}
          onClick={() => window.history.back()}
          disabled={isSubmitting}
        >
          수정하러 가기
        </button>
        <button
          className={`${styles.btn} ${styles.btnPrimary}`}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "등록 중..." : "등록하기"}
        </button>
      </div>

      {showModal && (
        <Modal
          type="submit"
          onClose={() => {
            setShowModal(false);
            navigate("/projectmain"); // 예시: 등록 후 이동
          }}
        />
      )}
    </div>
  );
};

export default ProjectPreview;
